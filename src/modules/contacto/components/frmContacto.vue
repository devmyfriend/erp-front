<template>
  <div class="contenedorPadre">
    <div class="row">
      <h1> Contacto </h1>
    </div>
    <div class="row">
      <label for="selectContacto" id="lbContacto"> Contacto </label>
      <select id="selectContacto" name="selectContacto" class="form-control">
        <option value="1">Contacto 1</option>
        <option value="2">Contacto 2</option>
        <option value="3">Contacto 3</option>
      </select>
      <img src="../assets/AddUser.svg">
    </div>
    <div class="row">
      <input type="text" placeholder="Teléfono">
      <img src="../assets/edit-icon.png">
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.contenedorPadre{
  height: 100%;
  width: 100%;
  background-color: transparent;
  padding: 1.5rem;
}
</style>