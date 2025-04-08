<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const surname = ref('')
const password = ref('')

const router = useRouter()

function login() {
  if (name.value === 'Admin' && surname.value === 'Admin' && password.value === 'Admin') {
    router.push('/main')
  } else {
    alert(`Niepoprawne dane logowania`)
  }
}
</script>

<template>
  <div class="login-section">
    <div class="form-row">
      <label>Imie:</label>
      <input v-model="name" type="text" />
    </div>
    <div class="form-row">
      <label>Nazwisko:</label>
      <input v-model="surname" type="text" />
    </div>
    <div class="form-row">
      <label>Hasło:</label>
      <input v-model="password" type="password" />
    </div>
    <button @click="login()">Zaloguj</button>
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
  padding: 1vh 10vw;
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

@media (max-aspect-ratio: 1/1) {
  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 2vh;
    width: 80%;
  }
}
</style>
