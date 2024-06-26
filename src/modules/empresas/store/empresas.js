import axios from "axios";
import { defineStore } from "pinia";

import Swal from "sweetalert2";
import { swal } from "sweetalert2/dist/sweetalert2";

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
                        title: 'Cuidado!',
                        text: 'Ingrese un valor para buscar',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    })
                }else{
                    Swal.fire({
                        title: 'Ups',
                        text: 'No se encontraron resultados',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar'
                    })
                }
            }
        },
        async borrarEmpresa(body){
            try{
                const datos = await axios.delete(`${ process.env.VUE_APP_PATH_API }v1/empresa/desactivar`, {data: body})
                if( datos.status === 200 && datos.statusText==="OK"){
                    return true;
                }
            }catch ( error ){
                console.log( error )
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo eliminar la empresa',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
            }


/*             try{
                const datos = await axios.delete(`${ process.env.VUE_APP_PATH_API }v1/empresa/desactivar/${id}`)
                if( datos.status === 200 && datos.statusText==="OK"){
                    console.log(`\n \n \n Toda tu marca personal: ${id} \n \n \n`);
                    return true
                }
            }catch ( error ){
                console.log( error )
                throw new Error( error )
            } */



        },

        setPropietaria( propietaria ){
            this.propietaria = propietaria

        }
    }
})