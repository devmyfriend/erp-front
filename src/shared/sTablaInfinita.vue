<template>
  <div class="tablaInfinita">
    <h1> TABLA INFINITA | Working in</h1>
    <div class="tablaContainer" ref="tablaContainer" @scroll="esperarScroll" :style="{ height: heightTabla + 'px' }">
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in encabezados" :key="index">{{ header }}</th>
            <th v-if="acciones != 0"> Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in registrosFinales" :key="index">
            <td v-for="(value, key) in item" :key="key">{{ value }}</td>
            <td v-if="acciones != 0">
                <img src="../assets/img/edit.svg"  alt="Editar"   class="me-2"> 
                <img src="../assets/img/trash.svg" alt="Eliminar" class="ms-2" v-if="acciones == 2"> </td>
            </tr>
          </tbody>
        </table>
      </div>
    <button @click="fRegistroTemporal"> Generar registro temporal </button>
  </div>
  {{ registrosFinales }}
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { defineEmits } from 'vue';

const props = defineProps({
  encabezados: {
    type: Array,
    default: ['Nombre', 'Edad', 'País']
  },
  listadoFinal: {
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

const emit = defineEmits( ['eAccion',
  'eDesactivarRegistroNuevo',
  'eDesactivarBusqueda',
  'eDesactivarAccion',
  'eDesactivarSaveAll'
]);

onMounted(() => {
  cargarMas();
});

const encabezados = ref( props.encabezados );
const listadoFinal = ref( props.listadoFinal );
const paginado = ref( props.paginado );
const acciones = ref( props.acciones );

const pBusqueda = ref( props.pBusqueda );
const pAccion = ref( props.pAccion );
const pSaveAll = ref( props.pSaveAll );
const pRegistroNuevo = ref( props.pRegistroNuevo );

const paginaActual = ref(1);
const registrosFinales = ref([]);
const heightTabla = ref( (paginado.value * 32) + 48 ); //Se calcula la altura de la tabla según la cantidad de registros máxima ([Paginado] * [Height_TD] + [Height_TH])

const conteoTemporal = ref(0);

const cargarMas = () => {
  const start = (paginaActual.value - 1) * paginado.value;
  const end = start + paginado.value;
  registrosFinales.value.push(...listadoFinal.value.slice(start, end));
  paginaActual.value++;
};

const esperarScroll = (event) => {
  const element = event.target;
  if (element.scrollHeight - element.scrollTop - 10 <= element.clientHeight) {
    cargarMas();
    console.log('[CARGANDO]: ' + element.scrollHeight + ' - ' + element.scrollTop + ' <= ' + element.clientHeight);
  }else{
    console.log('[noLOAD]: Se supone que ' + element.scrollHeight + ' - ' + element.scrollTop + ' <= ' + (element.clientHeight));
  }
};

const fRegistroTemporal = () => {
  pRegistroNuevo.value = { nombre: 'Temporal', edad: conteoTemporal.value, pais: 'Temporal' };
  conteoTemporal.value++;
  console.log('Registro temporal: ', JSON.stringify(pRegistroNuevo.value) );
};

watch(() => pRegistroNuevo, (newValue, oldValue) => {
  if (newValue.value != '') {
    console.log('Se añade el registro temporal: ', JSON.stringify(newValue.value));
    registrosFinales.value.push(newValue.value);
    pRegistroNuevo.value = '';
  }
},{deep: true});

</script>

<style scoped>
.tablaInfinita {
  margin: 20px;
  padding: 20px;
  text-align: center;
}

.tablaContainer {
  overflow-y: auto;
  margin-top: 20px;
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
  background-color: #28198c;
  color: #fff;
  height: 3rem;

}
td{
  background-color: #382c8b55;
  height: 2rem;
  padding: 0rem 0.5rem 0rem 0.5rem;
}

button {
  margin-top: 20px;
}
</style>
