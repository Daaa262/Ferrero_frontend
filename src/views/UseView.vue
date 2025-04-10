<script setup lang="ts">
import { ref } from 'vue'
import ScanQR from '../components/scan-qr.vue'
import UsedView from '../components/used-view.vue'
import MenuButton from '../components/menu-button.vue'

const receivedCode = ref<string>('')

const notify = async (): Promise<void> => {
  const permission: NotificationPermission = await Notification.requestPermission()

  if (permission === 'granted') {
    try {
      const registration = await navigator.serviceWorker.ready
      registration.showNotification('PPoż Ferrero', {
        body: `Gaśnica ${receivedCode.value} została użyta!`,
        icon: 'favicon.ico',
      })
    } catch (e) {
      alert(`${e}`)
    }
  }
}

function handleCode(code: string) {
  receivedCode.value = code
  notify()
}
</script>

<template>
  <ScanQR v-if="!receivedCode" @code="handleCode" />
  <UsedView v-else :receivedCode="receivedCode" />
  <MenuButton />
</template>

<style scoped></style>
