<template>
    <router-link :to="{ name: 'formularioCFDi' }">
        <button class="BotonNuevo"> NUEVO </button>
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

@import url('../../../styles/btNuevo.css');

</style>