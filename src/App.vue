<script setup lang="ts">
import Header from './components/header-global.vue'
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  const token = localStorage.getItem('JWTtoken')
  if (!token) {
    if (localStorage.getItem('subscriptionEndpoint')) {
      await axios.post(
        'http://localhost:8080/api/unsubscribe',
        localStorage.getItem('subscriptionEndpoint'),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      localStorage.removeItem('subscriptionEndpoint')
    }
    router.push('/')
    return
  }
  const decodedToken = JSON.parse(atob(token.split('.')[1]))
  const expirationDate = new Date(decodedToken.exp * 1000)
  if (expirationDate < new Date()) {
    localStorage.removeItem('JWTtoken')
    if (localStorage.getItem('subscriptionEndpoint')) {
      await axios.post(
        'http://localhost:8080/api/unsubscribe',
        localStorage.getItem('subscriptionEndpoint'),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      localStorage.removeItem('subscriptionEndpoint')
    }
    router.push('/')
    return
  }
  const privileges = decodedToken.role
  if (privileges.value == 0) {
    router.push('/main')
    return
  }

  if (Notification.permission === 'default') Notification.requestPermission()
  else if (Notification.permission === 'denied') {
    alert('Powiadomienia są zablokowane. Aby je włączyć, zmień ustawienia przeglądarki.')
  }
  if (Notification.permission === 'granted') {
    const registration = await navigator.serviceWorker.ready
    const publicVapidKey = import.meta.env.VITE_PUBLIC_VAPID

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    })

    localStorage.setItem('subscriptionEndpoint', subscription.endpoint)

    await axios.post('http://localhost:8080/api/subscribe', subscription, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  router.push('/main')
})

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
</script>

<template>
  <Header />
  <RouterView />
</template>
