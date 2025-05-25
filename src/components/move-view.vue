<script setup lang="ts">
import { onMounted } from 'vue'
import { FetchStatus } from '../enums/status.ts'

const props = defineProps<{
  extinguisher: string
  location: string
  status: FetchStatus
}>()

onMounted(() => {
  console.log(
    `Extinguisher: ${props.extinguisher}, Location: ${props.location}, Status: ${props.status}`,
  )
})
</script>

<template>
  <div v-if="status === FetchStatus.Success">
    <h1>Gaśnica z kodem {{ props.extinguisher }} została przeniesiona do {{ props.location }}.</h1>
  </div>
  <div v-else-if="status === FetchStatus.Unauthorized" class="error">
    <h1>Brak uprawnień.</h1>
  </div>
  <div v-else-if="status === FetchStatus.NotFound" class="error">
    <h1>Gaśnica {{ props.extinguisher }} nie istnieje w bazie.</h1>
  </div>
  <div v-else-if="status === FetchStatus.BadRequest" class="error">
    <h1>Gaśnica {{ props.extinguisher }} nie może zostać przeniesiona.</h1>
  </div>
  <div v-else-if="status === FetchStatus.Error" class="error">
    <h1>Wystąpił błąd podczas łączenia z bazą danych.</h1>
  </div>
  <div v-else>
    <h1>Wczytuję...</h1>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
