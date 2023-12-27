import axios from "axios";
import { defineStore } from "pinia";

export const useEmpresas = defineStore( 'empresas', {
    state: ()=>({
        lista:  [],
        paginas: {
            pagAct: 1,
            pagMax: 1,
            cantidad: 5,    //Cambiar a 5
            longitud: 0
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
        async cargarListado(){
            try{
                const long = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/empresas/longitud?propiedad=${this.propietaria}`)
                console.log ("La longitud es \n" + JSON.stringify(long.data.LongitudListado))
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresas/listado?offset=${ (this.paginas.cantidad * (this.paginas.pagAct - 1) ) }&limit=${ this.paginas.cantidad }&propiedad=${this.propietaria}`)
                const { ListadoEmpresas } = datos.data
                if( datos.status === 200 && datos.statusText==="OK"){
                    this.lista = ListadoEmpresas
                }                

                if (long.status === 200 && long.statusText === "OK") {
                    this.paginas.longitud = long.data.LongitudListado
                    this.paginas.pagMax = Math.ceil( this.paginas.longitud / this.paginas.cantidad )   
                }
            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },
        async paginador(opcion){
            try{
                const oldPag = this.paginas.pagAct
                if(this.paginas.pagAct <= 1 && (opcion === 1 || opcion === 0)){
                }else if(this.paginas.pagAct >= this.paginas.pagMax && (opcion === 2 || opcion === 3)){
                }else{
                    if(opcion === 0){
                        this.paginas.pagAct = 1
                    }else if(opcion === 1 && this.paginas.pagAct > 1){
                        this.paginas.pagAct -= 1
                    }else if(opcion === 2 && this.paginas.pagAct < this.paginas.pagMax){
                        this.paginas.pagAct += 1
                    }else if (opcion === 3){
                        this.paginas.pagAct = this.paginas.pagMax
                    }
                }
                if(oldPag !== this.paginas.pagAct){
                    const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresas/listado?offset=${ (this.paginas.cantidad * (this.paginas.pagAct - 1) ) }&limit=${ this.paginas.cantidad }&propiedad=${this.propietaria}`)
                    const { ListadoEmpresas } = datos.data
        
                    if( datos.status === 200 && datos.statusText==="OK"){
                        this.lista = ListadoEmpresas
                    }      
                }
            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        }

    }
})