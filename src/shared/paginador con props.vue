<template>
    <p> {{ paginas }}</p>
    <button @click="fragmentar"> paginas </button>
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
    setup(props , { emit }) {
        const paginas = ref([]);

        function fragmentar(){
            paginas.value = props.registros.slice(2, 4);
            emit('paginasActualizadas', paginas.value);
        }

        return {
            paginas,
            fragmentar
        };
    }
};
</script>
