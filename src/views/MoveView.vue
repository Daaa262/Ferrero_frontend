<script setup lang="ts">
import { ref } from 'vue'
import ScanQR from '../components/scan-qr.vue'
import MoveView from '../components/move-view.vue'
import MenuButton from '../components/menu-button.vue'
import { FetchStatus } from '../enums/status.ts'
import axios from 'axios'

const extinguisher = ref<string>()
const location = ref<string>()
const fetchStatus = ref<FetchStatus>(FetchStatus.Loading)
const reason = ref<string>('')

async function moveExtinguisher() {
  try {
    await axios.patch(
      `/api/move?id=${extinguisher.value}&location=${location.value}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('JWTtoken')}`,
        },
      },
    )
    fetchStatus.value = FetchStatus.Success
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === axios.HttpStatusCode.Unauthorized) {
        fetchStatus.value = FetchStatus.Unauthorized
      } else if (error.response.status === axios.HttpStatusCode.NotFound) {
        fetchStatus.value = FetchStatus.NotFound
      } else if (error.response.status === axios.HttpStatusCode.BadRequest) {
        fetchStatus.value = FetchStatus.BadRequest
      }
    } else {
      fetchStatus.value = FetchStatus.Error
    }
  }
}

async function handleCode(code: string) {
  if (!extinguisher.value) {
    extinguisher.value = code
  } else if (code !== extinguisher.value) {
    location.value = code
    moveExtinguisher()
  }
}
</script>

<template>
  <div class="text">
    <h4 v-if="!extinguisher">{{ $t('scanToMove') }}</h4>
    <h4 v-else-if="!location">{{ $t('scanLocation') }}</h4>
  </div>
  <ScanQR v-if="!location" @code="handleCode" />
  <MoveView
    v-if="fetchStatus !== FetchStatus.Loading"
    :extinguisher="extinguisher!"
    :location="location!"
    :status="fetchStatus"
    :reason="reason"
  />
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
