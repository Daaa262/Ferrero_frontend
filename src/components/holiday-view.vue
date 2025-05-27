<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'

interface HolidayItem {
  name: string
}

const holiday = ref<HolidayItem[]>([])

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://pniedzwiedzinski.github.io/kalendarz-swiat-nietypowych/${new Date().getMonth() + 1}/${new Date().getDate()}.json`,
    )
    holiday.value = response.data
  } catch {}
})
</script>

<template>
  <div class="holiday-view" v-if="holiday">
    <h3>{{ $t('holiday') }}</h3>
    <ul>
      <li v-for="(item, index) in holiday" :key="index">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
