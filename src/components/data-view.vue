<script setup lang="ts">
const props = defineProps<{
  receivedCode: string
  location: string
  date: string
  person: string
}>()
</script>

<template>
  <div>
    <h2>Kod Gaśnicy: {{ props.receivedCode }}</h2>
    <h2>Położenie: {{ props.location }}</h2>
    <h2>Data Ważności: {{ props.date }}</h2>
    <h2>Osoba Odpowiedzialna: {{ props.person }}</h2>
  </div>
</template>

<style scoped></style>
