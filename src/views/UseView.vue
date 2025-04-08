<script setup lang="ts">
import { ref } from 'vue'
import ScanQR from '../components/scan-qr.vue'
import UsedView from '../components/used-view.vue'
import MenuButton from '../components/menu-button.vue'

const receivedCode = ref<string>('')

function handleCode(code: string) {
  receivedCode.value = code
}
</script>

<template>
  <ScanQR v-if="!receivedCode" @code="handleCode" />
  <UsedView v-else :receivedCode="receivedCode" />
  <MenuButton />
</template>

<style scoped></style>
