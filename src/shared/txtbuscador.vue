<template>
  <div class="buscador text-start mb-4">
    <input type="text" class="inputBuscador" v-model="txtBusqueda" @keyup.enter="buscar(txtBusqueda)">
    
    <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
</div>
</template>
  
<script>
import { ref, computed} from 'vue';
const { useEmpresas } = require('../modules/empresas/store/empresas');

export default {
  name: 'txtbuscador',
  emits: ['BusquedaRealizada'],

  setup(props, { emit }) {
    const store = useEmpresas();
    const lista = ref([]);
    const txtBusqueda = ref('');

    async function buscar(text) {
      const data =  await store.busquedaEmpresas(text);
      emit('BusquedaRealizada');
    }

    return {
      buscar,
      txtBusqueda
    };
  },
};
</script>

<style lang="scss" scoped>
.buscador {
  width: 100%;
}
.inputBuscador{
  width: 29rem;
  height: 2.1875rem;
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: 100;
  color: #CBCBCB;
  margin-left: 1rem;
  border: none;
  border-radius: 0.3125rem;
  transition: border-bottom 0.3s ease;
}

.inputBuscador:focus{
  outline: none;
  border: none;
  border-bottom: 0.125rem solid #000000;
}

.iconoBuscador {
  cursor: pointer;

  height: 1.75rem;
  margin-bottom: 0.4375rem;
  margin-left: 1rem;
}
</style>