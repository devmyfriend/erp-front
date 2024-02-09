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
                  <h4>Añadir datos del contacto {{ modo }}</h4>
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
                      <datosTabla :Lista="telefonos" :tipoTabla ="'telefono'"/>
                    
                    </div>
                    <div class="col-6">
                      <datosTabla :Lista="correos" :tipoTabla ="'correo'"/>
                 
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
           <div v-if="modo == 'guardar'">  <button @click="h_guardarContacto" type="button" class="btn btn-primary">Guardar</button> </div>
           <div v-if="modo == 'actualizar'">  <button @click="h_actualizarContacto" type="button" class="btn btn-primary">Actualizar</button> </div>
          
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>




</template>

<script>
    import datosTabla from '@/shared/datosTabla.vue';
    import {Modal} from 'bootstrap'
import { onMounted,ref, onBeforeUnmount,watch } from 'vue';
  export default {
    components:{

        datosTabla
    },
    props:{
        SucursalId:{
            type:Number

        },
        CreadoPor:{
            type:Number

        },
        ActualizadoPor:{
            type:Number
        },
        ContactoId:{
          type:Number,
          default:0

        },
      ApellidoPaterno:{
        type:String,
        default:''
    
    },
      ApellidoMaterno:{

          type: String,
          default:''

      },
      
      Nombres:{
        type:String,
        default:''

    },
    Departamento:
      {
        type:String,
        default:''
    },
      Puesto:
      {
        type:String,
        default:''
    },
      Telefonos:{
        type:Array,
        default:[]
        
    },
      Correos:{
        type:Array,
        default:[]
      },
      modo:{
        type:String
      },
   
      trigger:{
        type:String,
        default:''

      }
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
          
    
        if(props.modo == 'actualizar'){
           apellidoPaterno.value = props.ApellidoPaterno
           apellidoMaterno.value = props.ApellidoMaterno
           nombres.value = props.Nombres 
           departamento.value = props.Departamento
           puesto.value = props.Puesto
        }

        
   
        const h_guardarContacto = () =>{
        
            const datos = {
                SucursalId:props.SucursalId,
                ApellidoPaterno: apellidoPaterno.value,
                ApellidoMaterno:apellidoMaterno.value,  
                Nombres:nombres.value,
                Departamento:departamento.value,
                Puesto:puesto.value,
                CreadoPor:props.CreadoPor,
                ActualizadoPor:props.ActualizadoPor
            }
            console.log(datos)
            
            context.emit('guardar-contacto',datos,telefonos.value,correos.value)
            modalObj.hide()

        }

        const h_actualizarContacto = () =>{
            
         
          const datos = {
                SucursalId:props.SucursalId,
                ApellidoPaterno: apellidoPaterno.value,
                ApellidoMaterno:apellidoMaterno.value,  
                Nombres:nombres.value,
                Departamento:departamento.value,
                Puesto:puesto.value,
                CreadoPor:props.CreadoPor,
                ActualizadoPor:props.ActualizadoPor,
                ContactoId:props.ContactoId
            }
            console.log(datos)
            context.emit('actualizar-contacto',datos,telefonos.value,correos.value)
            
            modalObj.hide()

        }
     

        onMounted(()=>{
           console.log("Montando modal");
          modalObj = new Modal(modalEle.value) 
       
          if(props.modo != ''){
            modalObj.show()
          }
         

       

        });
    
        onBeforeUnmount(() => {
          console.log("modificando modo");
          context.emit('modificarModo','');
      // Realizar tareas de limpieza, cancelar suscripciones, liberar recursos, etc.
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
        h_guardarContacto,
        h_actualizarContacto
        }

    }

  }




</script>

<style scoped>
    h4,h5{
        color:black;
    }
</style>
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
                  <h4>Añadir datos del contacto {{ modo }}</h4>
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
                    
                    </div>
                    <div class="col-6">
                      <!-- <datosTabla :Lista="correos" :tipoTabla ="'correo'"/> -->
                 
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
           <div v-if="modo == 'guardar'">  <button @click="h_guardarContacto" type="button" class="btn btn-primary">Guardar</button> </div>
           <div v-if="modo == 'actualizar'">  <button @click="h_actualizarContacto" type="button" class="btn btn-primary">Actualizar</button> </div>
          
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>




</template>

<script>
    /* import datosTabla from '@/shared/datosTabla.vue'; */
    import {Modal} from 'bootstrap'
import { onMounted,ref, onBeforeUnmount,watch } from 'vue';
  export default {
    components:{

        /* datosTabla */
    },
    props:{
        SucursalId:{
            type:Number

        },
        CreadoPor:{
            type:Number

        },
        ActualizadoPor:{
            type:Number
        },
        ContactoId:{
          type:Number,
          default:0

        },
      ApellidoPaterno:{
        type:String,
        default:''
    
    },
      ApellidoMaterno:{

          type: String,
          default:''

      },
      
      Nombres:{
        type:String,
        default:''

    },
    Departamento:
      {
        type:String,
        default:''
    },
      Puesto:
      {
        type:String,
        default:''
    },
      Telefonos:{
        type:Array,
        default:[]
        
    },
      Correos:{
        type:Array,
        default:[]
      },
      modo:{
        type:String
      },
   
      trigger:{
        type:String,
        default:''

      }
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
          
    
        if(props.modo == 'actualizar'){
           apellidoPaterno.value = props.ApellidoPaterno
           apellidoMaterno.value = props.ApellidoMaterno
           nombres.value = props.Nombres 
           departamento.value = props.Departamento
           puesto.value = props.Puesto
        }

        
   
        const h_guardarContacto = () =>{
        
            const datos = {
                SucursalId:props.SucursalId,
                ApellidoPaterno: apellidoPaterno.value,
                ApellidoMaterno:apellidoMaterno.value,  
                Nombres:nombres.value,
                Departamento:departamento.value,
                Puesto:puesto.value,
                CreadoPor:props.CreadoPor,
                ActualizadoPor:props.ActualizadoPor
            }
            console.log(datos)
            
            context.emit('guardar-contacto',datos,telefonos.value,correos.value)
            modalObj.hide()

        }

        const h_actualizarContacto = () =>{
            
         
          const datos = {
                SucursalId:props.SucursalId,
                ApellidoPaterno: apellidoPaterno.value,
                ApellidoMaterno:apellidoMaterno.value,  
                Nombres:nombres.value,
                Departamento:departamento.value,
                Puesto:puesto.value,
                CreadoPor:props.CreadoPor,
                ActualizadoPor:props.ActualizadoPor,
                ContactoId:props.ContactoId
            }
            console.log(datos)
            context.emit('actualizar-contacto',datos,telefonos.value,correos.value)
            
            modalObj.hide()

        }
     

        onMounted(()=>{
           console.log("Montando modal");
          modalObj = new Modal(modalEle.value) 
       
          if(props.modo != ''){
            modalObj.show()
          }
         

       

        });
    
        onBeforeUnmount(() => {
          console.log("modificando modo");
          context.emit('modificarModo','');
      // Realizar tareas de limpieza, cancelar suscripciones, liberar recursos, etc.
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
        h_guardarContacto,
        h_actualizarContacto
        }

    }

  }




</script>

<style scoped>
    h4,h5{
        color:black;
    }
</style>