<template>
    <div>
        <h1> Listado </h1>
    </div>

    <ul>
        <li><router-link :to="{name: 'codigoPostal'}"> cp </router-link></li>
        <li><router-link :to="{name: 'formasPago'}"> Formas de Pago</router-link></li>
        <li><router-link :to="{name: 'comprobantes'}"> Comprobantes </router-link></li>
        <li><router-link :to="{name: 'impuestos'}"> Impuestos </router-link></li>
        <li><router-link :to="{name: 'monedas'}"> Monedas </router-link></li>
        <li><router-link :to="{name: 'regimenFiscal'}"> Regimen Fiscal </router-link></li>
        <li><router-link :to="{name: 'cfdi'}"> CFDi </router-link></li>
    </ul>
</template>

<script setup>
</script>

<style scoped>
</style>