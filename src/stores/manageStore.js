import { defineStore } from 'pinia'
import { ref } from 'vue'

//NOTE: for bigger project use something like TanStack to manage query cache
export default defineStore('manage', () => {
  const songs = ref(null)
  const error = ref(null)
  const hasUpdate = ref(false)
  const setSongs = (val) => (songs.value = val)
  const setError = (val) => (error.value = val)
  const setSong = (val) => {
      //add or update store
      const index = songs.value ? songs.value.findIndex((song) => song.id === val.id) : -1
      if (index === -1) {
        if (!Array.isArray(songs.value)) songs.value = []
        songs.value.unshift(val) //insert to the beginning of the songs array
      } else {
        songs.value[index] = val
      }
    },
    removeSong = (val) => {
      const index = songs.value ? songs.value.findIndex((song) => song.id === val.id) : -1
      if (index !== -1) {
        songs.value.splice(index, 1)
      }
    }
  return {
    songs,
    error,
    setSong,
    removeSong,
    setSongs,
    setError,
    hasUpdate
  }
})
