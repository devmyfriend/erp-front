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
                <tr v-for="item in data" :key="item.id">
                    <td >{{ item.id }}</td>
                    <td >{{ item.nombre }}</td>
                    <td >{{ item.rfc }}</td>
                    <td >{{ item.direccion }}</td>
                    <td >{{ item.telefono }}</td>
                    <td class="Acciones text-center"> 
                      <a href="#/tabla" class="mx-2"><img src="@/assets/img/edit.svg" alt="Editar"></a>
                      <a href="#/tabla" class="mx-2" ><img src="@/assets/img/trash.svg" alt="Borrar"></a>
                    </td>
            </tr>
            </tbody>
        </table>
      </div>
      <Paginador/>
    </div>
  </template>
    
  <script>
  import { ref} from 'vue';
  import txtbuscador from '@/shared/txtbuscador.vue';
  import Paginador from '@/shared/paginador.vue';
  import  btNuevo from '@/shared/btNuevo.vue';

  export default {
    name: 'tablaGeneral',
    setup() {
      let data = ref([
        {
          id: 1,  
          nombre: 'Empresa Constructora Innovadora S.A. de C.V.',
          rfc: 'ECI150510',
          direccion: 'Direccion 01',
          telefono: '9982334455',
        }, 
        {
          id: 2,
          nombre: 'Consultoría Digital Avanzada S.A.P.I. de C.V.',
          rfc: 'CDA120928',
          direccion: 'Direccion 02',
          telefono: '9987293648',
        },
        {
          id: 3,
          nombre: 'Distribuidora de Tecnología Integral S. de R.L. de C.V.',
          rfc: 'DTI180203',
          direccion: 'Direccion 03',
          telefono: '9945678901',
        },
        {
          id: 4,
          nombre: 'Servicios Médicos Especializados Global Health S.A. de C.V.',
          rfc: 'SME100715',
          direccion: 'Direccion 04',
          telefono: '9982674562',
        },
        {
          id: 5,
          nombre: 'Comercializadora de Productos Innovadores S.A. de C.V.',
          rfc: 'CPI161220',
          direccion: 'Direccion 05',
          telefono: '9983764521',
        },{
          id: 6,  
          nombre: 'Empresa Constructora Innovadora S.A. de C.V.',
          rfc: 'ECI150510',
          direccion: 'Direccion 01',
          telefono: '9982334455',
        }
      ]);
      let tablaNombre = ref('Empresas');

      return {
        data,
        tablaNombre,
      };
    },
    components: {
      txtbuscador,
      Paginador,
      btNuevo,
    },
  };
  </script>
    
  <style lang="scss" scoped>
  .contComp{
    background-color: #D9D9D9;
  }
    .btNuevo{
      margin-right: 1rem;
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
    