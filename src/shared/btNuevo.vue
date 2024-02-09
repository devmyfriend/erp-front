<template>
    <router-link :to="{ name: 'formulario', params: { esPropietaria: true, id: 5 } }">
        <button class="btn"> NUEVO </button>
    </router-link>
</template>

<script>
export default {
    name: 'btNuevo',
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style scoped>
button{
    background-color: #999999;
    color: #FFFFFF;
    width: 9.375rem;
}
button:hover{
    background-color: #696969;
    color: #D9D9D9;
}
button:active{
    background-color: #343A40 !important;
    color: #D9D9D9 !important; 
}
</style>