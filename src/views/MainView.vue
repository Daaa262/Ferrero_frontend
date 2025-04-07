<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.push('/')
}
</script>

<template>
  <div class="login-section">
    <button @click="back()">Powrót</button>
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
  background-color: #a0a0a0;
  border-color: #000000;
  color: #ffffff;
  border-radius: 2vh;
  cursor: pointer;
  border-width: 1vh;
  margin-top: 5vh;
  padding: 1vh 10vw;
  -webkit-text-stroke: #000000 0.2vh;
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
