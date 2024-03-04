<template>
    <div>
        <h1> formulario productos con valor {{  tipoProducto }} </h1>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const tipoProducto = ref(route.params.tipoProducto);
</script>

<style scoped>
</style>