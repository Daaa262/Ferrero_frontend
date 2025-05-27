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
    <h2>{{ $t('extinguisherID') }} {{ props.receivedCode }}</h2>
    <h2 v-if="props.location">{{ $t('location') }} {{ props.location }}</h2>
    <h2 v-else>{{ $t('inStorage') }}</h2>
    <h2 v-if="isBefore(props.expire, new Date())" class="red">
      {{ $t('expireDate') }} {{ formatDate(props.expire) }}
    </h2>
    <h2 v-else>{{ $t('expireDate') }} {{ formatDate(props.expire) }}</h2>
    <h2 v-if="props.notes">{{ $t('notes') }} {{ props.notes }}</h2>
    <h2 v-if="props.used" class="red">{{ $t('usedExtinguisher') }}</h2>
  </div>
  <div v-else-if="status === FetchStatus.Unauthorized" class="red">
    <h1>{{ $t('unauthorized') }}</h1>
  </div>
  <div v-else-if="status === FetchStatus.NotFound" class="red">
    <h1>{{ $t('extinguisher') }} {{ props.receivedCode }} {{ $t('notExistInDb') }}</h1>
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
</style>
