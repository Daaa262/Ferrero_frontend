<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  first: string
  second: string
}>()
</script>

<template>
  <div>
    <h1>Gaśnica {{ props.first }} została zamieniona na {{ props.second }}.</h1>
  </div>
</template>

<style scoped></style>
