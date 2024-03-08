<template>
    <favico 
      :menu="menu"
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
    const menu ={
        name: 'menu',
        icono: '/images/fabico/hamburguesas.svg'
    }
    const items=[
        {
          name: 'regresar',
          icono: '/images/fabico/ListaPrecios.svg',
          pathname: 'listado',
        },
        {
          name: 'empresa',
          icono: '/images/fabico/SAT.svg',
          pathname: 'formualrio',
        },
        {
          name: 'conversion',
          icono: '/images/fabico/unidadmedida.svg',
          pathname: '',
        }
      ]

    return{
      items,
      menu
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 2.5rem 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 0.625rem;
}
a {
  color: #42b983;
}
</style>
