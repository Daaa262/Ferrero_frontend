<script setup lang="ts">
import { FetchStatus } from '../enums/status.ts'

const props = defineProps<{
  receivedCode: string
  status: FetchStatus
}>()
</script>

<template>
  <div v-if="status === FetchStatus.Success">
    <h1>{{ $t('extinguisherWithID') }} {{ props.receivedCode }} {{ $t('markedAsUsed') }}</h1>
  </div>
  <div v-else-if="status === FetchStatus.Unauthorized" class="red">
    <h1>{{ $t('unauthorized') }}</h1>
  </div>
  <div v-else-if="status === FetchStatus.NotFound" class="red">
    <h1>{{ $t('extinguisher') }} {{ receivedCode }} {{ $t('notExistInDb') }}</h1>
  </div>
  <div v-else-if="status === FetchStatus.BadRequest" class="red">
    <h1>{{ $t('extinguisher') }} {{ receivedCode }} {{ $t('alreadyUsed') }}</h1>
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
