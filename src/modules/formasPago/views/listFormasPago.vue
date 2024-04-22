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
    const paginadoMetodos = ref(7); 
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
    function esperarBusqueda(txt){
        if(txt == ''){
            ajutarListado();
        }else{
            ListadoFormasPago.value = store.getFormas.data;
            ListadoFormasPago.value = ListadoFormasPago.value.map(item => {
                return {
                    void: '',
                    ClaveFormaPago: item.ClaveFormaPago,
                    Descripcion: item.Descripcion,
                    Bancarizado: item.Bancarizado,
                };
            });
        }
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

<template>
    <header>
        <h1>Métodos y Formas de Pago</h1>
    </header>
    <div class="contenedorPadre">
        <div class="formasPago" @mouseenter="tipo = 1">
            <div class="linea">
                <h2> Formas de pago </h2>
                <button class="btAgregar" @click="mFormas.show()"> Agregar Forma </button>
            </div>
            <div class="linea">
                <buscadorFormasPago @eBusqueda="esperarBusqueda"/>
            </div>
            <div class="tablaContainer tablaFormas">
                <TablaInfinita
                    class="w-100"
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
        </div>

        <div class="metodosPago" @mouseenter="tipo = 2">
            <div class="linea">
                <h2> Metodos de pago </h2>
                <button class="btAgregar" @click="mMetodos.show()"> Agregar Metodo </button>
            </div>
            <div class="tablaContainer tablaMetodos">
                <TablaInfinita
                    class="w-100"
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
    
  <!-- Modal Formas -->
  <div class="modal fade" id="mFormasPago" tabindex="-1" ref="ModalFormas">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="mFormasPagoLabel">Formas de pago</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="limpiar"></button>
        </div>
        <div class="modal-body">
                <input type="text" placeholder="Clave Formas de Pago" class="ClaveFormasPago" v-model="ClaveForma" :disabled="editandoFormas" minlength="1" maxlength="3">
                <input type="text" placeholder="Descripción" class="DescripcionFormasPago" v-model="DescripcionForma" minlength="1">
                <div class="inpBancarizado">
                    <label for="bancarizado" class="labelBancarizado"> Bancarizado: </label>
                    <input type="checkbox" name="bancarizado" id="bancarizado" v-model="BancarizadoForma" :checked="BancarizadoForma">
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
    <div class="modal fade" id="mMetodosPago" tabindex="-1" ref="ModalMetodos">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="mMetodosPagoLabel">Métodos de pago</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="limpiar"></button>
            </div>
            <div class="modal-body">
                <input type="text" placeholder="Clave Método de Pago" class="ClaveFormasPago" minlength="1" maxlength="3" v-model="ClaveMetodo" :disabled="editandoMetodos">
                <input type="text" placeholder="Descripción" class="DescripcionFormasPago" minlength="1" v-model="DescripcionMetodo">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="limpiar">Cerrar</button>
              <button type="button" class="btn btn-primary" @click="agregarRegistro(2)">Guardar</button>
            </div>
          </div>
        </div>
      </div>      
</template>

<style scoped>
@import url('../../../styles/checkbox.css');
.general-enter-active {
    animation: fadeIn 0.75s;
}
.general-leave-active {
    animation: fadeOut 0.25s;
}

@import url('../../../styles/tablaListado.css');

.filaDesactivada td{
    background-color: #999;
    display: none;          /* Ocultar fila desactivada */
}
.contenedorPadre {
    background-color: #fff;
    width: 100%;
    min-height: calc(100vh - 11rem);
    max-height: calc(100vh - 11rem);
    overflow: hidden;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}
h1{
    text-align: start;
    color: #fff;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-transform: capitalize;
}
h2{
    text-align: start;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0rem 0rem;
}
.btTabla{
    cursor: pointer;
}
.linea{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1.5rem;
}
.buscador{
    width: 30%;
}
.btAgregar{
    background-color: #353535;
    border: none;
    color: #fff;
    border-radius: 0.5rem;
    height: 2.1875rem;
    width: 15rem;
    font-weight: bold;
    letter-spacing: 0.25rem;
}
.modal-body{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.modal-body input[type="text"]{
    margin-bottom: 1rem;
}
.ClaveFormasPago, .DescripcionFormasPago {
    height: 2.1875rem;
    border: 1px solid #D9D9D9;
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
}
.ClaveFormasPago{
    width: 50%;
    border-radius: 0.5rem;
    border: 1px solid #D9D9D9;
}
.DescripcionFormasPago{
    width: 100%;
}
.inpBancarizado{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.labelBancarizado{
    margin-right: 1rem;
    font-size: 1rem;
}
input[type="checkbox"]{
    width: 1.5rem;
    height: 1.5rem;
}
.tablaContainer{
    display: flex;
    margin-top: 1.5rem;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.tablaFormas{
    height: 20rem;
    min-width: 20rem;
}
.tablaMetodos{   
    height: 15rem;
    min-width: 15rem;
}
input:disabled{
    background-color: #d9d9d9;
    color: #000;
}
.modal-title{
    color: #000;
    text-align: center;
    width: 100%;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
}
</style>