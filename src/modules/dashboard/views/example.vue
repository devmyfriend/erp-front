<template>
  <div>
    <header>
      <!-- Aquí va el contenido del encabezado -->
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <!-- Aquí va el contenido del pie de página -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout',
}
</script>

<style scoped>
/* Aquí puedes agregar estilos específicos para el layout */
</style>
