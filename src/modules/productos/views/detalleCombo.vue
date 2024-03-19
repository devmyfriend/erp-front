<script setup>
import { computed, ref, watch } from 'vue';
import ventanas from '../components/ventanas.vue'
import buscadorProductos from '../components/buscadorProductos.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const idProducto = ref( parseInt(route.params.id) || 0);
const tipoProducto = ref('combo');
const btActivo = ref(4);

const actual = ref({Cantidad: 0});
const productosExistente = ref([
    {
        ID: 1,
        Nombre: 'Producto 1',
        Sección: 'Sección 1',
        Anaquel: 'Anaquel 1',
        Nivel: 'Nivel 1',
        Lugar: 'Lugar 1',
        'Stock Mínimo': 10,
        Cantidad: 20,
        'Stock Máximo': 30,
        Costo: 10.99,
        'Último precio de compra': 9.99
    },
    {
        ID: 2,
        Nombre: 'Producto 2',
        Sección: 'Sección 2',
        Anaquel: 'Anaquel 2',
        Nivel: 'Nivel 2',
        Lugar: 'Lugar 2',
        'Stock Mínimo': 5,
        Cantidad: 15,
        'Stock Máximo': 25,
        Costo: 8.99,
        'Último precio de compra': 7.99
    },
    {
        ID: 3,
        Nombre: 'Producto 3',
        Sección: 'Sección 3',
        Anaquel: 'Anaquel 3',
        Nivel: 'Nivel 3',
        Lugar: 'Lugar 3',
        'Stock Mínimo': 8,
        Cantidad: 18,
        'Stock Máximo': 28,
        Costo: 12.99,
        'Último precio de compra': 11.99
    },
    {
        ID: 4,
        Nombre: 'Producto 4',
        Sección: 'Sección 4',
        Anaquel: 'Anaquel 4',
        Nivel: 'Nivel 4',
        Lugar: 'Lugar 4',
        'Stock Mínimo': 12,
        Cantidad: 22,
        'Stock Máximo': 32,
        Costo: 14.99,
        'Último precio de compra': 13.99
    },
    {
        ID: 5,
        Nombre: 'Producto 5',
        Sección: 'Sección 5',
        Anaquel: 'Anaquel 5',
        Nivel: 'Nivel 5',
        Lugar: 'Lugar 5',
        'Stock Mínimo': 15,
        Cantidad: 25,
        'Stock Máximo': 35,
        Costo: 9.99,
        'Último precio de compra': 8.99
    }
]);
const productosAgregados = ref([]);
const editando = ref(false);
const error = ref(false);

function presentarDatos(producto){
        actual.value = { ...producto };
        console.log('Producto seleccionado', JSON.stringify(producto));
}
function AgregarProducto() {
    if (actual.value.ID === 0) {
        error.value = true;
    } else {
        productosAgregados.value.push(actual.value);
        actual.value = {};
        error.value = false; // Reiniciar el estado de error
    }
}
function borrarProducto(producto){
    const index = productosAgregados.value.findIndex(p => p.ID === producto.ID);
    productosAgregados.value.splice(index, 1);
}
function editarProducto(producto){
    const index = productosAgregados.value.findIndex(p => p.ID === producto.ID);
    productosAgregados.value[index] = actual.value;
    editando.value = false;
}

const CostoTotal = computed(() => {
    let total = 0;
    if(productosAgregados.value.length === 0){
    }else{
        productosAgregados.value.forEach(p => {
            total = total + (p.Cantidad * p.Costo);
        });
        console.log('Total es: '+ total);
    }
    return total;
});
watch(() => actual.value.Cantidad, (newValue, oldValue) => {
    actual.value.Cantidad = parseInt(newValue) || 0;
});
</script>

<template>
    <div>
        <header>
            <h1> Productos: {{ idProducto }} - {{ tipoProducto }} </h1>
        </header>
        <div class="contenedor">
            <div class="ventanas">
                <ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :idProducto="idProducto"/>
            </div>
            <div class="contenido">
                <div class="contenedorFrm">
                    <div class="formulario">
                        <div class="buscador">
                            <buscadorProductos/>
                        </div>
                        <div class="inpProducto">
                            <span class="lbFrm"> Producto: </span>
                            
                            <input class="inpNombre" type="text" disabled v-model="actual.Nombre" placeholder="Producto 123">
                        </div>
                        <div class="inpCantidad">
                            <span class="lbFrm"> Cantidad: </span>
                            <input type="number" placeholder="Cantidad" min="1" v-model="actual.Cantidad">
                        </div>
                        <img src="@/assets/img/add.svg" alt="AgregarProducto" class="btAgregar" @click="AgregarProducto" v-if="!editando && actual.ID > 0">
                        <img src="@/assets/img/add.svg" alt="AgregarProducto" class="btAgregar" @click="editarProducto(actual)" v-if="editando && actual.ID != 0">
                        <span class="lbError" v-if="error"> ¡No hay un registro! </span>
                    </div>
                    <div class="CostoTotal">
                        <span class="lbFrm"> Costo Total: </span>
                        <span> {{CostoTotal}} </span>
                    </div>
                </div>
                <div class="contenedorTabla animate__animated animate__fadeIn">
                    <h3> Productos existentes </h3>
                    <table>
                        <thead>
                                <tr>
                                    <th>ID</th>  
                                    <th> Nombre </th>
                                    <th> Costo </th>
                                    <th class="Acciones"> Acciones </th>
                                </tr>
                            </thead>
                        <tbody>
                            <tr v-for="productoExistente in productosExistente">
                                <td> {{productoExistente.ID}} </td>
                                <td> {{productoExistente.Nombre}} </td>
                                <td> {{productoExistente.Costo}} </td>
                                <td class="Acciones">
                                    <img 
                                        src="@/assets/img/add.svg" 
                                        alt="Agregar"
                                        @click="presentarDatos(productoExistente)"
                                        class="btTabla"
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <transition name="fade">
                    <div class="contenedorTabla" v-if="productosAgregados.length ">
                        <h3> Productos agregados </h3>
                        <table>
                            <thead>
                                    <tr>
                                        <th>ID</th>  
                                        <th> Nombre </th>
                                        <th> Cantidad </th>
                                        <th> Costo </th>
                                        <th> Cantidad Mínima </th>
                                        <th> Cantidad Máxima </th>
                                        <th> Sección </th>
                                        <th> Anaquel </th>
                                        <th> Nivel </th>
                                        <th> Lugar </th>
                                        <th> Último precio de compra </th>
                                        <th class="Acciones"> Acciones </th>
                                    </tr>
                                </thead>
                            <tbody>
                                <tr v-for="productoAgregado in productosAgregados">
                                    <td> {{productoAgregado.ID}} </td>
                                    <td> {{productoAgregado.Nombre}} </td>
                                    <td> {{productoAgregado.Cantidad}} </td>
                                    <td> {{productoAgregado.Costo}} </td>
                                    <td> {{productoAgregado['Stock Mínimo']}} </td>
                                    <td> {{productoAgregado['Stock Máximo']}} </td>
                                    <td> {{productoAgregado.Sección}} </td>
                                    <td> {{productoAgregado.Anaquel}} </td>
                                    <td> {{productoAgregado.Nivel}} </td>
                                    <td> {{productoAgregado.Lugar}} </td>
                                    <td> {{productoAgregado['Último precio de compra']}} </td>
                                    
                                    <td class="Acciones"> 
                                        <img 
                                        src="@/assets/img/edit.svg" 
                                        alt="Editar"
                                        @click="editando = true; presentarDatos(productoAgregado);"
                                        class="btTabla me-2"
                                        > 
                                        <img 
                                        src="@/assets/img/trash.svg" 
                                        alt="Borrar"
                                        @click="borrarProducto(productoAgregado)"
                                        class="btTabla"
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active {
    animation: fadeIn .5s;
}
.fade-leave-active {
    animation: fadeOut .25s;
}

.contenedor {
    background-color: #fff;
    width: 100%;
    height: 51rem;
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
.contenido{
    width: 100%;
    padding: 1rem;
}
.btActivo{
    background-color: #D9D9D9;
    border: 2px solid #999999;
    border-bottom: none;
    border-right: none;
}
.contenedorFrm{
    width: 100%;
    display: grid;
    grid-template-columns: 7fr 1fr;
    gap:5%;
    align-items: center;
    margin-bottom: 1.5rem;
}
.CostoTotal{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}
.formulario{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 92.25rem;
    justify-content: left;
}
.inpProducto, .inpCantidad, .btAgregar{
    margin-left: 1rem;
}
.btTabla{
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
}
.btTabla:disabled{
    background-color: #999999;
    color: #fff;
}
.lbError{
    color: #ff0000;
    font-weight: bold;
    font-size: 1rem;
    margin-left: 1rem;
}
input{
    padding: 0.5rem;
    height: 2rem;
    border: 1px solid #000;
    border-radius: 0.3125rem;
}
input:disabled{
    background-color: #999999;
    color: #fff;
}
input:disabled::placeholder{
    background-color: #999999;
    color: #fff;
}
.lbFrm{
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 1rem;
}
.btAgregar{
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
}
h3{
    text-align: start;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}
.btGuardarTodo{
    background-color: #999999;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 15rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1.5rem;
    margin: auto;
}
.btGuardarTodo img{
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
}
.btGuardarTodo span{
    color: #fff;
    font-weight: bold;
    font-size: 1.25rem;
    margin-left: 0.5rem;
}
.contenedorTabla{
    width: 100%;
    height: 20rem;
    overflow: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #000;
}
td, th {
  border: 1px solid #000;
  padding: 0.25rem 0.5rem;
  margin: 0rem 0.25rem 0rem 0.25rem;
}
th {
  background-color: #999999;
  color: #fff;
  height: 1rem;
}
td{
  background-color: #fff;
  color: #999999;
  height: 2rem;
  padding: 0rem 1rem 0rem 1rem;
  text-align: start;
}
.Acciones{
    width: 10rem;
    text-align: center;
}
.inpNombre{
    width: 29rem;
}
</style>