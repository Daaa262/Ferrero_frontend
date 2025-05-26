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
        <b> {{ item.id }}({{ item.location ? item.location : 'rezerwowa w magazynie' }}) </b>
        -
        <span v-if="item.used">Zużyta</span>
        <span v-else>Przeterminowana.</span>
      </li>
    </ul>
    <p v-if="props.list.length === 0">Brak bezużytecznych gaśnic.</p>
    <p v-else>Łącznie: {{ props.list.length }}</p>
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
