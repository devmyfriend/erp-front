import axios from "axios";
import { defineStore } from "pinia";

export const useCodigosPostales = defineStore( 'codigosPostales',{
    state: ()=>({
        ListaCodigosPostales: [],
    }),
    getters:{
        getCodigosPostales( state ){
            return state.ListaCodigosPostales;
        }
    },
    actions:{
        async cargarCodigosPostales(){
            try{
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/catalogo/cp`);
                
                if( datos.status === 200 && datos.statusText === "OK" && datos.data.length > 0){
                    /* console.log("[Back]: " + JSON.stringify( datos.data )); //Borrar*/
                    this.ListaCodigosPostales = datos.data;
                }
            }catch( error ){
                console.log("[Error]: " + error );
            }
        }
    }
})