<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { FetchStatus } from '../enums/status.ts'
import { useRouter } from 'vue-router'
import AddUser from './add-user.vue'
import type { User } from '../types/user.ts'

const fetchStatus = ref<FetchStatus>(FetchStatus.Loading)
const privileges = ref(-1)
const router = useRouter()
const props = defineProps<{
  list: User[]
}>()

async function remove_user(index: string) {
  try {
    await axios.delete('/api/remove_user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('JWTtoken')}`,
      },
      params: {
        username: index,
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
  window.location.reload()
}

onMounted(() => {
  const token = localStorage.getItem('JWTtoken')
  if (!token) {
    router.push('/')
  } else {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    const expirationDate = new Date(decodedToken.exp * 1000)
    if (expirationDate < new Date()) {
      localStorage.removeItem('JWTtoken')
      router.push('/')
    } else {
      privileges.value = decodedToken.role
    }
  }
})
</script>

<template>
  <div>
    <ul>
      <li v-for="item in props.list" :key="item.username">
        {{ $t('username') }}
        <b>{{ item.username }}</b>
        <span v-if="item.role === 1" class="admin">ADMIN</span>
        <span v-if="item.role === 2" class="superadmin">SUPERADMIN</span>
        <span v-if="item.role < privileges" class="red" @click="remove_user(item.username)">{{
          $t('delete')
        }}</span>
        <br v-if="item.password" />
        <span v-if="item.password">{{ $t('password') }}</span>
        <b v-if="item.password" class="hidden"> {{ item.password }}</b>
      </li>
      <br />
      <AddUser :privileges="privileges" />
    </ul>
  </div>
</template>

<style scoped>
li {
  font-size: 3vh;
}

p {
  font-size: 3vh;
}

.admin {
  font-size: 3vh;
  font-weight: bold;
  color: green;
  margin-left: 1rem;
  font-size: 2.5vh;
}

.superadmin {
  font-size: 3vh;
  font-weight: bold;
  color: #0090ff;
  margin-left: 1rem;
  font-size: 2.5vh;
}

.hidden {
  opacity: 0;
  transition: opacity 0.7s ease;
}

.hidden:hover {
  opacity: 1;
}

.red {
  color: red;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 2.5vh;
}
</style>
