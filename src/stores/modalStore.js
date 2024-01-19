import { defineStore } from 'pinia'
import { ref } from 'vue'

export default defineStore('modal', () => {
  const isOpen = ref(false)
  const isRegisterInProgress = ref(false)
  const isLoginInProgress = ref(false)
  const isAlertVisible = ref(false)
  const alertMessage = ref('')
  const alertVariant = ref('')
  const setOpen = (status) => (isOpen.value = status)
  const setRegisterInProgress = (status) => (isRegisterInProgress.value = status)
  const setLoginInProgress = (status) => (isLoginInProgress.value = status)
  const setAlertVisible = (status) => (isAlertVisible.value = status)
  const setAlertMessage = (message) => (alertMessage.value = message)
  const setAlertVariant = (variant) => (alertVariant.value = variant)
  const clearAlert = () => {
    setAlertVisible(false)
    setAlertMessage('')
    setAlertVariant('')
  }
  return {
    isOpen,
    setOpen,
    isRegisterInProgress,
    setRegisterInProgress,
    isLoginInProgress,
    setLoginInProgress,
    isAlertVisible,
    setAlertVisible,
    alertMessage,
    setAlertMessage,
    alertVariant,
    setAlertVariant,
    clearAlert
  }
})
