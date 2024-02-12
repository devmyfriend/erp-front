<template>
  <div class="tablaInfinita">
    <div class="tablaContainer" ref="tablaContainer" @scroll="esperarScroll" :style="{ height: heightTabla + 'px' }">
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in encabezados.slice(1)" :key="index" :style="{ width: columnasWidth + '%' }">{{ header }}</th>
            <th v-if="props.acciones != 0" :style="{ width: '10%' }"> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in registrosFinales" :key="index">

            <template v-for="(value, key, columna) in item">
              <td v-if="columna >= 1" :key="key" :style="{ width: columnasWidth + '%' }">{{ value }}</td>
            </template>

            <td v-if="props.acciones != 0" :style="{ width: '10%' }">
                <img 
                  src="../assets/img/edit.svg"
                  alt="Editar"
                  class="Acciones me-2"
                  :class="{ small: isSmall }"
                  @click="activarAcciones(1, item.EntidadNegocioId)"> 
                <img 
                  src="../assets/img/trash.svg"
                  alt="Eliminar"
                  class="Acciones ms-2"
                  :class="{ small: isSmall }"
                  v-if="props.acciones == 2"
                  @click="activarAcciones(2, item.EntidadNegocioId)">
              </td>
            </tr>
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
    default: [
  { nombre: 'Juan', edad: 25, pais: 'España' },
  { nombre: 'María', edad: 30, pais: 'México' },
  { nombre: 'Juan', edad: 25, pais: 'España' },
  { nombre: 'María', edad: 30, pais: 'México' },
  { nombre: 'Juan', edad: 25, pais: 'España' },
  { nombre: 'María', edad: 30, pais: 'México' },
  { nombre: 'Juan', edad: 25, pais: 'España' },
  { nombre: 'María', edad: 30, pais: 'México' },
  { nombre: 'Juan', edad: 25, pais: 'España' },
  { nombre: 'María', edad: 30, pais: 'México' },
  { nombre: 'Juan', edad: 25, pais: 'España' },
  { nombre: 'finalprevio', edad: 30, pais: 'México' },
  { nombre: 'Juan', edad: 25, pais: 'España' },
  { nombre: 'final', edad: 30, pais: 'México' },
    ]
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

function activarAcciones(opc, id){
  tablaContainer.value.scrollTop = 0;
  emit ('eAccion', [opc, id])
}


watch(() => props.listado, (newValue, oldValue) => {
  registrosFinales.value = [];
  listadoFinal.value = newValue;
  paginaActual.value = 1;
  
  if (props.pBusqueda) {
    emit('eBusqueda', false);
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
  let cantidadCols = 0;
  if (props.acciones != 0){
    cantidadCols = props.encabezados.length - 1;
    columnasWidth.value = (90/cantidadCols);
  }else{
    cantidadCols = props.encabezados.length -1;
    columnasWidth.value = (100/cantidadCols);
  }
  if (tablaContainer.value.offsetWidth <= 650){
    tablaContainer.value.style.fontSize = '0.8rem';
    isSmall.value = true;
  }
}

</script>

<style scoped>
.tablaInfinita {
  text-align: center;
}

.tablaContainer {
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #000;
}

td, th {
  padding: 10px;
  border: 1px solid #000;
}

th {
  background-color: #999999;
  color: #fff;
  height: 3rem;
}
td{
  background-color: #fff;
  color: #999999;
  height: 2rem;
  padding: 0rem 0.5rem 0rem 0.5rem;
}

button {
  margin-top: 20px;
}

.Acciones {
  height: 1.5rem;
  cursor: pointer;
}
</style>
