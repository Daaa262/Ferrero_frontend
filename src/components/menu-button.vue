<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.push('/main')
}
</script>

<template>
  <div class="buttons">
    <button @click="back">Menu</button>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2vh;
  flex-direction: column;
}

.buttons button {
  font-size: 5vh;
  cursor: pointer;
  border-width: 1vh;
  padding: 2vh 15vw;
  font-weight: bold;
  margin-top: 2vh;
  user-select: none;
  width: 50%;
}

@media (max-aspect-ratio: 1/1) {
  .buttons button {
    font-size: 5vh;
    cursor: pointer;
    border-width: 1vh;
    padding: 2vh 15vw;
    font-weight: bold;
    margin-top: 2vh;
    user-select: none;
    width: 80%;
  }
}
</style>
