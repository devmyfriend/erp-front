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
              <img @click="ModalAgregarContacto" class="icono" src="../assets/user-add-icon.png" />
            </span>
          </div>
          <div class="col-auto mb-3 align-self-center">
            <span>
              <img class="icono" src="../assets/plus.png" />
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
              <tr v-for="lc in ListaContactos" :key="lc.ContactoId" @click = "obtenerTelefonoCorreo(lc.ContactoId)" >
                <td>{{lc.ContactoId}}</td>
                <td>{{lc.Nombres}}</td>
                <td>{{lc.Puesto}}</td>
                <td>
                  <span>
                    <img class="icono " src="../assets/edit-icon.png" />
                  </span>
                  <span>
                    <img @click ="eliminarContacto(lc.ContactoId)" class="icono ms-3" src="../assets/remove-icon.png" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
       
        <div class="col-12">
          <datosTabla :Lista="ListaTelefonos" :tipoTabla="'telefono'"/> 
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
          
          
           <datosTabla :Lista="ListaCorreos" :tipoTabla="'correo'"/>  
     <!--           <table class="table">
            <thead>
              <tr>
                <th scope="col">id de Correo.</th>
                <th scope="col"> Correo </th>
                <th scope="col"> Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="correo in ListaCorreos" :key="correo.EmailId">
                <td>{{ correo.EmailId }}</td>
                <td>{{ correo.Email }}</td>
                <td>
                  <span>
                                <img  class="icono" src="../assets/edit-icon.png" />
                              </span>
                              <span>
                                <img class="icono" src="../assets/remove-icon.png" />
                              </span>
                </td>
              </tr>
            </tbody>
          </table>
      -->

        </div>
      </div>
    </div>
    <!-- Modal agregar contacto -->
    <div class="modal fade modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalEle">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Añadir contacto</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h4>Añadir datos del contacto</h4>
                </div>
              </div>
              <div class="row">
                <form>
                  <div class="row mb-3">
                    <div class="col-4">
                      <input type="text" v-model="ApellidoPaterno" placeholder="Apellido Paterno" class="form-control" />
                    </div>
                    <div class="col-4">
                      <input type="text" v-model="ApellidoMaterno" placeholder="Apellido Materno" class="form-control" />
                    </div>
                    <div class="col-4">
                      <input type="text" v-model="Nombres" placeholder="Nombre(s)" class="form-control" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-4">
                      <input type="text" v-model="Departamento" placeholder="Departamento" class="form-control" />
                    </div>
                    <div class="col-8">
                      <input type="text" v-model="Puesto" placeholder="Puesto" class="form-control" />
                    </div>
                  </div>
                
                  <div class="row">
                    <div class="col-6">
                      <datosTabla :Lista="Telefonos" :tipoTabla ="'telefono'"/>
                    
                    </div>
                    <div class="col-6">
                      <datosTabla :Lista="Correos" :tipoTabla ="'correo'"/>
                 
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="guardarContacto" type="button" class="btn btn-primary">Guardar</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>



</template>

<script >

import { ref, watch, computed, onMounted } from 'vue'
import datosTabla from '../../../shared/datosTabla.vue'
import {Modal} from 'bootstrap'

const  { useContacto } = require( '../store/contacto')


export default {
  components: {
  
    datosTabla
  
  },
  name: 'frmContacto',
  
    setup(){
        const icono_addContacto = "../assets/user-add-icon.png";
        const ListaContactos = ref ( [] )
        const ListaTelefonos = ref([])
        const ListaCorreos = ref([])
        const idSucursal = ref(1010);  
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

      
        let modalEle = ref(null)
      
        let modalObj = null
     


        const store = useContacto();
       //Abrir modal
        const ModalAgregarContacto = () => {
            modalObj.show()
        
        }
    
       
   //CRUD CONTACTO 
    const guardarContacto = () => {

        let datos = {

        SucursalId: idSucursal.value,
        ApellidoPaterno: ApellidoPaterno.value,
        ApellidoMaterno: ApellidoMaterno.value,
        Nombres: Nombres.value,
        Departamento: Departamento.value,
        Puesto: Puesto.value,
        CreadoPor: CreadoPor.value,
        ActualizadoPor: ActualizadoPor.value,
        BorradoPor: BorradoPor,
        BorradoEn: BorradoEn
        
        }

    

      store.guardarContactos(datos,Telefonos.value,Correos.value);

      modalObj.hide()
    }

    const eliminarContacto = (idContacto) => {
     
        store.borrarContacto(idContacto)
    
    }
    //CRUD Telefono


   


        const obtenerTelefonoCorreo = (idContacto)=>{
          store.obtenerDetalle(idContacto).then(()=>{
            ListaTelefonos.value = store.listaTelefono
           ListaCorreos.value = store.listaCorreo
          })
          
           
            console.log(ListaTelefonos.value);
            console.log(ListaCorreos.value);
        }
 
    //Carga de informacion

        onMounted(()=>{
        
            store.cargarContactos().then(()=>{
            ListaContactos.value = store.listaContacto
            
           
    
            });
            modalObj = new Modal(modalEle.value) 
          
        });
    
        return{
            icono_addContacto,
            ListaContactos,
            idSucursal,
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
            modalEle, //modal
           
         
            ModalAgregarContacto, //funcion
            Telefonos,
            Correos,
           
         
         
            ListaTelefonos,
            ListaCorreos,
           //funcion
           obtenerTelefonoCorreo //funcion
        }
   
    }







}

</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';
    .icono{
        width:1.5rem;
    }
    .contenedor{
    align-items: right;
    width: 40.93rem;
   

    padding: 1.5rem 1.5rem 0rem 1.5rem;
    text-align: left;

  }
  h1{
  
    font-size: 2rem;
    text-align: left;
}
h5,h4{
  color:black;

}
</style>