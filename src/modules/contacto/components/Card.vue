<script setup>
defineProps({
  value: Number,
});
</script>
<template>

<div class="card">{{ value }}</div>
</template>

<style scoped>
.card {
  height: 10rem;
  width: 10rem;
  padding: 2rem;
  color: white;
  background-color: indigo;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}
</style>