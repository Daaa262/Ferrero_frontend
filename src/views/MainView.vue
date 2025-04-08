<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function inspection() {
  router.push('/inspection')
}
function use() {
  router.push('/use')
}
function change() {
  router.push('/change')
}
function back() {
  router.push('/')
}
</script>

<template>
  <div class="button-section">
    <button @click="inspection">Przegląd</button>
    <button @click="use">Użycie</button>
    <button @click="change">Wymiana</button>
    <button @click="back">Wyloguj</button>
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
