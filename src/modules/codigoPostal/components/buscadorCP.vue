<template>
    <div class="fila">
        <input type="text" placeholder="77534">
        <img src="@/assets/img/buscador.svg" alt="Icono de buscador" class="iconoBuscador" @click="buscar">
    </div>
</template>

<script setup>
</script>

<style>
input {
    width: 29rem;
    height: 2.1875rem;
    border: none;
    border-radius: 0.3125rem;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
}
.iconoBuscador{
    width: 1.375rem;
    height: 1.375rem;
    margin: auto;
    margin-left: 0.5rem;
}
.fila {
  display: flex;
}

::placeholder {
    font-style: italic;
    color: #bdbdbdda;
}
</style>