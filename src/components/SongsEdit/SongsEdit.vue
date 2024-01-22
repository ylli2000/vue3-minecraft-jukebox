<template>
  <div
    class="bg-white bg-opacity-[0.97] sm:rounded sm:border border-gray-200 relative flex flex-col"
  >
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">My Songs</span>
      <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6 min-h-[600px]">
      <SuspendHandler :data="manageStore.songs" :error="manageStore.error">
        <div v-if="deleteError" class="text-white text-center p-2 rounded mb-4 bg-orange-600">
          delete failed, something went wrong
        </div>
        <!-- Composition Items -->
        <SongEntry
          v-for="song in manageStore.songs"
          :song="song"
          :key="song.id"
          :isEditing="editingSong && editingSong.id === song.id"
          @edit="editingSong = $event"
          @cancel="editingSong = null"
          @error="handleDeleteError"
        />
      </SuspendHandler>
    </div>
  </div>
</template>

<script>
import manageApi from '@/services/manageApi'
import useManageStore from '@/stores/manageStore'
import { mapStores } from 'pinia'
import SongEntry from './SongEntry.vue'
import SuspendHandler from '@/components/SuspendHandler/SuspendHandler.vue'
export default {
  name: 'SongsEdit',
  computed: {
    ...mapStores(useManageStore)
  },
  async mounted() {
    await this.getSongs()
  },
  methods: {
    async getSongs() {
      const { songs, error } = await manageApi.getSongsByCurrentUser()
      songs && this.manageStore.setSongs(songs) //if error, keep the old list of songs
      this.manageStore.setError(error) //if error, alert the user
    },
    handleDeleteError(event) {
      this.deleteError = event
      setTimeout(() => {
        this.deleteError = null
      }, 5000)
    }
  },
  data() {
    return {
      deleteError: null,
      editingSong: null
    }
  },
  components: { SongEntry, SuspendHandler }
}
</script>
