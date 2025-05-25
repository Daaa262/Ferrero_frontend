<script setup lang="ts">
import { FetchStatus } from '../enums/status.ts'

const props = defineProps<{
  receivedCode: string
  status: FetchStatus
}>()
</script>

<template>
  <div v-if="status === FetchStatus.Success">
    <h1>Gaśnica z kodem {{ props.receivedCode }} została oznaczona jako zużyta.</h1>
  </div>
  <div v-else-if="status === FetchStatus.Unauthorized" class="red">
    <h1>Brak uprawnień.</h1>
  </div>
  <div v-else-if="status === FetchStatus.NotFound" class="red">
    <h1>Gaśnica {{ receivedCode }} nie istnieje w bazie.</h1>
  </div>
  <div v-else-if="status === FetchStatus.BadRequest" class="red">
    <h1>Gaśnica {{ receivedCode }} została wcześniej oznaczona jako zużyta.</h1>
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
