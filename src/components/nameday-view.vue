<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface NamedayResponse {
  data: {
    pl: string
  }
}

const nameday = ref<NamedayResponse | null>(null)

onMounted(async () => {
  try {
    const response = await axios.get(`https://nameday.abalin.net/api/V2/today`)
    nameday.value = response.data
  } catch {}
})
</script>

<template>
  <div class="nameday-view" v-if="nameday">
    <h3>Dzisiaj imieniny obchodzi:</h3>
    <ul>
      <li v-for="(item, index) in nameday.data.pl.split(',')" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
