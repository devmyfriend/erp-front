<template>
    <div class="paginador">
        <!-- Contenido del componente -->
        <div class="paginacion d-flex align-items-center justify-content-center mx-auto mt-4" style="width: 44rem; height: 1.5rem; font-size: 0.75rem;">
            <img class="btPag h-100 mx-3 bg-light px-3 py-1 rounded" src="@/assets/img/firstIco.svg" alt="Primera página" @click="gotoMin">
            <img class="btPag h-100 ms-2 me-4 bg-light px-3 py-1 rounded" src="@/assets/img/prevIco.svg" alt="Página anterior" @click="redPag">
            <div class="inp d-flex" style="max-width: 10rem;">
                <input class="w-50 ms-1 bg-light text-center border-0 text-decoration-underline rounded" type="number" v-model="pagAct">
                <img class="h-100 mx-3 px-0 py-1" src="@/assets/img/midIco.svg" alt="separador">
                <input class="w-50 ms-1 bg-light text-center border-0 text-decoration-underline rounded" type="number" v-model="pagMax" disabled>
            </div>
            <img class="btPag h-100 ms-4 me-2 bg-light px-3 py-1 rounded" src="@/assets/img/nxtIco.svg" alt="Página siguiente" @click="incPag">
            <img class="btPag h-100 mx-3 bg-light px-3 py-1 rounded" src="@/assets/img/lastIco.svg" alt="Última página" @click="gotoMax">
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
let pagAct = ref(1);
let pagMax = ref(3);

const gotoMax = () => {
    pagAct.value = pagMax.value;
    console.log('La página max es: ' + pagMax.value + ' \n La página actual es: ' + pagAct.value);
    return pagAct.value;
};
const gotoMin = () => {
    pagAct.value = 1;
    console.log('La página min es: ' + '1' + ' \n La página actual es: ' + pagAct.value);
    return pagAct.value;
};
const incPag = () => {
    if (pagAct.value < pagMax.value) {
        pagAct.value++;
        console.log('Se aumentó la pág. La página max es: ' + pagMax.value + ' \n La página actual es: ' + pagAct.value);
    }else{
        console.log('NO se aumentó la pág. La página max es: ' + pagMax.value + ' \n La página actual es: ' + pagAct.value);
    }
    return pagAct.value;
};
const redPag = () => {
    if (pagAct.value > 1) {
        pagAct.value--;
        console.log('Se decrementó la pág. La página min es: ' + '1' + ' \n La página actual es: ' + pagAct.value);
    }else{
        console.log('NO se decrementó la pág. La página min es: ' + '1' + ' \n La página actual es: ' + pagAct.value);
    }
    return pagAct.value;
};

export default {
    name: 'NombreDelComponente',
    setup() {
       
        return {
            pagAct,
            pagMax,
            incPag,
            redPag,
            gotoMax,
            gotoMin,
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
.btPag{
    cursor: pointer;
}
</style>