<template lang="es">
    <div class="contenedor">
        <header>
            <h1>Métodos y Formas de Pago</h1>
        </header>
        <div class="contenido">
            <div class="headerFormulario">
                <h2> Formas de pago <span :class=" {editando: editandoFormas}"> {{TittleFormas}} </span></h2>
            </div>
            <buscadorFormasPago/>
            <div class="formulario">
                <input type="text" placeholder="Clave Formas de Pago" class="ClaveFormasPago" v-model="ClaveForma" :disabled="editandoFormas">
                <input type="text" placeholder="Descripción" class="DescripcionFormasPago" v-model="DescripcionForma">
                <label for="bancarizado" class="labelBancarizado"> Bancarizado: </label>
                <input type="checkbox" name="bancarizado" id="bancarizado" class="mx-3" v-model="BancarizadoForma" :checked="BancarizadoForma">
                <img src="@/assets/img/plus.png" alt="AñadirComprobante" class="iconoAgregar" @click="agregarRegistro(1)">
            </div>
            <!-- <button @click="test"> test </button -->>
            <div @mouseenter="tipo = 1">
                <TablaInfinita
                    :listado="ListadoFormasPago"
                    :encabezados="encabezadosFormas"
                    :paginado="paginadoFormas"
                    :acciones="accionesFormas"
                    :pAccion="pAccion"
                    :pBusqueda="pBusqueda"
                    @eAccion="esperarAccion"
                    @eBusqueda="esperarBusqueda"
                />
            </div>
            <div class="headerFormulario">
                <h2> Metodos de pago <span :class="{editando: editandoMetodos}"> {{TittleMetodos}}</span></h2>
            </div>
            <div class="formulario">
                <input type="text" placeholder="Clave Metodo de Pago" class="ClaveFormasPago" v-model="ClaveMetodo" :disabled="editandoMetodos">
                <input type="text" placeholder="Descripción" class="DescripcionFormasPago" v-model="DescripcionMetodo">
                <img src="@/assets/img/plus.png" alt="AñadirComprobante" class="iconoAgregar" @click="agregarRegistro(2)">
            </div>
            <!-- <button @click="test2"> test2 </button> --> 
            <div @mouseenter="tipo = 2">
                <TablaInfinita
                    :listado="ListadoMetodosPago"
                    :encabezados="encabezadosMetodos"
                    :paginado="paginadoMetodos"
                    :acciones="accionesMetodos"
                    :pAccion="pAccion"
                    :pBusqueda="pBusqueda"
                    @eAccion="esperarAccion"
                    @eBusqueda="esperarBusqueda" 
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import buscadorFormasPago from '@/modules/formasPago/components/buscadorFormasPago.vue'
import TablaInfinita from '@/shared/sTablaInfinita.vue'



const { useFormasMetodosPago } = require('../store/formasPago.js')
const store = useFormasMetodosPago();

const ListadoFormasPago = ref([]);
const ListadoMetodosPago = ref([]);
const encabezadosFormas = ref(['ClaveFormaPago','Descripcion', 'Bancarizado', 'Estatus']);
const encabezadosMetodos = ref(['ClaveMetodoPago','Descripcion', 'Estatus']);
const paginadoFormas = ref(7);
const paginadoMetodos = ref(3); 
const accionesFormas = ref(2);
const accionesMetodos = ref(2);

const pAccion = ref(false)
const pBusqueda = ref(false)

const tipo = ref(0)
const ClaveForma = ref('')
const DescripcionForma = ref('')
const BancarizadoForma = ref(false)

const editandoFormas = ref(false)
const editandoMetodos = ref(false)

const ClaveMetodo = ref('')
const DescripcionMetodo = ref('')

const TittleFormas = computed(() => {
    if(editandoFormas.value){
        return '| Editando ';
    }else{
        return '';
    }
});
const TittleMetodos = computed(() => {
    if(editandoMetodos.value){
        return '| Editando ';
    }else{
        return '';
    }
});

onMounted(() => {
    ajutarListado();
})

function ajutarListado() {
    store.cargarFormasMetodos().then((res) => {
        if (res) {
            ListadoFormasPago.value = store.getFormas;
            ListadoMetodosPago.value = store.getMetodos;
        }
    });
}

function busqueda(){

}

function esperarBusqueda(){

}

function esperarAccion(opc, data){
    if(opc == 1){ //editar
        if(tipo.value == 1){
            editandoFormas.value = true;
            ClaveForma.value = data.ClaveFormaPago;
            DescripcionForma.value = data.Descripcion;
            BancarizadoForma.value = data.Bancarizado == 1 ? true : false;
        }else if(tipo.value == 2){
            editandoMetodos.value = true;
            ClaveMetodo.value = data.ClaveMetodoPago;
            DescripcionMetodo.value = data.Descripcion;
        }
    }
    else if(opc == 2){ //eliminar
        if(tipo.value == 1){
            store.eliminarFormaPago(data.ClaveFormaPago).then((res) => {
                if(res){
                    ajutarListado();
                }
            });
            console.log('eliminar formas', JSON.stringify(data.ClaveFormaPago));
        }else if(tipo.value == 2){
            store.eliminarMetodoPago(data.ClaveMetodoPago).then((res) => {
                if(res){
                    ajutarListado();
                }
            });
            console.log('eliminar metodos', JSON.stringify(data.ClaveMetodoPago));
        }
    }
}

function agregarRegistro(opc){
    if(editandoFormas.value || editandoMetodos.value){
        if(tipo.value == 1 && editandoFormas.value){
            const body = {
                ClaveFormaPago: ClaveForma.value,
                Descripcion: DescripcionForma.value,
                Bancarizado: BancarizadoForma.value
            }
            store.editarFormaPago(body).then((res) => {
                if(res){
                    ajutarListado();
                }
            });
            console.log('editar formas', JSON.stringify(body));
        }
        else if (tipo.value == 2 && editandoMetodos.value){
            const body = {
                ClaveMetodoPago: ClaveMetodo.value,
                Descripcion: DescripcionMetodo.value
            }
            store.editarMetodoPago(body).then((res) => {
                if(res){
                    ajutarListado();
                }
            });
            console.log('editar metodos', JSON.stringify(body));
        }
    }
    else{
        if(opc == 1){
            console.log('agregar formas', ClaveForma.value, DescripcionForma.value, BancarizadoForma.value);
            const body = {
                ClaveFormaPago: ClaveForma.value,
                Descripcion: DescripcionForma.value,
                Bancarizado: BancarizadoForma.value
            }
            store.agregarFormaPago(body).then((res) => {
                if(res){
                    ajutarListado();
                }
            });

        }
        else if(opc == 2){
            console.log('agregar metodos', ClaveMetodo.value, DescripcionMetodo.value);
            const body = {
                ClaveMetodoPago: ClaveMetodo.value,
                Descripcion: DescripcionMetodo.value
            }
            store.agregarMetodoPago(body).then((res) => {
                if(res){
                    ajutarListado();
                }
            });
        }
    }

    if(opc == 1){
        ClaveForma.value = '';
        DescripcionForma.value = '';
        BancarizadoForma.value = false;
    }
    else if(opc == 2){
        ClaveMetodo.value = '';
        DescripcionMetodo.value = '';
    }
}
</script>

<style scoped>
    h2{
        margin-top: 2rem;
        margin-bottom: 2rem;
    }

    @import url('../../../styles/checkbox.css');

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
    }

    .headerFormulario{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: 2rem;
        margin: 1rem 0rem 1rem 0rem;
    }
    .editando{
        color: rgb(210, 144, 21);
        font-weight: bold;
    }
    input:disabled{
        background-color: #c9c9c9;
    }
    .formulario{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        margin-top: 1rem;
    }
    .ClaveFormasPago, .DescripcionFormasPago {
        height: 2.1875rem;
        border: none;
        border-radius: 0.3125rem;
        padding: 0.5rem;
        font-size: 1rem;
        outline: none;
    }
    .ClaveFormasPago{
        width: 20rem;
    }
    .DescripcionFormasPago{
        width: 55.8125rem;
        margin-left: 0.5rem;
    }
    .iconoAgregar{
    width: 1.375rem;
    height: 1.375rem;
    margin: auto;
    margin-left: 0.5rem;
    vertical-align: middle;
    cursor: pointer;
    }
    .labelBancarizado{
        margin-left: 1rem;
        font-size: 1rem;
    }
</style>