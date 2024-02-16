<template lang="es">
    <div class="contenedor">
        <header>
            <h1>Métodos y Formas de Pago</h1>
        </header>
        <div class="contenido">
            
            <div class="formasPago" @mouseenter="tipo = 1">
                <div class="headerFormulario">
                    <h2> Formas de pago </h2>
                    <button class="btAgregar" @click="mFormas.show()"> Agregar Forma de Pago </button>
                </div>
                <buscadorFormasPago/>
                <TablaInfinita
                    class="mt-4"
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

            <div class="metodosPago" @mouseenter="tipo = 2">
                <div class="headerFormulario">
                    <h2> Metodos de pago </h2>
                    <button class="btAgregar" @click="mMetodos.show()"> Agregar Metodo de Pago </button>
                </div>
                <div >
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
    </div>
    
  <!-- Modal Formas -->
  <div class="modal modal-xl fade" id="mFormasPago" tabindex="-1" ref="ModalFormas">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="mFormasPagoLabel">Formas de pago</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="limpiar"></button>
        </div>
        <div class="modal-body">
            <div class="formulario">
                <input type="text" placeholder="Clave Formas de Pago" class="ClaveFormasPago" v-model="ClaveForma" :disabled="editandoFormas">
                <input type="text" placeholder="Descripción" class="DescripcionFormasPago" v-model="DescripcionForma">
                <label for="bancarizado" class="labelBancarizado"> Bancarizado: </label>
                <input type="checkbox" name="bancarizado" id="bancarizado" class="mx-3" v-model="BancarizadoForma" :checked="BancarizadoForma">
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="agregarRegistro(1)">Guardar</button>  
        </div>
      </div>
    </div>
  </div>
    <!-- Modal Metodos-->
  <div class="modal modal-xl fade" id="mMetodosPago" tabindex="-1" ref="ModalMetodos">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="mMetodosPagoLabel">Metodos de pago</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="limpiar"></button>
        </div>
        <div class="modal-body">
            <div class="formulario">
                <input type="text" placeholder="Clave Metodo de Pago" class="ClaveFormasPago" v-model="ClaveMetodo" :disabled="editandoMetodos">
                <input type="text" placeholder="Descripción" class="DescripcionFormasPago" v-model="DescripcionMetodo">
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="agregarRegistro(2)">Guardar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import buscadorFormasPago from '@/modules/formasPago/components/buscadorFormasPago.vue'
import TablaInfinita from '@/shared/sTablaInfinita.vue'
import {Modal} from 'bootstrap'
import Swal from 'sweetalert2'

const { useFormasMetodosPago } = require('../store/formasPago.js')
const store = useFormasMetodosPago();

const ListadoFormasPago = ref([]);
const ListadoMetodosPago = ref([]);
const encabezadosFormas = ref(['','Clave Forma Pago','Descripcion', 'Bancarizado']);
const encabezadosMetodos = ref(['','Clave Metodo Pago','Descripcion']);
const paginadoFormas = ref(7);
const paginadoMetodos = ref(2); 
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

const showModalFormas = ref(false);
const ModalFormas = ref(null);
let mFormas = null;
const ModalMetodos = ref(null);
let mMetodos = null;


onMounted(() => {
    ajutarListado();
    mFormas = new Modal(ModalFormas.value);
    mMetodos = new Modal(ModalMetodos.value);
})

function ajutarListado() {
    store.cargarFormasMetodos().then((res) => {
        if (res) {
            ListadoFormasPago.value = store.getFormas;
            ListadoFormasPago.value = ListadoFormasPago.value.map(item => {
                return {
                    void: '',
                    ClaveFormaPago: item.ClaveFormaPago,
                    Descripcion: item.Descripcion,
                    Bancarizado: item.Bancarizado,
                };
            });
            
            ListadoMetodosPago.value = store.getMetodos;
            ListadoMetodosPago.value = ListadoMetodosPago.value.map(item => {
                return {
                    void: '',
                    ClaveMetodoPago: item.ClaveMetodoPago,
                    Descripcion: item.Descripcion,
                };
            });
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
            mFormas.show();
        }else if(tipo.value == 2){
            editandoMetodos.value = true;
            ClaveMetodo.value = data.ClaveMetodoPago;
            DescripcionMetodo.value = data.Descripcion;
            mMetodos.show();
        }
    }
    else if(opc == 2){ //eliminar
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                if(tipo.value == 1){
                    store.eliminarFormaPago(data.ClaveFormaPago).then((res) => {
                        if(res){
                            ajutarListado();
                        }
                    });
                }else if(tipo.value == 2){
                    store.eliminarMetodoPago(data.ClaveMetodoPago).then((res) => {
                        if(res){
                            ajutarListado();
                        }
                    });
                }
            }
        });
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
            editandoFormas.value = false;
            mFormas.hide();
            limpiar();
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
            editandoMetodos.value = false;
            mMetodos.hide();
            limpiar();
        }
    }
    else{
        if(opc == 1){
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
            mFormas.hide();
            limpiar();
        }
        else if(opc == 2){
            const body = {
                ClaveMetodoPago: ClaveMetodo.value,
                Descripcion: DescripcionMetodo.value
            }
            store.agregarMetodoPago(body).then((res) => {
                if(res){
                    ajutarListado();
                }
            });
            mMetodos.hide();
            limpiar();
        }
    }
}

function limpiar(){
    ClaveForma.value = '';
    ClaveMetodo.value = '';
    DescripcionMetodo.value = '';
    DescripcionForma.value = '';
    BancarizadoForma.value = false;
    editandoFormas.value = false;
    editandoMetodos.value = false;
}
</script>

<style>
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
        padding-bottom: 1.5rem;
        width: 100%;
        background-color: white;
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
        border-radius: 5px;
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

    .modal-xl input{
        border: 1px solid #000;
    }
    .headerFormulario{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2rem;
        margin: 1.5rem auto;
    }
    .btAgregar{
        background-color: #999999;
        color: #fff;
        border: none;
        border-radius: 0.3125rem;
        font-size: 1rem;
        cursor: pointer;
        padding: 0.5rem 1rem;
        /* height: 2rem; */
    }
    h1,h2{
        font-weight: bold;
        font-size: 1.75rem;
    }
</style>