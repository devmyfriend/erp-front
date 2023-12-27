<template>
  <h1 class="mb-4 text-start">
    {{ tablaNombre }}
  </h1>    
  
  <div class="contComp p-0 pb-4">
      <div class="w-100 d-flex justify-content-between pt-4">
        <txtbuscador></txtbuscador>
        <btNuevo class="btNuevo"></btNuevo>
      </div>

      <div class="table-responsive">  
      <table class="table table-bordered border-2 border-dark rounded text-start">
            <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre oficial</th>
                  <th>RFC</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th class="Acciones text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in lista" :key="item.EntidadNegocioId">
                    <td class="fila1">{{ item.EntidadNegocioId }}</td>
                    <td class="fila2">{{ item.NombreOficial }}</td>
                    <td clasS="fila3">{{ item.RFC }}</td>
                    <td class="fila4">{{ item.Direccion }}</td>
                    <td class="fila5" >{{ item.NumeroTelefonico }}</td>
                    <td class="Acciones text-center"> 
                      <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                      <a class="mx-2" ><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                    </td>
            </tr>
            </tbody>
        </table>
      </div>
      <Paginador :pagina="pagina" :lista="lista" @nuevaPagina="nuevaPagina" @nuevaLista="nuevaLista"/>
      <div class="botones">
        <button class="btn btn-save me-4">Guardar</button>
        <button class="btn btn-danger me-4">Cancelar</button>
      </div>
    </div>
  </template>
        
  <script>
  import { ref, onBeforeMount } from 'vue'
  import txtbuscador from '@/shared/txtbuscador.vue';
  import Paginador from '@/shared/paginador.vue';
  import  btNuevo from '@/shared/btNuevo.vue';
  
  const { useEmpresas } = require('../modules/empresas/store/empresas')
  
  export default {
  
    name: 'tabla',
    setup( props ){
      let tablaNombre = ref('Empresas');
      let lista = ref( [] );
      let pagina = ref( [] );
      let empPropietarias = ref( true );
      
      const store = useEmpresas();
      onBeforeMount(() => {
          store.cargarListado().then(() => {
            lista.value = store.getListado;
            pagina.value.pagAct = store.getPaginas.pagAct;
            pagina.value.pagMax = store.getPaginas.pagMax;
            pagina.value.cantidad = store.getPaginas.cantidad;
            pagina.value.longitud = store.getPaginas.longitud;
          })
      })
      return{
        tablaNombre,
        lista,
        pagina,
        empPropietarias
      }
    },
    components: {
      txtbuscador,
      Paginador,
      btNuevo,
    },
    methods: {
      nuevaPagina(pagina){
        this.pagina.pagAct = pagina;
      },
      nuevaLista(lista){
        this.lista = lista;
      }
    }
  }
  </script>

  <style lang="scss" scoped>
  .contComp{
    background-color: #D9D9D9;
  }
    .btNuevo{
      margin-right: 1rem;
    }
    .botones{
      margin-top: 2rem;
    }
    table{
      max-width: 100%;
      margin: 0;
    }

    .table-responsive {
      overflow-x: auto;
      margin-left: 1rem;
      margin-right: 1rem;   
    }   

    
    th, td{
      padding: 0.25rem 0.5rem; 
      word-break: break-all;
    }
    th{
      background-color: #999999 !important;
      color: #FFFFFF !important;
      height: 2.1875rem;
      font-size: 0.75rem;
      font-weight: normal; 
    }
    td{
      background-color: #FFFFFF !important;
      color: #CBCBCB !important;
      font-size: 0.75rem !important;
      height: 2.1875rem;
    }
    .fila1{
      width: 5%;
    }
    .fila2{
      width: 30%;
    }
    .fila3{
      width: 10%;
    }
    .fila4{
      width: 35%;
    }
    .fila5, .Acciones{
      width: 10%;
    }

    .paginacion{
      width: 40%;
    }
  
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  
  </style>