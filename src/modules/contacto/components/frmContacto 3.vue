<template >
    <div class="container  contenedor">
  
      <div class="row">
        <div class="col-12">
          <h1>Contacto</h1>
  
        </div>
        <div class="row align-items-center">
          <div class="col-auto mb-3 align-self-center">Contacto</div>
          <div class="col-auto">  
            <select class="form-select mb-3" v-model="ContactoSeleccionado" @change="SeleccionContacto">
              <option v-for ="l in ListaContactos">{{l.Nombres + " "+  l.ApellidoPaterno + " "+ l.ApellidoMaterno }}</option>
            </select>
  
          </div>
          <div class="col-auto mb-3 align-self-center">
            <span>
              <img @click="ModalAgregarContacto(1)" class="icono" src="@/assets/img/AddUser.svg" />
            </span>
          </div>
          <div class="col-auto mb-3 align-self-center">
          </div>
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-12 mb-2" v-if="datosContactoListos">        
          <tablaInfinita @activarEditarContacto="ModalAgregarContacto(2)" :Lista="ListaContactosTemp" :m_actualizarContacto="m_actualizarContacto" :eliminarContacto="eliminarContacto"/>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <datosTabla :Lista="ListaTelefonos" :tipoTabla="'telefono'" /> 
          <datosTabla :Lista="ListaCorreos" :tipoTabla="'correo'" /> 
        </div>
      </div>
    </div>
  
   
  
    
        <!-- 
          <modalContacto :SucursalId="1010" :CreadoPor="123" :ActualizadoPor="0"  :modo="modo" :key = "modo"
          @guardar-contacto="guardarContacto"  @modificarModo ="actualizarModo" /> 
          -->
  
        
        <modalContacto :key = "modo"  @actualizar-contacto="actualizarContacto" @guardar-contacto="guardarContacto" :modo="modo"  @modificarModo ="actualizarModo"/> 
  
      
      
  
      
  
  
    
  
    <div class="modal" tabindex="-1" ref="modalEleLista">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Lista de Contactos</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <select class="form-select" multiple aria-label="Multiple select example" v-for="lc in ListaContactos" :key="lc.ContactoId">
             
              <option  :value="lc.ContactoId" @click="contactoXiD(lc.ContactoId)">{{lc.Nombres}}</option>
            
          </select>
  
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cerrarModal">Close</button>
          <button type="button" class="btn btn-primary">Guardar cambios</button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 
      <ListaContacto :Lista="ListaContactos" :visible="mostrarModalLista"/> -->
    
  </template>
  
  <script >
  
  import { ref, onMounted,getCurrentInstance } from 'vue'
  import datosTabla from '@/shared/datosTabla.vue'
  import modalContacto from './modalContacto.vue'
  import tablaInfinita from './tablaInfinita.vue'
  import ListaContacto from './ListaContacto.vue'
  import {Modal} from 'bootstrap'
  const { useContacto } = require('../store/contacto')
  
  
  export default {
    components: {
  
      datosTabla,
      modalContacto,
      tablaInfinita,
      ListaContacto
  
    },
    name: 'frmContacto',
  
    setup() {
      const icono_addContacto = "../assets/AddUser.svg";
      const ContactoSeleccionado = ref('')
      const ListaContactos = ref([]) // Lista general de contacto
      const ListaContactosTemp = ref([]) //Lista de contacto que deslegara la tabla al buscar los elementos de la tabla
      const ListaTelefonos = ref([])
      const ListaCorreos = ref([])
      const idSucursal = ref(1010);
      const ContactoId = ref(0)
      const ApellidoPaterno = ref('');
      const ApellidoMaterno = ref('');
      const Nombres = ref('');
      const Departamento = ref('');
      const Puesto = ref('');
      const numTelefono = ref('');
      const correo = ref('');
      const CreadoPor = ref(123)
      const ActualizadoPor = ref(0)
      const BorradoPor = null
      const BorradoEn = null
      const Telefonos = ref([])
      const Correos = ref([])
      const modo = ref('')
      const datosContactoListos = ref(false)
      const mostrarModalLista = ref(false)
      let mostrarModalContacto = ref(false)
      let modalEleLista = ref(null) //modal de lista
      let modalObjLista = null //modal de lista
      const store = useContacto();
      const { emit } = getCurrentInstance(); 
      //Abrir modales
      function ModalAgregarContacto(opcion) {
        if (opcion == 1){
          modo.value = 'Guardar'
  
        }else if (opcion == 2){
          modo.value = 'Actualizar'
        }
        mostrarModalContacto.value = true;
      }
  
      const ModalListaContacto = () =>{
        //console.log("entre modal lista contacto")
      //  mostrarModalLista.value = true
        //console.log(mostrarModalLista.value)
        modalObjLista.show()
      }
  
  
      //CRUD CONTACTO 
      const guardarContacto = (datos, telefonos, correos) => {
        store.guardarContactos(datos, telefonos, correos);
  
       
      }
  
      const eliminarContacto = (idContacto) => {
  
        store.borrarContacto(idContacto)
  
  
      }
   
  
      const actualizarContacto = (datos, telefonos, correos) => {
        store.actualizaContactos(datos, telefonos, correos)
  
      }
      //CRUD Telefono
      //prueba camb iar modo
      const actualizarModo =(nuevoModo) =>{
        /* console.log("entre variable desde hijo :",nuevoModo) */
        modo.value = nuevoModo
      }
      //Carga de informacion
  
      const SeleccionContacto = () =>{
        console.log('El usuario es: ' + ContactoSeleccionado.value);
        ContactoId.value = ListaContactos.value.filter(contacto => (contacto.Nombres + " " + contacto.ApellidoPaterno + " " + contacto.ApellidoMaterno) === ContactoSeleccionado.value)[0].ContactoId
        ApellidoMaterno.value = ListaContactos.value.filter(contacto => (contacto.Nombres + " " + contacto.ApellidoPaterno + " " + contacto.ApellidoMaterno) === ContactoSeleccionado.value)[0].ApellidoMaterno
        ApellidoPaterno.value = ListaContactos.value.filter(contacto => (contacto.Nombres + " " + contacto.ApellidoPaterno + " " + contacto.ApellidoMaterno) === ContactoSeleccionado.value)[0].ApellidoPaterno
        Nombres.value = ListaContactos.value.filter(contacto => (contacto.Nombres + " " + contacto.ApellidoPaterno + " " + contacto.ApellidoMaterno) === ContactoSeleccionado.value)[0].Nombres
        Departamento.value = ListaContactos.value.filter(contacto => (contacto.Nombres + " " + contacto.ApellidoPaterno + " " + contacto.ApellidoMaterno) === ContactoSeleccionado.value)[0].Departamento
        Puesto.value = ListaContactos.value.filter(contacto => (contacto.Nombres + " " + contacto.ApellidoPaterno + " " + contacto.ApellidoMaterno) === ContactoSeleccionado.value)[0].Puesto
  
        ListaContactosTemp.value = ListaContactos.value.filter(contacto => (contacto.Nombres + " " + contacto.ApellidoPaterno + " " + contacto.ApellidoMaterno) === ContactoSeleccionado.value);
      }
      onMounted(() => {
        //obtener contacto
/*         store.cargarContactos(1).then(() => {
          ListaContactos.value = store.listaContacto
          ListaContactosTemp.value = ListaContactos.value        
          datosContactoListos.value = true
        });
        store.obtenerTelefonosCorreosEmpresas().then(()=>{
          ListaTelefonos.value = store.listaTelefono;
          ListaCorreos.value=store.listaCorreo;
          console.log("[TIPO]: ListadoTelefonos: " + JSON.stringify(ListaCorreos.value));
        });
        modalObjLista = new Modal(modalEleLista.value); */
      });
     
      //Operaciones contacto
      const m_actualizarContacto = (idContacto) => {
        modo.value = 'actualizar'
        mostrarModalContacto.value = true;
        let Contacto = ListaContactos.value.filter(contacto => contacto.ContactoId === idContacto)
        /* console.log(Contacto) */
        for (const iterator of Contacto) {
          ContactoId.value = iterator.ContactoId
          Nombres.value = iterator.Nombres
          ApellidoPaterno.value = iterator.ApellidoPaterno
          ApellidoMaterno.value = iterator.ApellidoMaterno
          Departamento.value = iterator.Departamento
          Puesto.value = iterator.Puesto
  
  
        }
  
      }
      const contactoXiD = (idContacto) =>{
  /*         console.log('Lista contactos',ListaContactos.value)
          console.log('Lista contacto temp',ListaContactosTemp.value) */
          let Contacto = ListaContactos.value.filter(contacto => contacto.ContactoId === idContacto)
          /* console.log(Contacto) */
          ListaContactosTemp.value = Contacto
          /* console.log("Lista contactos temp",ListaContactosTemp.value[0].Nombres) */
         // console.log(' click en ListaContactosTemp',ListaContactosTemp.value[0].SucursalId)
          emit('actualizar-datos',ListaContactosTemp.value)
  
      }
  
      return {
        icono_addContacto,
        ListaContactos,
        idSucursal,
        ContactoId,
        ApellidoPaterno,
        ApellidoMaterno,
        Nombres,
        Departamento,
        Puesto,
        numTelefono,
        correo,
        CreadoPor,
        BorradoPor,
        BorradoEn,
  
        Telefonos,
        Correos,
        ListaTelefonos,
        ListaCorreos,
        ListaContactosTemp,
        mostrarModalContacto,
        ActualizadoPor,
        modo,
        datosContactoListos,
        mostrarModalLista,
        modalEleLista,
        ContactoSeleccionado,
        ModalAgregarContacto, //funcion
        guardarContacto,//funcion
        eliminarContacto,
        m_actualizarContacto,
        actualizarContacto,
        ModalListaContacto,
        contactoXiD,
        actualizarModo,
        SeleccionContacto,
      }
    }
  
  
  
  
  
  
  
  }
  
  </script>
  
  <style lang="scss" scoped>
  @import '../../../styles/variables.scss';
  
  .icono {
    width: 1.5rem;
    cursor: pointer;
  }
  
  .contenedor {
    align-items: right;
    width: 40.93rem;
  
  
    padding: 1.5rem 1.5rem 0rem 1.5rem;
    text-align: left;
  
  }
  
  h1 {
  
    font-size: 2rem;
    text-align: left;
  }
  
  h5,
  h4 {
    color: black;
  
  }
  
  
  
  </style>