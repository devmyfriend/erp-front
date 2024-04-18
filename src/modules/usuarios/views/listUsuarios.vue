<script setup>
import buscadorUsuarios from '../components/buscadorUsuarios.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();

const esperarBusqueda = (e) => {
  console.log(e);
}

const ListadoUsuarios = ref();
const TipoUsuario = ref( route.params.tipoUsuario );
const usuario = ref({
  Nombre: '',
  ApellidoPaterno: '',
  ApellidoMaterno: '',
});
function test () {
  console.log('test: ');
  console.log(TipoUsuario.value);  
}
</script>

<template>
  <header>
    <h1>Usuarios</h1>
  </header>
  <div class="contenedorPadre">
    <div class="contenedorFrm">
      <div class="contenedorBuscador">
        <buscadorUsuarios 
          @eBusqueda="esperarBusqueda"
        />
      </div>
      <div class="formulario">
        <input class="inpNombre" type="text" placeholder="Nombre Usuario" v-model="usuario.Nombre">
      </div>
    </div>    
  </div>
</template>

<style scoped>
.general-enter-active {
    animation: fadeIn 0.75s;
}
.general-leave-active {
    animation: fadeOut 0.25s;
}

.contenedorPadre {
    background-color: #fff;
    width: 100%;
    min-height: calc(100vh - 11rem);
    overflow: hidden;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}
header{
    margin-bottom: 1.5rem;
}
h1{
    text-align: start;
    color: #fff;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-transform: capitalize;
}
h2{
    text-align: start;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;

}

.contenedorFrm{
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: red;
}

.formulario{
    display: flex;
    width: 100%;
}

.tablaContainer{
    display: flex;
    height: 31rem;
    min-width: 31rem;
    margin-top: 1.5rem;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.tablaContainer::-webkit-scrollbar {
    display: none;
}
table{
    width: 100%;
    border-collapse: collapse;
    border: none;
    height: max-content;
    max-height: 30.375rem;
}
th{
    background-color: #353535;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    height: 3rem;
    max-height: 3rem;
}
td{
    background-color: #d9d9d9;
    color: #000;
    font-size: 1rem;
    height: 2.5rem;
    max-height: 2.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.col-xs{
    width: 10rem;
    max-width: 10rem;
}
.col-s{
    width: 15rem;
    max-width: 15rem;
}
.col-auto{
    width: auto;
}
.col-start{
    text-align: start;
    word-break: break-all;
    padding-left: 1rem;
}
td:not(:last-child){
    border-right: 0.125rem solid #fff;
}
thead tr, tbody tr:not(:last-child){
    border-bottom: 0.25rem solid #fff;
}
th:first-child, td:first-child{
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}
th:last-child, td:last-child{
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}

.inpNombre{
  width: 29rem;
  height: 2.1875rem;
  color: #000;
  border: 1px solid #D9D9D9;
  border-radius: 0.3125rem;
  padding-left: 1rem;
}
</style>