<script setup lang="ts">
import { onMounted } from 'vue'
import { FetchStatus } from '../enums/status.ts'
import QRCode from 'qrcode'
import { ref } from 'vue'

const props = defineProps<{
  extinguisher: string
  expire: string
  status: FetchStatus
}>()

const qrCodeDataUrl = ref<string>('')

onMounted(async () => {
  if (props.status === FetchStatus.Success) {
    qrCodeDataUrl.value = await QRCode.toDataURL(props.extinguisher, {
      width: window.innerWidth,
      margin: 1,
    })
  }
})
</script>

<template>
  <div v-if="status === FetchStatus.Success">
    <h2>Dodano do magazynu gaśnice o id: {{ props.extinguisher }}</h2>
    <h2>Data Ważności: {{ props.expire }}</h2>
    <img :src="qrCodeDataUrl" alt="Kod QR gaśnicy" />
  </div>
  <div v-else-if="status === FetchStatus.Unauthorized" class="red">
    <h1>Brak uprawnień.</h1>
  </div>
  <div v-else-if="status === FetchStatus.BadRequest" class="red">
    <h1>Nie można dodać gaśnicy.</h1>
  </div>
  <div v-else-if="status === FetchStatus.Error" class="red">
    <h1>Wystąpił błąd podczas łączenia z bazą danych.</h1>
  </div>
  <div v-else>
    <h1>Wczytuję...</h1>
  </div>
</template>

<style scoped>
.red {
  color: red;
}
img {
  width: 40%;
  display: flex;
  justify-self: center;
}
</style>
