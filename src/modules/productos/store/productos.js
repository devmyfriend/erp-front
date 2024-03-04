import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useProductos = defineStore('Productos',{
    state: () => ({
        ListadoProductos: [],
    }),
    getters:{
        getProductos(state){
            return state.ListadoProductos;
        },
    },
    actions:{
        async cargarProductos(){
            try{
                const datos = await axios.get(`http://lachosoft.cloud:7000/api/v1/productos`);
                    if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoProductos = datos.data.response;
                    return true;
                }
            }catch (error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });
            }
        }
    }
});