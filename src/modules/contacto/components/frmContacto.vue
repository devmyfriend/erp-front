<template >
  <div class="container  contenedor">

    <div class="row">
      <div class="col-12">
        <h1>Contacto</h1>

      </div>
      <div class="row align-items-center">
        <div class="col-auto mb-3 align-self-center">Contacto</div>
        <div class="col-auto">
          <input id="contacto" class="form-control mb-3" type="text" />
        </div>
        <div class="col-auto mb-3 align-self-center">
          <span>
            <img @click="ModalAgregarContacto" class="icono" src="@/assets/img/user-add-icon.png" />
          </span>
        </div>
        <div class="col-auto mb-3 align-self-center">
          <span>
            <img class="icono" src="@/assets/img/plus.png" />
          </span>
        </div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-12">
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
        </table>
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

  <div v-if="mostrarModalContacto">
    
    <div v-if="modo == 'guardar'">

      <modalContacto :SucursalId="1010" :CreadoPor="123" :ActualizadoPor="0" :modo="modo"
        @guardar-contacto="guardarContacto" />
    </div>
    <div v-if="modo == 'actualizar'">

      <modalContacto :ContactoId="ContactoId" :SucursalId="1010" :CreadoPor="123" :ActualizadoPor="0"
        :ApellidoPaterno="ApellidoPaterno" :ApellidoMaterno="ApellidoMaterno" :Nombres="Nombres"
        :Departamento="Departamento" :Puesto="Puesto" :modo="modo" @actualizar-contacto="actualizarContacto" />

    </div>

  </div>

</template>

<script >

import { ref,  onMounted } from 'vue'
import datosTabla from '@/shared/datosTabla.vue'
import modalContacto from './modalContacto.vue'


const { useContacto } = require('../store/contacto')


export default {
  components: {

    datosTabla,
    modalContacto

  },
  name: 'frmContacto',

  setup() {
    const icono_addContacto = "../assets/user-add-icon.png";
    const ListaContactos = ref([])
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


    let mostrarModalContacto = ref(false)

    const store = useContacto();
    //Abrir modal
    const ModalAgregarContacto = () => {
      //modalObj.show()
      console.log(mostrarModalContacto.value)
      modo.value = 'guardar'
      console.log(modo.value);
      mostrarModalContacto.value = true;
    }


    //CRUD CONTACTO 
    const guardarContacto = (datos, telefonos, correos) => {
      store.guardarContactos(datos, telefonos, correos);

      // modalObj.hide()
    }

    const eliminarContacto = (idContacto) => {

      store.borrarContacto(idContacto)


    }
    const m_actualizarContacto = (idContacto) => {

      console.log(ModalAgregarContacto.value)
      console.log("entre actualizar contacto");
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

    const actualizarContacto = (datos, telefonos, correos) => {
      console.log("Actualizar contactos")
      store.actualizaContactos(datos,telefonos,correos)

    }
    //CRUD Telefono

    const obtenerTelefonoCorreo = (idContacto) => {
      store.obtenerDetalle(idContacto).then(() => {
        ListaTelefonos.value = store.listaTelefono
        ListaCorreos.value = store.listaCorreo
      })


      console.log(ListaTelefonos.value);
      console.log(ListaCorreos.value);
    }

    //Carga de informacion

    onMounted(() => {
      //obtejenes contacto
      store.cargarContactos().then(() => {
        ListaContactos.value = store.listaContacto



      });
      // modalObj = new Modal(modalEle.value) 
      console.log(ListaContactos.value);
    });

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
      mostrarModalContacto,
      ActualizadoPor,
      modo,

      ModalAgregarContacto, //funcion
      guardarContacto,//funcion
      obtenerTelefonoCorreo, //funcion
      eliminarContacto,
      m_actualizarContacto,
      actualizarContacto

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