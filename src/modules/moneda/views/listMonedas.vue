<template lang="es">
    <div class="contenedor">
        <header>
            <h1> Tipos de moneda</h1>
        </header>
        <div class="contenido">
            <buscadorMonedas
                @eBusqueda="esperarBusqueda"
            />
            <div class="formulario">
                <div class="mensaje" v-if="editado">
                    <label class="msjEditado">Actualizando Moneda</label>
                </div>
                <input type="text" placeholder="Clave Moneda" class="ClaveMoneda" v-model="ClaveMoneda">
                <input type="text" placeholder="Nombre" class="NombreMoneda" v-model="Descripcion">
                <img 
                    src="@/assets/img/plus.png" 
                    alt="AñadirComprobante" 
                    class="iconoAgregar"
                    @click="agregarRegistro"
                >
            </div>
            <TablaInfinita
                class="mt-4"
                :listado="ListadoMonedas"
                :encabezados="encabezados"
                :paginado="paginado"
                :acciones="acciones"
                :pBusqueda="pBusqueda"
                :pAccion="pAccion"
                @eBusqueda="esperarBusqueda"
                @eAccion="esperarAccion"
            />

            <button @click="busqueda"> asd</button>
        </div>
    </div>
</template>

<script setup>
import buscadorMonedas from '@/modules/moneda/components/buscadorMonedas.vue'
import { ref, onMounted } from 'vue'
import TablaInfinita from '@/shared/sTablaInfinita.vue';
const { useMonedas } = require('../store/moneda.js')
const store = useMonedas();

const ListadoMonedas = ref([]);
const acciones = ref(2);
const paginado = ref(15);
const encabezados = ref(['','Clave Moneda', 'Nombre', 'Estatus']);
const pBusqueda = ref(false);
const pAccion = ref(false);
const ClaveMoneda = ref('');
const Descripcion = ref('');
const editado = ref(false);

onMounted(() => {
    recargarDatos();
});

function busqueda(){ //Cambiar en el buscador
    store.buscarMoneda('Peso').then(() => {
        ListadoMonedas.value = store.getMonedas;
        ListadoMonedas.value = ListadoMonedas.value.map(moneda => {
            return {
                void: '',
                ClaveMoneda: moneda.ClaveMoneda,
                Descripcion: moneda.Descripcion,
                Activo: moneda.Activo,
            };
        });
    })
}

function recargarDatos(){
    store.cargarMonedas().then(() =>{
        ListadoMonedas.value = store.getMonedas;
        ListadoMonedas.value = ListadoMonedas.value.map(moneda => {
        return {
            void: '',
            ClaveMoneda: moneda.ClaveMoneda,
            Descripcion: moneda.Descripcion,
            Activo: moneda.Activo,
            };
        });
    });
}

function esperarBusqueda(){
    pBusqueda.value = !pBusqueda.value;
    console.log('pBusqueda: ', pBusqueda.value);
    if(pBusqueda.value){
        /* recargarDatos(); */
        console.log('Recargar datos');
    }
}

function esperarAccion(opc, data){
    if(opc>0){
        pAccion.value = !pAccion.value;
        console.log('pAccion: ', pAccion.value);
        if(pAccion.value){
            if(opc === 1){
                ClaveMoneda.value = data.ClaveMoneda;
                Descripcion.value = data.Descripcion;
                editado.value = true;
            }
            else if(opc === 2){
                const body = {
                    ClaveMoneda: data.ClaveMoneda
                }
                store.borrarMoneda(body).then((res) => {
                    if(res){
                        recargarDatos();
                    }
                });
            }
        }
    }else{
        pAccion.value = false;
    }
}

function agregarRegistro(){
    const body = {
            ClaveMoneda: ClaveMoneda.value,
            Descripcion: Descripcion.value,
            Activo: true
    }

    console.log('Body: ', JSON.stringify(body));

    if(editado.value){
        ClaveMoneda.value = '';
        Descripcion.value = '';
        store.editarMoneda(body).then((res) => {
            if(res){
                recargarDatos();
            }
        });
    }else{
        console.log('NuevoRegistro: ');
        store.agregarMoneda(body).then((res) => {
            if(res){
                recargarDatos();
            }
        });
    }
    editado.value = false;
}

</script>

<style scoped>
    .contenedor {
        background-color: #D9D9D9;
        width: 100%;
        height: 54rem;
    }
    header {
        width: 100%;
        text-align: start;
    }
    .contenido{
        width: auto;
        margin: 1rem;
    }
    h1{
        margin: 0;
        padding-bottom: 1rem;
        width: 100%;
        background-color: white;
        text-align: start;
        color: #000;
        font-size: 1.75rem;
        font-weight: bold;
    }
    .formulario{
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin-top: 1rem;
    }
    .ClaveMoneda, .NombreMoneda, .ValorMoneda {
        height: 2.1875rem;
        border: none;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
    }
    .ClaveMoneda{
        width: 18.75rem;
    }
    .NombreMoneda{
        width: 21.875rem;
        margin-left: 0.5rem;
    }
    .ValorMoneda{
        width: 13.1875rem;
        margin-left: 0.5rem;
    }
    .iconoAgregar{
        width: 1.375rem;
        height: 1.375rem;
        margin: auto;
        margin-left: 0.5rem;
        cursor: pointer;
    }
    .msjEditado{
        color: red;
        font-weight: 700;
        margin: auto 1rem auto 0;
    }
</style>