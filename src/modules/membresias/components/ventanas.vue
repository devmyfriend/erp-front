<script setup>  
const props = defineProps({
    moduloActivo: {
        type: Number,
        default: 0
    }
})
</script>

<template>
    <div class="ventanas">
        <router-link class="ventana" :class="{btActivo: moduloActivo == 1}" :to="{ name: 'listadoMembresias', params: {tipo: 1} }"> Listado Membresías    </router-link>
        <router-link class="ventana" :class="{btActivo: moduloActivo == 2}" :to="{ name: 'tipoMembresias', params: {tipo: 2} }"> Tipo Membresías       </router-link>
        <router-link class="ventana" :class="{btActivo: moduloActivo == 3}" :to="{ name: 'periodoMembresias', params: {tipo: 3} }"> Periodos              </router-link>
    </div>
</template>

<style scoped>
.ventanas{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 2rem;
    min-height: 2rem;
    max-height: 2rem;
    padding: 0;
}
.ventana{
    border: 1px solid #000;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: #999;
    height: 2rem;
    max-height: 2rem;
    padding: 0 1rem 0 1rem;

    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: #fff;
    text-transform: capitalize;
    text-align: center;
    line-height: 2rem;
    cursor: pointer;
    text-decoration: none;
    display: flex;
}
.ventana:first-of-type{
    border-left: none;
    border-bottom-left-radius: 0px
}
.ventana:hover, .btActivo{
    background-color: #fff;
    transition: 0.5s;
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    color: #000;
}
</style>