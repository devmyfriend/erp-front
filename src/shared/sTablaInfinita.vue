<template>
  <div class="tablaInfinita">
    <div class="tablaContainer" ref="tablaContainer" @scroll="esperarScroll" :style="{ height: heightTabla + 'px' }">
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in encabezados.slice(1)" :key="index">{{ header }}</th>
            <th v-if="props.acciones != 0"> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in registrosFinales" :key="index">

            <template v-for="(value, key, columna) in item">
              <td v-if="columna >= 1" :key="key">{{ value }}</td>
            </template>

            <td v-if="props.acciones != 0">
                <img src="../assets/img/edit.svg"  alt="Editar"   class="Acciones me-2" @click="emit ('eAccion', [1, item.EntidadNegocioId]); console.log('El id es: ' + item.EntidadNegocioId)"> 
                <img src="../assets/img/trash.svg" alt="Eliminar" class="Acciones ms-2" v-if="props.acciones == 2" @click="emit ('eAccion', [2, item.EntidadNegocioId]); console.log('El id es: ' + item.EntidadNegocioId)"> </td>
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
    type: Object,
    default: {}
  }
});

const emit = defineEmits( ['eAccion', 'eBusqueda']);

onMounted(() => {
  /* cargarMas(); */
  tablaContainer.value = ref.tablaContainer;
});
const listadoFinal = ref( [] );
const paginaActual = ref(1);
const registrosFinales = ref([]);
const heightTabla = ref( (props.paginado * 32) + 38 ); //Se calcula la altura de la tabla según la cantidad de registros máxima ([Paginado] * [Height_TD] + [Height_TH])
const tablaContainer = ref(null);

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

watch(() => props.listado, (newValue, oldValue) => {
  registrosFinales.value = [];
  listadoFinal.value = newValue;
  if (props.pBusqueda) {
    paginaActual.value = 1;
    emit('eBusqueda', false);
    tablaContainer.value.scrollTop = 0;

  }
  cargarMas();
},{deep: true});

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
