<template >
  <div class="container  contenedor">

    <div class="row">
      <div class="col-12">
        <h1>Contacto</h1>

      </div>
      <div class="row align-items-center">
        <div class="col-auto mb-3 align-self-center">Contacto</div>
        <div class="col-auto">
        <!--   <input id="contacto" class="form-control mb-3" type="text" /> -->

          <select class="form-select mb-3">
            <option v-for ="l in ListaContactos">{{l.Nombres +" "+ l.ApellidoPaterno + " "+ l.ApellidoMaterno}}</option>
          </select>

        </div>
        <div class="col-auto mb-3 align-self-center">
          <span>
            <img @click="ModalAgregarContacto" class="icono" src="@/assets/img/user-add-icon.png" />
          </span>
        </div>
        <div class="col-auto mb-3 align-self-center">
          <span>
            <img @click="ModalListaContacto" class="icono" src="@/assets/img/plus.png" />
          </span>
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-12" v-if="datosContactoListos">
             
        <tablaInfinita :Lista="ListaContactosTemp" :obtenerTelefonoCorreo="obtenerTelefonoCorreo" :m_actualizarContacto="m_actualizarContacto" :eliminarContacto="eliminarContacto"/>
  <!-- 
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id contacto</th>
              <th scope="col">Contacto</th>
              <th scope="col">Puesto</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>

       
   
            <tr v-for="lc in ListaContactos" :key="lc.ContactoId" @click="obtenerTelefonoCorreo(lc.ContactoId)">
              <td>{{ lc.ContactoId }}</td>
              <td>{{ lc.Nombres }}</td>
              <td>{{ lc.Puesto }}</td>
              <td>
                <span>
                  <img @click="m_actualizarContacto(lc.ContactoId)" class="icono " src="@/assets/img/edit-icon.png" />
                </span>
                <span>
                  <img @click="eliminarContacto(lc.ContactoId)" class="icono ms-3" src="@/assets/img/remove-icon.png" />
                </span>
              </td>
            </tr>

          </tbody>
        </table> -->
      </div>
    </div>
    <div class="row">

      <div class="col-12">
     <datosTabla :Lista="ListaTelefonos" :tipoTabla="'telefono'" /> 
        <!-- 
          <table class="table">
            <thead>
              <tr>
                <th scope="col">id de Tel.</th>
                <th scope="col">Número Télefonico </th>
                <th scope="col"> Acciones </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for =" tel in ListaTelefonos" :key="tel.TelefonoId">
                <td>{{ tel.TelefonoId }}</td>
                <td>{{ tel.NumeroTelefonico }}</td>
                <td>
                  <span>
                                <img class="icono" src="../assets/edit-icon.png" />
                              </span>
                              <span>
                                <img  class="icono" src="../assets/remove-icon.png" />
                              </span>
                </td>
              </tr>
            </tbody>
          </table>
       
        -->

      </div>
    </div>
    <div class="row">

      <div class="col-12">


       <datosTabla :Lista="ListaCorreos" :tipoTabla="'correo'" /> 


      </div>
    </div>
  </div>
      <!-- 
        <modalContacto :SucursalId="1010" :CreadoPor="123" :ActualizadoPor="0"  :modo="modo" :key = "modo"
        @guardar-contacto="guardarContacto"  @modificarModo ="actualizarModo" /> 
        -->
      <modalContacto :ContactoId="ContactoId" :SucursalId="1010" :CreadoPor="123" :ActualizadoPor="0"
        :ApellidoPaterno="ApellidoPaterno" :ApellidoMaterno="ApellidoMaterno" :Nombres="Nombres"
        :Departamento="Departamento" :Puesto="Puesto" :key = "modo"  @actualizar-contacto="actualizarContacto"   @guardar-contacto="guardarContacto" :modo="modo"  @modificarModo ="actualizarModo" /> 
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
    const icono_addContacto = "../assets/user-add-icon.png";
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
    const ModalAgregarContacto = () => {
  
      modo.value = 'guardar'
      console.log(modo.value);
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

    const obtenerTelefonoCorreo = (idContacto) => {
      store.obtenerDetalle(idContacto).then(() => {
        ListaTelefonos.value = store.listaTelefono
        ListaCorreos.value = store.listaCorreo
      })


      
    }
    //prueba camb iar modo
    const actualizarModo =(nuevoModo) =>{
      console.log("entre variable desde hijo :",nuevoModo)
      modo.value = nuevoModo
    }
    //Carga de informacion

    onMounted(() => {
      //obtener contacto
      store.cargarContactos().then(() => {
        ListaContactos.value = store.listaContacto
        console.log('Lista normal',ListaContactos.value)
          ListaContactosTemp.value = ListaContactos.value
          console.log('ListaContactosTemp',ListaContactosTemp.value)
      
        datosContactoListos.value = true

       

      });
      modalObjLista = new Modal(modalEleLista.value);
      
    });
   
    //Operaciones contacto
    const m_actualizarContacto = (idContacto) => {
      modo.value = 'actualizar'
      mostrarModalContacto.value = true;
      let Contacto = ListaContactos.value.filter(contacto => contacto.ContactoId === idContacto)
      console.log(Contacto)
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
        console.log('Lista contactos',ListaContactos.value)
        console.log('Lista contacto temp',ListaContactosTemp.value)
        let Contacto = ListaContactos.value.filter(contacto => contacto.ContactoId === idContacto)
        console.log(Contacto)
        ListaContactosTemp.value = Contacto
        console.log("Lista contactos temp",ListaContactosTemp.value[0].Nombres)
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
      ModalAgregarContacto, //funcion
      guardarContacto,//funcion
      obtenerTelefonoCorreo, //funcion
      eliminarContacto,
      m_actualizarContacto,
      actualizarContacto,
      ModalListaContacto,
      contactoXiD,
      actualizarModo

    }

  }







}

</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';

.icono {
  width: 1.5rem;
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