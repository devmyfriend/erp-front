<script setup>
import { ref, onMounted } from 'vue'
import router from 'vue-router'
import ventanas from '../components/ventanas.vue'
import { useRoute } from 'vue-router';
const route = useRoute();

const btActivo = ref(1);
const tipoProducto = ref(route.params.tipo || 'Productos');
const idProducto = ref(0)

</script>

<template>
    <header>
        <h1> Productos </h1>
    </header>
    <div class="contenedor">
        <div class="ventanas">
            <ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :idProducto="idProducto"/>
        </div>

        <div class="contenido">
            <input type="number" min="0" max="99" v-model="idProducto">
            <select name="tipoProducto" id="tipoProducto" v-model="tipoProducto">
                <option value="Productos">Productos</option>
                <option value="Servicios">Servicios</option>
                <option value="Insumos">Insumos</option>
                <option value="Activos">Activos</option>
                <option value="Productos_Terminados">Productos Terminados</option>
                <option value="Productos_Terceros">Productos de Terceros</option>
                <option value="Suscripciones">Suscripciones</option>
                <option value="Combos">Combos</option>
            </select>
        </div>
    </div>
</template>

<style scoped>
.contenedor {
    background-color: #D9D9D9;
    width: 100%;
    height: 51rem;
    overflow: hidden;
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
</style>