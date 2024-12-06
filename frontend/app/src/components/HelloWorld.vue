<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <p class="reed-the-docs">This is a full stack  project build with the help of wiee.js and node.js</p>
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

