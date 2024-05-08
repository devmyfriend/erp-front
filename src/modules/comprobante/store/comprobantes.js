import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useComprobantes = defineStore('comprobantes', {
    state: () => ({
        ListaComprobantes: [],
    }),
    getters: {
        getComprobantes(state) {
            return state.ListaComprobantes;
        }
    },
    actions: {
        async cargarComprobantes() {
            try{
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/comprobante`);
                if( datos.status === 200 && datos.statusText === "OK"){
                    this.ListaComprobantes = datos.data;
                }
                if( datos.data.length < 0){
                    throw new Error("404");
                }
            }catch( error ){
                if ( error.message === "404" ){
                    Swal.fire({
                        title: "Error",
                        text: "No se encontraron comprobantes",
                        icon: "error",
                        showConfirmButton: true,
                    });
                }else{
                    Swal.fire({
                        title: "Error",
                        text: JSON.stringify( error ),
                        icon: "error",
                        showConfirmButton: true,
                    });
                }
            }
        },
        async crearComprobante( comprobante ){
            try{
                const datos = await axios.post(`${ process.env.VUE_APP_PATH_API }v1/comprobante`, comprobante);

                if ( datos.status === 200 && datos.statusText === "OK" ){
                    Swal.fire({
                        title: "Comprobante creado",
                        text: datos.data.message,
                        icon: "success",
                        showConfirmButton: true,
                    });
                    return true;
                }
            }catch( error ){
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    showConfirmButton: true,
                });
            }
        },
        async editarComprobante( comprobante ){
            try{
                const datos = await axios.patch(`${ process.env.VUE_APP_PATH_API }v1/comprobante`, comprobante);

                if ( datos.status === 200 && datos.statusText === "OK" ){
                    Swal.fire({
                        title: "Comprobante editado",
                        text: datos.data.message,
                        icon: "success",
                        showConfirmButton: true,
                    });
                    return true;
                }
            }catch( error ){
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    showConfirmButton: true,
                });
            }
        },
        async borrarComprobante( id ){
            try{
                const datos = await axios.delete(`${process.env.VUE_APP_PATH_API}v1/comprobante/${id}`);

                if( datos.status === 200 && datos.statusText === "OK" ){
                    Swal.fire({
                        title: `Comprante ${id} eliminado`,
                        text: datos.data.message,
                        icon: "success",
                        showConfirmButton: true,
                    });
                    return true;
                }
            }catch( error ){
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error",
                    showConfirmButton: true,
                });
            }
        }
    }
})