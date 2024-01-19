<template>
  <header id="header" class="fixed bg-gray-700 w-full z-50">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="text-white"
        >Music</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li class="px-2 text-white">
            <RouterLink to="/about">About ✎</RouterLink>
          </li>
          <template v-if="!authStore.isAuth">
            <li class="px-2 text-white">
              <RouterLink to="#" @click.prevent="() => modalStore.setOpen(true)"
                >Login / Register</RouterLink
              >
            </li>
          </template>
          <template v-else>
            <li class="px-2 text-white">
              <RouterLink to="/manage">Manage ✎</RouterLink>
            </li>
            <li class="px-2 text-white">
              <RouterLink to="account">{{ getDisplayName() }} ⌘</RouterLink>
            </li>
            <li class="px-2 text-white">
              <a @click.prevent="logout">Logout ⏻</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import authApi from '@/services/authApi'
import useAuthStore from '@/stores/authStore'
import useModalStore from '@/stores/modalStore'
import { mapStores } from 'pinia'
export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore, useAuthStore)
  },
  methods: {
    async logout() {
      if (confirm('Are you sure you want to logout?')) {
        await authApi.logout()
        this.authStore.setIsAuth(false)
        this.authStore.setId(null)
        //7.d use $router.push() to navigate to home
        if (this.$route.meta.requiredAuth) {
          this.$router.push({ name: 'home' })
        }
        //OR
        //window.location.reload()
      }
    },
    getDisplayName() {
      return this.authStore.displayName?.split(' ')[0]
    }
  }
}
</script>
