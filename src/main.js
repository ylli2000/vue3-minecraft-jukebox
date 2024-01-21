import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import VeeValidate from './plugins/veeValidate'
import { createPinia } from 'pinia'
import { authProvider } from '@/plugins/firebase'
import Icon from '@/directives/Icon'
import App from './App.vue'

let vue
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
