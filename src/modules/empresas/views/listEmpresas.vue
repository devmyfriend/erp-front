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
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const { useEmpresas } =require('../store/empresas.js');
const store = useEmpresas();

const ListadoEmpresas = ref([]);
const encabezados = ref([]);

const paginado = ref(15);
const acciones = ref(2);
const pBusqueda = ref(false);
const pAccion = ref(false);

onMounted(() => {
  store.cargarEmpresas().then(() =>{
    ajustarListado();
  })
});

function esperarBusqueda(){
  pBusqueda.value = !pBusqueda.value;
  if(pBusqueda.value){
    ajustarListado();
  }
}
function esperarAccion(opc, res){
  if(res != false){
    pAccion.value = true;
    if(opc === 1){
      router.push({name: 'formulario', params: {id: res.EntidadNegocioId}});
    }else if(opc === 2){
      Swal.fire({
          title: "Eliminar empresa",
          text: "¿Realmente quieres eliminar la empresa?",
          icon: "question",
          showDenyButton: true,
          confirmButtonText: "Eliminar",
          denyButtonText: `No eliminar`,
        }).then((result) => {
          if (result.isConfirmed) {
            const body = {
              EntidadNegocioId: res.EntidadNegocioId,
              BorradoPor: 1
            }
            store.borrarEmpresa(body).then((res) => {
              if(res){
                ajustarListado();
                Swal.fire('Empresa eliminada', '', 'success');
              }
            });
          }
        });
    }
  }else{
    pAccion.value = false;
  }
}
async function ajustarListado(){
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
    encabezados.value = Object.keys(ListadoEmpresas.value[0]);
    return ListadoEmpresas.value;
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
