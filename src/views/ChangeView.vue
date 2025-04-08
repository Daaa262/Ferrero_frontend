<script setup lang="ts">
import { ref } from 'vue'
import ScanQR from '../components/scan-qr.vue'
import ChangeView from '../components/change-view.vue'
import MenuButton from '../components/menu-button.vue'

const first = ref<string>()
const second = ref<string>()

function handleCode(code: string) {
  if (!first.value) {
    first.value = code
  } else if (code !== first.value) {
    second.value = code
  }
}
</script>

<template>
  <div class="text">
    <h6 v-if="!first">Zeskanuj gaśnice do wymiany.</h6>
    <h6 v-else-if="!second">Zeskanuj nową gaśnice.</h6>
  </div>
  <ScanQR v-if="!second" @code="handleCode" />
  <change-view v-else :first="first!" :second="second!" />
  <MenuButton />
</template>

<style scoped>
.text {
  display: flex;
  justify-self: center;
  font-size: 3vh;
  user-select: none;
  font-weight: bold;
}
</style>
