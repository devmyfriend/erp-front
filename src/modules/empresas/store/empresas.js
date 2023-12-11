

import axios from "axios";
import { defineStore } from "pinia";


export const useEmpresas = defineStore( 'empresas', {
    state: ()=>({
        listaEmpresas:   []
    }),
    getters: {
        listaListadoEmpresas( state ){
            return state.listaEmpresas
        }
    },
    actions:{
       async cargarListadoEmpresas(){
            try{
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/vistaListado/` )
                console.log("Datos de Listado Empresas \n", datos.data)
                const { ListadoEmpresas } = datos.data

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.listaEmpresas = ListadoEmpresas
                    console.log("Datos de Listado Empresas \n", datos.data)

                }
            }catch( error ){
                console.log( error )
                throw new Error( error )
            } 
        }
    }

})
