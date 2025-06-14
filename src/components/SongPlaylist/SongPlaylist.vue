<template>
  <section class="container mx-auto pb-[100px]">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div
        class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
        v-icon.right="'headphones-alt'"
      >
        <span class="card-title">Songs</span>
        <!-- Icon -->
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <SuspendHandler :data="playlistStore.songs" :error="playlistStore.error">
          <SongItem
            v-for="song in playlistStore.songs"
            :key="song.id"
            :song="song"
            :isPlaying="isPlaying(song)"
          />
        </SuspendHandler>
      </ol>
      <!-- .. end Playlist -->
    </div>
    <div v-if="isRequesting" class="w-full justify-center py-2 text-gray-400 text-center">
      <i class="fas fa-spinner fa-spin"></i> loading...
    </div>
    <div v-if="isNoMore" class="w-full justify-center py-2 text-gray-400 text-center">
      end of list
    </div>
  </section>
</template>
<script>
import SuspendHandler from '@/components/SuspendHandler/SuspendHandler.vue'
import playlistApi from '@/services/playlistApi'
import useManageStore from '@/stores/manageStore'
import usePlayerStore from '@/stores/playerStore'
import usePlaylistStore from '@/stores/playlistStore'
import { mapStores } from 'pinia'
import SongItem from './SongItem.vue'
export default {
  name: 'SongPlaylist',
  computed: {
    ...mapStores(usePlayerStore, usePlaylistStore, useManageStore)
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll)
    if (this.manageStore.hasUpdate) {
      this.manageStore.hasUpdate = false
      this.playlistStore.setSongs(null) //invalidate list cache
    }
    await this.getSongs()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollHeight, scrollTop } = document.documentElement
      const clientHeight = document.documentElement.clientHeight
      this.isBottom = scrollHeight - scrollTop === clientHeight
      if (this.isBottom) {
        if (!this.isBottomPrev) {
          this.isBottomPrev = true
          this.getSongs()
        }
      } else {
        this.isBottomPrev = false
      }
    },
    async getSongs() {
      if (this.isRequesting || this.isNoMore) return
      this.isRequesting = true
      const id = this.playlistStore.getLastSong()?.id
      console.log(id)
      const { songs, error } = await playlistApi.getMoreSongs(id)
      songs && this.playlistStore.appendSongs(songs) //if error, keep the old list of songs
      this.playlistStore.setError(error) //if error, alert the user
      this.isNoMore = songs.length === 0
      this.isRequesting = false
    },
    isPlaying(song) {
      return this.playerStore.song && this.playerStore.song.id === song.id
    },
    scrollToCurrentSong() {
      this.$nextTick(() => {
        const current = this.playerStore.song
        if (!current) return
        const el = document.getElementById(`song-${current.id}`)
        if (!el) return
        const bar = document.getElementById('playerBar')
        const barHeight = bar ? bar.offsetHeight : 0
        const rect = el.getBoundingClientRect()
        // if bottom of element is hidden behind bar
        if (rect.bottom > window.innerHeight - barHeight) {
          const scrollBy = rect.bottom - (window.innerHeight - barHeight)
          window.scrollBy({ top: scrollBy, behavior: 'smooth' })
        }
      })
    }
  },
  data() {
    return {
      isRequesting: false,
      isBottomPrev: false,
      isBottom: false,
      isNoMore: false
    }
  },
  watch: {
    'playerStore.song'() {
      this.scrollToCurrentSong()
    }
  },
  components: { SongItem, SuspendHandler }
}
</script>
