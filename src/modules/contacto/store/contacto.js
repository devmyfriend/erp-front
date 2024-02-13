
import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

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
      async crearTelefono(body){
        try{
          const datos = await axios.post(`${process.env.VUE_APP_PATH_API }v1/empresa/telefono/crear`, body);

          if (datos.status === 200 && datos.statusText === "OK") {
            Swal.fire({
              title: 'Telefono creado',
              text: 'El telefono se ha creado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            return true;
          }

        } catch(error){
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo crear el telefono',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      async crearCorreo(body){
        try{
          const datos = await axios.post(`${process.env.VUE_APP_PATH_API }v1/empresa/emails/crear`, body);
          
          if (datos.status === 200 && datos.statusText === "OK") {
            Swal.fire({
              title: 'Correo creado',
              text: 'El correo se ha creado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            return true;
          }
        } catch(error){
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo crear el correo',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      async borrarTelefono(body){
        try{
          const datos = await axios.delete(`${process.env.VUE_APP_PATH_API }v1/empresa/telefono/desactivar`, body);

          if (datos.status === 200 && datos.statusText === "OK") {
            Swal.fire({
              title: 'Telefono borrado',
              text: 'El telefono se ha borrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            return true;
          }

        }catch (error){
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo borrar el telefono',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      async borrarCorreo(body){
        try{
          const datos = await axios.delete(`${process.env.VUE_APP_PATH_API }v1/empresa/emails/desactivar`, body);

          if (datos.status === 200 && datos.statusText === "OK") {
            Swal.fire({
              title: 'Correo borrado',
              text: 'El correo se ha borrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            return true;
          }
        }catch (error){
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo borrar el correo',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },

      async crearContacto(body){
        try{
          const bodyContacto = {
            "EmpresaId": body.EmpresaId,
            "Nombres": body.Nombres,
            "ApellidoPaterno": body.ApellidoPaterno,
            "ApellidoMaterno": body.ApellidoMaterno,
            "Departamento": body.Departamento,
            "Puesto": body.Puesto,
            "CreadoPor": body.CreadoPor || 1 
          }
          const datosContacto = await axios.post(`${process.env.VUE_APP_PATH_API }v1/empresa/contacto/crear`, bodyContacto);
          if (datosContacto.status === 200 && datosContacto.statusText === "OK") {
            var regex = /:\s*(\d+)/;
            var coincidencia = datosContacto.data.message.match(regex);
            var idContacto = coincidencia ? coincidencia[1] : null;
            var bodyTelMail = {
              "ContactoId": idContacto,
              "CreadoPor": 2,
              "Correos": body.Correos,
              "Telefonos": body.Telefonos
            }
            const datosTelMail = await axios.post(`${process.env.VUE_APP_PATH_API }v1/contacto/datos`, bodyTelMail);
            if (datosTelMail.status === 201 && datosTelMail.statusText === "Created") {
              Swal.fire({
                title: 'Contacto creado',
                text: 'El contacto se ha creado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              return true;
            }
          }
        }catch(error){
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo crear el contacto',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      async borrarContacto(body){
        try{
          const datos = await axios.delete(`${process.env.VUE_APP_PATH_API }v1/contacto/borrar`, body);

          if (datos.status === 200 && datos.statusText === "OK") {
            Swal.fire({
              title: 'Contacto borrado',
              text: 'El contacto se ha borrado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            return true;
          }
        }catch (error){
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo borrar el contacto',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
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
  }
})