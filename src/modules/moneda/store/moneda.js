import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useMonedas = defineStore('Moneda',{
    state: () => ({
        ListadoMonedas: [],
    }),
    getters:{
        getMonedas(state){
            return state.ListadoMonedas;
        },
    },
    actions:{
        async cargarMonedas(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/catalogo/metodos/moneda`);
                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoMonedas = datos.data;
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

        async buscarMoneda(descripcion){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/catalogo/metodos/moneda/buscar/${descripcion}`);
                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoMonedas = datos.data;
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

        async agregarMoneda(body){
            try{
                const datos = await axios.post(`${process.env.VUE_APP_PATH_API}v1/catalogo/metodos/moneda`, body);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: datos.data.message,
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

        async editarMoneda(body){
            try{
                const datos = await axios.patch(`${process.env.VUE_APP_PATH_API}v1/catalogo/metodos/moneda`, body);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: datos.data.message,
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

        async borrarMoneda(body){
            try{
                const datos = await axios.delete(`${process.env.VUE_APP_PATH_API}v1/catalogo/metodos/moneda`, {data: body});
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Éxito",
                        text: datos.data.message,
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
})