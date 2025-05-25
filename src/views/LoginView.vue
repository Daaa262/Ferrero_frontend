<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')

const router = useRouter()

async function login() {
  let response = null
  try {
    response = await axios.post('http://localhost:8080/api/login', {
      username: username.value,
      password: password.value,
    })
    if (response.data) {
      localStorage.setItem('JWTtoken', response.data)
      router.push('/main')
    }
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === axios.HttpStatusCode.Unauthorized
    ) {
      alert('Niepoprawne dane logowania')
    } else {
      alert('Wystąpił błąd podczas łączenia z bazą danych.')
    }
  }
}
</script>

<template>
  <div class="login-section">
    <div class="form-row">
      <label>Imie i nazwisko:</label>
      <input v-model="username" type="text" />
    </div>
    <div class="form-row">
      <label>Hasło:</label>
      <input v-model="password" type="password" />
    </div>
    <div class="button-row">
      <button @click="login">Zaloguj</button>
    </div>
  </div>
</template>

<style scoped>
.login-section {
  margin-top: 2vh;
  font-size: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.login-section button {
  font-size: 6vh;
  cursor: pointer;
  border-width: 1vh;
  margin-top: 5vh;
  padding: 1vh 0;
  font-weight: bold;
}

.login-section input {
  font-size: 5vh;
  background-color: #ffffff;
  border-color: #000000;
  color: #000000;
  border-radius: 2vh;
  cursor: pointer;
  border-width: 1vh;
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
  width: 40%;
}

.button-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 2vh;
  text-align: center;
  justify-self: center;
  width: 30%;
}

@media (max-aspect-ratio: 1/1) {
  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 2vh;
    width: 80%;
  }

  .button-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 2vh;
    width: 80%;
  }
}
</style>
