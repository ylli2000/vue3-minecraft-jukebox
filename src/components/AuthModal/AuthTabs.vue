<template>
  <ul class="flex flex-wrap mb-4">
    <li class="flex-auto text-center" @click.prevent="tabChange('login')">
      <a
        :class="
          'block rounded py-3 px-4 transition' +
          (tab === 'login' ? ' hover:text-white text-white bg-blue-600' : '')
        "
        href="#"
      >
        Login</a
      >
    </li>
    <li class="flex-auto text-center" @click.prevent="tabChange('register')">
      <a
        :class="
          'block rounded py-3 px-4 transition' +
          (tab === 'register' ? ' hover:text-white text-white bg-blue-600' : '')
        "
        href="#"
      >
        Register</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AuthTabs',
  methods: {
    tabChange(tab) {
      this.tab = tab
      this.$emit('tabChange', tab)
    }
  },
  data() {
    return {
      tab: 'login'
    }
  }
}
</script>
