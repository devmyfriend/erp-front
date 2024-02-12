<template>
  <div class="contenedorPadre">
    <h1> Contacto </h1>
    
    <div class="filaContacto">
      <div class="formulario">
        <label for="selectContacto" id="lbContacto" class="lbContacto"> Contacto </label>
        <select class="selectContacto">
          <option
            v-for="contactos in ListadoContactos" 
            :key="ContactoId">
            {{ contactos.Nombres }} {{ contactos.ApellidoPaterno }} {{ contactos.ApellidoMaterno }} 
          </option>
        </select>
        <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="abrirMContacto">
      </div>
      <div class="tablaContactos" @mouseenter="tipo = 1">
        <tablaInfinita 
          :listado="ListadoContactos" 
          :encabezados="headsContacto" 
          :acciones="2" :paginado="3"
          :pRegistroNuevo="pRegistroNuevo"
          @eRegistroNuevo="pRegistroNuevo = false"
        />
      </div>
    </div>

    <div class="filaContacto" @mouseenter="tipo = 2">
      <div class="formulario">
        <input  v-model="telefono" type="text" placeholder="Teléfono" class="inp">
        <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarDatos(1)">
      </div>

      <div class="filaMiniTabla">
        <tablaInfinita
          :listado="ListadoTelefonos" 
          :encabezados="headsTelefono" 
          :paginado="3" :acciones="2" :pRegistroNuevo="pRegistroNuevo" @eAccion="esperarAccionWrapper"
          @eRegistroNuevo="pRegistroNuevo = false"
        />
      </div>
    </div>

    <div class="filaContacto" @mouseenter="tipo = 3">
      <div class="formulario">
        <input  v-model="correo" type="text" placeholder="Correo e." class="inp">
        <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarDatos(2)">
      </div>

      <div class="filaMiniTabla">
        <tablaInfinita 
          :listado="ListadoCorreos" 
          :encabezados="headsCorreo"
          :acciones="2" :paginado="3" :pRegistroNuevo="pRegistroNuevo" @eAccion="esperarAccionWrapper"
          @eRegistroNuevo="pRegistroNuevo = false"
        />
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import tablaInfinita from '@/shared/sTablaInfinita.vue';
import Swal from 'sweetalert2';
const { useContacto } = require('../store/contacto')
const store = useContacto()
const props = defineProps({
  EntidadNegocioId: {
    type: Number,
    default: 1
  },
  ContactoId: {
    type: Number,
    default: 1
  }
})

const ListadoContactos = ref([])
const headsContacto = ref(['ContactoId', 'Nombres',	'Paterno',	'Materno',	'Departamento'])

const ListadoTelefonos = ref([])
const headsTelefono = ref(['ID', 'Telefono'])

const ListadoCorreos = ref([])
const headsCorreo = ref(['ID', 'Correo'])

const telefono = ref('')
const correo = ref('')

const pRegistroNuevo = ref(false)
const tipo = ref(0)

onMounted(() => {
  store.cargarContactos(props.EntidadNegocioId).then(() =>{
    loadContactos()
    loadTelMail()
  })
})

function loadContactos(){
  store.cargarContactos(props.EntidadNegocioId).then(() =>{
    ListadoContactos.value = store.listaContacto
    ListadoContactos.value = ListadoContactos.value.map(contacto => {
    return {
        ContactoId: contacto.ContactoId,
        Nombres: contacto.Nombres,
        ApellidoPaterno: contacto.ApellidoPaterno,
        ApellidoMaterno: contacto.ApellidoMaterno,
        Departamento: contacto.Departamento,
        Departamento: contacto.Departamento
    };
  });
  });
}

function loadTelMail(){
  store.cargarTelMails(props.EntidadNegocioId).then(() =>{
    ListadoTelefonos.value = store.listaTelefono
    ListadoCorreos.value = store.listaCorreo

    ListadoTelefonos.value = ListadoTelefonos.value.map(telefono => {
      return {
        TelefonoId: telefono.TelefonoId,  
        NumeroTelefonico: telefono.NumeroTelefonico,
      };
    });

    ListadoCorreos.value = ListadoCorreos.value.map(correo => {
      return {
        EmailId: correo.EmailId,
        Email: correo.Email,
      };
    });
    });
}

function abrirMContacto(){
  alert('abrir modal')
}

function agregarDatos(opc){
  if(opc == 1 && validar(1, telefono.value)){
    const contenido = {
      EntidadNegocioId: props.EntidadNegocioId,
      NumeroTelefonico: telefono.value,
      CreadoPor: '0'
    }
    store.crearTelefono(contenido).then((res) =>{
      if(res){
        telefono.value = ''
        loadTelMail()
        pRegistroNuevo.value = true
      }
    }) 
  }else if (opc == 2 && validar(2, correo.value)){
    const contenido = {
      EntidadNegocioId: props.EntidadNegocioId,
      Email: correo.value,
      CreadorPor: '0'
    }
    store.crearCorreo(contenido).then((res) =>{
      if(res){
        correo.value = ''
        loadTelMail()
        pRegistroNuevo.value = true
      }
    })
  }
}

function validar(opc, txt){
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
      if(txt.includes('@') && txt.includes('.')){
        return true
      }else{
        return false
      }
    }
  }
}

const esperarAccionWrapper = (act, data) => {
  if(act == 1){

  }else if(act == 2) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(tipo.value == 1){
          const body = {
              "ContactoId": data.ContactoId,
              "BorradoPor": "0"
          }
          if(store.borrarContacto(body)){
            loadContactos()
            Swal.fire(
              'Borrado!',
              'El registro ha sido eliminado.',
              'success'
            )
          }
          }else if(tipo.value == 2){
          const body = {
              "TelefonoId": data.TelefonoId,
              "BorradoPor": "0"
          }
          if(store.borrarTelefono(body)){
            loadTelMail()
            Swal.fire(
              'Borrado!',
              'El registro ha sido eliminado.',
              'success'
            )
          }
        }else if(tipo.value == 3){
          const body = {
              "EmailId": data.EmailId,
              "BorradoPor": "0"
          }
          if(store.borrarCorreo(body)){
            loadTelMail()
            Swal.fire(
              'Borrado!',
              'El registro ha sido eliminado.',
              'success'
            )
          }
        }
      }
    })
  }
}
</script>

<style scoped>
h1{
  text-align: start;
  font-size: 2rem;
}
.contenedorPadre{
  height: 100%;
  width: 650px;
  padding: 1.5rem 1.5rem 0rem 1.5rem;
}
.icono{
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
}
.lbContacto{
  color: #999;
  font-size: 1.5rem;
  margin-right: 1rem;
}
.selectContacto{
  width: 27.75rem;
  height: 2rem;
  font-size: 1rem;
  border-radius: 0.3125rem;
  border: none;
  padding: 0.25rem 1rem;
}
.addContacto{
  margin-left: 1rem;
}
.filaContacto{
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: start;
}
table{
  background-color: aquamarine;
  width: 100%;
}
.inp{
  width: 16rem;
  height: 2rem;
  border-radius: 0.3125rem;
  border: none;
  padding: 1rem;
  margin-bottom: 1.5rem;
}
.filaMiniTabla{
  width: 100%;
  margin-bottom: 1rem;
}
.tablaContactos{
  margin: 1rem auto 1rem auto;
  width: 100%;
}
</style>