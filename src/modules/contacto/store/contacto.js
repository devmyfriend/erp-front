
import axios from "axios";
import { defineStore } from "pinia";

export const useContacto = defineStore('contacto',{

state:()=>({
ContactoId:0,
SucursalId:1010,
ApellidoPaterno:'',
ApellidoMaterno:'',
Nombres:'',
Departamento:'',
Puesto:'',
ListaContactos:[],
ListaTelefonos:[],
ListaCorreos:[]
}),
getters:{
  listaContacto(state){
 
    return state.ListaContactos;
  },
  listaTelefono(state){
    console.log(state.ListaTelefonos);
    return state.ListaTelefonos
  },
  listaCorreo(state){
    console.log(state.ListaCorreos);
    return state.ListaCorreos
  }
},
actions:{

    async cargarContactos(){
        try{
            // Realizar la solicitud POST con Axios
            const datos = await axios.get(`${process.env.VUE_APP_PATH_API }v1/contacto/${this.SucursalId}`);
           
           const contacto = datos.data
            if (datos.status === 200 && datos.statusText === "OK") {
              this.ListaContactos = contacto;
         
            }
          }


        catch(error){
        }

    },


    async guardarContactos(contacto,ListaTelefono,ListaCorreo){
      
      axios.post(`${process.env.VUE_APP_PATH_API }v1/contacto/crear`, contacto).then(function(response){
        
       if(response.status === 200 && response.statusText === "OK"){
            let {ContactoId} = response.data.data
            let datosTelefonoCorreo = {
                ContactoId: ContactoId,
                CreadoPor:1,
                Telefonos: ListaTelefono,
                Correos:ListaCorreo
                
            
            }

            
            console.log(datosTelefonoCorreo);
   
            axios.post(`${process.env.VUE_APP_PATH_API }v1/contacto/crear/datos`,datosTelefonoCorreo).then(function(response){
              
               if(response.status === 200 && response.statusText === "Created"){
               
              
              }
            }).catch(function(error){
                console.log(error)
            
            })

        }


    })
    .catch(function(error){
        console.log(error)
    });
    },


    async borrarContacto(idContacto){
      console.log(idContacto)
      const datosBorrar ={
        ContactoId: idContacto,
        BorradoPor:0
      }
      
     
     
      axios.delete(`${process.env.VUE_APP_PATH_API}v1/contacto/borrar`,{data:datosBorrar}).then(function(response){
        

      }).catch(function(error){
        console.log(error)
      })
    },

   async obtenerDetalle(idContacto){
      
    const datos = await axios.get(`${process.env.VUE_APP_PATH_API }v1/contacto/detalle/${idContacto}`);
    
  
    const {email} = datos.data
    const {telefono} = datos.data  
    
    if(datos.status === 200 && datos.statusText === "OK"){
      let L_telefono = []
      let L_correo = []
      for(let tel of telefono){
        L_telefono.push({
          "telefono":tel.NumeroTelefonico
        })

      }
      for(let correo of email){
        L_correo.push({
          "correo":correo.Email
        })

      }
      this.ListaTelefonos = L_telefono
      this.ListaCorreos = L_correo
      
    }
    
    
 
  },
  
  async actualizaContactos(contacto,ListaTelefono,ListaCorreo){
      
    axios.patch(`${process.env.VUE_APP_PATH_API }v1/contacto/editar`, contacto).then(function(response){
      console.log(response.data);
     if(response.status === 200 && response.statusText === "OK"){
      //  console.log("actualizado correctamente");   
      
      /*let {ContactoId} = response.data.data
          let datosTelefonoCorreo = {
              ContactoId: ContactoId,
              CreadoPor:1,
              Telefonos: ListaTelefono,
              Correos:ListaCorreo
              
          
          }

          
          console.log(datosTelefonoCorreo);
 
          axios.post(`${process.env.VUE_APP_PATH_API }v1/contacto/crear/datos`,datosTelefonoCorreo).then(function(response){
            console.log(response);
             if(response.status === 200 && response.statusText === "Created"){
             
            console.log("Contacto creado exitosamente")
            }
          }).catch(function(error){
              console.log(error)
          
          })*/

      }


  })
  .catch(function(error){
      console.log(error)
  });
  },

}


})