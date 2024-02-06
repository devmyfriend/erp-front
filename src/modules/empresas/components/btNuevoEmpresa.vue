<template>
    <div>
        <router-link :to="{name: 'formulario'}" class="btNuevo">Nueva Empresa</router-link>
    </div>
</template>

<script setup>
</script>

<style>
.btNuevo{
    width: 9.375rem;
    height: 2.1875rem;
    border: none;
    border-radius: 0.3125rem;
    background-color: #999999;
    color: #fff;
    padding: 0.5rem 1rem; 
    text-decoration: none;
}
</style>