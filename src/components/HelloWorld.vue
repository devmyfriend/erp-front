<template>
  <div class="hello">
    <frmDatosGrales></frmDatosGrales>
  </div>
</template>

<script>

import frmDatosGrales from '../modules/empresas/components/frmDatosGrales.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    frmDatosGrales
  },
  setup(){
    return{
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
