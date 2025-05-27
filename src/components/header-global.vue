<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function changeLanguage() {
  locale.value = locale.value === 'pl' ? 'en' : 'pl'
}
</script>

<template>
  <div class="ferrero-header" @click="changeLanguage">PPoż Ferrero</div>
</template>

<style scoped>
.ferrero-header {
  font-size: 8vh;
  font-weight: bold;
  background-color: #ff0000;
  color: #000000;
  text-align: center;
  display: block;
  user-select: none;
}
</style>
