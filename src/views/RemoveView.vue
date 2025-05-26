<script setup lang="ts">
import { ref } from 'vue'
import ScanQR from '../components/scan-qr.vue'
import RemoveView from '../components/remove-view.vue'
import MenuButton from '../components/menu-button.vue'
import axios from 'axios'
import { FetchStatus } from '../enums/status.ts'

const receivedCode = ref<string>('')
const fetchStatus = ref<FetchStatus>(FetchStatus.Loading)

async function handleCode(code: string) {
  receivedCode.value = code
  try {
    await axios.delete('http://localhost:8080/api/remove', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('JWTtoken')}`,
      },
      params: {
        id: code,
      },
    })
    fetchStatus.value = FetchStatus.Success
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === axios.HttpStatusCode.Unauthorized) {
        fetchStatus.value = FetchStatus.Unauthorized
      } else if (error.response.status === axios.HttpStatusCode.NotFound) {
        fetchStatus.value = FetchStatus.NotFound
      }
    } else {
      fetchStatus.value = FetchStatus.Error
    }
  }
}
</script>

<template>
  <ScanQR v-if="!receivedCode" @code="handleCode" />
  <RemoveView
    v-else-if="fetchStatus !== FetchStatus.Loading"
    :receivedCode="receivedCode"
    :status="fetchStatus"
  />
  <MenuButton />
</template>

<style scoped>
.error {
  color: #ff0000;
}
</style>
