<template>
  <slot name="provider" :togglePlay="togglePlay" :updateSeek="updateSeek"></slot>
</template>

<script>
import { play, stop, isIdle, isPaused, pause, resume, duration, seek } from '@/plugins/howler'
import usePlaylistStore from '@/stores/playlistStore'
import usePlayerStore from '@/stores/playerStore'
import { mapStores } from 'pinia'
export default {
  name: 'PlayerProvider',
  computed: {
    ...mapStores(usePlaylistStore, usePlayerStore)
  },
  methods: {
    togglePlay(from = 'playerBar') {
      //'playerBar' or 'onPage'
      if (from === 'onPage' && this.playerStore.onPageSong?.id !== this.playerStore.song?.id) {
        //for detail page to call
        stop()
        this.playerStore.setSong(this.playerStore.onPageSong)
      }
      if (this.playerStore.song) {
        //normal toggle playing song logic
        if (isIdle()) {
          play(this.playerStore.song, { onProgress: this.onProgress, onEnd: this.onEnd })
          this.playerStore.setStatus('playing')
        } else if (isPaused()) {
          resume()
          this.playerStore.setStatus('playing')
        } else {
          pause()
          this.playerStore.setStatus('paused')
        }
      } else if (this.playerStore.onPageSong) {
        //for empty player bar with no song, on a detail page
        stop()
        this.playerStore.setSong(this.playerStore.onPageSong)
        this.togglePlay()
      } else if (this.playlistStore.songs?.length > 0) {
        //for empty player bar with no song, on all pages except detail
        stop()
        this.playerStore.setSong(this.playlistStore.songs[0])
        this.togglePlay()
      } else {
        alert('no song to play')
      }
    },
    updateSeek(event) {
      if (this.playerStore.status !== 'playing') return
      const { x, width } = event.currentTarget.getBoundingClientRect()
      const clickX = event.clientX - x
      const percentage = clickX / width
      const progress = duration() * percentage
      seek(progress, () => {
        this.playerStore.setProgress(progress)
      })
    },
    //event handling
    onProgress({ progress, duration }) {
      this.playerStore.setProgress(progress)
      this.playerStore.setDuration(duration)
    },
    onEnd() {
      stop()
      console.log('onEnd', this.playerStore.song)
      //set playerStore to next song
      const index = this.playlistStore.songs.findIndex(
        (song) => song.id === this.playerStore.song.id
      )
      if (index === this.playlistStore.songs.length - 1) {
        this.playerStore.setSong(this.playlistStore.songs[0]) //loop to beginning
      } else {
        this.playerStore.setSong(this.playlistStore.songs[index + 1]) //next song
      }
      this.togglePlay()
    }
  }
}
</script>
