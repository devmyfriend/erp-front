<template>
  <div class="viewListEmpresas">

    <Tabla :esPropietaria="false"/>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TxtBuscador from '@/shared/txtbuscador.vue';
import Tabla from '@/shared/tabla.vue';
import Paginador from '@/shared/paginador.vue';

export default defineComponent({
  name: 'ListEmpresas',
  components: {
    TxtBuscador,
    Tabla,
    Paginador,
  },
});
</script>
