<template>
    <div class="paginador">
        <div class="paginacion d-flex align-items-center justify-content-center mx-auto mt-4" style="width: 44rem; height: 1.5rem; font-size: 0.75rem;">
            <img class="btPag h-100 mx-3 bg-light px-3 py-1 rounded" src="@/assets/img/firstIco.svg" alt="Primera página">
            <img class="btPag h-100 ms-2 me-4 bg-light px-3 py-1 rounded" src="@/assets/img/prevIco.svg" alt="Página anterior" >
            <div class="inp d-flex" style="max-width: 10rem;">
                <input class="w-50 ms-1 bg-light text-center border-0 text-decoration-underline rounded" type="number" v-model="pagAct">
                <img class="h-100 mx-3 px-0 py-1" src="@/assets/img/midIco.svg" alt="separador">
                <input class="w-50 ms-1 bg-light text-center border-0 text-decoration-underline rounded" type="number" v-model="pagMax" disabled>
            </div>
            <img class="btPag h-100 ms-4 me-2 bg-light px-3 py-1 rounded" src="@/assets/img/nxtIco.svg" alt="Página siguiente">
            <img class="btPag h-100 mx-3 bg-light px-3 py-1 rounded" src="@/assets/img/lastIco.svg" alt="Última página">
            <button @click="fragmentar"> asdasd </button>
        </div>
    </div>
</template>

<script>
import { defineProps , ref, defineEmits } from 'vue';

export default {
    name: 'Paginador',
    props: {
        registros: {
            type: Array,
            required: true
        }
    },
    methods: {
        devolverPagina() {
            emit('devolver-pagina', paginas.value);
        },
    },

    
    setup(props , { emit }) {
        const paginas = ref([]);
        let pagAct = ref(1);
        let pagMax = ref(1);

        function fragmentar(){
            paginas.value = props.registros.slice(2, 4);
            emit('devolver-pagina', paginas.value);
            alert( paginas.value.length );
            console.log("Se están emitiendo las páginas nuevas:");
        }

        return {
            paginas,
            fragmentar,
            pagAct,
            pagMax
        };
    }
};
</script>
