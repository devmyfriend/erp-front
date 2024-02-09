<template>
  <h1> Empresas </h1>
  <div class="contenedor">
    <div class="formulario">
      <buscadorEmpresa @eBusqueda="esperarBusqueda"></buscadorEmpresa>
      <btNuevoEmpresa></btNuevoEmpresa>
    </div>
    <div class="tablaContainer">
      <TablaInfinita 
      :listado="ListadoEmpresas" :encabezados="encabezados" :paginado="paginado" :acciones="acciones" :pBusqueda="pBusqueda" :pAccion="pAccion"
      @eBusqueda="esperarBusqueda" @eAccion="esperarAccion"/>
    </div>
  </div>
</template>

<script setup>
import router from '@/router';
import btNuevoEmpresa from '../components/btNuevoEmpresa.vue';
import buscadorEmpresa from '../components/buscadorEmpresa.vue';
import TablaInfinita from '@/shared/sTablaInfinita.vue';
import { onMounted, ref, watch } from 'vue';
import Swal from 'sweetalert2';

const { useEmpresas } =require('../store/empresas.js');
const store = useEmpresas();

const ListadoEmpresas = ref([]);
const encabezados = ref(['EntidadNegocioId', 'Nombre Oficial', 'Nombre Comercial', 'RFC', 'Dirección']);

const paginado = ref(15);
const acciones = ref(2);
const pBusqueda = ref(false);
const pAccion = ref(false);

onMounted(() => {
  store.cargarEmpresas().then(() =>{
    ajustarListado();
  })
});

function esperarBusqueda(valor){
  pBusqueda.value = valor;
  if(pBusqueda.value){
    ajustarListado();
  }

}

function esperarAccion(opc, registroRecibido){
  pAccion.value = !pAccion.value;
  if(opc !== null){
    if(opc === 1){
      router.push({name: 'formulario', params: {id: registroRecibido.EntidadNegocioId}});
    } else if(opc === 2){
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, bórralo!'
      }).then((result) => {
        if (result.isConfirmed) {
          store.borrarEmpresa(registroRecibido.EntidadNegocioId).then(() => {
            ajustarListado();
            Swal.fire(
              'Borrado!',
              'El registro ha sido eliminado.',
              'success'
              )
          });
        }
      })
    } 
  }

}

function ajustarListado(){
  ListadoEmpresas.value = store.getListado
  ListadoEmpresas.value = ListadoEmpresas.value.map(empresa => {
    const Direccion = `${empresa.Pais}, ${empresa.Estado}, ${empresa.CodigoPostal}, Ext: ${empresa.NumeroExt}, Int: ${empresa.NumeroInt}, ${empresa.Localidad}, ${empresa.Colonia}`;
    return {
      EntidadNegocioId: empresa.EntidadNegocioId,
      NombreOficial: empresa.NombreOficial,
      NombreComercial: empresa.NombreComercial,
      RFC: empresa.RFC,
      Direccion: Direccion
    };
  });
}
</script>

<style>
h1 {
  text-align: start;
  color: #000;
  font-size: 1.75rem;
  font-weight: bold;
}
.contenedor {
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 100%;
  height: 100%;
  background-color: #D9D9D9;
}
.formulario {
  margin-top: 1.5rem;
  display: flex;
  
  vertical-align: middle;
  line-height: 2.1875rem;

  display: flex;
  justify-content: space-between;
  padding: 0 1.6rem;
  width: 100%;
}
.tablaContainer {
  margin: 0.8125rem;
}
</style>

<style>
h1 {
  text-align: start;
  color: #000;
  font-size: 1.75rem;
  font-weight: bold;
}
.contenedor {
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 100%;
  height: 100%;
  background-color: #D9D9D9;
}
.formulario {
  margin-top: 1.5rem;
  display: flex;
  
  vertical-align: middle;
  line-height: 2.1875rem;

  display: flex;
  justify-content: space-between;
  padding: 0 1.6rem;
  width: 100%;
}
.tablaContainer {
  margin: 0.8125rem;
}
</style>
