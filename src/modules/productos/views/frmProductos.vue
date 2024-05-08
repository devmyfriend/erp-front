<script setup>
    import { ref, computed, watch, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import Ventanas from '../components/ventanas.vue';
    import { Modal } from 'bootstrap';
    import buscadorClaveUnidadSAT from '../components/buscador/buscadorClaveUnidadSAT.vue';
    import buscadorClaveProductoSAT from '../components/buscador/buscadorClaveProductoSAT.vue';
    import buscadorImpuestosCompuestos from '../../impuestos/components/buscadorImpuestoCompuesto.vue';  
    import Swal from 'sweetalert2';

    import { useProductos } from '../store/productos.js'
    import { useImpuestos } from '@/modules/impuestos/store/impuestos.js'    
    const store = useProductos();
    const storeImpuestos = useImpuestos();
    const router = useRouter();
    const route = useRoute();
    
    const idProducto = ref( route.params.id || "0");
    const btActivo = ref(2);
    const contenedorSeleccionado = ref(1);
    const producto = ref();
    const PoliticasMembresia = ref('');
    const estadoOriginal = ref(false);
    const modo = ref(0);

    const listadoConversiones = ref([
        { unidadOrigen: 'Metro', unidadDestino: 'Pulgada', Factor: 39.3701 },
        { unidadOrigen: 'Kilogramo', unidadDestino: 'Libra', Factor: 2.20462 },
        { unidadOrigen: 'Litro', unidadDestino: 'Galón', Factor: 0.264172 },
        { unidadOrigen: 'Grado Celsius', unidadDestino: 'Grado Fahrenheit', Factor: 33.8 },
        { unidadOrigen: 'Metro cuadrado', unidadDestino: 'Pie cuadrado', Factor: 10.7639 }
    ]);

    const listadoTiposProducto = ref([]);
    const listadoClaveProductoSAT = ref([]);
    const listadoClaveUnidadSAT = ref([]);
    const listadoImpuestosCompuestos = ref([]);
    const registros = ref([]);
    
    const capaConversiones = ref(false);
    const capaVisible = ref(true);
    const Costo = ref(0);
    
    //Datos generales
    /* const tipoProducto = ref(route.params.tipo); */
    const tipoProducto = ref(1);
    const claveProducto = ref(idProducto.value != 0 ? idProducto.value : '');
    const deshabilitar = ref(false);
    const nombreInput = ref('');
    const descripcion = ref('');
    const frmGeneralCompleto = computed(() => {
        if(tipoProducto.value != '' && claveProducto.value != '' && nombreInput.value != '' && descripcion.value != ''){
            return true;
        }else{
            return false;
        }
    });

    //Unidades
    const uBase = ref('11');
    const uCompra = ref('13');
    const uFiscal = ref('14');
    const uVenta = ref('15');
    const claveProductoSAT = ref('');
    const claveImpuesto = ref('');
    const claveUnidadSAT = ref('');
    const frmUnidadesCompleto = computed(() => {
        if(tipoProducto.value == 'combo'){
            return (uVenta.value != '') ? true : false;
        }else{
            if(uBase.value != '' && uCompra.value != '' && uFiscal.value != '' && uVenta.value != '' && claveProductoSAT.value != '' && claveImpuesto.value != '' && claveUnidadSAT.value != ''){
                return true;
            }else{
                return false;
            }
        }
    });

    //Categorias
    const lineaProducto = ref('');
    const categoria1 = ref('');
    const familia = ref('');
    const categoria2 = ref('');
    const subfamilia = ref('');

    const Serie = ref(false);

    /* TO DO */
    /* Pasar a lógica implciita con tipo de producto */
    const Venta = true;
    const Insumo = true;
    /*  */
    const Puntos = ref(0)

    const ModalUnidades = ref(null);
    const mUnidades = ref(false);
    
/*     const frmCategoriasCompleto = computed(() => {
        if (tipoProducto.value == 'combo') {
            return true;
        }else{
            if(lineaProducto.value != '' && categoria1.value != '' && familia.value != '' && categoria2.value != '' && subfamilia.value != ''){
                if(tipoProducto.value == 'suscripcion'){
                    return (PoliticasMembresia.value != '') ? true : false;
                }else{
                    return true;
                }
            }else{
                return false;
            }
        }
    }); */

/*     const registroCompleto = computed(() => {
        if(frmGeneralCompleto.value && frmUnidadesCompleto.value && frmCategoriasCompleto.value){
            return true;
        }else{
            return false;
        }
    }); */

    onMounted(() => {
        mUnidades.value = new Modal(ModalUnidades.value);

        if(idProducto.value != 0 && tipoProducto.value != ''){
            store.buscarProducto(idProducto.value).then(() => {
                tipoProducto.value = tipoProducto.value;
                claveProducto.value = idProducto.value;
                producto.value = store.getProducto;
                
                nombreInput.value = producto.value.NombreProducto || '';
                descripcion.value = producto.value.DescripcionProducto || '';
                deshabilitar.value = producto.value.Borrado || false;
                uBase.value = producto.value.UnidadBase || '';
                uCompra.value = producto.value.UnidadCompra || '';
                uFiscal.value = producto.value.UnidadFiscal || '';
                uVenta.value = producto.value.UnidadVenta || '';
                claveProductoSAT.value = producto.value.ClaveProductoServicio || '';
                claveImpuesto.value = producto.value.ImpuestoCompuestoId || '';
                claveUnidadSAT.value = producto.value.ClaveUnidadSat || '';
                lineaProducto.value = producto.value.LineaId || '';
                categoria1.value = producto.value.CategoriaId_1 || '';
                categoria2.value = producto.value.CategoriaId_2 || '';
                familia.value = producto.value.familia || '';
                subfamilia.value = producto.value.subfamilia || '';

                if(deshabilitar.value == true){
                    estadoOriginal.value = true;
                }
            });
        }

        store.cargarTiposProducto().then(() => {
            listadoTiposProducto.value = store.getTiposProducto;
        });
        store.cargarClavesUnidades(1).then(() => {
            listadoClaveUnidadSAT.value = store.getClavesUnidades.items;
        });
        store.cargarClavesProductos(1).then(() => {
            listadoClaveProductoSAT.value = store.getClavesProductos;
        });
        storeImpuestos.cargarImpuestosCompuestos().then(() => {
            listadoImpuestosCompuestos.value = storeImpuestos.getListadoImpuestosCompuestos;
        });
        
    });

    function LimpiarCampos(){
/*         tipoProducto.value = '';
        claveProducto.value = '';
        deshabilitar.value = false;
        nombreInput.value = '';
        descripcion.value = '';
        uBase.value = '';
        uCompra.value = '';
        uFiscal.value = '';
        uVenta.value = '';
        claveProductoSAT.value = '';
        claveImpuesto.value = '';
        claveUnidadSAT.value = '';
        lineaProducto.value = '';
        categoria1.value = '';
        familia.value = '';
        categoria2.value = '';
        subfamilia.value = ''; */
    }

    async function reactivarProducto(){
        if(idProducto.value != "0" && estadoOriginal.value != deshabilitar.value ){
            await store.reactivarProducto(idProducto.value).then((res) => {
                if(res){
                    console.log('[REACTIVADO] [Producto]: ' + idProducto.value + ' [Tipo]: ' + tipoProducto.value);
                }else{
                    console.log('[FALLO][REACTIVANDO] [Producto]: ' + idProducto.value + ' [Tipo]: ' + tipoProducto.value);
                }
            });
        }
    }
    
    function GuardarTodo(){
        const producto = {
            "CodigoProducto": claveProducto.value,
            "NombreProducto": nombreInput.value,
            "DescripcionProducto": descripcion.value,
            "ClaveProductoServicio": claveProductoSAT.value,
            "ClaveUnidadSat": claveUnidadSAT.value,
            "LineaId": lineaProducto.value,
            "TipoProductoId": tipoProducto.value,
            "Puntos": Puntos.value,
            "Serie": Serie.value,
            "Venta": true,
            "Insumo": true,
            "CreadoPor": 2
        }
        store.crearProducto(producto).then((res) => {
            if(res){
                LimpiarCampos();
            }
        });
    }

    function mostrarM(opc){
        mUnidades.value.show();
        modo.value = opc;
        switch (opc) {
            case 2:
                listadoClaveProductoSAT.value;
                break;
            case 4:
                listadoClaveUnidadSAT.value;
                break;
            default:
                registros.value = [];
                break;
        }
    }

    function mostrarContenido(){
        capaVisible.value = !capaVisible.value;
    }

    function mostrarCapa(){
        capaConversiones.value = !capaConversiones.value;
        capaVisible.value = false;
    }

    function AgregarPolitica(){
        router.push({ name: 'politicasProducto', params: { id: idProducto.value } });
    }

    function bajarRegistro(modo, registro){ 
        switch (modo) {
            case 2:
                claveProductoSAT.value = registro;
                break;
            case 3:
                claveImpuesto.value = registro;
                break;
            case 4:
                claveUnidadSAT.value = registro;
                break;
            default:
                break;
            }
            mUnidades.value.hide()
    }

    function esperarBusqueda(texto){
        if (modo.value == 2) {
            listadoClaveProductoSAT.value = store.getClavesProductos;
        }else if(modo.value == 3){
            listadoImpuestosCompuestos.value = storeImpuestos.getListadoImpuestosCompuestos;
        }else if(modo.value == 4){
            listadoClaveUnidadSAT.value = store.getClavesUnidades.response;
        }
    }

    watch(tipoProducto, (newValue, oldValue) => {
        if(newValue != oldValue){
            LimpiarCampos();
            tipoProducto.value = newValue;
        }
    });
</script>

<template>
    <header>
        <h1> Productos: {{ idProducto }} - {{ tipoProducto }} </h1>
    </header>
    <div class="contenedor">
        <div class="ventanas">
            <Ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :idProducto="idProducto"/>
        </div>
        <div class="contenido">
            <h2> Formulario de Productos</h2>
            <div class="frm"> <!-- animate__animated animate__fadeIn -->
                <transition-group name="capaConversiones">
                    <div class="formulario " v-if="tipoProducto != 'combo'">

                        <div class="titulos">
                            <div class="cabeceras">
                                <h3 class="Subtitulo" 
                                    :class="{SubtituloActivo: contenedorSeleccionado === 1, 
                                            SubtituloInactivo: contenedorSeleccionado != 1 }" 
                                    @click="contenedorSeleccionado = 1">
                                     Datos generales 
                                </h3>
                                <h3 class="Subtitulo" 
                                    :class="{SubtituloActivo: contenedorSeleccionado === 2, 
                                            SubtituloInactivo: contenedorSeleccionado != 2 }" 
                                            @click="contenedorSeleccionado = 2">
                                             Unidades     
                                </h3>
                            </div>
                            <span class="spanCosto" v-if="idProducto != 0"> Costo: $<span>{{ Costo }}</span></span>
                        </div>

                        <div class="miniContainer capaActiva animate__animated animate__fadeIn" v-if="contenedorSeleccionado == 1">
                            <div class="fila">
                                <label for="tipoProducto" class="labelTipo"> Tipo: </label>
                                <select name="tipoProducto" id="tipoProducto" v-model="tipoProducto">
<!--                                     <option value="1">Productos</option>
                                    <option value="2">Servicios</option>
                                    <option value="3">Insumos</option>
                                    <option value="4">Activos</option>
                                    <option value="5">Productos Terminados</option>
                                    <option value="6">Productos de Terceros</option>
                                    <option value="7">Suscripciones</option>
                                    <option value="8">Combos</option> -->
                                    <option v-for="Tipo in listadoTiposProducto" :value="Tipo.TipoProductoId"> {{ Tipo.NombreTipoProducto }} </option>
<!--                                     <option value="1"> Limpieza (editado) </option>
                                    <option value="2"> Limpieza </option>
                                    <option value="3"> Terminado </option>
                                    <option value="4"> ter </option>
                                    <option value="5"> estoesunaprueba </option> -->
                                </select>
                                
                                <div class="divGrow">
                                    <label for="CodigoProducto"> Código Producto: </label>
                                    <input class="inpGrow" id="CodigoProducto" type="text" placeholder="Código Producto" v-model="claveProducto">
                                </div>
                                
                                <label for="Deshabilitar" v-if="idProducto != 0 && estadoOriginal == true"> Deshabilitar </label>
                                <input type="checkbox" name="Deshabilitar" id="Deshabilitar" v-if="idProducto != 0 && estadoOriginal == true" v-model="deshabilitar" :checked="deshabilitar">
                            </div>
                            <div class="fila">
                                <label for="Nombre">Nombre: </label>
                                <input type="text" placeholder="Nombre" id="Nombre" name="Nombre" v-model="nombreInput">
                            </div>
                            <div class="fila">
                                <label for="Descripcion"> Descripción: </label>
                                <textarea name="Descripcion" id="Descripcion" rows="3" maxlength="254" v-model="descripcion"></textarea>
                            </div>
                            <div class="fila">
                                <label for="Serie"> No. de Serie: </label>
                                <input type="checkbox" name="Serie" id="Serie" v-model="Serie" :checked="Serie">
                                
                                <label for="Puntos"> Puntos PB: </label>
                                <input class="inpPuntos" type="number" name="Puntos" placeholder="22" v-model="Puntos">

                            </div>
                            <div class="fila">
                                <label for="Linea"> Linea </label>
                                <select class="inpCompleto" name="Linea" id="Linea" v-model="lineaProducto">
                                    <option value="4"> Linea blanca (4) </option>
                                    <option value="5"> Linea azul (5) </option>
                                    <option value="6"> Linea roja (6) </option>
                                    <option value="7"> Linea verde (7) </option>
                                    <option value="8"> Linea purpura (8) </option>
                                </select>
                                <button class="minibutton" @click="mostrarM(1)"> 
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                    </svg>
                                </button>
                            </div>
<!--                             <div class="fila">
                                <label for="Categoria1"> Categoria 1</label>
                                <select name="Categoria1" id="Categoria1" v-model="categoria1" class="inpCompleto">
                                    <option value="Categoria"> Categoria </option>
                                </select>
    
                                <label for="Familia"> Familia </label>
                                <select name="Familia" id="Familia" v-model="familia" class="inpCompleto">
                                    <option value="Familia"> Familia </option>
                                </select>
                            </div> -->
<!--                             <div class="fila">
                                <label for="Categoria2"> Categoria 2</label>
                                <select name="Categoria2" id="Categoria2" v-model="categoria2" class="inpCompleto">
                                    <option value="Categoria"> Categoria </option>
                                </select>
                                <label for="SubFamilia"> SubFamilia </label>
                                <select name="SubFamilia" id="SubFamilia" v-model="subfamilia" class="inpCompleto">
                                    <option value="SubFamilia"> SubFamilia </option>
                                </select>
                            </div> -->
    
                            <transition name="capaConversiones">
                                <div class="fila" v-if="tipoProducto == 'suscripcion'">
                                


                                    <div class="fila columna espacioCompleto capaConversiones nogap">
                                        <label for="PoliticasMembresia" class="PoliticasMembresia"> Política de membresía </label>
                                        <select class="conBoton uBaseCompleta capaConversiones" name="PoliticasMembresia" id="PoliticasMembresia" v-model="PoliticasMembresia">
                                            <option value="1"> Política 1 </option>
                                        </select>
                                        <button class="minibutton" @click="AgregarPolitica">
                                            <span class="btTxt"> Nuevo </span>
                                        </button>
                                    </div> 



                                </div>
                            </transition>
                        </div>
    
                        <div class="miniContainer capaActiva animate__animated animate__fadeIn" v-if="contenedorSeleccionado == 2">
                         <transition name="capaGeneral">
                                <div class="fila">
                                    <div class="columna" :class="{espacioCompleto: capaConversiones, capaConversiones: capaConversiones}">
                                        <label for="uBase"> U. Base </label>
                                        <select class="conBoton" name="uBase" id="uBase" v-model="uBase" :class="{ uBaseCompleta: capaConversiones, capaConversiones: capaConversiones}">
                                            <option value="11"> Metro </option>
                                            <option value="13"> Pieza </option>
                                            <option value="14"> Caja de 30pz </option>
                                            <option value="15"> Bolsa </option>
                                            <option value="16"> Paquete </option>
                                            <option value="17"> Litro </option>
                                            <option value="18"> Gramo </option>
                                        </select>
                                        <button class="minibutton" @click="mostrarCapa"> 
                                            <img src="@/assets/img/Conversiones.svg" alt="Boton_Conversiones" class="miniImg" v-if="!capaConversiones">
                                            <svg alt="Boton_Conversiones" class="miniImg capaConversiones" v-if="capaConversiones" width="36" height="34" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <line y1="-1" x2="45.2542" y2="-1" transform="matrix(0.707117 -0.707097 0.707117 0.707097 2 34)" stroke="#fff" stroke-width="5"/>
                                                <line y1="-1" x2="45.2542" y2="-1" transform="matrix(0.707117 0.707097 -0.707117 0.707097 2 2)" stroke="#fff" stroke-width="5"/>
                                            </svg>
                                        </button>
                                    </div> 

                                    <div class="columna" v-if="!capaConversiones">
                                        <label for="uCompra"> U. Compra </label>
                                        <select name="uCompra" id="uCompra" v-model="uCompra" class="inpCompleto">
                                            <option value="11"> Metro </option>
                                            <option value="13"> Pieza </option>
                                            <option value="14"> Caja de 30pz </option>
                                            <option value="15"> Bolsa </option>
                                            <option value="16"> Paquete </option>
                                            <option value="17"> Litro </option>
                                            <option value="18"> Gramo </option>
                                        </select>
                                    </div>
                                </div>
                        </transition>
                            <!-- InicioCapa de Conversiones --> 
                            <transition name="capaConversiones" @after-leave="mostrarContenido">
                                <div class="fila capaConversiones" v-if="capaConversiones">
                                    <div class="cConversiones">
                                        <h4> Conversiones: </h4>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th> Unidad Origen </th>
                                                    <th> Unidad Destino </th>
                                                    <th> Factor Conversión </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for ="conversion in listadoConversiones">
                                                    <td class="colStart"> {{ conversion.unidadOrigen}} </td>
                                                    <td class="colStart"> {{ conversion.unidadDestino}} </td>
                                                    <td class="colStart"> {{ conversion.Factor}} </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </transition> 
                            <!-- Capa de Conversiones -->
                             <transition-group name="capaGeneral">
                                <div class="fila" v-if="!capaConversiones" :style="{ visibility: capaVisible ? 'visible' : 'hidden' }">
                                    <div class="columna">
                                        <label for="uFiscal"> U. Fiscal </label>
                                        <select name="uFiscal" id="uFiscal" v-model="uFiscal">
                                            <option value="11"> Metro </option>
                                            <option value="13"> Pieza </option>
                                            <option value="14"> Caja de 30pz </option>
                                            <option value="15"> Bolsa </option>
                                            <option value="16"> Paquete </option>
                                            <option value="17"> Litro </option>
                                            <option value="18"> Gramo </option>
                                        </select>
                                    </div>
                                    
                                    <div class="columna">
                                        <label for="uVenta"> U. Venta </label>
                                        <select name="uVenta" id="uVenta" v-model="uVenta" class="inpCompleto">
                                            <option value="11"> Metro </option>
                                            <option value="13"> Pieza </option>
                                            <option value="14"> Caja de 30pz </option>
                                            <option value="15"> Bolsa </option>
                                            <option value="16"> Paquete </option>
                                            <option value="17"> Litro </option>
                                            <option value="18"> Gramo </option>
                                        </select>
                                    </div>
                                    
                                </div>
                                <div class="fila" v-if="!capaConversiones" :style="{ visibility: capaVisible ? 'visible' : 'hidden' }">
                                    <div class="columna">
                                        <label for="ClaveProductoSAT"> C. Producto SAT</label>
                                        <input class="conBoton" type="text" placeholder="Clave Producto SAT" v-model="claveProductoSAT">
                                        <button class="minibutton" @click="mostrarM(2)"> 
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="columna">
                                        <label for="Impuesto"> Impuesto Compuesto </label>
                                        <input type="text" placeholder="Clave Impuesto Comp. 10" class="inpCompleto conBoton" v-model="claveImpuesto">
                                        <button class="minibutton" @click="mostrarM(3)">
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div class="fila" v-if="!capaConversiones" :style="{ visibility: capaVisible ? 'visible' : 'hidden' }">
                                    <div class="columna">
                                        <label for="ClaveUnidad"> C. Unidad SAT </label>
                                        <input class="conBoton" type="text" placeholder="Clave Unidad SAT" v-model="claveUnidadSAT">
                                        <button class="minibutton" @click="mostrarM(4)"> 
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </transition-group>
                        </div>

                        <div class="miniContainer btGuardarTodo">
                            <button class="guardarTodo" @click="GuardarTodo">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"  class="imgButton">
                                    <path d="M30.9958 6.99579L25.0042 1.00421C24.3612 0.361231 23.4892 4.75483e-06 22.5799 0H3.42857C1.535 0 0 1.535 0 3.42857V28.5714C0 30.465 1.535 32 3.42857 32H28.5714C30.465 32 32 30.465 32 28.5714V9.42014C32 8.51083 31.6388 7.63876 30.9958 6.99579ZM16 27.4286C13.4753 27.4286 11.4286 25.3819 11.4286 22.8571C11.4286 20.3324 13.4753 18.2857 16 18.2857C18.5247 18.2857 20.5714 20.3324 20.5714 22.8571C20.5714 25.3819 18.5247 27.4286 16 27.4286ZM22.8571 5.67714V12.8571C22.8571 13.3305 22.4734 13.7143 22 13.7143H5.42857C4.95521 13.7143 4.57143 13.3305 4.57143 12.8571V5.42857C4.57143 4.95521 4.95521 4.57143 5.42857 4.57143H21.7514C21.9788 4.57143 22.1968 4.66171 22.3575 4.8225L22.6061 5.07107C22.6857 5.15065 22.7488 5.24514 22.7919 5.34913C22.835 5.45312 22.8572 5.56458 22.8571 5.67714Z" fill="#fff"/>
                                </svg>
                                <span> Guardar producto </span> 
                            </button>
                        </div>

                    </div>
                </transition-group>
                    <!-- Inicio Combos -->
                    <transition-group name="capaConversiones">
                        <div class="formulario" v-if="tipoProducto == 'combo'">
                            <div class="titulos">
                                <h3 class="Subtitulo" :class="{SubtituloActivo: contenedorSeleccionado === 1, SubtituloInactivo: contenedorSeleccionado != 1}" @click="contenedorSeleccionado = 1"> Datos generales</h3>
                                <span class="spanCosto" v-if="idProducto != 0"> Costo: $<span>{{ Costo }}</span></span>
        
                            </div>
        
                            <div class="miniContainer capaActiva">
                                    <div class="fila">
                                    <label for="tipoProducto" class="labelTipo"> Tipo: </label>
                                    <select name="tipoProducto" id="tipoProducto" v-model="tipoProducto">
                                        <option value="pos">Productos</option>
                                        <option value="servicio">Servicios</option>
                                        <option value="insumo">Insumos</option>
                                        <option value="activo">Activos</option>
                                        <option value="final">Productos Terminados</option>
                                        <option value="proveedor">Productos de Terceros</option>
                                        <option value="suscripcion">Suscripciones</option>
                                        <option value="combo">Combos</option>
                                    </select>
        
                                    
                                    <label for="CodigoProducto"> Código Producto: </label>
                                    <input id="CodigoProducto" type="text" placeholder="Código Producto" v-model="claveProducto"> 
                                    
                                    <label for="Deshabilitar" v-if="idProducto != 0 && estadoOriginal == true"> Deshabilitar </label>
                                    <input type="checkbox" name="Deshabilitar" v-if="idProducto != 0 && estadoOriginal == true" id="Deshabilitar" v-model="deshabilitar" :checked="deshabilitar">
                                    </div>
                                    <div class="fila">
                                        <label for="Nombre">Nombre: </label>
                                        <input type="text" placeholder="Nombre" id="Nombre" name="Nombre" v-model="nombreInput">
                                    </div>
                                    <div class="fila">
                                        <label for="Descripcion"> Descripción: </label>
                                        <textarea name="Descripcion" id="Descripcion" rows="3" maxlength="150" v-model="descripcion"></textarea>
                                    </div>
                                    <div class="fila">
                                        <label for="uVenta"> U. Venta </label>
                                        <select name="uVenta" id="uVenta" v-model="uVenta" class="inpCompleto">
                                            <option value="1"> Unidad venta 1 </option>
                                        </select>
                                    </div>
                                </div>
                            <div class="miniContainer btGuardarTodo">
                                <button class="guardarTodo" @click="GuardarTodo">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"  class="imgButton">
                                        <path d="M30.9958 6.99579L25.0042 1.00421C24.3612 0.361231 23.4892 4.75483e-06 22.5799 0H3.42857C1.535 0 0 1.535 0 3.42857V28.5714C0 30.465 1.535 32 3.42857 32H28.5714C30.465 32 32 30.465 32 28.5714V9.42014C32 8.51083 31.6388 7.63876 30.9958 6.99579ZM16 27.4286C13.4753 27.4286 11.4286 25.3819 11.4286 22.8571C11.4286 20.3324 13.4753 18.2857 16 18.2857C18.5247 18.2857 20.5714 20.3324 20.5714 22.8571C20.5714 25.3819 18.5247 27.4286 16 27.4286ZM22.8571 5.67714V12.8571C22.8571 13.3305 22.4734 13.7143 22 13.7143H5.42857C4.95521 13.7143 4.57143 13.3305 4.57143 12.8571V5.42857C4.57143 4.95521 4.95521 4.57143 5.42857 4.57143H21.7514C21.9788 4.57143 22.1968 4.66171 22.3575 4.8225L22.6061 5.07107C22.6857 5.15065 22.7488 5.24514 22.7919 5.34913C22.835 5.45312 22.8572 5.56458 22.8571 5.67714Z" fill="#fff"/>
                                    </svg> 
                                    <span> Guardar producto </span> 
                                </button>
                            </div>
                        </div>
                    </transition-group>
                    <!-- Combos -->

                    <div class="imagen">
                        <div class="contenedorImagen">
                            <img src="@/assets/img/imgEmpresa.svg" alt="Imagen del producto" class="imgProducto">
                        </div>
                        <input type="file" name="imagen" id="imagen" class="btAgregarImagen">
                    </div>
                </div>
            
        </div>
    </div>
<!--     <mBuscar 
        v-if="mSAT != null"
        :modo="mSAT"
        @cerrarModal="mSAT=null"
    /> -->

    <div class="modal fade modal-lg" id="mUnidades" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="ModalUnidades" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="mUnidades"> Buscador </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row formulario">
                        <!-- Contenido  -->
                        <!-- <buscadorLinea v-if="modo == 1"/> -->
                        <div class="buscador">
                            <buscadorClaveProductoSAT v-if="modo == 2" @eBusqueda="esperarBusqueda"/>
                            <buscadorImpuestosCompuestos v-if="modo == 3" @eBusqueda="esperarBusqueda"/>
                            <buscadorClaveUnidadSAT v-if="modo == 4" @eBusqueda="esperarBusqueda"/>
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
                                    <tr v-for="Producto in listadoClaveProductoSAT" v-if="modo == 2" @click="bajarRegistro(2, Producto.ClaveProductoServicio)" class="microTable-tr">
                                        <td>{{ Producto.ClaveProductoServicio }}</td>
                                        <td>{{ Producto.Descripcion }}</td>
                                    </tr>
    
                                    <tr v-for="Unidad in listadoClaveUnidadSAT" v-if="modo == 4" @click="bajarRegistro(4, Unidad.ClaveUnidadSat)" class="microTable-tr">
                                        <td>{{ Unidad.ClaveUnidadSat }}</td>
                                        <td>{{ Unidad.NombreUnidadSat }}</td>
                                    </tr>

                                    <tr v-for="Impuesto in listadoImpuestosCompuestos" v-if="modo == 3" @click="bajarRegistro(3, Impuesto.ImpuestoCompuestoId)" class="microTable-tr">
                                        <td>{{ Impuesto.ImpuestoCompuestoId }}</td>
                                        <td>{{ Impuesto.Nombre }}</td>
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
@import '../../../styles/checkbox.css';

.capaConversiones-enter-active {
    animation: fadeIn .75s;
}
.capaConversiones-leave-active {
    animation: fadeOut .25s;
}
.capaGeneral-enter-active {
    animation: fadeIn .5s;
}
.contenedor {
    background-color: #fff;
    width: 100%;
    height: 51rem;
    overflow: hidden;
    border-radius: 1rem;
}
header{
    margin-bottom: 1.5rem;
}
h1{
    text-align: start;
    color: #fff;
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}
h2{
    text-align: start;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;

}
.contenido{
    width: 100%;
    overflow: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}
.frm{
    display: grid;
    grid-template-columns: 51rem 37.5rem;
    gap: 10rem;
    justify-content: space-between;
    padding: 0rem 5rem;
}
h3{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 1.25rem;
    margin-bottom: 0rem;
    width: 100%;
    color: #000;
    cursor: pointer;
}
.Subtitulo{
    font-weight:700;
    background-color: #d9d9d9;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    border-top: 1px solid #000;
    justify-content: center;
    align-items: center;
    padding: 0rem 0.5rem;
    width: 12.5rem;
    z-index: 1;
}
.capaActiva{
    background-color: #d9d9d9;
    border-radius: 0rem 0.5rem 0.5rem 0.5rem;
    border: 1px solid #000;
    padding: 0.75rem;
    padding-top: 1.5rem;
    height: 33rem;
}
.formulario{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
}
#Nombre, #Descripcion{
    flex-grow: 1;
}
#Descripcion{
    min-height: 5rem;
    max-height: 5rem;
}
.imagen{    
    display: flex;
    flex-direction: column;
    justify-content:flex-start;
    height: 40rem;
    max-height: 40rem;
    position: relative;
}
.imgProducto{
    height: 35rem;
    width: 35rem;
}
.formulario select, .formulario input[type="text"], .formulario input[type="number"], .formulario input[type="date"], .formulario textarea{
    width: 12.5rem;
    height: 2.1875rem;
    color: #000;
    border: none;
    border-radius: 0.3125rem;
    padding-left: 0.5rem;
    outline: none;
    background-color: #fff;
}
.formulario select:focus {
    outline: none;
}
.inpPuntos{
    flex-grow: 1;
}
.labelTipo{
    font-size: 1rem;
    font-weight: 600;
    color: #000;
    padding-right: 0.5rem;
}
.fila{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
}
.fila label{
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    color: #000;
    width: 6rem;
    text-align: left;
    height: 2.5rem;
    max-height: 2.5rem;
}
.miniContainer{
    width: 100%;
}
.fila div{
    display: flex;
    justify-content: flex-start;
}
.btGuardarTodo{
    margin-top: 3rem;
    position: absolute;
    bottom: 0;
    width: 100%;
}
.minibutton{
    height: 2.1875rem;
    background-color: #999999;
    width: 5rem;
    border: none;
    border-radius: 0.3125rem;
    color: white;
}
.divGrow{
    flex-grow: 1;
    display: flex;
    flex-direction: row;
}
.inpGrow{
    flex-grow: 1;
}
.microTable-tr:hover{
    cursor: pointer;
    background-color: #d9d9d9;
    td{
        background-color: transparent;
    }
}
.guardarTodo{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    background-color: #353535;
    color: #fff;
    border: none;
    border-radius: 0.75rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
}
.imgButton{
    height: 1.5rem;
    margin-right: 1rem;
}
.miniImg{
    height: 1.5rem;
}
.filaCompleta{
    display: flex;
    width: 100%;
}
.filaCompleta label{
    width: 6rem;
}
.filaCompleta select{
    flex-grow: 1;
    margin-left: 1rem;
}
.columna{
    width: 40.75rem;
    display: flex;
}
.cConversiones{
    width: 100%;
    background-color: #cbcbcb;
    border: 1px solid #000;
    border-radius: 1rem;
    height: 20rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 1rem;
}
h4{
    font-size: 1.25rem;
    font-weight: 600;
    color: #000;
    margin-bottom: 1rem;
    text-align: left;
}
.inpCompleto{
    flex-grow: 1;
}
table {
  width: 100%;
  border-collapse: collapse;
}
td, th {
  padding: 0.25rem 0.5rem;
  margin: 0rem 0.25rem 0rem 0.25rem;
}
th {
  background-color: #353535;
  color: #fff;
  height: 1rem;
}
td{
  background-color: #e5e5e5;
  color: #353535;
  height: 2rem;
  padding: 0rem 0.5rem 0rem 0.5rem;
}

td:not(:last-child){
    border-right: 0.125rem solid #fff;
}
thead tr, tbody tr:not(:last-child){
    border-bottom: 0.25rem solid #fff;
}
th:first-child, td:first-child{
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}
th:last-child, td:last-child{
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
}
.colStart{
    text-align: start;
}
.uBaseCompleta{
    flex-grow: 1;
}
.espacioCompleto{
    width: 100%;
}
.contenedorImagen{
    display: flex;
    background-color: #D9D9D9;
    border: 1px solid #000;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    height: 36rem;
    width: 36rem;
    padding: 1rem;;
}
.btAgregarImagen{
    position: absolute;
    bottom: 0;
}
.conBoton{
    margin-right: 0.5rem;
}
.titulos{
    width: 100%;
}
.cabeceras{
width: 75%;
}
.titulos, .cabeceras{
    display: flex;
    align-items: flex-end;
}
.spanCosto{
    flex-grow: 1;
    text-align: end;
    font-size: 1.25rem;
    color: #000;
    padding-right: 0.5rem;
    font-weight: 600;
}
.spanCosto span{
    font-weight: 400;
}
.SubtituloInactivo{
    height: 2rem;
    background-color: #cbcbcb;
}
.SubtituloActivo{
    height: 2.5rem;
    margin-bottom: -1px;
}
.nogap{
    gap: 0rem;
}
.PoliticasMembresia{
    width: 7rem;
    margin-right: 1rem;
}
.btTxt{
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
}
.buscador{
    height: 2rem;
    max-height: 3rem;
    width: 100%;
    margin-bottom: 1.5rem;
    padding: 0 1 0 1;

}

.tablaContainer{
    width: 100%;
    margin: 0rem auto;
    max-height: 30rem;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
.tablaContainer::-webkit-scrollbar {
    width: 0.5rem;
}
.tablaContainer::-moz-scrollbar{
    display: none;
}
</style>