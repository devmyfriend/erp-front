<template>
  <div class="tablaInfinita">
    <div class="tablaContainer" ref="tablaContainer" @scroll="esperarScroll" :style="{ height: heightTabla + 'px' }">
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in encabezados.slice(1)" :key="index" :style="{ width: columnasWidth + '%' }" :class="{ small: isSmall }">{{ header }}</th>
            <th v-if="props.acciones != 0" :style="{ width: '10%' }" :class="{ small: isSmall }"> Acciones</th>
          </tr>
        </thead>
        <tbody ref="contenidoREF">
          <tr v-if="registrosFinales.length >= paginado" @click="IrAlFinal" :class="{td1: index % 2 == 0, td2: index % 2 != 0}"> <td :colspan="cantidadCols + 1" style="cursor: pointer;" > Regresar hasta el final</td></tr>
          <tr v-for="(item, index) in registrosFinales" :key="index" :class="{td1: index % 2 == 0, td2: index % 2 != 0}">
            <template v-for="(value, key, columna) in item">
              <!-- <td v-if="columna >= 1" :key="key" :style="{ width: columnasWidth + '%' }">{{ value }}</td> -->
              <td v-if="columna >= 1" :key="key" :style="{ width: columnasWidth + '%' }">
                {{ typeof value === 'boolean' ? (value ? 'Si' : 'No') : 
                  (typeof value === 'number' && (value === 0 || value === 1) ? 
                    (value === 1 ? 'Si' : 'No') : value) }}
              </td>
            </template>
            <td v-if="props.acciones != 0" class="accionesTabla">
              <img 
              src="../assets/img/edit.svg"
              alt="Editar"
              class="Acciones me-2"
              :class="{ small: isSmall }"
              @click="activarAcciones(1, item)"> 
              <img 
              src="../assets/img/trash.svg"
              alt="Eliminar"
              class="Acciones ms-2"
              :class="{ small: isSmall }"
              v-if="props.acciones == 2"
              @click="activarAcciones(2, item)">
            </td>
          </tr>
          <tr v-if="registrosFinales.length >= paginado" @click="tablaContainer.scrollTop = 0" :class="{td1: index % 2 == 0, td2: index % 2 != 0}"> <td :colspan="cantidadCols + 1" style="cursor: pointer;"> Regresar al inicio </td> </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  encabezados: {
    type: Array,
    default: ['Nombre', 'Edad', 'País']
  },
  listado: {
    type: Array,
    default: []
  },
  paginado: {
    type: Number,
    default: 3
  },
  acciones: {
    type: Number,
    default: 0 //0 sin acciones, 1 solo editar, 2 eliminar y editar
  },
    /* Flags */
  pBusqueda: {
    type: Boolean,
    default: false
  },
  pAccion: {
    type: Boolean,
    default: false
  },
  pSaveAll: {
    type: Boolean,
    default: false
  },
    /* Registro temporal x Input */
  pRegistroNuevo: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits( ['eAccion', 'eBusqueda','eRegistroNuevo']);

const listadoFinal = ref( [] );
const paginaActual = ref(1);
const registrosFinales = ref([]);
const heightTabla = ref( (props.paginado * 32) + 38 ); //Se calcula la altura de la tabla según la cantidad de registros máxima ([Paginado] * [Height_TD] + [Height_TH])
const tablaContainer = ref(null);
const columnasWidth = ref(100);
const isSmall = ref(false);
const contenidoREF = ref(null);
const cantidadCols = ref(1);

const IrAlFinal = () => {
  registrosFinales.value = listadoFinal.value;
  setTimeout(() => {
    tablaContainer.value.scrollTop = tablaContainer.value.scrollHeight;
  }, 50);
};

const cargarMas = () => {
  const start = (paginaActual.value - 1) * props.paginado;
  const end = start + props.paginado;
  registrosFinales.value.push(...listadoFinal.value.slice(start, end));
  paginaActual.value++;
};

const esperarScroll = (event) => {
  const element = event.target;
  if (element.scrollHeight - element.scrollTop - 10 <= element.clientHeight) {
    cargarMas();
  }
};

function activarAcciones(opc, registro){
  tablaContainer.value.scrollTop = 0;
  emit ('eAccion', opc, registro)
}

watch(() => props.listado, (newValue, oldValue) => {
  registrosFinales.value = [];
  listadoFinal.value = newValue;
  paginaActual.value = 1;
  if (props.pBusqueda) {
    emit('eBusqueda');
    tablaContainer.value.scrollTop = 0;
  }else if (props.pAccion) {
    emit('eAccion', false);
    tablaContainer.value.scrollTop = 0;
  }else if (props.pRegistroNuevo) {
    emit('eRegistroNuevo', false);
    tablaContainer.value.scrollTop = 0;
  }
  
  cargarMas();
  widthCol();
},{deep: true});

function widthCol(){
  cantidadCols.value = 0;
  if (props.acciones != 0){
    cantidadCols.value = props.encabezados.length - 1;
    columnasWidth.value = (90/cantidadCols.value);
  }else{
    cantidadCols.value = props.encabezados.length -1;
    columnasWidth.value = (100/cantidadCols.value);
  }
  if (tablaContainer.value.offsetWidth <= 650){
    tablaContainer.value.style.fontSize = '0.8rem';
    isSmall.value = true;
    heightTabla.value = ( (props.paginado * 32) + 26 );
  }
}

watch(() => props.pBusqueda, () => {
  console.log('[Tabla] pBusqueda: ', props.pBusqueda);
});
</script>

<style scoped>

@import url('../styles/tablaListado.css');

.tablaInfinita {
  text-align: start;
  width: 100%;
}

.tablaContainer {
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.tablaContainer::-webkit-scrollbar {
  display: none
}

table {
  width: 100%;
  border-collapse: collapse;
  border: none;
}

/* td, th {
  border: 1px solid #000;
  padding: 0.25rem 0.5rem;
  margin: 0rem 0.25rem 0rem 0.25rem;
} */

th {
  background-color: #353535;
  color: #fff;
  height: 1.5rem;
}
td{
  color: #000;
  height: 2rem;
  padding: 0.5rem;
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
button {
  margin-top: 1.25rem;
}
.Acciones {
  height: 1rem;
  cursor: pointer;
}
th, .Acciones{
  text-align: center;
}
.accionesTabla{
  width: 10%;
  text-align: center;
}
.small{
  height: 1.5rem;
  width: 1rem;
  margin: 0rem !important;
}
</style>
