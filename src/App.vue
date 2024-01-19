<template>
  <main>
    <AppHeader />
    <RouterView v-slot="{ Component }">
      <Transition :name="transition" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <PlayerBar />
    <AuthModal />
  </main>
</template>

<script>
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import AuthModal from '@/components/AuthModal/AuthModal.vue'
import PlayerBar from '@/components/PlayerBar/PlayerBar.vue'
import { auth } from '@/plugins/firebase'
import useAuthStore from '@/stores/authStore'
import { mapStores } from 'pinia'

export default {
  name: 'App',
  computed: {
    ...mapStores(useAuthStore)
  },
  created() {
    if (auth.currentUser) {
      this.authStore.setIsAuth(true)
      this.authStore.setId(auth.currentUser.uid)
      this.authStore.setDisplayName(auth.currentUser.displayName)
    }
  },
  watch: {
    $route(to, from) {
      const toName = to.name
      const fromName = from.name
      if (fromName === 'home' && (toName === 'manage' || toName === 'song')) {
        this.transition = 'slide-left'
      } else if ((fromName === 'manage' || fromName === 'song') && toName === 'home') {
        this.transition = 'slide-right'
      } else {
        this.transition = 'fade'
      }
    },
    data() {
      return {
        transition: 'fade'
      }
    }
  },
  components: {
    AppHeader,
    AuthModal,
    PlayerBar
  }
}
</script>

<style type="scss" scoped>
.slide-left-enter-active {
  animation: slide-left 0.25s;
}
.slide-right-enter-active {
  animation: slide-right 0.25s;
}
.fade-enter-active {
  animation: fade 0.25s;
}

.fade-leave-active {
  animation: fade 0.25s reverse;
}

@keyframes fade {
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
}
@keyframes slide-left {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
}
@keyframes slide-right {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0%);
  }
}
</style>
