import axios from "axios";
import { defineStore } from "pinia";

export const useEmpresas = defineStore( 'empresas', {
    state: ()=>({
        ListadoEmpresas:  [],
        Paginacion: {
            PaginaActual: 1,
            PaginaMaxima: 1,
            Paginado: 5,
            Total: 0
        },
        propietaria: false
    }),
    getters:{
        getListado( state ){
            return state.ListadoEmpresas
        },
        getPaginas( state ){
            return state.Paginacion
        }
    },
    actions:{
        async cargarEmpresas(){
            try{
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresa`)
                //Falta cargar los telefonos de las empresas. v1/empresa/{id}/telefono (?)

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListadoEmpresas = datos.data
                }
            }catch ( error ){
                console.log( error )
                throw new Error( error )
            }
        },
        setPropietaria( propietaria ){
            this.propietaria = propietaria
        }
    }
})