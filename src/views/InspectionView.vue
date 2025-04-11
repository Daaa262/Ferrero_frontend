<script setup lang="ts">
import { ref } from 'vue'
import ScanQR from '../components/scan-qr.vue'
import MenuButton from '../components/menu-button.vue'
import Data from '../components/data-view.vue'
import axios from 'axios'

enum FetchStatus {
  Loading,
  Success,
  NotFound,
  Error,
}

const receivedCode = ref<string>('')
const location = ref<string>('')
const date = ref<string>('')
const person = ref<string>('')
const fetchStatus = ref<FetchStatus>(FetchStatus.Loading)

async function handleCode(code: string) {
  receivedCode.value = code

  try {
    const response = await axios.post(
      'http://localhost:8080/inspect',
      { code },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.data) {
      location.value = response.data.location
      date.value = response.data.date
      person.value = response.data.person
      fetchStatus.value = FetchStatus.Success
    } else {
      fetchStatus.value = FetchStatus.NotFound
    }
  } catch {
    fetchStatus.value = FetchStatus.Error
  }
}
</script>

<template>
  <ScanQR v-if="!receivedCode" @code="handleCode" />
  <template v-else>
    <Data
      v-if="fetchStatus === FetchStatus.Success"
      :receivedCode="receivedCode"
      :location="location"
      :date="date"
      :person="person"
    />
    <div v-else-if="fetchStatus === FetchStatus.NotFound">
      <h1>Gaśnica {{ receivedCode }} nie istnieje w bazie.</h1>
    </div>
    <div v-else-if="fetchStatus === FetchStatus.Error" class="error">
      <h1>Wystąpił błąd podczas łączenia z bazą danych.</h1>
    </div>
    <div v-else>
      <h1>Wczytuję...</h1>
    </div></template
  >
  <MenuButton />
</template>

<style scoped>
.error {
  color: #ff0000;
}
</style>
