<script setup>
import { computed, ref } from 'vue'
import ventanas from '../components/ventanas.vue'
import buscadorProductos from '../components/buscadorProductos.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const tipoProducto = ref('Combos');
const idProducto = ref( parseInt(route.params.id) || 0);
const btActivo = ref(4);
const Producto = ref({Nombre: 'Producto123'});

const listadoProductos = ref([
    {
        ID: 1,
        Nombre: 'Producto 1',
        Sección: 'Sección 1',
        Anaquel: 'Anaquel 1',
        Nivel: 'Nivel 1',
        Lugar: 'Lugar 1',
        'Stock Mínimo': 10,
        Stock: 20,
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
        Stock: 15,
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
        Stock: 18,
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
        Stock: 22,
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
        Stock: 25,
        'Stock Máximo': 35,
        Costo: 9.99,
        'Último precio de compra': 8.99
    }
]);

const listadoProductosSeleccionados = ref([])
const CostoTotal = computed(() => {
    return listadoProductosSeleccionados.value.reduce((acc, producto) => acc + producto.Costo, 0);
});


function AgregarProducto(idProducto){
    let producto = listadoProductos.value.find( producto => producto.ID === idProducto);
    listadoProductosSeleccionados.value.push(producto);
}

function EliminarProducto(idProducto){
    let index = listadoProductosSeleccionados.value.findIndex( producto => producto.ID === idProducto);
    listadoProductosSeleccionados.value.splice(index, 1);
}

</script>

<template>
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
                        <buscadorProductos/>
                        <div>
                            <label class="lbFrm" for="Producto"> Producto: </label>
                            <input type="text" disabled v-model="Producto.Nombre">
                        </div>
                        <div>
                            <label class="lbFrm" for="Cantidad"> Cantidad: </label>
                            <input type="number" placeholder="Cantidad">
                        </div>
                        <img src="@/assets/img/add.svg" alt="AgregarProducto" class="btAgregar">
                    </div>
                    <div class="CostoTotal">
                        <label class="lbFrm" for="CostoTotal"> Costo Total: </label>
                        <label for="CostoTotal"> {{CostoTotal}} </label>
                    </div>
                </div>

                <div class="contenedorTabla">
                    <h3> Productos sugeridos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID Producto</th>
                                <th>Nombre</th>
                                <th>Sección</th>
                                <th>Anaquel</th>
                                <th>Nivel</th>
                                <th>Lugar</th>
                                <th>Stock Mínimo</th>
                                <th>Stock</th>
                                <th>Stock Máximo</th>
                                <th>Costo</th>
                                <th>Última compra</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="registro in listadoProductos">
                                <td> {{ registro.ID }} </td>
                                <td> {{ registro.Nombre }} </td>
                                <td> {{ registro.Sección }} </td>
                                <td> {{ registro.Anaquel }} </td>
                                <td> {{ registro.Nivel }} </td>
                                <td> {{ registro.Lugar }} </td>
                                <td> {{ registro['Stock Mínimo'] }} </td>
                                <td> {{ registro.Stock }} </td>
                                <td> {{ registro['Stock Máximo'] }} </td>
                                <td> {{ registro.Costo }} </td>
                                <td> {{ registro['Último precio de compra'] }} </td>
                                <td style="text-align: center;"> 
                                    <img 
                                    src="@/assets/img/add.svg" 
                                    alt="Agregar"
                                    @click="AgregarProducto(registro.ID)"
                                    > 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="contenedorTabla">
                    <h3> Productos agregados </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID Producto</th>
                                <th>Nombre</th>
                                <th>Sección</th>
                                <th>Anaquel</th>
                                <th>Nivel</th>
                                <th>Lugar</th>
                                <th>Stock Mínimo</th>
                                <th>Stock</th>
                                <th>Stock Máximo</th>
                                <th>Costo</th>
                                <th>Última compra</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="registro in listadoProductosSeleccionados">
                                <td> {{ registro.ID }} </td>
                                <td> {{ registro.Nombre }} </td>
                                <td> {{ registro.Sección }} </td>
                                <td> {{ registro.Anaquel }} </td>
                                <td> {{ registro.Nivel }} </td>
                                <td> {{ registro.Lugar }} </td>
                                <td> {{ registro['Stock Mínimo'] }} </td>
                                <td> {{ registro.Stock }} </td>
                                <td> {{ registro['Stock Máximo'] }} </td>
                                <td> {{ registro.Costo }} </td>
                                <td> {{ registro['Último precio de compra'] }} </td>
                                <td style="text-align: center;"> 
                                    <img 
                                    src="@/assets/img/trash.svg" 
                                    alt="Agregar"
                                    @click="EliminarProducto(registro.ID)"
                                    > 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <button class="btGuardarTodo" @click="GuardarTodo">
                    <img src="@/assets/img/Save.svg" alt="GuardarIcon">
                    <span> Guardar cambios </span>
                </button>
        </div>
    </div>
</template>

<style scoped>
.contenedor {
    background-color: #D9D9D9;
    width: 100%;
    height: 51rem;
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
.contenido{
    width: 100%;
    padding: 1rem;
}
button{
    margin: 0rem;
    padding: 0rem;
    border: 1px solid #999999;
    padding: 0.25rem;
    width: 15rem;
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
    grid-template-columns: 6fr 1fr;
    gap:10%;
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
    justify-content: space-between;
    width: 1fr;
}

input{
    padding: 0.5rem;
    height: 2rem;
    border: none;
    border-radius: 0.3125rem;
}
input:disabled{
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
</style>