<template>
  <div class="tablaInfinita">
    <h1> TABLA INFINITA | Working in</h1>
    <div class="tablaContainer" ref="tablaContainer" @scroll="esperarScroll" :style="{ height: heightTabla + 'px' }">
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in encabezados" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in registrosFinales" :key="index">
            <td v-for="(value, key) in item" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    La altura es {{ heightTabla }}
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

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
  }
});

onMounted(() => {
  cargarMas();
});

const encabezados = ref( props.encabezados );
const listadoFinal = ref( props.listadoFinal );

const paginado = ref( props.paginado );
const paginaActual = ref(1);
const registrosFinales = ref([]);
const heightTabla = ref( (paginado.value * 32) + 48 ); //Se calcula la altura de la tabla según la cantidad de registros máxima y se le resta 10px para un margen funcional
/* const heightTabla = ref( ((paginado.value * 32) + 48) - 10 ); //Se calcula la altura de la tabla según la cantidad de registros máxima y se le resta 10px para un margen funcional */
/* const heightTabla = ref(144); */

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
</script>

<style scoped>
.tablaInfinita {
  margin: 20px;
  padding: 20px;
  text-align: center;
}

.tablaContainer {
  overflow-y: auto;
  /* max-height: 140px; !important //Es la clase que detona el scroll*/ 
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
