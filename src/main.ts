import { createApp } from 'vue'

import { RouterPath } from '@/constants/route-path'
import '@/assets/index.css'
import '@/assets/scrollbar.css'
import '@/assets/themes.css'
import '@/assets/chart-theme.css'
import { configureHttpAuth } from '@/lib/http/axios'
import pinia from '@/plugins/pinia/setup'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

import App from './App.vue'
import '@/utils/env'
import 'vue-sonner/style.css' // vue sonner style

import { setupPlugins } from './plugins'

function bootstrap() {
  const app = createApp(App)

  setupPlugins(app)

  const authStore = useAuthStore(pinia)
  authStore.initializeAuthState()

  configureHttpAuth({
    onAuthFailure: async () => {
      authStore.logout()
      if (router.currentRoute.value.path !== RouterPath.LOGIN) {
        await router.replace(RouterPath.LOGIN)
      }
    },
  })

  app.mount('#app')
}

bootstrap()
