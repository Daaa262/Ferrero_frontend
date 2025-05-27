<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UselessView from '../components/useless-view.vue'
import MenuButton from '../components/menu-button.vue'
import { FetchStatus } from '../enums/status.ts'
import axios from 'axios'
import type { FireExtinguisher } from '../types/fire-extinguisher.ts'

const list = ref<FireExtinguisher[]>([])
const fetchStatus = ref<FetchStatus>(FetchStatus.Loading)

onMounted(async () => {
  try {
    const response = await axios.get('/api/list_useless', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('JWTtoken')}`,
      },
    })

    if (response.data) {
      list.value = response.data
    }
    fetchStatus.value = FetchStatus.Success
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === axios.HttpStatusCode.Unauthorized) {
        fetchStatus.value = FetchStatus.Unauthorized
      }
    } else {
      fetchStatus.value = FetchStatus.Error
    }
  }
})
</script>

<template>
  <div class="text">
    <h5>{{ $t('listOfUseless') }}</h5>
  </div>
  <UselessView :list="list" :status="fetchStatus" />
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
