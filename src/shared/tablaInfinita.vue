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

<!-- <template>
    <ScrollInfinito class="td" @UpdateScroll="loadItems">
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
            <td class="fila1">{{ item.NombreOficial }}</td>
            <td class="fila2">{{ item.RFC }}</td>
            <td class="fila3">{{ item.Telefono }}</td>
            <td class="fila4">{{ item.Direccion }}</td>
            <td class="Acciones text-center">
              <a class="mx-2 icono" @click="console.log('Actualizar ID: ' + item.EntidadNegocioId)"><img src="@/assets/img/edit.svg" alt="Editar"></a>
              <a class="mx-2 icono" @click="console.log('Borrar ID: ' + item.EntidadNegocioId)"><img src="@/assets/img/trash.svg" alt="Borrar"></a>          
            </td>
          </tr>
        </tbody>
      </table>
    </ScrollInfinito>
</template> -->

<script setup>
import ScrollInfinito from './ScrollInfinito.vue';
import { ref, defineProps, onMounted, watch } from 'vue';
const { useEmpresas } = require('../modules/empresas/store/empresas')

const store = useEmpresas();

const encabezados = ref([]);
const items = ref([]);
const limit = ref(7);
const offset = ref(0);
const ListadoMostrado = ref([]);

const Lista = ref([]);

const getNewData = () => {
  const parte = ListadoMostrado.value.slice(offset.value, offset.value + limit.value);
  offset.value = offset.value + limit.value;
  return parte;
};

const loadItems = async () => {
  console.log('Load items...');
  if (limit.value <= ListadoMostrado.value.length) {
    console.log('Cargando datos...');
    const newItems = await getNewData();
    items.value = [...items.value, ...newItems];
  }
  if (offset.value >= ListadoMostrado.value.length) {
    console.log('No hay más datos');
    return;
  }
  console.log('limite ' + limit.value + ' y el largo es: ' + ListadoMostrado.value.length );
};

onMounted(() => {
  store.cargarEmpresas().then(() => {
    Lista.value = store.getListado;
  });
});

watch(Lista, () => {
  console.log('Lista actualizada: ' + JSON.stringify(Lista.value[0]));
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
  
  console.log('Lista mostrada: ' + JSON.stringify(ListadoMostrado.value));
  console.log('[Encabezados]: ' + JSON.stringify(encabezados.value));
  loadItems();
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