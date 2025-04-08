<script setup lang="ts">
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

const detectedCode = ref<string>('')
const writtenCode = ref<string>('')

const emit = defineEmits<{
  (e: 'code', code: string): void
}>()

function onDetect(detectedCodes: { rawValue: string }[]) {
  detectedCode.value = detectedCodes[0].rawValue
}

function ok() {
  if (writtenCode.value) {
    emit('code', 'G' + writtenCode.value)
  } else {
    emit('code', detectedCode.value)
  }
}
</script>

<template>
  <div class="fetch">
    <div class="scanner">
      <h2>Zeskanuj QR gaśnicy:</h2>
      <qrcode-stream @detect="onDetect" />
    </div>
    <div class="text">
      <h2>Lub wpisz kod:</h2>
      <div class="input">
        G
        <input v-model="writtenCode" type="text" />
      </div>
    </div>
  </div>
  <div class="buttons">
    <h1 v-if="detectedCode">Zeskanowano: {{ detectedCode }}</h1>
    <button :disabled="!(detectedCode || writtenCode)" @click="ok">Okej</button>
  </div>
</template>

<style scoped>
.fetch {
  width: 50%;
  height: 50%;
  display: flex;
  user-select: none;
  margin: 0 auto;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3vh;
}

.text input {
  font-size: 2vh;
}

.input {
  border-color: #000000;
  border-radius: 2vh;
  cursor: pointer;
  padding: 0.5vh;
  display: flex;
  font-weight: bold;
}

.input input {
  font-size: 2vh;
  background-color: #ffffff;
  border-color: #000000;
  color: #000000;
  border-radius: 1vh;
  cursor: pointer;
  border-width: 0.3vh;
  font-weight: bolder;
  padding: 0 0.5vh;
}

.scanner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
  .fetch {
    width: 80%;
    display: flex;
    flex-direction: column;
    user-select: none;
    margin: 0 auto;
  }
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
