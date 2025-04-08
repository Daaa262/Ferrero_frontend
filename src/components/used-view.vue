<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  receivedCode: string
}>()
</script>

<template>
  <div>
    <h1>Gaśnica z kodem {{ props.receivedCode }} została oznaczona jako zużyta.</h1>
  </div>
</template>

<style scoped></style>
