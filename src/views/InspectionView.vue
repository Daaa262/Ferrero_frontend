<script setup lang="ts">
import { ref } from 'vue'
import ScanQR from '../components/scan-qr.vue'
import MenuButton from '../components/menu-button.vue'
import Data from '../components/data-view.vue'

const receivedCode = ref<string>('')
const location = ref<string>('')
const date = ref<string>('')
const person = ref<string>('')

function handleCode(code: string) {
  receivedCode.value = code
  location.value = 'Magazyn'
  date.value = '2023-10-01'
  person.value = 'Jan Kowalski'
}
</script>

<template>
  <ScanQR v-if="!receivedCode" @code="handleCode" />
  <Data v-else :receivedCode="receivedCode" :location="location" :date="date" :person="person" />
  <MenuButton />
</template>

<style scoped></style>
