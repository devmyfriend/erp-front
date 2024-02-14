<template>
  <!-- Modal agregar contacto -->
  <div class="modal fade modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalEle">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Añadir contacto</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h4 class="mb-4">{{ modo }} datos del contacto </h4>
              </div>
            </div>
            <div class="row">
              <form>
                <div class="row mb-3">
                  <div class="col-4">
                    <input type="text" v-model="apellidoPaterno" placeholder="Apellido Paterno" class="form-control" />
                  </div>
                  <div class="col-4">
                    <input type="text" v-model="apellidoMaterno" placeholder="Apellido Materno" class="form-control" />
                  </div>
                  <div class="col-4">
                    <input type="text" v-model="nombres" placeholder="Nombre(s)" class="form-control" />
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-4">
                    <input type="text" v-model="departamento" placeholder="Departamento" class="form-control" />
                  </div>
                  <div class="col-8">
                    <input type="text" v-model="puesto" placeholder="Puesto" class="form-control" />
                  </div>
                </div>
              
                <div class="row">
                  <div class="col-6" @mouseenter="tipo = 1">
                    <div class="formulario">
                      <p class="MSJ" v-if="editandoTel"> Editando telefono</p>
                      <input v-model="telInput" type="text" placeholder="Telefono" class="inp">
                      <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarRegistro(1)" v-if="!editandoTel">
                      <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="reemplazarLocal(1)" v-else>
                    </div>
                    <TablaInfinita :encabezados="['id', 'telefono']" :acciones="2" :listado="telefonos" @eAccion="esperarAccion" />
                  </div>
                  <div class="col-6" @mouseenter="tipo = 2">
                    <div class="formulario">
                      <p class="MSJ" v-if="editandoCorreo"> Editando correo</p>
                      <input ref="inputCorreo" v-model="correoInput" type="text" placeholder="Correo e." class="inp">
                      <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarRegistro(2)" v-if="!editandoCorreo">
                      <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="reemplazarLocal(2)" v-else>
                    </div>
                    <TablaInfinita :encabezados="['id', 'correo']" :acciones="2" :listado="correos" @eAccion="esperarAccion"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="modo === 'Guardar' ? GuardarTodo() : ActualizarDatos()" type="button" class="btn btn-primary">{{ modo }}</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Modal} from 'bootstrap'
import { ref, onMounted, onBeforeUnmount } from 'vue';
import TablaInfinita from '@/shared/sTablaInfinita.vue'
import Swal from 'sweetalert2'
import { jsx } from 'vue/jsx-runtime';
import { storeToRefs } from 'pinia';
const { useContacto } = require('../store/contacto.js')
const store = useContacto()

let modalEle = ref(null)
const contactoId = ref(0)
const apellidoPaterno = ref('')
const apellidoMaterno = ref('')
const nombres = ref('')
const departamento = ref('')
const puesto = ref('')

const editandoTel = ref(false)
const telefonoEdit = ref({})
const editandoCorreo = ref(false)
const correoEdit = ref({})

const telefonos = ref([])
const correos = ref([])

const telInput = ref('')
const correoInput = ref('')
const tipo = ref(0)

let modalObj = null

const props = defineProps({
  EntidadNegocioId: {
    type: Number,
    default: 0
  },
  modo: {
    type: String,
    default: 'Guardar'
  },
  registro: {
    type: Object,
    default: {}
  }

})
const emit = defineEmits(['cerrarModal', 'esperarDatosContacto'])

const GuardarTodo = () => {
  if (valApell() && valNombre() && valDep() && valPuesto() && telefonos.value.length > 0 && correos.value.length > 0) {
    const body = {
      EmpresaId: props.EntidadNegocioId,
      Nombres: nombres.value,
      ApellidoPaterno: apellidoPaterno.value,
      ApellidoMaterno: apellidoMaterno.value,
      Departamento: departamento.value,
      Puesto: puesto.value,
      CreadoPor: 1,
      Telefonos: telefonos.value,
      Correos: correos.value
    }
    
    store.crearContacto(body).then((res) => {
      if(res){
        Swal.fire('Guardado', 'El contacto ha sido guardado', 'success')
        console.log('Datos: ' + JSON.stringify(body))
        emit('esperarDatosContacto', 3)
        modalObj.hide()
      }
    })

  }else if(telefonos.value.length == 0){
    Swal.fire('Error', 'Debe agregar al menos un teléfono', 'error')
  }else if(correos.value.length == 0){
    Swal.fire('Error', 'Debe agregar al menos un correo', 'error')
  }
}

function ActualizarDatos(){
  if (valApell() && valNombre() && valDep() && valPuesto()) {
    const bodyContacto = {
      EntidadNegocioId : props.EntidadNegocioId,
      ContactoId: contactoId.value,
      Nombres: nombres.value,
      ApellidoPaterno: apellidoPaterno.value,
      ApellidoMaterno: apellidoMaterno.value,
      Departamento: departamento.value,
      Puesto: puesto.value,
      ActualizadoPor: 1,
    }
    store.editarContacto(bodyContacto).then((res) => {
      if(res){
        Swal.fire('Actualizado', 'El contacto ha sido actualizado', 'success')
        console.log('Datos: ' + JSON.stringify(bodyContacto))
        emit('esperarDatosContacto', 3)
        modalObj.hide()
      }
    })
  }
}

function reemplazarLocal(opc){
  if(opc == 1){
    editandoTel.value = false
    telefonos.value.forEach((tel) => {
      if (tel.TelefonoId === telefonoEdit.value.TelefonoId) {
        tel.NumeroTelefonico = telInput.value
      }
    });
    telInput.value = ''
  }else if (opc == 2){
    editandoCorreo.value = false
    correos.value.forEach((correo) => {
      if (correo.EmailId === correoEdit.value.EmailId) {
        correo.Email = correoInput.value
      }
    });
    correoInput.value = ''
  }
  if(props.modo === 'Actualizar'){
    if(tipo.value == 1){
      console.log('Editaré los telefonos del contacto en store');
      const body = {
        "TelefonoId": telefonoEdit.value.TelefonoId,
        "NumeroTelefonico": telefonoEdit.value.NumeroTelefonico,
        "ActualizadoPor": "2"
      }
      store.editarTelContacto(body).then((res) => {
        if(res){
          Swal.fire('Actualizado', 'El teléfono ha sido actualizado', 'success')
        }
      })
    }else if (tipo.value == 2){
      const body = {
        "EmailId": correoEdit.value.EmailId,
        "Email": correoEdit.value.Email,
        "ActualizadoPor": "2"
      }
      console.log('Body: ' + JSON.stringify(correoEdit.value));
      store.editarCorreoContacto(body).then((res) => {
        if(res){
          Swal.fire('Actualizado', 'El correo ha sido actualizado', 'success')
        }
      })
    }
  }
}

function agregarRegistro(opc){
  if(opc == 1){
    if(validarInput(1, telInput.value)){
      if(props.modo === 'Guardar'){
        telefonos.value.push({id: telefonos.value.length + 1, telefono: telInput.value})
        telInput.value = ''
      }else{
        const body = {
          NumeroTelefonico: telInput.value,
          ContactoId: contactoId.value,
          CreadoPor: 1
        }
        store.crearTelContacto(body).then((res) => {
          if(res){
            telefonos.value.push({id: telefonos.value.length + 1, telefono: telInput.value})
            telInput.value = ''
          }
        })
      }
    }else{
      console.log('Tel: ' + telInput.value);
      Swal.fire('Error', 'El teléfono no es válido', 'error')
    }
  }else if (opc == 2){
    if(validarInput(2, correoInput.value)){
      if(props.modo === 'Guardar'){
        correos.value.push({id: correos.value.length + 1, correo: correoInput.value})
        correoInput.value = ''
      }else{
        const body = {  
        Email: correoInput.value,
        ContactoId: contactoId.value,
        CreadoPor: 1
      }
      store.crearCorreoContacto(body).then((res) => {
        if(res){
          correos.value.push({id: correos.value.length + 1, correo: correoInput.value})
          correoInput.value = ''
        }
      })
      }
    }else{
      console.log('Correo: ' + correoInput.value);
      Swal.fire('Error', 'El correo no es válido', 'error')
    }
  }
} 

function esperarAccion(opc, registro){
  console.log('Opc: ' + opc + ' Modo: ' + props.modo + ' tipo: ' + tipo.value);
  if(opc == 1){ //Editar
      if(tipo.value == 1){
        const encuentro = telefonos.value.find((tel) => tel.TelefonoId === registro.TelefonoId)
        console.log('Encuentro: ' + JSON.stringify(encuentro));
        editandoTel.value = true;
        telInput.value = encuentro.NumeroTelefonico;
        telefonoEdit.value = encuentro
      }else if (tipo.value == 2){
        const encuentro = correos.value.find((correo) => correo.EmailId === registro.EmailId)
        editandoCorreo.value = true;
        correoInput.value = encuentro.Email;
        correoEdit.value = encuentro
      }
  }else if (opc == 2){ //Eliminar
    Swal.fire({
      title: '¿Estás seguro?', text: "No podrás revertir esto!", icon: 'warning', 
      showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        //Si es contacto nuevo
        if (props.modo === 'Guardar') {
          if(tipo.value == 1){
            telefonos.value = telefonos.value.filter((tel) => tel.TelefonoId !== registro.TelefonoId)
          }else if (tipo.value == 2){
            correos.value = correos.value.filter((correo) => correo.EmailId !== registro.EmailId)
          }
          Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success')
        }else if (props.modo === 'Actualizar'){
          if(tipo.value == 1){
            const body = {
              "TelefonoId": registro.TelefonoId,
              "BorradoPor": "0"
            }
            store.borrarTelContacto(body).then((res) => {
              if(res){
                telefonos.value = telefonos.value.filter((tel) => tel.TelefonoId !== registro.TelefonoId)
                Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success')
              }
            })
          }else if (tipo.value == 2){
            const body = {
              "EmailId": registro.EmailId,
              "BorradoPor": "0"
            }
            store.borrarCorreoContacto(body).then((res) => {
              if(res){
                correos.value = correos.value.filter((correo) => correo.EmailId !== registro.EmailId)
                Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success')
              }
            }
            )
          }
        }
      }
    })
  }
}

onMounted(() => {
  modalObj = new Modal(modalEle.value) 
  if (props.modo !== '') {
    modalObj.show()
  }else{
    Swal.fire('Error', 'No se ha definido el modo', 'error')
  }

  if (Object.keys(props.registro).length !== 0) {
    console.log('Registro: ' + JSON.stringify(props.registro))

    contactoId.value = props.registro.ContactoId
    apellidoPaterno.value = props.registro.ApellidoPaterno
    apellidoMaterno.value = props.registro.ApellidoMaterno
    nombres.value = props.registro.Nombres
    departamento.value = props.registro.Departamento
    puesto.value = props.registro.Puesto
    store.cargarDetalleContacto(contactoId.value).then((res) => {
      if(res){
        telefonos.value = store.getTelefonosContacto
        correos.value = store.getCorreosContacto
        console.log('Telefonos: ' + JSON.stringify(telefonos.value) + ' \n \n Correos: ' + JSON.stringify(correos.value));
      }
    })
  }
});

onBeforeUnmount(() => {
  /* modalObj.hide() */
  modalObj.dispose()
  emit('cerrarModal')
  apellidoMaterno.value = ''
  apellidoPaterno.value = ''
  nombres.value = ''
  departamento.value = ''
  puesto.value = ''
  telefonos.value = []
  correos.value = []
  telInput.value = ''
  correoInput.value = ''
  editandoCorreo.value = false
  editandoTel.value = false
  telefonoEdit.value = {}
  correoEdit.value = {}
})

function valNombre() {
  if (nombres.value === '') {
    Swal.fire('Error', 'El nombre no puede estar vacío', 'error')
    return false
  }else{
    return true
  }
}

function valApell(){
  if (apellidoPaterno.value === '') {
    Swal.fire('Error', 'El apellido paterno no puede estar vacío', 'error')
    return false
  }else if (apellidoMaterno.value === '') {
    Swal.fire('Error', 'El apellido materno no puede estar vacío', 'error')
    return false
  }else{
    return true
  }
}

function valDep(){
  if (departamento.value === '') {
    Swal.fire('Error', 'El departamento no puede estar vacío', 'error')
  }else{
    return true
  }
}

function valPuesto(){
  if (puesto.value === '') {
    Swal.fire('Error', 'El puesto no puede estar vacío', 'error')
  }else{
    return true
  }
}

function validarInput(opc, txt){
  if(txt == '' || txt == null || txt == undefined || txt == ' '){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo no puede estar vacío'
    })
    return false
  }else{
    if(opc == 1){ //Telefono
      if(txt.length != 10){
        return false
      }else{
        return true
      }
    }else{  //Correo
      if(txt.includes('@') && txt.includes('.') && !txt.includes(' ')){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style scoped>
h4, h5 {
  color: black;
}
.formulario {
  display: block;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.inp {
  border-radius: 0.3125rem;
  border: none;
  padding: 0.25rem;
  margin-bottom: 1.5rem;
  width: 18.75rem;
}
.icono {
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  margin: auto;
  margin-left: 1rem;
}
.MSJ {
  color: red;
  font-size: 1rem;
  margin-bottom: .5rem;
}
</style>
