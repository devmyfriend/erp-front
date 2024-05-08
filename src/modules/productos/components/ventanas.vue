<template>
    <div class="ventanas">
        <div class="capas">
        <router-link :class="{btActivo: btActivo === 1}" :to=" { name: 'listadoProductos', params: { tipo: tipoProducto}}"> Listado </router-link>
        <router-link :class="{btActivo: btActivo === 2}" :to=" { name: 'formularioProducto', params: { tipo: tipoProducto, id: codigoProducto}}"> Formulario </router-link>
        <router-link v-if="tipoProducto != 'servicio' && tipoProducto !='suscripcion'" :class="{btActivo: btActivo === 3}" :to=" { name: 'almacenProducto', params: { tipo: tipoProducto, id: codigoProducto } }"> Productos por Almacén </router-link>
        <router-link v-if="tipoProducto == 'combo'" :class="{btActivo: btActivo === 4}" :to=" { name: 'detalleCombo', params: { id: codigoProducto } }"> Agregar Productos </router-link>
        <router-link v-if="tipoProducto == 'suscripcion'" :class="{btActivo: btActivo === 5}" :to=" { name: 'politicasProducto', params: { id: codigoProducto } }"> Políticas </router-link>
        <router-link :class="{btActivo: btActivo === 6}" :to=" { name: 'cantidadAlmacen', params: { tipo: tipoProducto, id: codigoProducto } }"> Cantidad por Almacén </router-link>
        <router-link :class="{btActivo: btActivo === 7}" :to=" { name: 'proveedoresProducto', params: { tipo: tipoProducto, id: codigoProducto } }"> Proveedores </router-link>
        </div>
        <div class="cerrar" v-if="btActivo != 1">
            <router-link 
            :class="{btActivo: btActivo === 1}" 
            :to=" { name: 'listadoProductos', 
            params: { tipo: tipoProducto}}">
                 <img class="iconoCerrar" src="@/assets/img/Close.svg" alt="Cerar Imagen"> 
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({ 
    tipoProducto: {
        type: Number,
        default: 0
    },
    codigoProducto: {
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
const codigoProducto = computed(() => {
    return props.codigoProducto ? props.codigoProducto : 0;
});
const btActivo = computed(() => {
    return props.btActivo ? props.btActivo : 0;
});
</script>

<style scoped>

.ventanas{
    display: grid;
    grid-template-columns: 85% 5%;
    gap: 10%;
    height: 2.5rem;
    justify-content: space-between;
}
.capas{
    display: flex;
    width: 100%;
    overflow: hidden;
    align-items: flex-start;
}
a{
    margin: 0rem;
    padding: 0rem;
    border: 1px solid #000;
    border-radius: 0rem 0rem 0.5rem 0.5rem;
    padding: 0.25rem;
    width: 15rem;
    text-decoration: none;
    color: #fff;
    background-color: #999;
}
a:first-child{
    border-left: none;
    border-bottom-left-radius: 0rem;
}
a:last-child{
    border-right: 1px solid #000;
    border-bottom-right-radius: 0rem;
}
.btActivo{
    background-color: #fff;
    color: #000;
    font-weight: bold;
    border: none;
    border-top: 1px solid #000;
}
.cerrar{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: none;
}
.cerrar a{
    border: none;
    background-color:  transparent;
}
.iconoCerrar{
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
}
</style>