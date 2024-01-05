<template>
  <div class="viewListEmpresas">
    <Tabla :esPropietaria="false"/>
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
