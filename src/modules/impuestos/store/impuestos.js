import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

const ruta_local = 'http://localhost:3000/api/';

export const useImpuestos = defineStore( 'Impuestos',{
    state: () => ({
        ListadoImpuestosSAT: [],
        ListadoImpuestosPropios: [],
        ListadoImpuestosCompuestos: [],
    }),
    getters:{
        getListadoImpuestosSAT: (state) => state.ListadoImpuestosSAT,
        getListadoImpuestosPropios: (state) => state.ListadoImpuestosPropios,
        getListadoImpuestosCompuestos: (state) => state.ListadoImpuestosCompuestos,
    },
    actions:{
        async cargarImpuestosSAT(){
            try {
                const response = await axios.get(`${ruta_local}v1/impuestos`);
                this.ListadoImpuestosSAT = response.data;
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },
        async cargarImpuestosPropios(){
            try {
                const response = await axios.get(`${ruta_local}v1/impuestos/propios`);
                this.ListadoImpuestosPropios = response.data;
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },
        async cargarImpuestosCompuestos(){
            try {
                const response = await axios.get(`${ruta_local}v1/impuestos/compuestos`);
                this.ListadoImpuestosCompuestos = response.data;
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },

        async buscarImpuestoSAT(nombre){
            try{
                const response = await axios.post(`${ruta_local}v1/impuestos/buscar`, { Nombre: nombre});
                this.ListadoImpuestosSAT = response.data.data;
                return true;
            }catch(error){

                if(error.response.status === 404){
                    Swal.fire({
                        icon: 'info',
                        title: 'No se encontraron impuestos SAT con ese nombre',
                        text: error.response.data.message
                    })
                }
                else{
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: error.message,
                        text: error
                    })
                }
            }
        },

        async crearImpuestoPropio(impuesto){
            try {
                const response = await axios.post(`${ruta_local}v1/impuestos/propios`, impuesto);

                if(response.status === 200 && response.statusText === 'OK'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Impuesto creado correctamente',
                        text: response.data.message
                    })
                    return true;
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },
        async crearImpuestoCompuesto(impuesto){
            try {
                const response = await axios.post(`${ruta_local}v1/impuestos/compuestos`, impuesto);

                if(response.status === 200 && response.statusText === 'OK'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Impuesto creado correctamente',
                        text: response.data.message
                    })
                    return true;
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },



        async actualizarImpuestoPropio(impuesto){
            try {
                const response = await axios.put(`${ruta_local}v1/impuestos/propios`, impuesto);

                if(response.status === 200 && response.statusText === 'OK'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Impuesto actualizado correctamente',
                        text: response.data.message
                    })
                    return true;
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },
        async actualizarImpuestoCompuesto(impuesto){
            try {
                const response = await axios.put(`${ruta_local}v1/impuestos/compuestos`, impuesto);

                if(response.status === 200 && response.statusText === 'OK'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Impuesto actualizado correctamente',
                        text: response.data.message
                    })
                    return true;
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },



        async borrarImpuestoPropio(impuesto){
            try {
                const response = await axios.delete(`${ruta_local}v1/impuestos/propios/borrar`, {data: impuesto});

                if(response.status === 200 && response.statusText === 'OK'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Impuesto eliminado correctamente',
                        text: response.data.message
                    })
                    return true;
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },
        async borrarImpuestoCompuesto(impuesto){
            try {
                const response = await axios.delete(`${ruta_local}v1/impuestos/compuestos/${impuesto}`);

                if(response.status === 200 && response.statusText === 'OK'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Impuesto eliminado correctamente',
                        text: response.data.message
                    })
                    return true;
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: error.message,
                    text: error
                })
            }
        },
    }
});
