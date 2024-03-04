<script setup>
import { ref } from 'vue'
import router from 'vue-router'
import ventanas from '../components/ventanas.vue'

const btActivo = ref(1);
const tipoProducto = ref('Producto');
const idProducto = ref(0);

</script>

<template>
    <header>
        <h1> Productos </h1>
    </header>
    <div class="contenedor">
        <div class="ventanas">
            <ventanas :tipoProducto="tipoProducto" :btActivo="btActivo" :idProducto="idProducto"/>
        </div>
        <div class="contenido">
            <div class="formulario">

                <div class="col1">
                    <select v-model="tipoProducto">
                        <option value="Producto"> Producto </option>
                        <option value="Servicio"> Servicio </option>
                        <option value="Insumos"> Insumos </option>
                        <option value="Activos"> Activos </option>
                        <option value="Terminados"> Productos Terminados </option>
                        <option value="Terceros"> Productos de Terceros </option>
                        <option value="Suscripciones"> Suscripciones </option>
                        <option value="Combos"> Combos </option>
                    </select>
    
                    <input type="text" placeholder="ID de Producto">
                    <input type="text" placeholder="Nombre de Producto">
                    <input type="text" placeholder="Descripción de Producto">
    
                    <label for="uBase"> U. Base </label>
                    <select id="uBase">
                    </select>
    
                    <label for="uCompra"> U. Compra </label>
                    <select id="uCompra">
                    </select>
                    
                    <label for="uVenta"> U. Venta </label>
                    <select id="uVenta">
                    </select>
                    
                    <label for="uFiscal"> U. Fiscal </label>
                    <select id="uFiscal">
                    </select>
                </div>
                <div class="col2">
                    <label for="categoria"> Categoria </label>
                    <select id="categoria">
                    </select>

                    <label for="familia"> Familia </label>
                    <select id="familia">
                    </select>
                    
                    <label for="subfamilia"> subfamilia </label>
                    <select id="subfamilia">
                    </select>

                    <label for="linea"> Linea </label>
                    <select id="linea">
                    </select>

                    <div class="SAT">
                        <button> Buscar </button>
                        <input type="text" class="subInput" placeholder="Clave SAT">
                    </div>

                    <div class="SAT">
                        <button> Buscar </button>
                        <input type="text" class="subInput" placeholder="Unidad SAT">
                    </div>
                    
                </div>
            </div>
            <div class="contenedorImagen">
                <img src="@/assets/img/imgEmpresa.svg" alt="Lights">
            </div>
        </div>
    </div>
</template>

<style scoped>
.contenedor {
    background-color: #D9D9D9;
    width: 100%;
    height: 51rem;
    overflow: hidden;
}
header{
    margin-bottom: 1.5rem;
}
h1{
    text-align: start;
}
.contenido{
    width: auto;
    margin: 1rem;
    display: grid;
    grid-template-columns: 45rem 40.5rem;
    justify-content: space-between;
    margin-left: 5rem;
    margin-right: 7.5rem;
}
.ventanas{
    display: flex;
    width: 100%;
    height: 2.5rem;
    overflow: hidden;
    align-items: flex-start;
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
.formulario{
    background-color: red;
    align-items: center;
    grid-gap: 10%;
    display: grid;
    grid-template-columns: 45% 45%;
    justify-items: start;
    align-items: center;
    height: 50rem;
}
.formulario .col1, .formulario .col2{
    display: flex;
    flex-direction: column;
    background-color: green;
    width: 100%;
    align-content: start;
}
.contenedorImagen{
    background-color: blue;
    display: flex;
    justify-content: center;
}
select{
    width: 100%;
}
</style>