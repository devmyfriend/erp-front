import axios from "axios";
import { defineStore } from "pinia";

export const useCFDi = defineStore( 'CFDi',{
    state: ()=>({
        ListaCFDi: [],
    }),
    getters:{
        getCFDi( state ){
            return state.ListaCFDi;
        }
    },
    actions:{
        async cargarCFDi(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/catalogo/sat/cfdi/lista`);
                console.log( '[Back] [Carga]: \n' + JSON.stringify( datos.data ) );
                this.ListaCFDi = datos.data;
            }catch( error ){
                console.log("[Error]: " + error );
            }
        },
        async buscarCFDi( id ){
            try{
/*                 const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/catalogo/sat/cfdi/lista`);
                console.log( '[Back] [Busqueda]: \n' + JSON.stringify( datos.data ) );
                this.ListaCFDi = datos.data; */
                console.log('ok buscarCFDi');
            }catch( error ){
                console.log("[Error]: " + error );
            }
        },
        
    }
});