<template>
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
                  <h4 class="mb-4" >Añadir datos del contacto {{ modo }}</h4>
                </div>
              </div>
              <div class="row">
                <form>
                  <div class="row mb-3">
                    <div class="col-4">
                      <input type="text" v-model="apellidoPaterno" placeholder="Apellido Paterno" class="form-control" />
                    </div>
                    <div class="col-4">
                      <input type="text" v-model="apellidoMaterno" placeholder="Apellido Materno" class="form-control" />
                    </div>
                    <div class="col-4">
                      <input type="text" v-model="nombres" placeholder="Nombre(s)" class="form-control" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-4">
                      <input type="text" v-model="departamento" placeholder="Departamento" class="form-control" />
                    </div>
                    <div class="col-8">
                      <input type="text" v-model="puesto" placeholder="Puesto" class="form-control" />
                    </div>
                  </div>
                
                  <div class="row">
                    <div class="col-6">
                     <!--  <datosTabla :Lista="telefonos" :tipoTabla ="'telefono'"/> -->
                     <div class="formulario">
                        <input  v-model="correo" type="text" placeholder="Telefono" class="inp">
                        <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarDatos(1)">
                      </div>
                      <TablaInfinita :encabezados="['id', 'telefono']" :acciones="0" :listado="Telefonos" />
                    </div>
                    <div class="col-6">
                      <!-- <datosTabla :Lista="correos" :tipoTabla ="'correo'"/> -->
                      <div class="formulario">
                         <input  v-model="correo" type="text" placeholder="Correo e." class="inp">
                         <img src="@/assets/img/AddUser.svg" class="icono addContacto" @click="agregarDatos(2)">
                       </div>
                      <TablaInfinita :encabezados="['id', 'correo']" :acciones="2" :listado="Correos" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
           <div v-if="modo == 'Guardar'">  <button @click="GuardarTodo" type="button" class="btn btn-primary">Guardar</button> </div>
           <div v-if="modo == 'Actualizar'">  <button @click="GuardarTodo" type="button" class="btn btn-primary">Actualizar</button> </div>
          
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Modal} from 'bootstrap'
import { onMounted,ref, onBeforeUnmount,watch } from 'vue';
import TablaInfinita from '@/shared/sTablaInfinita.vue'
export default {
  props:{
    modo:{
      type:String,
      default:'Guardar'
    },
    EntidadNegocioId:{
      type:Number
    },
  },
  setup(props,context){
    let modalEle = ref(null)
    const apellidoPaterno = ref('')
    const apellidoMaterno = ref('')
    const nombres = ref('')
    const departamento = ref('')
    const puesto = ref('')
    const telefonos = ref(props.Telefonos)
    const correos = ref(props.Correos)
    let modalObj = null
    const Telefonos = ref([])
    const Correos = ref([])

    const GuardarTodo = () => {
      body = {
        EmpresaId: props.EntidadNegocioId,
        Nombres: nombres.value,
        ApellidoPaterno: apellidoPaterno.value,
        ApellidoMaterno: apellidoMaterno.value,
        Departamento: departamento.value,
        Puesto: puesto.value,
        CreadoPor: 1,
      }
      console.log('Datos: ' + JSON.stringify(body))



    }

    console.log('Telefonos: ' + JSON.stringify(Telefonos.value) + ' \n \n Correos: ' + JSON.stringify(Correos.value))
    onMounted(()=>{
      modalObj = new Modal(modalEle.value) 
      if(props.modo != ''){
        modalObj.show()
      }
      
      Correos.value = [
      {
        id:1,
        correo: '123@gmail.com'
      },
      {
        id:2,
        correo: '456@gmail.com'
      },{
        id:3,
        correo: '789@gmail.com'
      }
      ]
      Telefonos.value = [
      {
        id:1,
        telefono: '1234567890'
      },
      {
        id:2,
        telefono: '0987654321'
      },
      {
        id:3,
        telefono: '1234567890'
      }
      ]

    });

    watch(() => props.modo, (nuevoModo) => {
      if (nuevoModo !== '') {
        modalObj.show();
      }
    });
    return{
      modalEle,
      apellidoPaterno ,
      apellidoMaterno ,
      nombres ,
      departamento ,
      puesto ,
      telefonos,
      correos,
      Telefonos,
      Correos,
      GuardarTodo,
    }
  },
  components:{
    TablaInfinita,
}
}
</script>

<style scoped>
  h4,h5{
      color:black;
  }
  .formulario{
    display: block;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .inp{
    border-radius: 0.3125rem;
    border: none;
    padding: 0.25rem;
    margin-bottom: 1.5rem;
    width: 18.75rem;
  }
  .icono{
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
    margin: auto;
    margin-left: 1rem;
  }
</style>