<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UsersView from '../components/users-view.vue'
import MenuButton from '../components/menu-button.vue'
import { FetchStatus } from '../enums/status.ts'
import axios from 'axios'
import type { User } from '../types/user.ts'

const list = ref<User[]>([])
const fetchStatus = ref<FetchStatus>(FetchStatus.Loading)

onMounted(async () => {
  try {
    const response = await axios.get('/api/get_users', {
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
    <h5>{{ $t('userList') }}</h5>
  </div>
  <UsersView :list="list" :status="fetchStatus" />
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
