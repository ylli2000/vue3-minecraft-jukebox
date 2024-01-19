<template>
  <div
    v-if="modalStore.isAlertVisible"
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="
      modalStore.alertVariant === 'warning'
        ? 'bg-orange-600'
        : modalStore.alertVariant === 'success'
          ? 'bg-green-500'
          : 'bg-blue-500'
    "
  >
    {{ modalStore.alertMessage }}
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modalStore'
export default {
  name: 'ModalAlert',
  computed: {
    ...mapStores(useModalStore)
  }
}
</script>
