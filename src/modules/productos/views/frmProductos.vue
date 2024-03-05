<script setup>
    import { ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import Ventanas from '../components/ventanas.vue';
    import Swal from 'sweetalert2';
    import mBuscar from '../components/modales/mBuscar.vue';
    
    const route = useRoute();
    
    const idProducto = ref( parseInt(route.params.id) || 0);
    const btActivo = ref(2);
    const contenedorSeleccionado = ref(1);

    const modo = ref(null);
    
    //Datos generales
    const tipoProducto = ref(route.params.tipo);
    const claveProducto = ref('');
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
    const uBase = ref('');
    const uCompra = ref('');
    const uFiscal = ref('');
    const uVenta = ref('');
    const claveProductoSAT = ref('');
    const claveImpuesto = ref('');
    const claveUnidadSAT = ref('');
    const frmUnidadesCompleto = computed(() => {
        if( uBase.value != '' && uCompra.value != '' && uFiscal.value != '' 
            && uVenta.value != '' && claveProductoSAT.value != '' && claveImpuesto.value != '' 
            && claveUnidadSAT.value != ''){
            return true;
        }else{
            return false;
        }
    });

    //Categorias
    const lineaProducto = ref('');
    const categoria1 = ref('');
    const familia = ref('');
    const categoria2 = ref('');
    const subfamilia = ref('');
    const fInicio = ref('');
    const fFin = ref('');
    const frmCategoriasCompleto = computed(() => {
        if(lineaProducto.value != '' && categoria1.value != '' && familia.value != '' 
            && categoria2.value != '' && subfamilia.value != '' && fInicio.value != '' && fFin.value != ''){
                if(tipoProducto != 'Suscripciones'){
                    return true;
                }else if(fInicio.value != '' && fFin.value != '' && fInicio.value < fFin.value){
                    return true;
                }else{
                    return false;
                }
        }else{
            return false;
        }
    });

    const registroCompleto = computed(() => {
        if(tipoProducto.value != 'Combos'){
            if(frmGeneralCompleto.value && frmUnidadesCompleto.value && frmCategoriasCompleto.value){
                return true;
            }else{
                return false;
            }
        }else if(frmGeneralCompleto.value && uVenta.value != ''){
            return true;
        }else{
            return false;
        }
    });
    
    function LimpiarCampos(){
        tipoProducto.value = '';
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
        subfamilia.value = '';
        fInicio.value = '';
        fFin.value = '';
    }

    function GuardarTodo(){
        if(registroCompleto.value){
            console.log('Registro completo');
            LimpiarCampos();
            Swal.fire({
                title: 'Registro completo',
                text: 'El registro se ha completado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        }else{
            console.log('Registro incompleto');
            Swal.fire({
                title: 'Registro incompleto',
                text: 'El registro no se ha completado correctamente',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    function mostrarM(opc){
        switch(opc){
            case 1:
                modo.value = 'Conversiones';
                break;
            case 2:
                modo.value = 'Clave Producto SAT';
                break;
            case 3:
                modo.value = 'Clave Impuesto';
                break;
            case 4:
                modo.value = 'Clave Unidad SAT';
                break;
        }
    }
</script>

<template>
    <header>
        <h1> Productos: {{idProducto}} - {{ tipoProducto }} </h1>
    </header>
    <div class="contenedor">
        <div class="ventanas">
            <Ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :idProducto="idProducto"/>
        </div>
        <div class="contenido">
            <h2> Formulario de Productos</h2>
            <div class="frm">
                <div class="formulario" v-if="tipoProducto != 'Combos'">
                    <h3 :class="(contenedorSeleccionado == 1) ? 'SubtituloActivo' : 'SubtituloInactivo' " @click="contenedorSeleccionado = 1"> Datos generales </h3>
                    <div class="miniContainer" v-if="contenedorSeleccionado == 1">
                        <div class="fila">
                            <label for="tipoProducto" class="labelTipo"> Tipo: </label>
                            <select name="tipoProducto" id="tipoProducto" v-model="tipoProducto">
                                <option value="Productos">Productos</option>
                                <option value="Servicios">Servicios</option>
                                <option value="Insumos">Insumos</option>
                                <option value="Activos">Activos</option>
                                <option value="Productos_Terminados">Productos Terminados</option>
                                <option value="Productos_Terceros">Productos de Terceros</option>
                                <option value="Suscripciones">Suscripciones</option>
                                <option value="Combos">Combos</option>
                            </select>

                            <label for="ClaveProducto"> Clave Producto </label>
                            <input type="text" placeholder="ClaveProducto" v-model="claveProducto">
                            
                            <label for="Deshabilitar"> Deshabilitar </label>
                            <input type="checkbox" name="Deshabilitar" id="Deshabilitar" v-model="deshabilitar" :checked="deshabilitar">
                        </div>
                        <div class="fila">
                            <label for="Nombre">Nombre: </label>
                            <input type="text" placeholder="Nombre" id="Nombre" name="Nombre" v-model="nombreInput">
                        </div>
                        <div class="fila">
                            <label for="Descripcion"> Descripción: </label>
                            <textarea name="Descripcion" id="Descripcion" rows="3" maxlength="150" v-model="descripcion"></textarea>
                        </div>
                    </div>
                    <h3 :class="(contenedorSeleccionado == 2) ? 'SubtituloActivo' : 'SubtituloInactivo' " @click="contenedorSeleccionado = 2"> Unidades </h3>
                    <div class="miniContainer" v-if="contenedorSeleccionado == 2">
                        <div class="fila">
                            <div class="columna">
                                <label for="uBase"> U. Base </label>
                                <input type="text" placeholder="Unidad Base" id="uBase" name="uBase" v-model="uBase">
                                <button class="minibutton" @click="mostrarM(1)"> 
                                    <img src="@/assets/img/Conversiones.svg" alt="Boton_Conversiones" class="miniImg">
                                </button>
                            </div>
                            <div class="columna">
                                <label for="uCompra"> U. Compra </label>
                                <input type="text" placeholder="Unidad Compra" id="uCompra" name="uCompra" v-model="uCompra">
                            </div>
                        </div>
                        <div class="fila">
                            <div class="columna">
                                <label for="uFiscal"> U. Fiscal </label>
                                <input type="text" placeholder="Unidad Fiscal" id="uFiscal" name="uFiscal" v-model="uFiscal">
                            </div>
                            
                            <div class="columna">
                                <label for="uVenta"> U. Venta </label>
                                <input type="text" placeholder="Unidad Venta" id="uVenta" name="uVenta" v-model="uVenta">
                            </div>
                            
                        </div>
                        <div class="fila">
                            <div class="columna">
                                <label for="ClaveProductoSAT"> C. Producto SAT</label>
                                <input type="text" placeholder="Clave Producto SAT" v-model="claveProductoSAT">
                                <button class="minibutton" @click="mostrarM(2)"> 
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                    </svg>
                                        
                                </button>
                            </div>
                            
                            <div class="columna">
                                <label for="Impuesto"> Impuesto Compuesto </label>
                                <input type="text" placeholder="Clave Impuesto Comp." v-model="claveImpuesto">
                                <button class="minibutton" @click="mostrarM(3)">
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div class="fila">
                            <div class="columna">
                                <label for="ClaveUnidad"> C. Unidad SAT </label>
                                <input type="text" placeholder="Clave Unidad SAT" v-model="claveUnidadSAT">
                                <button class="minibutton" @click="mostrarM(4)"> 
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.7008 19.0204L17.4165 14.7368C17.2231 14.5435 16.961 14.4361 16.686 14.4361H15.9855C17.1716 12.9194 17.8763 11.0118 17.8763 8.93663C17.8763 4 13.8756 0 8.93815 0C4.00068 0 0 4 0 8.93663C0 13.8733 4.00068 17.8733 8.93815 17.8733C11.0137 17.8733 12.9216 17.1686 14.4386 15.9828V16.6831C14.4386 16.9581 14.546 17.2202 14.7394 17.4135L19.0237 21.6971C19.4276 22.101 20.0808 22.101 20.4804 21.6971L21.6965 20.4812C22.1004 20.0773 22.1004 19.4243 21.7008 19.0204ZM8.93815 14.4361C5.90004 14.4361 3.43775 11.9785 3.43775 8.93663C3.43775 5.89903 5.89574 3.43716 8.93815 3.43716C11.9763 3.43716 14.4386 5.89474 14.4386 8.93663C14.4386 11.9742 11.9806 14.4361 8.93815 14.4361Z" fill="#fff"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <h3 :class="(contenedorSeleccionado == 3) ? 'SubtituloActivo' : 'SubtituloInactivo' " @click="contenedorSeleccionado = 3"> Categorias </h3>
                    <div class="miniContainer" v-if="contenedorSeleccionado == 3">
                        <div class="fila">
                            <div class="filaCompleta">
                                <label for="Linea"> Linea </label>
                                <select name="Linea" id="Linea" v-model="lineaProducto">
                                    <option value="Linea">Linea</option>
                                </select>
                            </div>
                        </div>
                        <div class="fila">
                            <div class="columna">
                                <label for="Categoria1"> Categoria 1</label>
                                <select name="Categoria1" id="Categoria1" v-model="categoria1">
                                    <option value="Categoria"> Categoria </option>
                                </select>
                            </div>

                            <div class="columna">
                                <label for="Familia"> Familia </label>
                                <select name="Familia" id="Familia" v-model="familia">
                                    <option value="Familia"> Familia </option>
                                </select>
                            </div>
                        </div>
                        <div class="fila">
                            <div class="columna">
                                <label for="Categoria2"> Categoria 2</label>
                                <select name="Categoria2" id="Categoria2" v-model="categoria2">
                                    <option value="Categoria"> Categoria </option>
                                </select>
                            </div>

                            <div class="columna">
                                <label for="SubFamilia"> SubFamilia </label>
                                <select name="SubFamilia" id="SubFamilia" v-model="subfamilia">
                                    <option value="SubFamilia"> SubFamilia </option>
                                </select>
                            </div>
                        </div>
                        <div class="fila" v-if="tipoProducto == 'Suscripciones'">
                            <div class="columna">
                                <label for="FechaInicio"> Fecha Inicio </label>
                                <input type="date" name="FechaInicio" id="FechaInicio" v-model="fInicio" min="2010-01-01" :max="fFin">
                            </div>

                            <div class="columna">
                                <label for="FechaFin"> Fecha Fin </label>
                                <input type="date" name="FechaFin" id="FechaFin" v-model="fFin" :min="fInicio">
                            </div>
                        </div>
                        <div class="miniContainer btGuardarTodo">
                            <button class="guardarTodo" @click="GuardarTodo"> 
                                <img src="@/assets/img/Save.svg" class="imgButton"> 
                                <span> Guardar producto </span> 
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Combos -->
                <div class="formulario" v-else>
                    <h3 class="SubtituloInactivo"> Datos generales</h3>
                    <div class="miniContainer">
                        <div class="fila">
                            <label for="tipoProducto" class="labelTipo"> Tipo: </label>
                            <select name="tipoProducto" id="tipoProducto" v-model="tipoProducto">
                                <option value="Productos">Productos</option>
                                <option value="Servicios">Servicios</option>
                                <option value="Insumos">Insumos</option>
                                <option value="Activos">Activos</option>
                                <option value="Productos_Terminados">Productos Terminados</option>
                                <option value="Productos_Terceros">Productos de Terceros</option>
                                <option value="Suscripciones">Suscripciones</option>
                                <option value="Combos">Combos</option>
                            </select>

                            <label for="ClaveProducto"> Clave Producto </label>
                            <input type="text" placeholder="ClaveProducto" v-model="claveProducto">
                            
                            <label for="Deshabilitar"> Deshabilitar </label>
                            <input type="checkbox" name="Deshabilitar" id="Deshabilitar" v-model="deshabilitar" :checked="deshabilitar">
                        </div>
                        <div class="fila">
                            <label for="Nombre">Nombre: </label>
                            <input type="text" placeholder="Nombre" id="Nombre" name="Nombre" v-model="nombreInput">
                        </div>
                        <div class="fila">
                            <label for="Descripcion"> Descripción: </label>
                            <textarea name="Descripcion" id="Descripcion" rows="3" maxlength="150" v-model="descripcion"></textarea>
                        </div>
                    </div>
                    <h3 class="SubtituloInactivo"> Unidad </h3>
                    <div class="miniContainer">
                        <div class="fila">
                            <div class="columna">
                                <label for="uVenta"> U. Venta </label>
                                <input type="text" placeholder="Unidad Venta" id="uVenta" name="uVenta" v-model="uVenta">
                            </div>
                        </div>
                    </div>
                    <div class="miniContainer">
                        <div class="miniContainer btGuardarTodo">
                             <button class="guardarTodo" @click="GuardarTodo">
                                <img src="@/assets/img/Save.svg" class="imgButton"> 
                                <span> Guardar producto </span> 
                             </button>
                        </div>
                    </div>
                </div>


                <div class="imagen">
                    <div class="imgContainer">
                        <img src="@/assets/img/imgEmpresa.svg" alt="Imagen del producto" class="imgProducto">
                    </div>
                    <input type="file" name="imagen" id="imagen">
                </div>
            </div>
        </div>
    </div>
    <mBuscar 
    v-if="modo != null"
    :modo="modo"
    @cerrarModal="modo=null "
    />
</template>

<style scoped>
    @import '../../../styles/checkbox.css';
.contenedor {
    background-color: #D9D9D9;
    width: 100%;
    height: 51rem;
    /* overflow: hidden; */
}
header{
    margin-bottom: 1.5rem;
}
h1{
    text-align: start;
    color: #000;
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
    height: 100%;
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
    margin-bottom: 1rem;
    width: 100%;
    color: #000;
    cursor: pointer;
}
.SubtituloInactivo{
    font-weight:600;    
}
.SubtituloActivo{
    font-weight:700;
    text-decoration: underline;
}
.formulario{
    display: flex;
    flex-direction: column;
    align-items: center;
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
    justify-content: center;
    height: 40rem;
    max-height: 40rem;
}
.imgProducto{
    height: 35rem;
    width: 35rem;
}
.formulario select, .formulario input[type="text"], .formulario input[type="date"], .formulario textarea{
    width: 12.5rem;
    height: 2.1875rem;
    color: #000;
    border: none;
    border-radius: 0.3125rem;
    padding-left: 1rem;
    margin-right: 0.25rem;
}
.formulario select:focus {
    outline: none;
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
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
    justify-content: space-between;
}
.fila label{
    font-size: 1rem;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    color: #000;
    width: 6rem;
    text-align: left;
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
}
.minibutton{
    height: 2.1875rem;
    background-color: #999999;
    width: 5rem;
    border: none;
    border-radius: 0.3125rem;
}
.guardarTodo{
    width: 100%;
    height: 3rem;
    background-color: #999999;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    align-items: center;
    justify-content: center;
}
.imgButton{
    height: 1.5rem;
    margin-right: 1rem;
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
}
.columna{
    width: 23.75rem;
    display: flex;
}

</style>