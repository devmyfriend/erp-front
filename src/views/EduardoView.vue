<template>
  <div class="container mt-4 ms-4">
    
  </div>
</template>


<script>
import txtbuscador from '@/shared/txtbuscador copy.vue';
import buscador from '@/shared/txtbuscador.vue';
import { ref } from 'vue';

export default {
  name: 'EduardoView',
  components: {
    txtbuscador,
    buscador,
  },
  setup(){
    let data = ref([
        {
          id: 1,  
          nombre: 'Empresa Constructora Innovadora S.A. de C.V.',
          rfc: 'ECI150510',
          direccion: 'Direccion 01',
          telefono: '9982334455',
        }, 
        {
          id: 2,
          nombre: 'Consultoría Digital Avanzada S.A.P.I. de C.V.',
          rfc: 'CDA120928',
          direccion: 'Direccion 02',
          telefono: '9987293648',
        },
        {
          id: 3,
          nombre: 'Distribuidora de Tecnología Integral S. de R.L. de C.V.',
          rfc: 'DTI180203',
          direccion: 'Direccion 03',
          telefono: '9945678901',
        },
        {
          id: 4,
          nombre: 'Servicios Médicos Especializados Global Health S.A. de C.V.',
          rfc: 'SME100715',
          direccion: 'Direccion 04',
          telefono: '9982674562',
        },
        {
          id: 5,
          nombre: 'Comercializadora de Productos Innovadores S.A. de C.V.',
          rfc: 'CPI161220',
          direccion: 'Direccion 05',
          telefono: '9983764521',
        }
      ]);

      return {
        data,
      };
  }

};
</script>

<style scoped>

</style>
