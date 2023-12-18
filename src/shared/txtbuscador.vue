<template>
  <div class="buscador text-start mb-4">
    <input type="text" :placeholder="txtPlaceHolder" class="inputBuscador" @mouseenter="endFocus" @mouseleave="startFocus">
    <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar">
</div>
</template>
  
<script>
import { ref } from 'vue';

export default {
  name: 'txtbuscador',
  setup() {
    let txtPlaceHolder = ref('Buscar');

    function buscar() {
      if (txtPlaceHolder.value === 'Buscar') {
        txtPlaceHolder.value = 'Buscando...';
      } else{
        txtPlaceHolder.value = 'Buscar';
      }
    }

    function startFocus() {
      txtPlaceHolder.value = 'Buscar';
    }

    function endFocus() {
      txtPlaceHolder.value = '';
    }

    return {
      txtPlaceHolder,
      buscar,
      startFocus,
      endFocus,
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
