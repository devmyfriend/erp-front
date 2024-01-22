<template>
  <h1 class="mb-4 text-start">
    {{ tablaNombre }}
  </h1>    
  
  <div class="contComp p-0 pb-4">
      <div class="w-100 d-flex justify-content-between pt-4">
        <txtbuscador></txtbuscador>
        <btNuevo class="btNuevo"></btNuevo>
      </div>
          <TablaInfinita :Lista="lista"></TablaInfinita>
      <div class="botones">
        <button class="btn btn-save me-4">Guardar</button>
        <button class="btn btn-danger me-4">Cancelar</button>
      </div>
    </div>
  </template>
        
  <script>
  import { ref, onBeforeMount, getCurrentInstance } from 'vue'
  import txtbuscador from '@/shared/txtbuscador.vue';
  import btNuevo from '@/shared/btNuevo.vue';
  import TablaInfinita from './tablaInfinita.vue';
  
  const { useEmpresas } = require('../modules/empresas/store/empresas')
  
  export default {
  
    name: 'tabla',
    props: {
      esPropietaria: {
        type: Boolean,
        required: true
      }
    },
    setup( props, { root } ){
      let tablaNombre = ref('Empresas');
      let lista = ref( [] );
      let pagina = ref( [] );

      const store = useEmpresas();

      onBeforeMount(() => {

        const instance = getCurrentInstance();
        const router = instance.appContext.config.globalProperties.$router;
        const esPropietaria = router.currentRoute.value.params.esPropietaria === 'true';
        store.setPropietaria(esPropietaria);

        store.cargarEmpresas().then(() => {
            lista.value = store.getListado;
/*             console.log("lista desde tabla: " + JSON.stringify(lista.value[0].NombreOficial));*/            pagina.value.PaginaActual = store.getPaginas.PaginaActual;
            pagina.value.PaginaMaxima = store.getPaginas.PaginaMaxima;
            pagina.value.cantidad = store.getPaginas.Paginado;
            pagina.value.longitud = store.getPaginas.Total;
        })  
      })
      return{
        tablaNombre,
        lista,
        pagina,
        
      }
    },
    components: {
    txtbuscador,
    btNuevo,
    TablaInfinita,
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