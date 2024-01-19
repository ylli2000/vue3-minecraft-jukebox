<template>
  <vee-form :validation-schema="veeSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        as="input"
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        as="input"
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="modalStore.isLoginInProgress"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import authApi from '@/services/authApi'
import useAuthStore from '@/stores/authStore'
import useModalStore from '@/stores/modalStore'
import { mapStores } from 'pinia'
import { ErrorMessage } from 'vee-validate'
export default {
  name: 'LoginForm',
  computed: {
    ...mapStores(useAuthStore, useModalStore)
  },
  methods: {
    async login(data) {
      this.modalStore.setLoginInProgress(true)
      this.modalStore.setAlertVisible(true)
      this.modalStore.setAlertVariant('info')
      this.modalStore.setAlertMessage('please wait... loggin into your account.')
      const { id, displayName, error } = await authApi.login(data)
      if (!error) {
        this.authStore.setId(id)
        this.authStore.setDisplayName(displayName)
        this.authStore.setIsAuth(true)
        this.modalStore.clearAlert()
        this.modalStore.setOpen(false)
      } else {
        this.modalStore.setAlertVariant('warning')
        this.modalStore.setAlertMessage('Check the username and password and try again.')
      }
      //finally
      this.modalStore.setLoginInProgress(false)
    }
  },
  data() {
    return {
      veeSchema: {
        email: 'required|email',
        password: 'required|min:6|max:50'
      }
    }
  },
  components: { ErrorMessage }
}
</script>
