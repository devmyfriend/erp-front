<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ventanas from '../components/ventanas.vue'
import { useRoute } from 'vue-router';

const { useProductos } = require('../store/productos.js')
const store = useProductos();

const route = useRoute();
const tipoProducto = ref('suscripcion');
const idProducto = ref( route.params.id || '0');
const btActivo = ref(5);

const hInicio = ref(''), hFin = ref('');
const lunes = ref(false), martes = ref(false), miercoles = ref(false), jueves = ref(false);
const viernes = ref(false), sabado = ref(false), domingo = ref(false);
const editandoHorarios = ref(false);
const editandoPoliticas = ref(false);
const registroEditado = ref(0);
const nuevaPolitica = ref({
    PoliticasMembreciasId: 0,
    Descripcion: '',
    TipoPeriodo: '',
    ValorPeriodo: 0,
    EsGrupal: false,
    MinimoGrupal: 1,
    MaximoGrupal: 2,
    EsPremiun: false,
    CreadoPor: 2
});
const listadoMembresias = ref([{
        PoliticasMembreciasId: 0,
        Descripcion: '',
        TipoPeriodo: '',
        ValorPeriodo: 0,
        EsGrupal: false,
        MinimoGrupal: 0,
        MaximoGrupal: 0,
        EsPremiun: false
}]);

const listadoHorarios = ref([
    {ID:1, hInicio: '08:00', hFin: '09:00', lunes: 'Si', martes: 'Si', miercoles: 'Si', jueves: 'Si', viernes: 'Si', sabado: 'Si', domingo: 'Si'},
    {ID:2, hInicio: '09:00', hFin: '10:00', lunes: 'Si', martes: 'Si', miercoles: 'Si', jueves: 'Si', viernes: 'Si', sabado: 'Si', domingo: 'Si'},
    {ID:3, hInicio: '10:00', hFin: '11:00', lunes: 'Si', martes: 'Si', miercoles: 'Si', jueves: 'Si', viernes: 'Si', sabado: 'Si', domingo: 'Si'},
    {ID:4, hInicio: '11:00', hFin: '12:00', lunes: 'Si', martes: 'Si', miercoles: 'Si', jueves: 'Si', viernes: 'Si', sabado: 'Si', domingo: 'Si'},
    {ID:5, hInicio: '12:00', hFin: '13:00', lunes: 'Si', martes: 'Si', miercoles: 'Si', jueves: 'Si', viernes: 'Si', sabado: 'Si', domingo: 'Si'},
    {ID:6, hInicio: '13:00', hFin: '14:00', lunes: 'Si', martes: 'Si', miercoles: 'Si', jueves: 'Si', viernes: 'Si', sabado: 'Si', domingo: 'Si'},
    {ID:7, hInicio: '14:00', hFin: '15:00', lunes: 'Si', martes: 'Si', miercoles: 'Si', jueves: 'Si', viernes: 'Si', sabado: 'Si', domingo: 'Si'},
    {ID:8, hInicio: '15:00', hFin: '16:00', lunes: 'Si', martes: 'Si', miercoles: 'Si', jueves: 'Si', viernes: 'Si', sabado: 'Si', domingo: 'Si'},
]);

onMounted(() => {
    store.cargarPoliticasMembresia().then((res)=>
    {
        if(res){
            console.log('Políticas cargadas ' + JSON.stringify(store.getMembresias));
            listadoMembresias.value = store.getMembresias;
        }
    });
}),



function agregarHorario(){
    const body = {
        ID: listadoHorarios.value.length + 1,
        hInicio: hInicio.value,
        hFin: hFin.value,
        lunes: lunes.value ? 'Si' : 'No',
        martes: martes.value ? 'Si' : 'No',
        miercoles: miercoles.value ? 'Si' : 'No',
        jueves: jueves.value ? 'Si' : 'No',
        viernes: viernes.value ? 'Si' : 'No',
        sabado: sabado.value ? 'Si' : 'No',
        domingo: domingo.value ? 'Si' : 'No',
    }
    listadoHorarios.value.push(body);
    limpiarHorario();
    console.log('Agregado');
}

function eliminarHorario(registro){
    console.log('Eliminado registro: ', registro.ID);
    listadoHorarios.value = listadoHorarios.value.filter( item => item.ID !== registro.ID);
}

function editandoHorario(registro){
    hInicio.value = registro.hInicio;
    hFin.value = registro.hFin;
    lunes.value = registro.lunes === 'Si' ? true : false;
    martes.value = registro.martes === 'Si' ? true : false;
    miercoles.value = registro.miercoles === 'Si' ? true : false;
    jueves.value = registro.jueves === 'Si' ? true : false;
    viernes.value = registro.viernes === 'Si' ? true : false;
    sabado.value = registro.sabado === 'Si' ? true : false;
    domingo.value = registro.domingo === 'Si' ? true : false;
    editandoHorarios.value = true;
    registroEditado.value = registro.ID;
    editandoHorarios.value = true;
}

function editarHorario(){
    const body = {
        hInicio: hInicio.value,
        hFin: hFin.value,
        lunes: lunes.value ? 'Si' : 'No',
        martes: martes.value ? 'Si' : 'No',
        miercoles: miercoles.value ? 'Si' : 'No',
        jueves: jueves.value ? 'Si' : 'No',
        viernes: viernes.value ? 'Si' : 'No',
        sabado: sabado.value ? 'Si' : 'No',
        domingo: domingo.value ? 'Si' : 'No',
    }
    const indexRegistro = listadoHorarios.value.findIndex( item => item.ID === registroEditado.value);
    listadoHorarios.value[indexRegistro] = {...listadoHorarios.value[indexRegistro], ...body};
    limpiarHorario();
}





function agregarPolitica(){
    console.log('Agregando política: ' + JSON.stringify(nuevaPolitica.value) );
    store.crearPoliticaMembresia(nuevaPolitica.value).then((res)=>
    {
        if(res){
            console.log('Política agregada');
        }else{
            console.log('Error al agregar política: ', JSON.stringify(nuevaPolitica.value));
        }
    });
}

function eliminarPolitica(p){
    console.log('Eliminando política: ' + p.PoliticasMembreciasId);
    store.borrarPoliticaMembresia(p.PoliticasMembreciasId).then((res)=>
    {
        if(res){
            console.log('Política eliminada: ' + p.PoliticasMembreciasId);
        }
    });
}

function editandoPolitica(registro){
    console.log('EditandoHorarios política: ');
    nuevaPolitica.value = {...registro};
    editandoPoliticas.value = true;
}

function editarPoliticas(){
    nuevaPolitica.value = {
        ...nuevaPolitica.value,
        PoliticasMembreciasId: nuevaPolitica.value.PoliticasMembreciasId,
        CreadoPor: 2
    }

    store.actualizarPoliticaMembresia(nuevaPolitica.value).then((res)=>
    {
        if(res){
            console.log('Política editada');
        }else{
            console.log('Error al editar política: ', JSON.stringify(nuevaPolitica.value));
        }
    });
}





function limpiarHorario(){
    hInicio.value = '';
    hFin.value = '';
    lunes.value = false;
    martes.value = false;
    miercoles.value = false;
    jueves.value = false;
    viernes.value = false;
    sabado.value = false;
    domingo.value = false;
    editandoHorarios.value = false;
    registroEditado.value = 0;
    editandoHorarios.value = false;
    editandoPoliticas.value = false;
}


const estadoFrmHorario = computed(() => { 
   return (editandoHorarios.value ? editarHorario() : agregarHorario());
});

const estadoFrmPolitica = computed(() => { 
    return (editandoPoliticas.value ? editarPoliticas() : agregarPolitica());
 });

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
        <h2> Políticas de membresía </h2>
        <div class="formulario">
            <div class="mainFrm">
                <input type="text" placeholder="Descripción" v-model="nuevaPolitica.Descripcion">
                <input type="text" placeholder="Tipo de Periodo" v-model="nuevaPolitica.TipoPeriodo">
                <input type="number" placeholder="Valor de Periodo" min="1" v-model="nuevaPolitica.ValorPeriodo">
                <label for="EsGrupal"> Es Grupal: </label>
                <input type="checkbox" name="EsGrupal" id="EsGrupal" v-model="nuevaPolitica.EsGrupal">
                <input type="number" name="MinimoGrupal" id="MinimoGrupal" placeholder="MinimoGrupal" v-model="nuevaPolitica.MinimoGrupal"  min="1" v-if="nuevaPolitica.EsGrupal">
                <input type="number" name="MaximoGrupal" id="MaximoGrupal" placeholder="MaximoGrupal" v-model="nuevaPolitica.MaximoGrupal" min="2" v-if="nuevaPolitica.EsGrupal">
                <label for="EsPremiun"> Es Premium: </label>
                <input type="checkbox" name="EsPremiun" id="EsPremiun" v-model="nuevaPolitica.EsPremiun">
    
            </div>
            <div class="btFrm">
                <button @click="estadoFrmPolitica" class="btAgregar">
                    <svg class="btImg" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 0C4.92339 0 0 4.92339 0 11C0 17.0766 4.92339 22 11 22C17.0766 22 22 17.0766 22 11C22 4.92339 17.0766 0 11 0Z" fill="#fff"/>
                        <path d="M17.433 9.03839H12.3504V3.37559C12.3504 2.68072 11.8447 2.11719 11.221 2.11719H10.0915C9.46784 2.11719 8.96205 2.68072 8.96205 3.37559V9.03839H3.87946C3.25579 9.03839 2.75 9.60192 2.75 10.2968V11.5552C2.75 12.2501 3.25579 12.8136 3.87946 12.8136H8.96205V18.4764C8.96205 19.1713 9.46784 19.7348 10.0915 19.7348H11.221C11.8447 19.7348 12.3504 19.1713 12.3504 18.4764V12.8136H17.433C18.0567 12.8136 18.5625 12.2501 18.5625 11.5552V10.2968C18.5625 9.60192 18.0567 9.03839 17.433 9.03839Z" fill="#353535"/>
                    </svg>
                    <span clasS="btTxt"> Agregar </span>
                </button>
            </div>
        </div>
        
        <div class="contenedorTabla animate__animated animate__fadeIn mb-4">
                <table>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Descripción </th>
                            <th> Tipo de Periodo </th>
                            <th> Valor de Periodo </th>
                            <th> Es Grupal </th>
                            <th> Minimo Grupal </th>
                            <th> Maximo Grupal </th>
                            <th> Es Premium </th>
                            <th class="Acciones"> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="membresia in listadoMembresias">
                            <td class="Acciones"> {{membresia.PoliticasMembreciasId}} </td>
                            <td class="Acciones"> {{membresia.Descripcion}} </td>
                            <td class="Acciones"> {{membresia.TipoPeriodo}} </td>
                            <td class="Acciones"> {{membresia.ValorPeriodo}} </td>
                            <td class="Acciones"> {{membresia.EsGrupal}} </td>
                            <td class="Acciones"> {{membresia.MinimoGrupal}} </td>
                            <td class="Acciones"> {{membresia.MaximoGrupal}} </td>
                            <td class="Acciones"> {{membresia.EsPremiun}} </td>
                            <td class="Acciones"> 
                                <img 
                                src="@/assets/img/edit.svg" 
                                alt="tablaImg"
                                class="tablaImg me-3"
                                @click="editandoPolitica(membresia)"
                                >
                                <img 
                                src="@/assets/img/trash.svg" 
                                alt="tablaImg"
                                class="tablaImg"
                                @click="eliminarPolitica(membresia)"
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
        </div>
        <div class="contenedorContenido">
            <div class="formulario">

                <div class="mainFrm">
                    <label for="hInicio"> Horario Inicio </label>
                    <input 
                            type="time" 
                            name="hInicio" 
                            id="hInicio" 
                            min="00:00"
                            :max="hFin"
                            v-model="hInicio"
                    >
                    <label for="hFin"> Horario Fin </label>
                    <input 
                        type="time" 
                        name="hFin" 
                        id="hFin"  
                        :min="hInicio"
                        max="23:59"
                        v-model="hFin"
                    >
    
                    <label for="lunes"> Lunes: </label>
                    <input 
                        type="checkbox" 
                        name="lunes" 
                        id="lunes" 
                        v-model="lunes" 
                        :checked="lunes"
                    >

                    <label for="martes"> Martes: </label>
                    <input 
                        type="checkbox" 
                        name="martes" 
                        id="martes" 
                        v-model="martes" 
                        :checked="martes"
                    >
    
                    <label for="miercoles"> Miércoles: </label>
                    <input 
                        type="checkbox" 
                        name="miercoles" 
                        id="miercoles" 
                        v-model="miercoles" 
                        :checked="miercoles"
                    >
    
                    <label for="jueves"> Jueves: </label>
                    <input 
                        type="checkbox" 
                        name="jueves" 
                        id="jueves" 
                        v-model="jueves" 
                        :checked="jueves"
                    >
    
                    <label for="viernes"> Viernes: </label>
                    <input 
                        type="checkbox" 
                        name="viernes" 
                        id="viernes" 
                        v-model="viernes" 
                        :checked="viernes"
                    >
    
                    <label for="sabado"> Sábado: </label>
                    <input 
                        type="checkbox" 
                        name="sabado" 
                        id="sabado" 
                        v-model="sabado" 
                        :checked="sabado"
                    >
    
                    <label for="domingo"> Domingo: </label>
                    <input 
                        type="checkbox" 
                        name="domingo" 
                        id="domingo" 
                        v-model="domingo" 
                        :checked="domingo"
                    >
                </div>

                <div class="btFrm">
                    <button @click="estadoFrmHorario" class="btAgregar">
                        <svg class="btImg" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 0C4.92339 0 0 4.92339 0 11C0 17.0766 4.92339 22 11 22C17.0766 22 22 17.0766 22 11C22 4.92339 17.0766 0 11 0Z" fill="#fff"/>
                            <path d="M17.433 9.03839H12.3504V3.37559C12.3504 2.68072 11.8447 2.11719 11.221 2.11719H10.0915C9.46784 2.11719 8.96205 2.68072 8.96205 3.37559V9.03839H3.87946C3.25579 9.03839 2.75 9.60192 2.75 10.2968V11.5552C2.75 12.2501 3.25579 12.8136 3.87946 12.8136H8.96205V18.4764C8.96205 19.1713 9.46784 19.7348 10.0915 19.7348H11.221C11.8447 19.7348 12.3504 19.1713 12.3504 18.4764V12.8136H17.433C18.0567 12.8136 18.5625 12.2501 18.5625 11.5552V10.2968C18.5625 9.60192 18.0567 9.03839 17.433 9.03839Z" fill="#353535"/>
                        </svg>
                        <span clasS="btTxt"> Agregar </span>
                    </button>
                </div>
            </div>
            <div class="contenedorTabla animate__animated animate__fadeIn">
                <table>
                    <thead>
                        <tr>
                            <th> Horario Inicio </th>
                            <th> Horario Fin </th>
                            <th> Lunes </th>
                            <th> Martes </th>
                            <th> Miércoles </th>
                            <th> Jueves </th>
                            <th> Viernes </th>
                            <th> Sábado </th>
                            <th> Domingo </th>
                            <th class="Acciones"> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="horario in listadoHorarios">
                            <td class="Acciones"> {{horario.hInicio}} </td>
                            <td class="Acciones"> {{horario.hFin}} </td>
                            <td> {{horario.lunes}} </td>
                            <td> {{horario.martes}} </td>
                            <td> {{horario.miercoles}} </td>
                            <td> {{horario.jueves}} </td>
                            <td> {{horario.viernes}} </td>
                            <td> {{horario.sabado}} </td>
                            <td> {{horario.domingo}} </td>
                            <td class="Acciones"> 
                                <img 
                                src="@/assets/img/edit.svg" 
                                alt="tablaImg"
                                class="tablaImg me-3"
                                @click="editandoHorario(horario)"
                                >
                                <img 
                                src="@/assets/img/trash.svg" 
                                alt="tablaImg"
                                class="tablaImg"
                                @click="eliminarHorario(horario)"
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
@import '@/styles/checkbox.css';

.contenedor {
    background-color: #fff;
    width: 100%;
    height: 51rem;
    border-radius: 1rem;
    overflow: hidden;
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
h2{
    text-align: start;
    color: #000;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;

}
.contenedorContenido{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.formulario{
    display: flex;
    flex-direction: row;
    margin-bottom: 1.5rem;
    align-items: center;
    justify-content: space-between;
}
input{
    color: #000;
    border: 1px solid #000;
    border-radius: 0.3125rem;
}
input[type="text"], input[type="time"]{
    width: 12.5rem;
    height: 2.1875rem;
    padding-left: 1rem;
}
label, input[type="checkbox"], input[type="time"]{
    margin-right: 1rem;
    
}
label{
    color: #000;
    font-size: 1rem;
    font-weight: 500;
}
.btFrm{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.btAgregar{
    background-color: #353535;
    border-radius: 0.3125rem;
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 2.1875rem;
    width: 11.625rem;
}
.btImg{
    margin-right: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
}
.btTxt{
    color: #fff;
    font-size: 1.25rem;
    font-weight: bold;
}
.mainFrm{
    display: flex;
    flex-direction: row;
    align-items: center;
}

.tablaImg{
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
}
.contenedorTabla{
    width: 100%;
    height: 100%;
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
    text-align: center;
    width: 11.625rem;
}
.formularioNuevo{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1.5rem;
}
.formularioNuevo input, label{
    margin-right: 1rem;
}
.mainFrm input{
    margin-right: 1rem;
}
</style>