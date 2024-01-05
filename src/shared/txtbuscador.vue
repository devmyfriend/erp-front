<template>
  <div class="buscador text-start mb-4">
    <input type="text" class="inputBuscador" v-model="txtBusqueda" >
    <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar(txtBusqueda)">
</div>
</template>
  
<script>
import { ref, defineProps, defineEmits, computed} from 'vue';
const { useEmpresas } = require('../modules/empresas/store/empresas');

export default {
  name: 'txtbuscador',
  emits: ['nuevaPagina', 'nuevaLista', 'nuevaPagMax', 'nuevoTexto'],
  props: {
    pagina: {
      type: Array,
      required: true,
    },
    lista: {
      type: Array,
      required: true,
    },
  },

  setup(props, { emit }) {
    const store = useEmpresas();
    let pagAct = ref(1);
    let pagMax = ref(1);
    let lista = ref([]);
    let txtBusqueda = ref('');

    let txtPlaceHolder = ref('Buscar');

    computed(() => {
      lista.value = props.lista;
      pagAct.value = props.pagina.pagAct;

    })

    function buscar(text) {
      store.setTexto(text);
      emit('nuevoTexto', text)
      store.setPagAct(1);
        store.cargarListado().then(() => {
          lista.value = store.getListado;
          pagMax.value = store.getPaginas.pagMax;
          emit('nuevaPagina', pagAct.value);
          emit('nuevaPagMax', pagMax.value);
          emit('nuevaLista', lista.value);
        })
    }

    return {
      txtPlaceHolder,
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
