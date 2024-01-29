import axios from "axios";
import { defineStore } from "pinia";

export const useMonedas = defineStore( 'monedas',{
    state: ()=>({
        ListaMonedas: [],
    }),
    getters:{
        getMonedas( state ){
            return state.ListaMonedas;
        }
    },
    actions:{
        async cargarMonedas(){
            try{
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/catalogo/metodos/moneda`);
                
                if( datos.status === 200 && datos.statusText === "OK" && datos.data.length > 0){
                    /* console.log("[Back | Carga]: " + JSON.stringify( datos.data )); //Borrar  */
                    this.ListaMonedas = datos.data;
                }
            }catch( error ){
                console.log("[Error]: " + error );
            }
        },
        async buscarMonedas( moneda ){
            try{
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/catalogo/metodos/moneda/buscar/${moneda}`);

                if( datos.status === 200 && datos.statusText === "OK" && datos.data.length > 0){
                    /* console.log("[Back | Busqueda]: " + JSON.stringify( datos.data )); //Borrar */
                    this.ListaMonedas = datos.data;
                }
            }catch ( error ){
                console.log("[Error]: " + error );
            }
        }
    }
});