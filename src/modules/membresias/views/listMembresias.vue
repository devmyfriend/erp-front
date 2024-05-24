<script setup>
import { useRoute } from 'vue-router';
import ventanas from '../components/ventanas.vue';
import buscador from '../components/buscadorMembresias.vue';
import buscadorClaveUnidadSAT from '@/modules/productos/components/buscador/buscadorClaveUnidadSAT.vue';
import buscadorClaveProductoSAT from '@/modules/productos/components/buscador/buscadorClaveProductoSAT.vue';
import { computed, h, onMounted, ref, watch } from 'vue';
import { useMembresias } from '../store/membresias';
import { useProductos } from '@/modules/productos/store/productos';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
const storeProductos = useProductos();
const store = useMembresias();
const route = useRoute();

const ListadoClavesProdSerSAT = ref([]);
const ListadoClavesUnidadesSAT = ref([]);
const ListadoMembresias = ref([]);
const ListadoTipoMembresias = ref([]);
const nuevoRegistro = ref({});
const mostrarFrm = ref(false);
const modoFrm = ref(0);


const moduloActivo = ref( route.params.tipo ? parseInt(route.params.tipo) : 1);
const objModal = ref(false);
const refModal = ref(null);
const modoModal = ref(0);

const HoraEntrada = ref('');
const MinEntrada = ref('');
const HoraSalida = ref('');
const MinSalida = ref('');

onMounted(() => {
    cargarDatos();
    objModal.value = new Modal(refModal.value);
})

const cargarDatos = () => {
    store.cargarMembresias().then(() => {
        ListadoMembresias.value = store.getMembresias;
    })
    store.cargarTiposMembresias().then(() => {
        ListadoTipoMembresias.value = store.getTiposMembresias;
        nuevoRegistro.value.TipoMembresiaId = ListadoTipoMembresias.value[0].TipoMembresiaId;
    })
    
    storeProductos.cargarClavesUnidades(1).then(() => {
        ListadoClavesUnidadesSAT.value = storeProductos.getClavesUnidades.items;
    })
    storeProductos.cargarClavesProductos(1).then(() => {
        ListadoClavesProdSerSAT.value = storeProductos.getClavesProductos;
    })
}

const crearRegistro = () => {
    if(horarioFrm()){
         delete nuevoRegistro.value.MembresiaId;
        nuevoRegistro.value.Horario = `${nuevoRegistro.value.hEntrada},${nuevoRegistro.value.hSalida}`;
        nuevoRegistro.value.CreadoPor = 2;
        store.crearMembresia(nuevoRegistro.value).then(() => {
            cargarDatos();
            modoFrm.value = 0;
            mostrarFrm.value = false;
        })
        limpiarFrm();
    }else{
        Swal.fire({
            title: 'Error',
            text: 'La hora de salida debe ser mayor a la de entrada',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
        hEntrada.value = '';
        hSalida.value = ''; 
    }
}

const borrarRegistro = (data) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
        if (result.isConfirmed) {
            const body = {
                MembresiaId: data.MembresiaId,
                BorradoPor: 2
            }
            store.borrarMembresia(body).then((res) => {
                if(res){
                    cargarDatos();  
                    modoFrm.value = 0;
                }
            })
        }
    })
}

const subirDatos = (data) => {
    nuevoRegistro.value.MembresiaId = data.MembresiaId;
    nuevoRegistro.value.TipoMembresiaId = data.TipoMembresiaId;
    nuevoRegistro.value.NombreMembresia = data.NombreMembresia;
    nuevoRegistro.value.Descripcion = data.Descripcion;
    nuevoRegistro.value.Puntos = data.Puntos;
    nuevoRegistro.value.ClaveUnidadSat = data.ClaveUnidadsat;
    nuevoRegistro.value.ClaveProductoServicio = data.ClaveProdcutoServicio;
    nuevoRegistro.value.hEntrada = data.Horario.split(',')[0];
    nuevoRegistro.value.hSalida = data.Horario.split(',')[1];

    modoFrm.value = 2;
}

const actualizarRegistro = () => {
    if(horarioFrm()){
        nuevoRegistro.value.Horario = `${nuevoRegistro.value.hEntrada},${nuevoRegistro.value.hSalida}`;
        nuevoRegistro.value.ActualizadoPor = 2;
        store.editarMembeesia(nuevoRegistro.value).then((res) => {
            if(res){
                cargarDatos();
                limpiarFrm();
                modoFrm.value = 0;
                mostrarFrm.value = false;
            }
        })
    }else{
        Swal.fire({
            title: 'Error',
            text: 'La hora de salida debe ser mayor a la de entrada',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}

const esperarBusqueda = (txt, opc) => {
    if (txt == undefined) {  
        store.cargarMembresias().then(() => {
            ListadoMembresias.value = store.getMembresias;
        })
    }else{
        if(opc == 0){
            const encontrada = store.getMembresia;
            console.log('encontrada: ', JSON.stringify(encontrada));
            Swal.fire({
                title: 'Membresía encontrada',
                html: `
                <div style="display: flex; flex-direction: column; justify-content: flex-start;">
                    <ul style="list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); column-gap: 1rem; text-align: left;">
                        <li><strong>ID:</strong> ${encontrada.MembresiaId}</li>
                        <li><strong>Tipo:</strong> ${encontrada.NombreTipoMembresia}</li>
                        <li><strong>Nombre:</strong> ${encontrada.NombreMembresia}</li>
                        <li><strong>Puntos:</strong> ${encontrada.Puntos}</li>
                        <li><strong>Clave Unidad SAT:</strong> ${encontrada.ClaveUnidadsat}</li>
                        <li><strong>Clave Prod. Serv.:</strong> ${encontrada.ClaveProdcutoServicio}</li>
                        <li><strong>Nombre Periodo:</strong> ${encontrada.NombrePeriodo}</li>
                        <li><strong>Cita:</strong> ${encontrada.Cita ? 'Aplica' : 'No aplica'}</li>
                        <li><strong>Mínimo Asociados:</strong> ${encontrada.MinimoAsociados}</li>
                    </ul>
                    <span style="text-align: left;"><strong>Descripción:</strong> ${encontrada.Descripcion}</span>
                </div>
                `,
                confirmButtonText: 'Aceptar'
            });
        }
        else if(opc == 1){
            ListadoMembresias.value = store.getMembresias;
            if (ListadoMembresias.value.length == 0) {
                Swal.fire({
                    title: 'No se encontraron resultados',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                });
                cargarDatos();
            }
        }
    }
}

const busquedaModal = (texto) => {
    if(modoModal.value == 2){
        ListadoClavesProdSerSAT.value = storeProductos.getClavesProductos;
    }else if(modoModal.value == 4){
        if(texto == undefined){
            storeProductos.cargarClavesUnidades(1).then(() => {
                ListadoClavesUnidadesSAT.value = storeProductos.getClavesUnidades.items;
            })
        }else{
            storeProductos.buscarClavesUnidades(texto).then(() => {
                ListadoClavesUnidadesSAT.value = storeProductos.getClavesUnidades.response;
            })
        }
    }
}

const limpiarFrm = () => {
    nuevoRegistro.value = {}
}

const afterLeaveFrm = () => {
    modoFrm.value = 0;
    mostrarFrm.value = false;
}

function mostrarM(opc){
        objModal.value.show();
        modoModal.value = opc;
        switch (opc) {
            case 2:
                ListadoClavesProdSerSAT.value;
                break;
            case 4:
                ListadoClavesUnidadesSAT.value;
                break;
            default:
                objModal.value.hide();
                break;
        }
}

function bajarRegistro(modo, registro){ 
    switch (modo) {
        case 2:
            nuevoRegistro.value.ClaveProductoServicio = registro;
            break;
        case 4:
            nuevoRegistro.value.ClaveUnidadSat = registro;
            break;
        default:
            break;
        }
        objModal.value.hide()
}

const getNombreTipoMembresia = computed(() => {
    return (id) => {
        const tipo = ListadoTipoMembresias.value.find((tipo) => tipo.TipoMembresiaId == id);
        return tipo ? tipo.NombreTipoMembresia : '';
    }
})

const getEntrada = computed(() => {
    return (horario) => {
        return horario ? horario.split(',')[0] : '';
    }
})
const getSalida = computed(() => {
    return (horario) => {
        return horario ? horario.split(',')[1] : '';
    }
})

const horarioFrm = (() => {
    if (nuevoRegistro.value.hEntrada && nuevoRegistro.value.hSalida) {
        HoraEntrada.value = nuevoRegistro.value.hEntrada.split(':')[0];
        MinEntrada.value = nuevoRegistro.value.hEntrada.split(':')[1];
        HoraSalida.value = nuevoRegistro.value.hSalida.split(':')[0];
        MinSalida.value = nuevoRegistro.value.hSalida.split(':')[1];
        console.log('Horario del formulario:\n' +
        ' Hora Entrada: ' + HoraEntrada.value + 
        ' Minutos Entrada: ' + MinEntrada.value + 
        ' Hora Salida: ' + HoraSalida.value + 
        ' Minutos Salida: ' + MinSalida.value);

        if (HoraEntrada.value > HoraSalida.value || (HoraEntrada.value === HoraSalida.value && MinEntrada.value >= MinSalida.value)) {
            return false;
        }

        return true;
    }
})

watch(mostrarFrm, (newValue) => {
    if(newValue == false){
        limpiarFrm();
    }
})
</script>

<template>
    <h2> Membresías </h2>
    <div class="contenedorListado">
        <ventanas :moduloActivo="moduloActivo" />
        <div class="contenedorHijo">
            <div class="lineaFormulario" :class="{lineaSola: modoFrm == 0}">
                <transition name="general" @after-leave="mostrarFrm = true" appear>
                    <div class="componenteBuscador" v-if="mostrarFrm == false && modoFrm == 0">
                        <buscador @eBusqueda="esperarBusqueda" />
                    </div>
                </transition>
                <transition-group name="general" @after-leave="afterLeaveFrm()" appear>
                    <div class="formulario" v-if="mostrarFrm == true">
                        <input type="text" placeholder="ID Membresías" class="inpId" disabled v-if="modoFrm == 2" v-model="nuevoRegistro.MembresiaId">
                        <input type="text" placeholder="Nombre Membresías" class="inpNombre" v-model="nuevoRegistro.NombreMembresia">
                        <select class="selectNombre" v-model="nuevoRegistro.TipoMembresiaId">
                            <option v-for="Tipo in ListadoTipoMembresias" :key="Tipo.TipoMembresiaId" :value="Tipo.TipoMembresiaId"> {{ Tipo.NombreTipoMembresia }} </option>
                        </select>
                        <input type="text" placeholder="Descripción Membresías" class="inpDescripcion" v-model="nuevoRegistro.Descripcion">
                    </div>
                </transition-group>

                <transition name="general" appear>
                    <button class="btAgregar" :class="{btNuevo: modoFrm == 0}" @click=" modoFrm != 0 ? mostrarFrm = false : modoFrm = 1"> {{ modoFrm == 0 ? 'Agregar' : 'Cancelar' }} </button>
                </transition>
            </div>

            <div class="lineaFormulario" v-if="mostrarFrm == true">
                <transition-group name="general" appear>
                    <div class="formulario lineaCompleta" v-if="mostrarFrm == true">
                        <div class="columna">
                            <input class="conBoton" type="text" placeholder="Clave Producto SAT" v-model="nuevoRegistro.ClaveProductoServicio">
                            <button class="minibutton" @click="mostrarM(2)"> 
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                </svg>
                            </button>
                        </div>
                        <div class="columna">
                            <input class="conBoton" type="text" placeholder="Clave Unidad SAT" v-model="nuevoRegistro.ClaveUnidadSat">
                            <button class="minibutton" @click="mostrarM(4)"> 
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                </svg>
                            </button>
                        </div>
                        <input type="number" placeholder="Puntos" class="inpId" v-model="nuevoRegistro.Puntos">
                        <label for="hEntrada"> Hora de Entrada </label>
                        <input class="inpHora" id="hEntrada" name="hEntrada" type="time" v-model="nuevoRegistro.hEntrada">
                        <label for="hSalida"> Hora de Salida </label>
                        <input class="inpHora" id="hSalida" name="hSalida" type="time" v-model="nuevoRegistro.hSalida">
                        <button class="btAgregar btFrm" @click="modoFrm == 1 ? crearRegistro() : actualizarRegistro()"> {{ modoFrm == 1 ? 'Guardar' : 'Actualizar' }} </button>
                    </div>
                </transition-group>
            </div>

            <transition name="tabla" appear>
                <div class="tablaContainer">
                    <table>
                        <thead>
                            <tr>
                                <th class="col-xxs"> ID </th>
                                <th class="col-s col-start"> Nombre </th>
                                <th class="col-s col-start"> Tipo Membresia </th>
                                <th class="col-auto col-start"> Descripción </th>
                                <th class="col-xxs"> H. Entrada </th>
                                <th class="col-xxs"> H. Salida </th>
                                <th class="col-xxs"> Acciones </th>
                            </tr>
                        </thead>
                        <tbody>
    
                            <tr v-for="Registro in ListadoMembresias" :key="Registro.MembresiaId">
                                <td class="col-xxs"> {{ Registro.MembresiaId }} </td>
                                <td class="col-s col-start"> {{ Registro.NombreMembresia }} </td>
                                <td class="col-s col-start"> {{ getNombreTipoMembresia(Registro.TipoMembresiaId) }} </td>
                                <td class="col-auto col-start"> {{ Registro.Descripcion }} </td>
                                <td class="col-xxs"> {{ getEntrada(Registro.Horario) }} </td>
                                <td class="col-xxs"> {{ getSalida(Registro.Horario) }} </td>
                                <td class="Acciones col-xxs">
                                    <img class="IcoFrm" src="@/assets/img/edit.svg" alt="Icono tabla editar" @click="subirDatos(Registro)">
                                    <img class="IcoFrm" src="@/assets/img/trash.svg" alt="Icono tabla borrar" @click="borrarRegistro(Registro)">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </transition>
            
        </div>
    </div>

    



    <div class="modal fade modal-lg" id="objModal" tabindex="-1" ref="refModal" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="objModal"> Buscador </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row formulario">
                        <div class="buscador">
                            <buscadorClaveProductoSAT v-if="modoModal == 2" @eBusqueda="busquedaModal"/>
                            <buscadorClaveUnidadSAT v-if="modoModal == 4" @eBusqueda="busquedaModal"/>
                        </div>


                        <div class="tablaContainer animate__animated animate__fadeIn animate__fast">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    <tr v-for="Producto in ListadoClavesProdSerSAT" v-if="modoModal == 2" @click="bajarRegistro(2, Producto.ClaveProductoServicio)" class="microTable-tr">
                                        <td>{{ Producto.ClaveProductoServicio }}</td>
                                        <td>{{ Producto.Descripcion }}</td>
                                    </tr>
    
                                    <tr v-for="Unidad in ListadoClavesUnidadesSAT" v-if="modoModal == 4" @click="bajarRegistro(4, Unidad.ClaveUnidadSat)" class="microTable-tr">
                                        <td>{{ Unidad.ClaveUnidadSat }}</td>
                                        <td>{{ Unidad.NombreUnidadSat }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="Cerrar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.general-enter-active {
    animation: fadeIn 0.75s;
}
.general-leave-active {
    animation: fadeOut 0.75s;
}
.tabla-enter-active {
    animation: fadeIn 1s;
}
.tabla-leave-active {
    animation: fadeOut 1s;
}

@import url('../../../styles/tablaListado.css');

.contenedorListado{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 10.5rem); 
    min-height: calc(100vh - 10.5rem);
    max-height: calc(100vh - 10.5rem);
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    background-color: #fff;
    color: #000;
    font-size: 1.5rem;
    text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    border-radius: 1rem;
}
.contenedorHijo{
    padding: 1rem;
    width: 100%;
    max-height: calc(100% - 2rem);
    flex-grow:1;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
h2{
    height: 2rem;
    margin-bottom: 1.5rem;
    color: #fff;
    text-transform: uppercase;
    text-align: start;
    font-weight: bold;
}
h1{
    height: 100%;
    border: 1px solid red;
    margin: 1rem;
    overflow-y: scroll;
    scrollbar-width: none;
}
.componenteBuscador{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    margin-right: 2rem;
    max-width: 40rem;
}
.lineaFormulario{
    display: flex;
    flex-direction: row;
    max-height: 2.1875rem;
    width: 100%;
    margin-bottom: 1.5rem;
    justify-content: space-between;
}
.lineaFormulario:first-child{
    margin-bottom: 1.5rem;
}
.formulario{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    gap: 1rem;
}
.btAgregar{
    height: 2.1875rem;
    width: 10rem;
    background-color: #353535;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-left: 1rem;
    letter-spacing: 0.25rem;
}
.btNuevo{
    margin-left: auto;
}
.lineaCompleta{
    margin-left: 0rem;
    height: 2.1875rem;
}
.lineaSola{
    margin-bottom: 0rem;
}
input, select{
    height: 2.1875rem;
    color: #000;
    border: 1px solid #999;
    border-radius: 0.3125rem;
    font-size: 1rem;
    background-color: #fff;
    padding-left: 1rem;
    padding-right: 1rem;
    width: 14.5rem;
    outline: none;
}
input:disabled{
    background-color: #999;
    color: #fff;
}
.inpNombre{
    width: 20rem;
}
.inpDescripcion{
    width: 25rem;
    flex-grow: 1;
}
.inpId{
    width: 10rem;
}
.inpHora{
    width: 6rem;
}
.selectNombre{
    width: 20rem;
    max-width: 20rem;
    min-width: 20rem;
}
.selectId{
    width: 15rem;
    max-width: 15rem;
}
.btFrm{
    margin-left: 0rem;
}
.tablaContainer{
    margin-top: 0rem;
    max-height: calc(100% - 1rem);
}
th{
    height: 2.75rem;
}

.minibutton{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.1875rem;
    background-color: #999999;
    width: 5rem;
    border: none;
    border-radius: 0.3125rem;
    color: white;
}
.conBoton{
    margin-right: 0.5rem;
}
label{
    font-size: 1rem;
    color: #000;
}
.columna{
    display: flex;
    align-items: center;
}
</style>
