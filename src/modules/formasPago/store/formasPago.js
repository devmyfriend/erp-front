import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useFormasMetodosPago = defineStore('FormasMetodos', {
    state: () => ({
        ListadoFormas: [],
        ListadoMetodos: [],
    }),
    getters: {
        getFormas(state) {
            return state.ListadoFormas;
        },
        getMetodos(state) {
            return state.ListadoMetodos;
        }
    },
    actions: {
        async cargarFormasMetodos() {
            try {
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/catalogo/metodos/pago`);
                if (datos.status === 200 && datos.statusText === "OK") {
                    this.ListadoFormas  = datos.data[0].formas;
                    this.ListadoMetodos = datos.data[0].metodos;
                    return true;
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            }
        },
        
        async buscarFormasPago(txt) {
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/pagos/metodo/forma/${txt}`);
                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoFormas = datos.data;
                    return true;
                }
            }catch(error){
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
                return false;
            }
        },

        async agregarFormaPago(body) {
            try{
                const datos = await axios.post(`${process.env.VUE_APP_PATH_API}v1/pagos/forma/pago`, body);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: "Forma de pago agregada correctamente",
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.log('No entiendo pór que sigue saliendo: \n' + error);
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            }
        },
        async agregarMetodoPago(body) {
            try{
                const datos = await axios.post(`${process.env.VUE_APP_PATH_API}v1/pagos/metodo/pago`, body);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: "Método de pago agregado correctamente",
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            }
        },

        async editarFormaPago(body) {
            try{
                const datos = await axios.patch(`${process.env.VUE_APP_PATH_API}v1/pagos/forma/pago`, body);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: "Forma de pago editada correctamente",
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            }
        },
        async editarMetodoPago(body) {
            try{
                const datos = await axios.patch(`${process.env.VUE_APP_PATH_API}v1/pagos/metodo/pago`, body);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: "Método de pago editado correctamente",
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            }
        },

        async eliminarFormaPago(id) {
            try{
                const datos = await axios.delete(`${process.env.VUE_APP_PATH_API}v1/pagos/forma/pago/${id}`);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: "Forma de pago eliminada correctamente",
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            }
        },
        async eliminarMetodoPago(id) {
            try{
                const datos = await axios.delete(`${process.env.VUE_APP_PATH_API}v1/pagos/metodo/pago/${id}`);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: "Método de pago eliminado correctamente",
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                });
            }
        }

    }
});