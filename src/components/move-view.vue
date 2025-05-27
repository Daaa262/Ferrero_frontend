<script setup lang="ts">
import { onMounted } from 'vue'
import { FetchStatus } from '../enums/status.ts'

const props = defineProps<{
  extinguisher: string
  location: string
  status: FetchStatus
  reason: string | null
}>()

onMounted(() => {
  console.log(
    `Extinguisher: ${props.extinguisher}, Location: ${props.location}, Status: ${props.status}`,
  )
})
</script>

<template>
  <div v-if="status === FetchStatus.Success">
    <h1>
      {{ $t('extinguisher') }} {{ props.extinguisher }} {{ $t('movedTo') }} {{ props.location }}.
    </h1>
  </div>
  <div v-else-if="status === FetchStatus.Unauthorized" class="red">
    <h1>{{ $t('unauthorized') }}</h1>
  </div>
  <div v-else-if="status === FetchStatus.NotFound" class="red">
    <h1>{{ $t('extinguisher') }} {{ props.extinguisher }} {{ $t('notExistInDb') }}.</h1>
  </div>
  <div v-else-if="status === FetchStatus.BadRequest" class="red">
    <h1>
      {{ $t('extinguisher') }} {{ props.extinguisher }} {{ $t('cantBeMoved') }} {{ props.reason }}
    </h1>
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
