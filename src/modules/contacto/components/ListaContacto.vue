/* Modal que desplegara la lista de contactos y al seleccionarlo desplegara en la tabla la lista unica de contacto */

<script setup>

import {ref,onMounted,watch} from 'vue'

import {Modal} from 'bootstrap'
const {Lista,visible} = defineProps({
  Lista:Array,
  visible:Boolean

})

let modalEle = ref(null)
let modalObj = null
/*const showModal = () => {
  
  modalEle.value.addEventListener('hidden.bs.modal', () => {
    console.log("Se oculta modal");
  
  });

  
};*/
console.log(visible)
if(visible){
  console.log("mostrando modal");
  modalObj.show()
}
onMounted(()=>{
           
  modalObj = new Modal(modalEle.value);
  modalObj.show()
       });





const cerrarModal = ()=>{
  console.log("cerrar modol")
  modalObj.dispose()
}
</script>

<template>
  
<div class="modal" tabindex="-1" ref="modalEle">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Lista de Contactos</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <select class="form-select" multiple aria-label="Multiple select example" v-for="lc in Lista" :key="lc.ContactoId">
           
            <option :value="lc.ContactoId">{{lc.Nombres}}</option>
          
        </select>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cerrarModal">Close</button>
        <button type="button" class="btn btn-primary">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped>
h5{
  color:black
}
</style>