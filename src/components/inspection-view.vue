<script setup lang="ts">
import { isBefore } from 'date-fns'
import { FetchStatus } from '../enums/status.ts'

const props = defineProps<{
  receivedCode: string
  location: string | null
  expire: Date
  notes: string | null
  used: boolean
  status: FetchStatus
}>()

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pl-PL').format(date)
}
</script>

<template>
  <div v-if="status === FetchStatus.Success">
    <h2>Kod Gaśnicy: {{ props.receivedCode }}</h2>
    <h2 v-if="props.location">Lokalizacja: {{ props.location }}</h2>
    <h2 v-else>Gaśnica rezerwowa w magazynie.</h2>
    <h2 v-if="isBefore(props.expire, new Date())" class="red">
      Data Ważności: {{ formatDate(props.expire) }}
    </h2>
    <h2 v-else>Data Ważności: {{ formatDate(props.expire) }}</h2>
    <h2 v-if="props.notes">Uwagi: {{ props.notes }}</h2>
    <h2 v-if="props.used" class="red">Gaśnica zużyta</h2>
  </div>
  <div v-else-if="status === FetchStatus.Unauthorized" class="red">
    <h1>Brak uprawnień.</h1>
  </div>
  <div v-else-if="status === FetchStatus.NotFound" class="red">
    <h1>Gaśnica {{ props.receivedCode }} nie istnieje w bazie.</h1>
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
</style>
