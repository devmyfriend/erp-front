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
      <div class="tablaContactos">
        <tablaInfinita :listado="ListadoContactos" :encabezados="['ContactoId', 'Nombres',	'Paterno',	'Materno',	'Departamento']" :acciones="2"/>
      </div>
    </div>

    <div class="filaContacto">
      <div class="formulario">
        <input  v-model="telefono" type="text" placeholder="Teléfono" class="inp">
        <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarDatos(1)">
      </div>

      <div class="filaMiniTabla">
        <tablaInfinita :listado="ListadoTelefonos" :encabezados="headsTelefono" />
      </div>
    </div>

    <div class="filaContacto">
      <div class="formulario">
        <input  v-model="correo" type="text" placeholder="Correo e." class="inp">
        <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarDatos(2)">
      </div>

      <div class="filaMiniTabla">
        <tablaInfinita :listado="ListadoCorreos" :encabezados="headsCorreo" />
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import tablaInfinita from '@/shared/sTablaInfinita.vue';
const { useContacto } = require('../store/contacto')
const store = useContacto()
const props = defineProps({
  id: {
    type: String,
    default: '1'
  }
})

const ListadoContactos = ref([])
const headsContacto = ref([])

const ListadoTelefonos = ref([])
const headsTelefono = ref([])

const ListadoCorreos = ref([])
const headsCorreo = ref([])

const telefono = ref('')
const correo = ref('')

onMounted(() => {
  store.cargarContactos(props.id).then(() =>{
    loadContactos()
    loadTelMail()
  })
})

function loadContactos(){
  store.cargarContactos(props.id).then(() =>{
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
    headsContacto.value = Object.keys(ListadoContactos.value[0]);
  });
}

function loadTelMail(){
  store.cargarTelMails(props.id).then(() =>{
    ListadoTelefonos.value = store.listaTelefono
    ListadoCorreos.value = store.listaCorreo

    ListadoTelefonos.value = ListadoTelefonos.value.map(telefono => {
      return {
          EntidadNegocioId: telefono.EntidadNegocioId,
          TelefonoId: telefono.TelefonoId,
          NumeroTelefonico: telefono.NumeroTelefonico,
      };
    });

    ListadoCorreos.value = ListadoCorreos.value.map(correo => {
      return {
          EntidadNegocioId: correo.EntidadNegocioId,
          EmailId: correo.EmailId,
          Email: correo.Email
      };
    });

    headsTelefono.value = Object.keys(ListadoTelefonos.value[0]);
    headsCorreo.value = Object.keys(ListadoCorreos.value[0]);
    });
}

function abrirMContacto(){
  alert('abrir modal')
}

function agregarDatos(opc){
  if(opc == 1 && validar(1, telefono.value)){
    const contenido = {
      EntidadNegocioId: props.id,
      NumeroTelefonico: telefono.value,
      CreadoPor: '0'
    }
    store.crearTelefono(contenido).then((res) =>{
      if(res){
        //sweetalert
        telefono.value = ''
        loadTelMail()
      }
    }) 
  }else if (opc == 2 && validar(2, correo.value)){
    const contenido = {
      EntidadNegocioId: props.id,
      Email: correo.value,
      CreadorPor: '0'
    }
    store.crearCorreo(contenido).then((res) =>{
      if(res){
        //sweetalert
        correo.value = ''
        loadTelMail()
      }
    })
  }
}

function validar(opc, txt){
  if(txt == '' || txt == null || txt == undefined || txt == ' '){
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
</script>

<style scoped>
h1{
  text-align: start;
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