
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ScrollInfinito from './ScrollInfinito.vue'

const { Lista, obtenerTelefonoCorreo, m_actualizarContacto, eliminarContacto } = defineProps({
  Lista: Array,

  obtenerTelefonoCorreo: Function,
  m_actualizarContacto: Function,
  eliminarContacto: Function

})
let items = ref([])
let limit = ref(7)
let offset = ref(0)

console.log("Lista", Lista)
//Seccion temporal en lo que se realiza el back de obtener contacto paginaddod


const generaContacto = (limit, offset, delay = 1000) => {
  const parte = Lista.slice(offset.value, offset.value + limit.value)
  offset.value = offset.value + limit.value

  return parte
}
const loadItems = async () => {

  
  if (limit.value <= Lista.length) {

    const newItems = await generaContacto(limit, offset)
    
    items.value = [...items.value, ...newItems];
    


  }
  if (offset.value >= Lista.length) {
    
    return;
  }

}

//funciones padre invocadas en el hijo
const  obtenerTelefonoCorreoHijo = (idContacto) =>{
    obtenerTelefonoCorreo(idContacto)

}

const m_actualizarContactoHijo = (idContacto) =>{
  m_actualizarContacto(idContacto)

}

const eliminarContactoHijo=(idContacto)=>{

  eliminarContacto(idContacto)

}





</script>
<template>
  <table class="table">
    <thead>

    </thead>
    <tbody>

      <ScrollInfinito class="td" @infinite="loadItems">

        <tr v-for="lc in items" :key="lc.ContactoId" @click="obtenerTelefonoCorreoHijo(lc.ContactoId)">

          <td>{{ lc.ContactoId }}</td>
          <td>{{ lc.Nombres }}</td>
          <td>{{ lc.Puesto }}</td>
          <td>
            <span>
              <img @click="m_actualizarContactoHijo(lc.ContactoId)" class="icono " src="@/assets/img/edit-icon.png" />
            </span>
            <span>
              <img @click="eliminarContactoHijo(lc.ContactoId)" class="icono ms-3" src="@/assets/img/remove-icon.png" />
            </span>
          </td>
        </tr>

      </ScrollInfinito>




    </tbody>
  </table>
</template>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';


.td tr td {
  width: 10%;
}

.icono {
  width: 1.5rem;
}

.contenedor {
  align-items: right;
  width: 40.93rem;


  padding: 1.5rem 1.5rem 0rem 1.5rem;
  text-align: left;

}

h1 {

  font-size: 2rem;
  text-align: left;
}

h5,
h4 {
  color: black;

}

td {
  width: 2.18rem
}
</style>