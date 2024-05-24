<script setup>
import { ref } from 'vue';

const nombresModulo = ref([]);
const rutasModulo = ref([]);
const props = defineProps({
    tipoUsuario: {
        type: Number,
        default: 1
    },
    valorVentana: {
        type: Number,
        default: 1
    },
})

</script>

<template>
  <div class="ventanas">
    <router-link :to=" { name: 'listadoUsuarios', params: { ventana: 1, tipo: tipoUsuario}}" :class="{ btActivo: valorVentana == 1}"> Listado Usuarios </router-link>
    <router-link :to=" { name: 'tipoUsuario', params: { ventana: 2 , tipo: tipoUsuario}}" :class="{ btActivo: valorVentana == 2}"> Tipo de Usuario </router-link>
    <router-link :to=" { name: 'tipoUsuarioEmpresa', params: { ventana: 3, tipo: tipoUsuario}}" :class="{ btActivo: valorVentana == 3}"> Tipo de Usuario - Empresa </router-link>
    <router-link :to=" { name: 'tipoUsuarioSucursal', params: { ventana: 4, tipo: tipoUsuario}}" :class="{ btActivo: valorVentana == 4}"> Tipo de Usuario - Sucursal </router-link>
    <router-link :to=" { name: 'usuarioEmpresa', params: { ventana: 5, usuario: tipoUsuario}}" :class="{ btActivo: valorVentana == 5}"> Usuario por Empresa </router-link>
    <router-link :to=" { name: 'usuarioSucursal', params: { ventana: 6, usuario: tipoUsuario}}" :class="{ btActivo: valorVentana == 6}"> Usuario por Sucursal </router-link>
    <router-link :to=" { name: 'usuarioAlmacen', params: { ventana: 7, usuario: tipoUsuario}}" :class="{ btActivo: valorVentana == 7}"> Usuario por Almacén </router-link>
    <router-link :to=" { name: 'listPermisos', params: { ventana: 8}}" :class="{ btActivo: valorVentana == 8}"> Permisos </router-link>
    <router-link :to=" { name: 'permisosTipoUsuario', params: { ventana: 9, tipo: tipoUsuario}}" :class="{ btActivo: valorVentana == 9}"> Permiso por Tipo de Usuario </router-link>
  </div>
</template>

<style scoped>

.ventanas{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  height: 2rem;
  border-radius: 0.5rem;
}

a{
    margin: 0rem;
    padding: 0rem;
    border: 1px solid #000;
    border-radius: 0rem 0rem 0.5rem 0.5rem;
    padding: 0.25rem;
    flex-grow: 1;
    

    text-decoration: none;
    color: #fff;
    background-color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    cursor: pointer;
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
    border-bottom: none;
}
.btActivo:last-of-type{
    border-right: none;
}
</style>