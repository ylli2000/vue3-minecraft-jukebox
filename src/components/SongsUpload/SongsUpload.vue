<template>
  <div class="bg-white bg-opacity-[0.97] rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <UploadButton @selectFiles="uploadFiles" />
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <UploadArea
        :isDragOver="isDragOver"
        @selectFiles="uploadFiles"
        @dragOverChange="isDragOver = $event"
      />
      <hr class="my-6" />
      <!-- alert bars -->
      <UploadAlert v-for="alert in uploadAlerts" :key="alert.index" :alert="alert" />
      <!-- Progess bars -->
      <UploadProgress
        v-for="pf in progressFiles"
        :key="pf.index"
        :progressFile="pf"
        @progress="progressChange($event)"
        @complete="progressComplete($event)"
        @cancel="progressCancel($event)"
        @error="progressError($event)"
        @retry="progressErrorRetry($event)"
        @close="progressErrorClose($event)"
      />
    </div>
  </div>
</template>

<script>
import manageApi from '@/services/manageApi'
import useManageStore from '@/stores/manageStore'
import { mapStores } from 'pinia'
import UploadAlert from '@/components/SongsUpload/UploadAlert.vue'
import UploadArea from '@/components/SongsUpload/UploadArea.vue'
import UploadButton from '@/components/SongsUpload/UploadButton.vue'
import UploadProgress from '@/components/SongsUpload/UploadProgress.vue'
export default {
  name: 'SongsUpload',
  computed: {
    ...mapStores(useManageStore)
  },
  methods: {
    uploadFiles(flist) {
      console.log('uploading file(s)...', flist)
      this.isDragOver = false
      const files = [...flist] //note flist is not an array, spread it
      files.forEach((file) => {
        if (!file.type.startsWith('audio/')) {
          this.addAlert('file format is not valid', file)
        } else if (file.size > 50 * 1024 * 1024) {
          this.addAlert('file is larger than 50mb', file)
        } else {
          this.addProgressFile(file)
        }
      })
    },
    async addProgressFile(file) {
      const inuse = await manageApi.isFileNameInUse(file.name)
      if (inuse) {
        this.addAlert('file name already in use', file)
        return
      }
      const { storageRef, task } = manageApi.uploadSongFile(file)
      const index = Date.now() + 'p' + (this.progressFiles.length + 1)
      const progressFile = {
        index,
        file,
        storageRef,
        task,
        progress: 0,
        message: 'uploading...',
        error: null,
        cancelled: false,
        succeed: false
      }
      this.progressFiles.unshift(progressFile)
      this.$emit('count', this.progressFiles.length)
    },
    addAlert(msg, file) {
      console.log(msg, file)
      const alert = {
        index: Date.now() + 'a' + (this.uploadAlerts.length + 1),
        message: msg
      }
      this.uploadAlerts.unshift(alert)
      this.alertComplete(alert)
    },
    //event handlers
    progressChange({ progress, message, progressFile }) {
      console.log(progressFile.file.name + 'upload progress at ' + progressFile.progress + '%')
      progressFile.progress = progress
      progressFile.message = message
    },
    progressError({ error, progressFile }) {
      console.log(progressFile.name + 'upload error at ' + progressFile.progress + '%', error)
      progressFile.error = error
      progressFile.message = 'upload failed'
    },
    progressErrorClose(progressFile) {
      if (progressFile.error) {
        console.log(progressFile.name + 'upload error close ')
        this.progressFiles.splice(this.progressFiles.indexOf(progressFile), 1)
        this.$emit('count', this.progressFiles.length)
      }
    },
    progressErrorRetry(progressFile) {
      const retry = progressFile.file
      this.progressErrorClose(progressFile)
      this.addProgressFile(retry)
    },
    async progressComplete(progressFile) {
      console.log(progressFile.file.name + 'upload complete')
      const { id, data, error } = await manageApi.addSong(progressFile)
      if (id && data) {
        progressFile.succeed = true
        progressFile.message = 'upload complete'
        setTimeout(() => {
          this.progressFiles.splice(this.progressFiles.indexOf(progressFile), 1)
          this.manageStore.setSong({ id, data })
          this.$emit('count', this.progressFiles.length)
        }, 1500)
      } else if (error) {
        this.progressError({ error, progressFile })
      }
    },
    progressCancel(progressFile) {
      console.log(progressFile.file.name + 'upload cancelled')
      this.progressFile.task.cancel()
      progressFile.cancelled = true
      progressFile.message = 'upload cancelled'
      setTimeout(() => {
        this.progressFiles.splice(this.progressFiles.indexOf(progressFile), 1)
        this.$emit('count', this.progressFiles.length)
      }, 1500)
    },
    alertComplete(alert) {
      setTimeout(() => {
        this.uploadAlerts.splice(this.uploadAlerts.indexOf(alert), 1)
      }, 3000)
    }
    //finalise way 2, using :ref= from parent component, not preferred
    // cancelUploadTasks() {
    //   this.progressFiles.forEach((pf) => {
    //     pf.task.cancel()
    //   })
    // }
  },
  beforeUnmount() {
    //finalise way 1, if user decides to leave the page half way uploading, we cancel call tasks
    this.progressFiles.forEach((pf) => {
      pf.task.cancel()
    })
  },
  data() {
    return {
      hiddenInput: null,
      isDragOver: false,
      uploadAlerts: [],
      progressFiles: []
    }
  },
  components: { UploadButton, UploadArea, UploadAlert, UploadProgress }
}
</script>
