import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import VeeValidate from './plugins/veeValidate'
import { createPinia } from 'pinia'
import { authProvider } from '@/plugins/firebase'
import Icon from '@/directives/Icon'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'
import progressProvider from '@/plugins/nprogress'

//TODO: workbox configuration in vite.config.js is not caching images as expected
registerSW({ immediate: true })

let vue

progressProvider(router)
authProvider(() => {
  if (!vue) {
    vue = createApp(App)
    vue.use(router)
    vue.use(VeeValidate)
    vue.use(createPinia())
    vue.directive('icon', Icon)
    vue.mount('#app')
  }
})
