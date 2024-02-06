import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

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
                    return datos.data
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
                if(busqueda === null || busqueda === undefined || busqueda === ' '){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Ingrese un valor para buscar',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: 'No se encontraron resultados',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
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