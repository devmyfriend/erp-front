<template>
    <div class="buscador">
      <input type="text" :placeholder="txtPlaceHolder" class="inputBuscador" @mouseenter="endFocus" @mouseleave="startFocus">
      <img src="@/assets/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar">
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

    background-color: #D9D9D9;
    height: 12.5rem;
    width: 100%; // Corregido: Cambiado 100v a 100vw
  }
  .inputBuscador{
    width: 16.625rem;
    height: 2.1875rem;
    padding: 0.5rem;
    font-size: 1.125re;
    font-weight: 100;
    color: #CBCBCB;
    margin: 1rem;
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
    width: 1.5rem;
    height: 1.5rem;
    margin-bottom: 0.4375rem;
    margin-left: 1rem;
  }
  .iconoBuscador:hover {
    width: 1.625rem;
    height: 1.625rem;
    margin-bottom: 0.3125rem;
    margin-left: 0.875rem;
  } 
  </style>
  