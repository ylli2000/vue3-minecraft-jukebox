<template>
  <div
    :class="'fixed z-50 inset-0 overflow-y-auto' + (!modalStore.isOpen ? ' hidden' : '')"
    aria-labelledby="Login or Register"
    aria-modal="true"
    role="dialog"
    id="modal"
  >
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all overflow-y-auto w-[94vw] h-[98svh] sm:h-auto sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">{{ title }}</p>
            <!-- Modal Close Button -->
            <div
              class="modal-close cursor-pointer z-50"
              :disabled="modalStore.isRegisterInProgress"
              @click.prevent="() => modalStore.setOpen(false)"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useModalStore from '@/stores/modalStore'
import { mapStores } from 'pinia'
export default {
  name: 'ModalFrame',
  props: ['title'],
  computed: {
    ...mapStores(useModalStore)
  }
}
</script>
