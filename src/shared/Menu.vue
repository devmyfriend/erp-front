<script setup>
import dashboardItem from '@/shared/dashboardItem.vue'
import { ref } from 'vue' 

const titulos = ref([
  'Códigos Postales',
  'Formas de Pago',
  'Comprobantes',
  'Impuestos SAT',
  'Impuestos propios',
  'Impuestos Compuestos',
  'Monedas',
  'Regimen Fiscal',
  'C.F.D.i.',
  'Unidades de Medida',
  'Productos',
  'Usuarios',
]);

const rutas = ref([
  { name: 'codigoPostal' },
  { name: 'formasPago' },
  { name: 'comprobantes' },
  { name: 'impuestos' },
  { name: 'listadoImpuestosPropios' },
  { name: 'listadoImpuestosCompuestos' },
  { name: 'monedas' },
  { name: 'regimenFiscal' },
  { name: 'cfdi' },
  { name: 'unidades' },
  { name: 'productos' },
  { name: 'usuarios' },
]);

const body = ref([
    'Catalogo de codigos póstales, es posible consultar un CP para validar su existencia.',
    'Es posible buscar, crear, editar o eliminar algunas de las formas y metodos de pago que la empresa ofrece.',
    'Módulo de aministración de los comprobantes de pago, es posible crear, consultar, editar y/o eliminar algun registro.',
    'Módulo para consulta de impuestos provenientes del catálogo del SAT.',
    'Módulo para la administración de impuestos propios con base a los impuestos del SAT.',
    'Módulo para la administración de impuestos compuestos con base a los impuestos compuestos.',
    'Módulo capaz de realizar la creación, busqueda, lectura, actualización o eliminación de las monedas provenientes del catalogo del SAT.',
    'Módulo para la administración CRUD y busqueda de los régimenes fiscales.',
    'Listado y busqueda de los CFDi provenientes del SAT.',
    'Apartado para el manejo de unidades de medida, creación, lectura, busqueda, edición y eliminación de unidades de medida.',
    'Módulo CRUD de productos, vinculación de almacenes, manejo de combos y de suscripciones.',
    'Módulo de CRUD de usuarios, asignación de roles y permisos.'
]);

const footer = ref([]);
rutas.value.forEach((ruta, index) => {
  const primeraLetraMayuscula = titulos.value[index][0].toUpperCase() + titulos.value[index].slice(1);
  footer.value.push(`Ir a ${primeraLetraMayuscula}`);
});

const itemContent = titulos.value.map((titulo, index) => ({
  titulo,
  body: body.value[index],
  footer: `Ir al módulo`,
  ruta: rutas.value[index].name,
}))

</script>

<template>
    <div class="mainContainer">
        <div>
            <h1> LISTADO DE MÓDULOS EN PROCESO </h1>
        </div>
        <div class="containerItems">
            <div class="item" v-for="item in itemContent" :key="item.titulo" v-if="itemContent">
                <dashboardItem :titleText="item.titulo" :bodyText="item.body" :footerText="item.footer" :footerLink="item.ruta"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mainContainer{
    width: calc(100% - 2rem);
      
    background-color: #d9d9d9;
    padding: 1rem;
    margin: 1rem;
    border-radius: 1rem;
    border: 1px solid #353535;
}
.containerItems{
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
}
h1{
    letter-spacing: 0.5rem;
    font-weight: 600;
}
</style>