<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'

const router = useRouter()

function inspection() {
  router.push('/inspection')
}
function use() {
  router.push('/use')
}
function move() {
  router.push('/move')
}
function back() {
  router.push('/')
}
function add() {
  router.push('/add')
}
function changeAccount() {
  localStorage.removeItem('JWTtoken')
  router.push('/')
}

const privileges = ref(-1)

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
  <div class="button-section">
    <button v-if="privileges >= 0" @click="inspection">Przegląd</button>
    <button v-if="privileges >= 0" @click="use">Użycie</button>
    <button v-if="privileges == 1" @click="move">Przeniesienie</button>
    <button v-if="privileges == 1" @click="add">Dodanie do magazynu</button>
    <button v-if="privileges == 1">Zużyte gaśnice</button>
    <button v-if="privileges == 1">Użytkownicy</button>
    <button v-if="privileges == -1" @click="back">Zaloguj się</button>
    <button v-else @click="changeAccount">Zmień konto</button>
  </div>
</template>

<style scoped>
.button-section {
  margin-top: 2vh;
  font-size: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}

.button-section button {
  font-size: 5vh;
  width: 50%;
  user-select: none;
  padding: 2vh;
  border-width: 1vh;
  margin-top: 1vh;
  cursor: pointer;
}

@media (max-aspect-ratio: 1/1) {
  .button-section button {
    font-size: 5vh;
    width: 80%;
    user-select: none;
    padding: 2vh;
    margin-top: 10vws;
    border-width: 1vh;
    margin-top: 1vh;
  }
}
</style>
