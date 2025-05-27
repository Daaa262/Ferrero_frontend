<script setup lang="ts">
import type { FireExtinguisher } from '../types/fire-extinguisher.ts'

const props = defineProps<{
  list: FireExtinguisher[]
}>()
</script>

<template>
  <div>
    <ul>
      <li v-for="item in props.list" :key="item.id">
        <b> {{ item.id }}({{ item.location ? item.location : $t('inStorage2') }}) </b>
        -
        <span v-if="item.used">{{ $t('used') }}</span>
        <span v-else>{{ $t('expired') }}</span>
      </li>
    </ul>
    <p v-if="props.list.length === 0">{{ $t('noUseless') }}</p>
    <p v-else>{{ $t('total') }} {{ props.list.length }}</p>
  </div>
</template>

<style scoped>
li {
  font-size: 3vh;
}

span {
  font-size: 2.5vh;
}

p {
  font-size: 3vh;
}
</style>
