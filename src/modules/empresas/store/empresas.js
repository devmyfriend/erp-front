import axios from "axios";
import { defineStore } from "pinia";

export const useEmpresas = defineStore( 'empresas', {
    state: ()=>({
        lista:  [],
        paginas: {
            pagAct: 1,
            pagMax: 1,
            cantidad: 5,
            longitud: 0
        },
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
        async cargarListado(){
            try{
                const long = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/viewLongitudListado` )
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/spListado?offset=${ (this.paginas.cantidad * (this.paginas.pagAct - 1) ) }&limit=${ this.paginas.cantidad }`)
                const { ListadoEmpresas } = datos.data

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.lista = ListadoEmpresas

                    console.log("Desde back: Los valores de datos.data (ListadoEmpresas) \n", datos.data)
                }                

                if (long.status === 200 && long.statusText === "OK") {
                    this.paginas.longitud = long.data.LongitudListado
                    this.paginas.pagMax = Math.ceil( this.lista.length / this.paginas.cantidad )
                    
                    console.log("Desde back: La longitud de los registros es de \n", long.data.LongitudListado)
                    console.log("Desde back: Las páginas son \n", this.paginas)
                }
            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        }
    }
})