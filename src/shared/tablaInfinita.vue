<template>
  <div>
    <ScrollInfinito class="td" :Lista="Lista" @UpdateScroll="loadItems">
      <table class="table table-bordered border-2 border-dark rounded text-start">
        <thead>
          <tr>
            <th v-for="(encabezado, indice) in encabezados" :key="indice">
              {{ encabezado }}
            </th>
            <th>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.EntidadNegocioId">
            <td v-for="(value, index) in Object.values(item).slice(1)" :key="index" class="fila">{{ value }}</td>
            <td class="Acciones text-center">
              <a class="mx-2 icono" @click="console.log('Actualizar ID: ' + item.EntidadNegocioId)">
                <img src="@/assets/img/edit.svg" alt="Editar">
              </a>
              <a class="mx-2 icono" @click="console.log('Borrar ID: ' + item.EntidadNegocioId)">
                <img src="@/assets/img/trash.svg" alt="Borrar">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </ScrollInfinito>
  </div>
</template>

<script setup>
import ScrollInfinito from './ScrollInfinito.vue';
import { ref, onMounted, watch, toRefs } from 'vue';
const { useEmpresas } = require('../modules/empresas/store/empresas')

const store = useEmpresas();

const encabezados = ref([]);
const items = ref([]);
const limit = ref(4);
const offset = ref(0);
const ListadoMostrado = ref([]);

const Lista = ref([]);

const props = defineProps(['busquedaActiva']);
const emits = defineEmits(['DesactivarBusqueda']);
const { busquedaActiva: busquedaActivaLocal } = toRefs(props);

const getNewData = () => {
  const parte = ListadoMostrado.value.slice(offset.value, offset.value + limit.value);
  
  if ( (offset.value + limit.value) > ListadoMostrado.value.length) {
    offset.value = ListadoMostrado.value.length;
  }else{
    offset.value = offset.value + limit.value;
  }

  return parte;
};

const loadItems = async () => {
  if (ListadoMostrado.value.length > 0) {
  /* if (limit.value <= ListadoMostrado.value.length) { */
    const newItems = await getNewData();
    items.value = [...items.value, ...newItems];
  }
  if (offset.value >= ListadoMostrado.value.length) {
    return;
  }
};

onMounted(() => {
  store.cargarEmpresas().then(() => {
    Lista.value = store.getListado;
  });
});

watch(Lista, () => {
  ListadoMostrado.value = Lista.value.map((item) =>{
    const nuevoItem = {
      EntidadNegocioId: item.EntidadNegocioId,
      NombreOficial: item.NombreOficial,
      RFC: item.RFC,
      Direccion: item.Calle + ', ' + item.NumeroExt + ' y ' + item.NumeroInt + ', '  + item.CodigoPostal + '. ' + item.ClaveEstado + ', ' + item.ClavePais,
    };
    return nuevoItem;
  })

  encabezados.value = Object.keys(ListadoMostrado.value[0]).filter((campo, indice) => indice > 0);
  if(offset.value === 0){
    loadItems();
  }
});

watch(busquedaActivaLocal, () => {
  if (busquedaActivaLocal.value) {
    busquedaActivaLocal.value = false;
    emits('DesactivarBusqueda', busquedaActivaLocal.value);
    Lista.value = store.getListado;

    items.value = [];
    offset.value = 0;

  }
});

</script>

<style lang="scss" scoped>

@import '../styles/variables.scss';

.icono {
  width: 1.5rem;
  cursor: pointer;
}

.contenedor {
  align-items: right;
  width: 40.93rem;


  padding: 1.5rem 1.5rem 0rem 1.5rem;
  text-align: left;

}

h1 {

  font-size: 2rem;
  text-align: left;
}
h5,
h4 {
  color: black;

}
.td tr td {
  width: 10%;
}
th, td{
  padding: 0.5rem 0.5rem; 
  word-break: break-all;
  font-size: 0.75rem;
  height: 2.1875rem;
}
th{
  background-color: #999999;
  color: #FFFFFF;
  font-weight: normal; 
  text-align: center;
  vertical-align: middle;
}
td{
  background-color: #FFFFFF;
  color: #999999;
}


</style>