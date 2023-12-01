<template>
    <div class="paginador">
        <!-- Contenido del componente -->
        <div class="paginacion d-flex align-items-center justify-content-center mx-auto mt-4" style="width: 44rem; height: 1.5rem; font-size: 0.75rem;">
            <img class="h-100 mx-3 bg-light px-3 py-1 rounded" src="@/assets/img/firstIco.svg" alt="Primera página">
            <img class="h-100 ms-2 me-4 bg-light px-3 py-1 rounded" src="@/assets/img/prevIco.svg" alt="Página anterior">
            <div class="inp d-flex" style="max-width: 10rem;">
                <input class="w-50 ms-1 bg-light text-center border-0 text-decoration-underline rounded" type="number" value="1" active>
                <img class="h-100 mx-3 px-0 py-1" src="@/assets/img/midIco.svg" alt="separador">
                <input class="w-50 ms-1 bg-light text-center border-0 text-decoration-underline rounded" type="number" value="2">
            </div>
            <img class="h-100 ms-4 me-2 bg-light px-3 py-1 rounded" src="@/assets/img/nxtIco.svg" alt="Página siguiente">
            <img class="h-100 mx-3 bg-light px-3 py-1 rounded" src="@/assets/img/lastIco.svg" alt="Última página">
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
let pagAct = 1;
let pagMax = 3;

console.log('La página max es: ' + pagMax + ' \n La página actual es: ' + pagAct);

export default {
    name: 'NombreDelComponente',
    setup() {
       
        return {
        };
    },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.paginacion{
    width: 40%;
  }
</style>