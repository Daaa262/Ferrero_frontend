<script setup lang="ts">
type FireExtinguisher = {
  id: string
  used: boolean
}

const props = defineProps<{
  list: FireExtinguisher[]
}>()
</script>

<template>
  <div>
    <h3>Lista bezużytecznych gaśnic:</h3>
    <ul>
      <li v-for="item in props.list" :key="item.id">
        <b>
          {{ item.id }}
        </b>
        -
        <span v-if="item.used">Zużyta</span>
        <span v-else>Przeterminowana.</span>
      </li>
    </ul>
    <p v-if="props.list.length === 0">Brak bezużytecznych gaśnic.</p>
    <p v-else>Łącznie: {{ props.list.length }} bezużytecznych gaśnic.</p>
  </div>
</template>

<style scoped>
h3 {
  font-size: 4vh;
}

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
