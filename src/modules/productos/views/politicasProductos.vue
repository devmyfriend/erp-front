<script setup>
import { ref } from 'vue'
import ventanas from '../components/ventanas.vue'
import { useRoute } from 'vue-router';
const route = useRoute();
const tipoProducto = ref('Suscripciones');
const idProducto = ref( parseInt(route.params.id) || 0);
const btActivo = ref(5);
console.log('idProducto', idProducto.value);
</script>

<template>
    <header>
        <h1> Productos: {{ idProducto }} - {{ tipoProducto }} </h1>
    </header>
    <div class="contenedor">
        <div class="contenido">
            <div class="ventanas">
                <ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :idProducto="idProducto"/>
              </div>
        </div>
    </div>
</template>

<style scoped>
.contenedor {
    background-color: #D9D9D9;
    width: 100%;
    height: 51rem;
}
header{
    margin-bottom: 1.5rem;
}
h1{
    text-align: start;
    color: #000;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}
.contenido{
    width: auto;
    margin: 1rem;
}

.ventanas{
    display: flex;
    width: 100%;
    height: 2.5rem;
    overflow: hidden;
    align-items: flex-start;
    margin-left: -1rem;
}
button{
    margin: 0rem;
    padding: 0rem;
    border: 1px solid #999999;
    padding: 0.25rem;
    width: 15rem;
}

.btActivo{
    background-color: #D9D9D9;
    border: 2px solid #999999;
    border-bottom: none;
    border-right: none;
}
</style>