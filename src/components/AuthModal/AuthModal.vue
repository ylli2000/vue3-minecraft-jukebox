<template>
  <main aria-label="login or register">
    <ModalFrame :title="`Your Account`">
      <!-- Tabs -->
      <AuthTabs @tabChange="tab = $event" />
      <!-- alert -->
      <ModalAlert />
      <!-- Login Form -->
      <LoginForm v-show="tab === 'login'" />
      <!-- Registration Form -->
      <RegisterForm v-show="tab === 'register'" />
    </ModalFrame>
  </main>
</template>

<script>
import AuthTabs from './AuthTabs.vue'
import LoginForm from './LoginForm.vue'
import ModalAlert from './ModalAlert.vue'
import ModalFrame from './ModalFrame.vue'
import RegisterForm from './RegisterForm.vue'
export default {
  name: 'AuthModal',
  data() {
    return {
      tab: 'login'
    }
  },
  components: { ModalFrame, AuthTabs, LoginForm, RegisterForm, ModalAlert }
}
</script>
