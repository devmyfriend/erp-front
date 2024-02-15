<template>
  <div class="contenedorPadre">
    <h1> Contacto </h1>
    
    <div class="filaContacto">
      
      <div class="formulario principal">
        <buscador @eBusqueda="esperarBusqueda"/>
        <button class="btAgregarContacto">
          <svg src="@/assets/img/AddUser.svg" class="icono btAgregarC" @click="abrirMContacto(1)" height="1rem" xmlns="http://www.w3.org/2000/svg">
        <path 
        d="M24.375 8.125H21.875V5.625C21.875 5.28125 21.5938 5 21.25 5H20C19.6562 
        5 19.375 5.28125 19.375 5.625V8.125H16.875C16.5312 8.125 16.25 8.40625 16.25 
        8.75V10C16.25 10.3438 16.5312 10.625 16.875 10.625H19.375V13.125C19.375 13.4688 
        19.6562 13.75 20 13.75H21.25C21.5938 13.75 21.875 13.4688 21.875 13.125V10.625H24.375C24.7188 
        10.625 25 10.3438 25 10V8.75C25 8.40625 24.7188 8.125 24.375 8.125ZM8.75 10C11.5117 10 13.75 7.76172 
        13.75 5C13.75 2.23828 11.5117 0 8.75 0C5.98828 0 3.75 2.23828 3.75 5C3.75 7.76172 5.98828 10 8.75 10ZM12.25 
        11.25H11.5977C10.7305 11.6484 9.76562 11.875 8.75 11.875C7.73438 11.875 6.77344 11.6484 5.90234 11.25H5.25C2.35156 
        11.25 0 13.6016 0 16.5V18.125C0 19.1602 0.839844 20 1.875 20H15.625C16.6602 20 17.5 19.1602 17.5 18.125V16.5C17.5 
        13.6016 15.1484 11.25 12.25 11.25Z" fill="#999999"/>
          </svg>
          <span class="ms-3"> Agregar Contacto </span> 
        </button>
      </div>
      <div class="tablaContactos" @mouseenter="tipo = 1">
        <tablaInfinita 
          :listado="ListadoContactos" 
          :encabezados="headsContacto" 
          :acciones="2" 
          :paginado="3"
          :pBusqueda="pBusqueda"
          :pRegistroNuevo="pRegistroNuevo"
          @pBusqueda="esperarBusqueda"
          @eRegistroNuevo="pRegistroNuevo = false"
          @eAccion="esperarAccionWrapper"
        />
      </div>
    </div>

    <div class="filaContacto" @mouseenter="tipo = 2">
      <div class="formulario">
        <input  v-model="telefono" type="text" placeholder="Teléfono" class="inp">
        <img src="@/assets/img/AddUser.svg" class="icono margIzq" @click="agregarDatos(1)">
      </div>

      <div class="filaMiniTabla">
        <tablaInfinita
          :listado="ListadoTelefonos" 
          :encabezados="headsTelefono" 
          :paginado="3" 
          :acciones="2" 
          :pRegistroNuevo="pRegistroNuevo" 
          @eAccion="esperarAccionWrapper"
          @eRegistroNuevo="pRegistroNuevo = false"
        />
      </div>
    </div>

    <div class="filaContacto" @mouseenter="tipo = 3">
      <div class="formulario">
        <input  v-model="correo" type="text" placeholder="Correo e." class="inp">
        <img src="@/assets/img/AddUser.svg" class="icono margIzq" @click="agregarDatos(2)">
      </div>

      <div class="filaMiniTabla">
        <tablaInfinita 
          :listado="ListadoCorreos" 
          :encabezados="headsCorreo"
          :acciones="2" :paginado="3" 
          :pRegistroNuevo="pRegistroNuevo" 
          @eRegistroNuevo="pRegistroNuevo = false"
          @eAccion="esperarAccionWrapper"
        />
      </div>
    </div>

    <modalContacto 
      @esperarDatosContacto="agregarDatos"
      @cerrarModal="abrirMContacto"
      v-if="pContactoNuevo"
      :EntidadNegocioId="props.EntidadNegocioId"
      :modo="modalMode"
      :pRegistroNuevo="pRegistroNuevo" 
      @eRegistroNuevo="pRegistroNuevo = false"
      :registro="registroSelect"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import tablaInfinita from '@/shared/sTablaInfinita.vue';
import modalContacto from '@/modules/contacto/components/modalContacto.vue';
import buscador from '@/modules/contacto/components/buscadorContacto.vue';
import Swal from 'sweetalert2';

const { useContacto } = require('../store/contacto')
const store = useContacto()

const props = defineProps({
  EntidadNegocioId: {
    type: Number,
    default: 1
  },
  ContactoId: {
    type: Number,
    default: 1
  }
})

const ListadoContactos = ref([])
const headsContacto = ref(['ContactoId', 'Nombres',	'Paterno',	'Materno'])

const ListadoTelefonos = ref([])
const headsTelefono = ref(['ID', 'Telefono'])

const ListadoCorreos = ref([])
const headsCorreo = ref(['ID', 'Correo'])

const telefono = ref('')
const correo = ref('')

const pContactoNuevo = ref(false)
const pRegistroNuevo = ref(false)
const tipo = ref(0)
const modalMode = ref('Guardar')
const registroSelect = ref({})
const pBusqueda = ref(false)

onMounted(() => {
  store.cargarContactos(props.EntidadNegocioId).then(() =>{
    loadContactos()
    loadTelMail()
  })
})

function loadContactos(){
  store.cargarContactos(props.EntidadNegocioId).then(() =>{
    ListadoContactos.value = store.listaContacto
    ListadoContactos.value = ListadoContactos.value.map(contacto => {
    return {
        ContactoId: contacto.ContactoId,
        Nombres: contacto.Nombres,
        ApellidoPaterno: contacto.ApellidoPaterno,
        ApellidoMaterno: contacto.ApellidoMaterno,
/*         Departamento: contacto.Departamento,
        Puesto: contacto.Puesto */
    };
  });
  });
}

function loadTelMail(){
  store.cargarTelMails(props.EntidadNegocioId).then(() =>{
    ListadoTelefonos.value = store.listaTelefono
    ListadoCorreos.value = store.listaCorreo

    ListadoTelefonos.value = ListadoTelefonos.value.map(telefono => {
      return {
        TelefonoId: telefono.TelefonoId,  
        NumeroTelefonico: telefono.NumeroTelefonico,
      };
    });

    ListadoCorreos.value = ListadoCorreos.value.map(correo => {
      return {
        EmailId: correo.EmailId,
        Email: correo.Email,
      };
    });
    });
}

function abrirMContacto(opc){
  console.log('opción elegida ' + opc);
  pContactoNuevo.value = !pContactoNuevo.value;
  console.log('Modal:' + pContactoNuevo.value);
  if (opc == 1) {
    modalMode.value = 'Guardar'
    console.log('[G] Modal mode: ' + modalMode.value);
    registroSelect.value = {}
  }else if(opc == 2){
    modalMode.value = 'Actualizar'
    console.log('[A] Modal mode: ' + modalMode.value);
  }
}

function agregarDatos(opc ){
  if(opc == 1 && validar(1, telefono.value)){
    const contenido = {
      EntidadNegocioId: props.EntidadNegocioId,
      NumeroTelefonico: telefono.value,
      CreadoPor: '0'
    }
    store.crearTelefono(contenido).then((res) =>{
      if(res){
        telefono.value = ''
        loadTelMail()
        pRegistroNuevo.value = true
      }
    }) 
  }
  else if (opc == 2 && validar(2, correo.value)){
    const contenido = {
      EntidadNegocioId: props.EntidadNegocioId,
      Email: correo.value,
      CreadorPor: '0'
    }
    store.crearCorreo(contenido).then((res) =>{
      if(res){
        correo.value = ''
        loadTelMail()
        pRegistroNuevo.value = true
      }
    })
  }
  else if (opc == 3){
    loadContactos()
  }
}

function validar(opc, txt){
  if(txt == '' || txt == null || txt == undefined || txt == ' '){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El campo no puede estar vacío'
    })
    return false
  }else{
    if(opc == 1){ //Telefono
      if(txt.length != 10){
        return false
      }else{
        return true
      }
    }else{  //Correo
      if(txt.includes('@') && txt.includes('.') && !txt.includes(' ')){
        return true
      }else{
        return false
      }
    }
  }
}

function esperarBusqueda(){
  pBusqueda.value = !pBusqueda.value
  if(pBusqueda.value){
    alert('[frm] Buscando...: ');
    loadContactos()
  }else{
    alert('[frm] No buscando...: ');
  }
}

const esperarAccionWrapper = (act, data) => {
  if(act == 1){
    if(tipo.value == 1){
      console.log('Editar contacto: ' );
      registroSelect.value = store.listaContacto.find(objeto => objeto.ContactoId === data.ContactoId);
      console.log('Registro select: ' + JSON.stringify(registroSelect.value));
      modalMode.value = 'Actualizar';
      abrirMContacto(2)
    }else if(tipo.value == 2){
      Swal.fire({
        title: 'Ingresa el numero de telefono',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        showLoaderOnConfirm: true,
        preConfirm: (inputString) => {
          // Do something with the inputString
          if (inputString.length !== 10) {
            Swal.showValidationMessage('El número de teléfono debe tener 10 dígitos');
          } else {
            const body = {
              "EntidadNegocioId": props.EntidadNegocioId,
              "TelefonoId": data.TelefonoId,
              "NumeroTelefonico": inputString,
              "ActualizadoPor": "0"
            }
            console.log('Body: ' + JSON.stringify(body));
            store.editarTelefono(body).then((res) => {
              if(res){
                loadTelMail()
                Swal.fire({
                  title: 'Actualizado!',
                  icon: 'success'
                })
              }
            })
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
      
    }else if(tipo.value == 3){
      Swal.fire({
        title: 'Ingresa el correo electrónico',
        input: 'email',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        showLoaderOnConfirm: true,
        preConfirm: (inputString) => {
          // Do something with the inputString
          if (!inputString.includes('@') || !inputString.includes('.')) {
            Swal.showValidationMessage('El correo electrónico debe tener un formato válido');
          } else {
            const body = {
              "EntidadNegocioId": props.EntidadNegocioId,
              "EmailId": data.EmailId,
              "Email": inputString,
              "ActualizadoPor": "0"
            }
            console.log('Body: ' + JSON.stringify(body));
            store.editarCorreo(body).then((res) => {
              if(res){
                loadTelMail()
                Swal.fire({
                  title: 'Actualizado!',
                  icon: 'success'
                })
              }
            })
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
    }
  }else if(act == 2) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        if(tipo.value == 1){
          const body = {
              "EntidadNegocioId": props.EntidadNegocioId,
              "ContactoId": data.ContactoId,
              "BorradoPor": "0"
          }
          store.borrarContacto(body).then((res) => {
            if(res){
              loadContactos()
              Swal.fire(
                'Borrado!',
                'El registro ha sido eliminado.',
                'success'
              )
            }
          })
          }else if(tipo.value == 2){
          const body = {
              "EntidadNegocioId": props.EntidadNegocioId,
              "TelefonoId": data.TelefonoId,
              "BorradoPor": "0"
          }
          console.log(body);
          store.borrarTelefono(body).then((res) => {
            if(res){
              loadTelMail()
              Swal.fire(
                'Borrado!',
                'El telefono ha sido eliminado.',
                'success'
              )
            }
          })
        }else if(tipo.value == 3){
          const body = {
              "EntidadNegocioId": props.EntidadNegocioId,
              "EmailId": data.EmailId,
              "BorradoPor": "0"
          }
          store.borrarCorreo(body).then((res) => {
            if(res){
              loadTelMail()
              Swal.fire(
                'Borrado!',
                'El correo ha sido eliminado.',
                'success'
              )
            }
          })
        }
      }
    })
  }
}
</script>

<style scoped>
h1{
  text-align: start;
  font-size: 2rem;
}
.contenedorPadre{
  height: 100%;
  width: 650px;
  padding: 1.5rem 1.5rem 0rem 1.5rem;
}
.icono{
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
}
.lbContacto{
  color: #999;
  font-size: 1.5rem;
  margin-right: 1rem;
}
.selectContacto{
  width: 27.75rem;
  height: 2rem;
  font-size: 1rem;
  border-radius: 0.3125rem;
  border: none;
  padding: 0.25rem 1rem;
}
.margIzq{
  margin-left: 1rem;
}
.filaContacto{
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
table{
  width: 100%;
}
.inp{
  width: 16rem;
  height: 2rem;
  border-radius: 0.3125rem;
  border: none;
  padding: 1rem;
  margin-bottom: 1.5rem;
}
.filaMiniTabla{
  width: 100%;
  margin-bottom: 1rem;
}
.tablaContactos{
  margin: 1rem auto 1rem auto;
  width: 100%;
}
.btAgregarContacto{
  display: flex;
  justify-content: center;
  width: auto;
  height: 2.1875rem;
  border: none;
  border-radius: 0.3125rem;
  background-color: #999999;
  color: #fff;
  padding: 0.5rem 1rem; 
  text-decoration: none;
}
svg path {
  fill: #fff;
}
.principal{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>