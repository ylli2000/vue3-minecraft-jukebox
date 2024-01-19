import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('player', () => {
  const onPageSong = ref(null)
  const song = ref(null)
  const status = ref('idle') //'playing', 'paused', 'idle'
  const setSong = (val) => (song.value = val)
  const setOnPageSong = (val) => (onPageSong.value = val)
  const setStatus = (val) => (status.value = val)

  const progress = ref(0)
  const duration = ref(0)
  const setProgress = (val) => (progress.value = val)
  const setDuration = (val) => (duration.value = val)
  return {
    song,
    status,
    onPageSong,
    setSong,
    setStatus,
    setOnPageSong,

    progress,
    duration,
    setProgress,
    setDuration
  }
})
