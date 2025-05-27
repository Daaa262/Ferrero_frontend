<script setup lang="ts">
import { FetchStatus } from '../enums/status.ts'
import UselessList from './useless-list.vue'
import type { FireExtinguisher } from '../types/fire-extinguisher.ts'

const props = defineProps<{
  list: FireExtinguisher[]
  status: FetchStatus
}>()
</script>

<template>
  <UselessList v-if="props.status === FetchStatus.Success" :list="list" />
  <div v-else-if="props.status === FetchStatus.Unauthorized" class="red">
    <h1>{{ $t('unauthorized') }}</h1>
  </div>
  <div v-else-if="props.status === FetchStatus.Error" class="red">
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
</style>
