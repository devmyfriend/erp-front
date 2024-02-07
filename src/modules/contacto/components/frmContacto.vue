<template>
  <div class="contenedorPadre">
    <div>
      <h1> Contacto </h1>
    </div>
    <div class="filaContacto">
      <label for="selectContacto" id="lbContacto" class="lbContacto"> Contacto </label>
      <select v-for="contactos in ListadoContactos" :key="ContactoId" class="selectContacto">
        <option :value="contactos.ContactoId"> {{ contactos.Nombres }} {{ contactos.ApellidoPaterno }} {{ contactos.ApellidoMaterno }} </option>
      </select>
      <img src="@/assets/img/AddUser.svg" class="icono addContacto">
      <div class="tablaContactos">
      <tablaInfinita :listado="ListadoContactos" :encabezados="headsContacto"/>
      </div>
    </div>
    <div class="filaContacto">
      <input type="text" placeholder="Teléfono" class="inp">
      <img src="@/assets/img/AddUser.svg" class="icono addContacto">
      <div class="filaMiniTabla">
        <tablaInfinita :listado="ListadoTelefonos" :encabezados="headsTelefono" />
      </div>
    </div>
    <div class="filaContacto">
      <input type="text" placeholder="Correo e." class="inp">
      <img src="@/assets/img/AddUser.svg" class="icono addContacto">
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
    console.log('[OnMounted] ListadoContactos: ', JSON.stringify(ListadoContactos.value));
    console.log('[OnMounted] ID: ', props.id, ' y encabezados: ', headsContacto.value);
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

    ListadoContactos.value = ListadoContactos.value.map(correo => {
      return {
          EntidadNegocioId: correo.EntidadNegocioId,
          EmailId: correo.EmailId,
          Email: correo.Email
      };
    });

    headsTelefono.value = Object.keys(ListadoTelefonos.value[0]);
    headsContacto.value = Object.keys(ListadoCorreos.value[0]);

    console.log('[OnMounted] ListadoTelefonos: ', JSON.stringify(ListadoTelefonos.value), '\nListadoCorreos: ', JSON.stringify(ListadoCorreos.value));
    console.log('[OnMounted] ID: ', props.id, ' y encabezadosTel: ', headsTelefono.value, '\nID: ', props.id, ' y encabezadosCorreo: ', headsContacto.value);
  });
}
</script>

<style scoped>
.contenedorPadre{
  height: 100%;
  width: 650px;
  background-color: transparent;
  padding: 1.5rem;
}
.icono{
  height: 1.5rem;
  width: 1.5rem;
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
  color: blue !important;
}
.addContacto{
  margin-left: 1rem;
}
.filaContacto{
  margin-bottom: 1.25rem;
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
}
.filaMiniTabla{
  display: flex;
  flex-direction: column;
  align-items:start;

  margin-bottom: 1rem;
}
.tablaContactos{
  margin: 1rem auto 1rem auto;
}
</style>