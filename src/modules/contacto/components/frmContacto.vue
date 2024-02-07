<template>
  <div class="contenedorPadre">
    <div>
      <h1> Contacto </h1>
    </div>
    <div class="filaContacto">
      <label for="selectContacto" id="lbContacto" class="lbContacto"> Contacto </label>
      <select id="selectContacto" name="selectContacto" class="selectContacto">
        <option value="1">Contacto 1</option>
        <option value="2">Contacto 2</option>
        <option value="3">Contacto 3</option>
      </select>
      <img src="@/assets/img/AddUser.svg" class="icono addContacto">
      <div class="tablaContactos">
      <tablaInfinita></tablaInfinita>
      </div>
    </div>
    <div class="filaContacto">
      <input type="text" placeholder="Teléfono" class="inp">
      <img src="@/assets/img/AddUser.svg" class="icono addContacto">
      <div class="filaMiniTabla">
        <tablaInfinita></tablaInfinita>
      </div>
    </div>
    <div class="filaContacto">
      <input type="text" placeholder="Correo e." class="inp">
      <img src="@/assets/img/AddUser.svg" class="icono addContacto">
      <div class="filaMiniTabla">
        <tablaInfinita></tablaInfinita>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import tablaInfinita from '@/shared/sTablaInfinita.vue';
const { useContacto } = require('../store/contacto')
const store = useContacto()

const ListadoContactos = ref([])
const ListadoTelefonos = ref([])
const ListadoCorreos = ref([])

onMounted(() => {
  ListadoContactos.value = store.cargarContactos().then(() =>{
    console.log('[OnMounted] ListadoContactos: ', JSON.stringify(ListadoContactos.value));
  })
})

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