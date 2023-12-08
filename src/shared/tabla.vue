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
                <tr v-for="item in listaEmpresas" :key="item.EntidadNegocioId">
                    <td >{{ item.EntidadNegocioId }}</td>
                    <td >{{ item.NombreOficial }}</td>
                    <td >{{ item.RFC }}</td>
                    <td >{{ item.Direccion }}</td>
                    <td >{{ item.NumeroTelefonico }}</td>
                    <td class="Acciones text-center"> 
                      <a class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                      <a class="mx-2" ><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                    </td>
            </tr>
            </tbody>
        </table>
      </div>
      <Paginador :registros="listaEmpresas"/>

      <div class="botones">
        <button class="btn btn-save me-4"> Guardar</button>
        <button class="btn btn-danger me-4">Cancelar</button>
      </div>
    
    </div>
  </template>
        
  <script>
  import { ref, computed, onMounted } from 'vue'
  import txtbuscador from '@/shared/txtbuscador.vue';
  import Paginador from '@/shared/paginador.vue';
  import  btNuevo from '@/shared/btNuevo.vue';
  
  const { useEmpresa } = require('../modules/empresas/store/empresa')
  
  export default {
  
    name: 'tabla',
  
    setup( props ){
      const listaEmpresas      = ref( [] )
      let tablaNombre = ref('Empresas');

      
        const store = useEmpresa()
  
        onMounted(() => {
            store.cargarListadoEmpresas().then(() => {
              listaEmpresas.value = store.listaListadoEmpresas
            })
        })
  
        return{
            listaEmpresas,
            tablaNombre,
        }
  
    },
    components: {
      txtbuscador,
      Paginador,
      btNuevo,
    },
  
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
      font-size: 0.75rem;
      height: 2.1875rem;
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
    