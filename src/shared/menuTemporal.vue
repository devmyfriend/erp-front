<template>
    <div>
        <h1> Menú temporal de los módulos del sistema </h1>

        <div class="listado">
            <ul>
                <li v-for="(item, index) in Menus" :key="index" >
                
                    <router-link :to="{ name: item.name}">
                        <p>{{ item.titulo }}</p>
                    </router-link>
    
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const Menus = ref([]);

Menus.value = [
    { name: 'Empresas', titulo: 'Empresas'},
    { name: 'codigoPostal', titulo: 'Codigos Postales'},
    { name: 'monedas', titulo: 'Monedas'},
    { name: 'comprobantes', titulo: 'Comprobantes'},
    { name: 'cfdi', titulo: 'Usos de CFDi'},
    { name: 'impuestos', titulo: 'Tipos de Impuestos'},
    { name: 'regimenFiscal', titulo: 'Regimenes Fiscales'},
    { name: 'formasPago', titulo: 'Formas de Pago'},
    { name: 'login', titulo: 'Inicio de sesión'},
]

</script>

<style scoped>
.listado{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #999999;
}
.listado ul {
    list-style: none;
    padding: 0;
    text-decoration: none;
}

p {
    text-decoration: none;
    color: black;
    font-weight: bold;
    text-decoration-line: none;
}

</style>