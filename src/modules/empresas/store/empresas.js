import axios from "axios";
import { defineStore } from "pinia";

export const useEmpresas = defineStore( 'empresas', {
    state: ()=>({
        ListadoEmpresas:  [],
        propietaria: false
    }),
    getters:{
        getListado( state ){
            return state.ListadoEmpresas
        },
    },
    actions:{
        async cargarEmpresas(){
            try{
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresa`)

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListadoEmpresas = datos.data
                }
            }catch ( error ){
                console.log( error )
                throw new Error( error )
            }
        },
        async busquedaEmpresas(busqueda){
            try{
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresa/nombre/${busqueda}`)
                    this.ListadoEmpresas = datos.data
                    return datos.data
            }catch ( error ){
                    console.log(error.response.data);                
            }
        },
        async borrarEmpresa(id){
            try{
                const datos = await axios.delete(`${ process.env.VUE_APP_PATH_API }v1/empresa/desactivar/${id}`)
                if( datos.status === 200 && datos.statusText==="OK"){
                    return true
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