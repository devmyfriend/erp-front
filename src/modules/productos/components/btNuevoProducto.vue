<template>
    <div>
        <router-link :to="{name: 'formularioProducto', params: {tipo: tipoProducto} }" class="btNuevo" @click="test">Nuevo Producto</router-link>
    </div>
</template>

<script setup>
const props = defineProps({
    tipoProducto: {
        type: String,
        required: true
    }
});

const test = () => {
    console.log('test: ' + props.tipoProducto);
}
</script>

<style scoped>
.btNuevo{
    width: 17.5rem;
    height: 2.1875rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #353535;
    color: #fff;
    padding: 0.5rem 1rem; 
    text-decoration: none;
    font-weight: 600;
}
</style>