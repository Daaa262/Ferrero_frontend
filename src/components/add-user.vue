<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const admin = ref(false)

const props = defineProps<{
  privileges: number
}>()

async function add() {
  if (username.value === '') {
    alert('Proszę podać imię i nazwisko użytkownika.')
    return
  }
  try {
    await axios.post(
      `/api/add_user?username=${username.value}&role=${admin.value ? 1 : 0}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('JWTtoken')}`,
        },
      },
    )
    window.location.reload()
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === axios.HttpStatusCode.Unauthorized) {
        alert('Brak uprawnień.')
      }
    }
  }
}
</script>

<template>
  <div class="form">
    {{ $t('username') }} <input type="text" id="name" maxlength="100" v-model="username" />
  </div>
  <div v-if="props.privileges === 2" class="checkbox">
    ADMIN
    <input type="checkbox" v-model="admin" />
  </div>
  <div class="form">
    <button @click="add">{{ $t('addUser') }}</button>
  </div>
</template>

<style scoped>
.checkbox {
  font-size: 2.5vh;
  font-weight: bold;
  color: green;
}

.checkbox input[type='checkbox'] {
  width: 2.5vh;
  height: 2.5vh;
}

.form {
  font-size: 3vh;
}

.form input {
  font-size: 2vh;
  border-radius: 0.5vh;
  border-width: 0.5vh;
  width: 30%;
}

.form button {
  font-size: 2vh;
  cursor: pointer;
  border-width: 0.5vh;
  font-weight: bold;
  user-select: none;
  width: 30%;
  height: 5vh;
}

@media (max-aspect-ratio: 1/1) {
  .form input {
    font-size: 2vh;
    border-radius: 0.5vh;
    border-width: 0.5vh;
    width: 50%;
  }
  .form button {
    font-size: 2vh;
    cursor: pointer;
    border-width: 0.5vh;
    font-weight: bold;
    user-select: none;
    width: 60%;
    height: 5vh;
  }
}
</style>
