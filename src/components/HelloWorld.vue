<template>
    <favico 
      :items="items"
    />
</template>

<script>

import favico from '@/shared/favico/components/item.vue'


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    /* listEmpresas */
    favico
  },
  setup(){

    const items=[
        {
          name: 'regresar',
          icono: '../../assets/img/favico/ListaPrecios.svg',
          pathname: 'home'
        },
        {
          name: 'empresa',
          icono: '../../assets/img/favico/SAT.svg',
          pathname: 'empresas'
        }
      ]

    return{
      items
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
