import axios from "axios";
import { defineStore } from "pinia";

export const useImpuestos = defineStore( 'Impuestos',{
    state: ()=>({
        ListaImpuestos: [],
    }),
    getters:{
        getImpuestos( state ){
            return state.ListaImpuestos;
        }
    },
    actions:{
        async cargarImpuestos(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/impuestos`);
                console.log( '[Back] [Carga]: \n' + JSON.stringify( datos.data ) );
                this.ListaImpuestos = datos.data;
            }catch( error ){
                console.log("[Error]: " + error );
            }
        },
        async buscarImpuestos( id ){
            try{
                console.log('ok buscarImpuestos');
            } catch( error ){
                console.log("[Error]: " + error );
            }
        }
    }
});
