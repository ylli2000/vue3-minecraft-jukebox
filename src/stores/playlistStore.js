import { defineStore } from 'pinia'
import { ref } from 'vue'

//NOTE: for bigger project use something like TanStack to manage query cache
export default defineStore('playlist', () => {
  const songs = ref(null)
  const error = ref(null)
  const setSongs = (val) => (songs.value = val)
  const appendSongs = (val) => {
    if (!Array.isArray(songs.value)) songs.value = []
    val.forEach((s) => {
      const index = songs.value.findIndex((song) => song.id === s.id)
      if (index === -1) songs.value.push(s)
    })
  }
  const setError = (val) => (error.value = val)
  const getLastSong = () => (songs.value ? songs.value[songs.value.length - 1] : null)
  return {
    songs,
    error,
    setError,
    setSongs,
    appendSongs,
    getLastSong
  }
})
