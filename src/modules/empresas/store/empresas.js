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
            return state.lista
        },
        getPaginas( state ){
            return state.paginas
        }
    },
    actions:{
        async cargarEmpresas(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/empresas/listado`)

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListadoEmpresas = datos.data.listado
                    this.Paginacion.Total = datos.data.total
                    this.Paginacion.PaginaMaxima = Math.ceil( this.Paginacion.Total / this.Paginacion.Paginado )
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