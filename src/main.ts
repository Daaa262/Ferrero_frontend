import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker zarejestrowany:', registration)
      })
      .catch((error) => {
        console.log('Rejestracja Service Workera nie powiodła się:', error)
      })
  })
}

app.mount('#app')
