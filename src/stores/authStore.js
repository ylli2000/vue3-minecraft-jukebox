import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('auth', () => {
  const isAuth = ref(false)
  const id = ref(null)
  const displayName = ref(null)
  const setIsAuth = (val) => (isAuth.value = val)
  const setId = (val) => (id.value = val)
  const setDisplayName = (val) => (displayName.value = val)
  return {
    id,
    isAuth,
    displayName,
    setId,
    setIsAuth,
    setDisplayName
  }
})
