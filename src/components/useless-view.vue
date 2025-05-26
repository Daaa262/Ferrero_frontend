<script setup lang="ts">
import { FetchStatus } from '../enums/status.ts'
import UselessList from './useless-list.vue'

const props = defineProps<{
  list: string[]
  status: FetchStatus
}>()
</script>

<template>
  <UselessList v-if="props.status === FetchStatus.Success" :list="list" />
  <div v-else-if="props.status === FetchStatus.Unauthorized" class="red">
    <h1>Brak uprawnień.</h1>
  </div>
  <div v-else-if="props.status === FetchStatus.Error" class="red">
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
