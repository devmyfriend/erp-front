/* @param: tipoTabla: indica si es telefono o correo
            Lista:La lista de teléfonos o correos que se quieren añadir editar, actualizar, eliminar o crear
*/


<template>
  <div class="datosTabla">
    <div class="row align-items-center">
      <div class="col-auto">
    
        <input type="text" v-model="valor" :placeholder="placeholder" class="form-control" />
        <div v-if="invalido == true" :class="{'alerta':invalido}" > 
          
          <div v-if ="tipoTabla == 'telefono'">
              Teléfono invalido

          </div> 

          <div v-if ="tipoTabla == 'correo'">
              Correo invalido

          </div> 
        
        
        
        </div>
      </div>
      <div class="col-auto">
        <img @click="anadir(tipoTabla)" class="icono" src="@/assets/img/plus.png" />
      </div>
    </div>
    <div v-if="tipoTabla == 'telefono'">

      <table class="table">
        <thead>
          <tr>
            <th scope="col">id de Tel.</th>
            <th scope="col">Número Télefonico </th>
            <th scope="col"> Acciones </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tel, index) in Lista" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ tel.telefono }}</td>
            <td>
              <span>
                <img @click="abrirModalEdit('telefono', index, tel.telefono)" class="icono" src="@/assets/img/edit-icon.png" />
              </span>
              <span>
                <img @click="eliminarTeloCorreo('telefono')" class="icono" src="@/assets/img/remove-icon.png" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

    <div v-else-if="tipoTabla == 'correo'">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id de correo.</th>
            <th scope="col">Correo </th>
            <th scope="col"> Acciones </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(correo, index) in Lista" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ correo.correo }}</td>
            <td>
              <span>
                <img @click="abrirModalEdit('correo', index, correo.correo)" class="icono" src="../assets/img/edit-icon.png" />
              </span>
              <span>
                <img @click="eliminarTeloCorreo('correo')" class="icono" src="../assets/img/remove-icon.png" />
              </span>
            </td>
          </tr>
        </tbody>
      </table>

    </div>

  </div>
  <!--Modal editar -->
  <div class=" modal modal-dialog modal-sm" id="m_editTelefono" tabindex="-1" aria-labelledby="m_edit_telefono"
    aria-hidden="true" ref="modal_edit">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Nuevo .</p>
          <input v-model="tempValor" type="text" class="form-control mb-3" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button @click="editarTeloCorreo" type="button" class="btn btn-primary">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, onMounted, reactive } from 'vue';
import { Modal } from 'bootstrap';

export default {
  props: {
    Lista: Array,
    tipoTabla: String,
  },

  setup(props) {
    const tempIndex = ref(0);
    const tempValor = ref('');
    const tipoEdit = ref('');
    let modalObj2 = null;
    let modal_edit = ref(null)
    const valor = ref('')
    const invalido = ref(false)
    const placeholder = ref('')


    if (props.tipoTabla === 'telefono') {
      placeholder.value = 'Teléfono'

    }
    if (props.tipoTabla === 'correo') {
      placeholder.value = 'Correo e.'
    }

    const abrirModalEdit = (tipoEdicion, index, nuevoValor) => {
      tipoEdit.value = tipoEdicion;
      modalObj2.show();
      tempValor.value = nuevoValor;
      tempIndex.value = index;

    };




    const anadir = (tipoEdicion) => {
      tipoEdit.value = tipoEdicion
      console.log(props.Lista);
      const regexTelefono = /^\d{10}$/;
      if (tipoEdit.value === 'telefono') {
        console.log("estoy en telefono");
        if (regexTelefono.test(valor.value)) {
          props.Lista.push({ "telefono": valor.value });

          console.log(props.Lista);
          invalido.value = false
        }
        else {
          console.log("telefono invalido");
          invalido.value = true
        }

      }
      if (tipoEdit.value === 'correo') {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regexCorreo.test(valor.value)) {
          props.Lista.push({ "correo": valor.value })
          invalido.value = false
        }
        else {
          console.log("Correo no valido")
          invalido.value = true
        }
      }

    }


    const editarTeloCorreo = () => {
      console.log('tipoEdit',tipoEdit.valie);
    
      if (tipoEdit.value === 'telefono') {
        props.Lista[tempIndex.value].telefono = tempValor.value;
        modalObj2.hide();
      }
      if (tipoEdit.value === 'correo') {
        props.Lista[tempIndex.value].correo = tempValor.value;
        modalObj2.hide();
      }
    };

    const eliminarTeloCorreo = (tipoContacto) => {
      console.log('tipoContacto', tipoContacto);
      if (tipoContacto === 'telefono') {
        delete props.Lista[tempIndex.value].telefono;
        props.Lista.splice(tempIndex.value, 1);
      }
      if (tipoContacto === 'correo') {
        delete props.Lista[tempIndex.value].correo;
        props.Lista.splice(tempIndex.value, 1);
      }
    };

    onMounted(() => {
      modalObj2 = new Modal(modal_edit.value);

    });

    return {
      tempIndex,
      tempValor,
      tipoEdit,
      abrirModalEdit,
      modal_edit,
      editarTeloCorreo,
      eliminarTeloCorreo,
      invalido,
      valor,
      anadir,
      placeholder
    };
  },
};


</script>
<style scoped>
.icono {
  width: 1.5rem;
}
.alerta{
  color:red;
  font-weight: 600;
}
h5,p{
  color:black;
}
</style>