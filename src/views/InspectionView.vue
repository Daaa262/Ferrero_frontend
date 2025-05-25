<script setup lang="ts">
import { ref } from 'vue'
import ScanQR from '../components/scan-qr.vue'
import MenuButton from '../components/menu-button.vue'
import Data from '../components/data-view.vue'
import axios from 'axios'
import { FetchStatus } from '../enums/status.ts'

const receivedCode = ref<string>('')
const location = ref<string>('')
const expire = ref<Date>(new Date())
const notes = ref<string>('')
const used = ref<boolean>(false)
const fetchStatus = ref<FetchStatus>(FetchStatus.Loading)

async function handleCode(code: string) {
  receivedCode.value = code

  try {
    const response = await axios.get(`http://localhost:8080/api/inspection?id=${code}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('JWTtoken')}`,
      },
    })

    if (response.data) {
      location.value = response.data.location
      expire.value = new Date(response.data.expire)
      notes.value = response.data.notes
      used.value = response.data.used
      fetchStatus.value = FetchStatus.Success
    }
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
  <Data
    v-if="fetchStatus !== FetchStatus.Loading"
    :receivedCode="receivedCode"
    :location="location"
    :expire="expire"
    :notes="notes"
    :used="used"
    :status="fetchStatus"
  />
  <MenuButton />
</template>

<style scoped>
.error {
  color: #ff0000;
}
</style>
