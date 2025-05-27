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
    <h2>{{ $t('extinguisherAddedToStorage') }} {{ props.extinguisher }}</h2>
    <h2>{{ $t('expireDate') }} {{ props.expire }}</h2>
    <img :src="qrCodeDataUrl" alt="Kod QR gaśnicy" />
  </div>
  <div v-else-if="status === FetchStatus.Unauthorized" class="red">
    <h1>{{ $t('unauthorized') }}</h1>
  </div>
  <div v-else-if="status === FetchStatus.BadRequest" class="red">
    <h1>{{ $t('unableToAddExtinguisher') }}</h1>
  </div>
  <div v-else-if="status === FetchStatus.Error" class="red">
    <h1>{{ $t('databaseError') }}</h1>
  </div>
  <div v-else>
    <h1>{{ $t('loading') }}</h1>
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
