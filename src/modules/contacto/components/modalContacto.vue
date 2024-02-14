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
                      <input  v-model="telInput" type="text" placeholder="Telefono" class="inp">
                      <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarRegistro(1)">
                    </div>
                    <TablaInfinita :encabezados="['id', 'telefono']" :acciones="2" :listado="telefonos" @eAccion="esperarAccion" />
                  </div>
                  <div class="col-6" @mouseenter="tipo = 2">
                    <div class="formulario">
                      <input  v-model="correoInput" type="text" placeholder="Correo e." class="inp">
                      <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarRegistro(2)">
                    </div>
                    <TablaInfinita :encabezados="['id', 'correo']" :acciones="2" :listado="correos" @eAccion="esperarAccion"/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="modo === 'Guardar' ? GuardarTodo() : ActualizarTodo()" type="button" class="btn btn-primary">{{ modo }}</button>
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
const { useContacto } = require('../store/contacto.js')
const store = useContacto()

let modalEle = ref(null)
const apellidoPaterno = ref('')
const apellidoMaterno = ref('')
const nombres = ref('')
const departamento = ref('')
const puesto = ref('')

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

function agregarRegistro(opc){
  if(opc == 1){
    if(validarInput(1, telInput.value)){
      telefonos.value.push({id: telefonos.value.length + 1, telefono: telInput.value})
      telInput.value = ''
    }else{
      console.log('Tel: ' + telInput.value);
      Swal.fire('Error', 'El teléfono no es válido', 'error')
    }
  }else if (opc == 2){
    if(validarInput(2, correoInput.value)){
      correos.value.push({id: correos.value.length + 1, correo: correoInput.value})
      console.log('Nuevo correo: ' + correos.value[correos.value.length - 1]);
      correoInput.value = ''
    }else{
      console.log('Correo: ' + correoInput.value);
      Swal.fire('Error', 'El correo no es válido', 'error')
    }
  }
} 

function esperarAccion(opc, registro){
  console.log('Tipo: ' + tipo.value + ' Opc: ' + opc + ' Registro: ' + JSON.stringify(registro));
  if(opc == 1){ //Editar
    Swal.fire('Editar', 'No se ha implementado la edición', 'info')
  }else if (opc == 2){ //Eliminar
    Swal.fire({
      title: '¿Estás seguro?', text: "No podrás revertir esto!", icon: 'warning', 
      showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(tipo.value == 1){
          telefonos.value = telefonos.value.filter((tel) => tel.id !== registro.id)
        }else if (tipo.value == 2){
          correos.value = correos.value.filter((correo) => correo.id !== registro.id)
        }
        Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success')
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
    
  }
});

onBeforeUnmount(() => {
  modalObj.hide()
  modalObj.dispose()
  emit('cerrarModal')
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
</style>
