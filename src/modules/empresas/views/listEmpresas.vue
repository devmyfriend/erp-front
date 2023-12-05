ListadoEmpresa

<template>
  <div class="viewListEmpresas">
    <Tabla style="margin: 0px; padding: 0px;"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Tabla from '@/shared/tabla.vue';


export default defineComponent({
  name: 'ListEmpresas',
  components: {
    Tabla,
  },
});
</script>
