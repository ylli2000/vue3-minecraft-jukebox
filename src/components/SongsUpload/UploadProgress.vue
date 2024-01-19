<template>
  <div class="mb-4">
    <div class="flex justify-between">
      <div class="font-bold text-sm mb-1">
        {{ progressFile.file.name }}
      </div>
      <div class="flex items-center text-xs">
        <span v-if="progressFile.cancelled" class="text-gray-700">Cancelled</span>
        <template v-else-if="progressFile.error">
          <a role="button" @click="close">Close</a>&nbsp; | &nbsp;
          <a role="button" @click="retry">Retry</a>
        </template>
        <a
          v-else-if="!progressFile.succeed && !progressFile.cancelled && !progressFile.error"
          role="button"
          @click="cancel"
          >Cancel</a
        >
      </div>
    </div>
    <div class="flex h-5 bg-gray-200 rounded overflow-hidden whitespace-nowrap">
      <div
        class="transition-all progress-bar flex items-center whitespace-nowrap overflow-visible"
        :class="{
          'bg-blue-500': !progressFile.succeed && !progressFile.error,
          'bg-green-500': progressFile.succeed,
          'bg-red-500': progressFile.error
        }"
        :style="{ width: progressFile.progress + '%' }"
      >
        <span class="text-xs text-white px-2">
          <i
            :class="{
              'fas fa-spinner fa-spin': !progressFile.succeed && !progressFile.error,
              'fas fa-check': progressFile.succeed,
              'fas fa-times': progressFile.error
            }"
          ></i>
          {{ progressFile.error ? 'upload failed' : progressFile.message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadProgress',
  props: ['progressFile'],
  mounted() {
    //point of interest, the emit event can trigger this componet to be updated
    //without this event, the progress bar will not be updated
    const stateChanged = (snapshot) => {
      const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2)
      const message = `${(snapshot.bytesTransferred / (1024 * 1024)).toFixed(1)} / ${(
        snapshot.totalBytes /
        (1024 * 1024)
      ).toFixed(1)}mbs`
      this.$emit('progress', { progress, message, progressFile: this.progressFile })
    }
    const errorOccured = (error) => this.$emit('error', { error, progressFile: this.progressFile })
    const uploadSucceed = () => this.$emit('complete', this.progressFile)
    this.progressFile.task.on('state_changed', stateChanged, errorOccured, uploadSucceed)
  },
  methods: {
    cancel() {
      this.$emit('cancel', this.progressFile)
    },
    close() {
      //close on error
      if (this.progressFile.error) {
        this.$emit('close', this.progressFile)
      }
    },
    retry() {
      //retry on error
      if (this.progressFile.error) {
        this.$emit('retry', this.progressFile)
      }
    }
  }
}
</script>
