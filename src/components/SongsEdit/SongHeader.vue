<template>
  <div class="">
    <img
      v-if="song.data.thumb"
      :src="song.data.thumb"
      class="inline-block w-[24px] h-auto mr-2 align-sub"
    />
    <h4
      class="inline-block align-sub text-sm font-bold w-[calc(100%-100px)] text-nowrap text-ellipsis overflow-hidden"
    >
      {{ song.data.genre ? song.data.genre + ' - ' : '' }}
      {{ song.data.name }}
    </h4>
    <div class="float-right inline-block w-[68px]">
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600" @click="deleteSong">
        <i class="fa fa-trash"></i>
      </button>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600" @click="$emit('edit')">
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import manageApi from '@/services/manageApi'
import useManageStore from '@/stores/manageStore'
import { mapStores } from 'pinia'
export default {
  name: 'SongHeader',
  props: ['song'],
  computed: {
    ...mapStores(useManageStore)
  },
  methods: {
    async deleteSong() {
      if (!confirm('Are you sure you want to delete this song?')) return
      this.isUpdating = true
      console.log('deleting song data...')
      const res1 = await manageApi.deleteSong(this.song.id)
      console.log('deleting song storage...')
      const res2 = await manageApi.deleteSongFile(this.song.data.storageName)
      if (res1?.error) {
        console.log('error deleting song data', res1.error1)
        this.$emit('error', res1.error1) //let list header do the alert box
      } else if (res2?.error2) {
        console.log('error deleting song file', res2.error2)
        this.$emit('error', res2.error2) //let list header do the alert box
      } else {
        console.log('updating song store...', this.song)
        this.manageStore.removeSong(this.song)
        console.log('song data deleted', this.song)
        this.$emit('delete')
      }
      this.manageStore.hasUpdate = true
      this.isUpdating = false
    }
  },
  data() {
    return {
      isUpdating: false
    }
  },
  emits: ['edit', 'delete']
}
</script>
