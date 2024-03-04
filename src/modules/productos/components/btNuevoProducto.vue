<template>
    <div>
        <router-link :to="{name: 'formularioProducto', params: {tipo: tipoProducto, id: idProducto} }" class="btNuevo">Nuevo Producto</router-link>
    </div>
</template>

<script setup>
const props = defineProps({
    tipoProducto: {
        type: String,
        required: true
    },
    idProducto: {
        type: Number,
        default: 0
    }
});
</script>

<style>
.btNuevo{
    width: 17.5rem;
    height: 2.1875rem;
    border: none;
    border-radius: 0.3125rem;
    background-color: #999999;
    color: #fff;
    padding: 0.5rem 1rem; 
    text-decoration: none;
}
</style>