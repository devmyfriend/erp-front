
import axios from "axios";
import { defineStore } from "pinia";

export const useContacto = defineStore('contacto',{
  state:()=>({
    ContactoId:0,
    EmpresaId:1,
    ApellidoPaterno:'',
    ApellidoMaterno:'',
    Nombres:'',
    Departamento:'',
    Puesto:'',
    ListaContactos:[],
    ListaTelefonos:[],
    ListaCorreos:[],
    ListaTelefonosContacto:[],
    ListaCorreosContacto:[],
  }),
  getters:{
    listaContacto(state){
      return state.ListaContactos;
    },
    listaTelefono(state){
      return state.ListaTelefonos;
    },
    listaCorreo(state){
      return state.ListaCorreos;
    },


    
    getTelefonosContacto(state){
      return state.ListaTelefonosContacto;
    },
    getCorreosContacto(state){
      return state.ListaCorreosContacto;
    }
  },
  actions:{
      async cargarContactos(id){
          try{
              const datos = await axios.get(`${process.env.VUE_APP_PATH_API }v1/empresa/contactos/${id}`);

              const contacto = datos.data
              if (datos.status === 200 && datos.statusText === "OK") {
                this.ListaContactos = contacto;
              }
            }
          catch(error){
            console.log(error);
          }
      },
      async cargarTelMails(id){
        try{
          const datos = await axios.get(`${process.env.VUE_APP_PATH_API }v1/empresa/${id}/telefono`);
          const telefonos = datos.data.telefono;
          const correos = datos.data.emails;
          if (datos.status === 200 && datos.statusText === "OK") {
            this.ListaTelefonos = telefonos;
            this.ListaCorreos = correos;
          }
        }catch(error){
          console.log(error);
        }
      },
      async cargarTelContactos(id){
        try{
          
        }catch(error){
          console.log(error);
        }
      },
      async cargarCorreoContactos(id){
      },
      async crearTelefono(body){
        try{
          const datos = await axios.post(`${process.env.VUE_APP_PATH_API }v1/empresa/telefono/crear`, body);

          if (datos.status === 200 && datos.statusText === "OK") {
            console.log(datos);
            //sweetalert
            return true;
          }

        } catch(error){
          console.log(error);
          //sweetalert
        }
      },
      async crearCorreo(body){
        try{
          const datos = await axios.post(`${process.env.VUE_APP_PATH_API }v1/empresa/emails/crear`, body);
          
          if (datos.status === 200 && datos.statusText === "OK") {
            console.log(datos);
            //sweetalert
            return true;
          }
        } catch(error){
          console.log(error);
          //sweetalert
        }
      },
  }
})