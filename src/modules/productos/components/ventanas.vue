<template>
    <div class="ventanas">
        <router-link :class="{btActivo: btActivo === 1}" :to=" { name: 'listadoProductos', params: { tipo: tipoProducto}}"> Listado </router-link>
        <router-link :class="{btActivo: btActivo === 2}" :to=" { name: 'formularioProducto', params: { tipo: tipoProducto, id: idProducto}}"> Formulario </router-link>
        <router-link :class="{btActivo: btActivo === 3}" :to=" { name: 'almacenProducto', params: { tipo: tipoProducto, id: idProducto } }"> Productos por Almacén </router-link>
        <router-link v-if="tipoProducto == 'Combos'" :class="{btActivo: btActivo === 4}" :to=" { name: 'detalleCombo', params: { id: idProducto } }"> Agregar Productos </router-link>
        <router-link v-if="tipoProducto == 'Suscripciones'" :class="{btActivo: btActivo === 5}" :to=" { name: 'politicasProducto', params: { id: idProducto } }"> Políticas </router-link>
        <router-link :class="{btActivo: btActivo === 6}" :to=" { name: 'cantidadAlmacen', params: { tipo: tipoProducto, id: idProducto } }"> Cantidad por Almacén </router-link>

        <p> El tipo es:  {{ tipoProducto }}, el id es: {{ idProducto }}, y por último, el btActivo es: {{ btActivo }} </p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({ 
    tipoProducto: {
        type: String,
        default: ''
    },
    idProducto: {
        type: Number,
        default: 0
    },
    btActivo: {
        type: Number,
        default: 1
    },
})

const tipoProducto = computed(() => {
    return props.tipoProducto ? props.tipoProducto : '';
});
const idProducto = computed(() => {
    return props.idProducto ? props.idProducto : 0;
});
const btActivo = computed(() => {
    return props.btActivo ? props.btActivo : 0;
});
</script>

<style scoped>
.ventanas{
    display: flex;
    width: 100%;
    height: 2.5rem;
    overflow: hidden;
    align-items: flex-start;
    margin-left: -1rem;
}
a{
    margin: 0rem;
    padding: 0rem;
    border: 1px solid #999999;
    padding: 0.25rem;
    width: 15rem;
    text-decoration: none;
    color: #fff;
    background-color: #99999993;
}
.btActivo{
    background-color: #D9D9D9;
    color: #757474;
    font-weight: bold;
    border: 2px solid #999999;
    border-bottom: none;
    border-right: none;
}
</style>