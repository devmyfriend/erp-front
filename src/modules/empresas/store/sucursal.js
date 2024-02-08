import axios from "axios";
import { defineStore } from "pinia";

export const useSucursal = defineStore( 'sucursal', {
    sate: ()=>{

    },
    actions:{

        // async CargarResponsables( idempresa ){
        //     try{
        //         const data = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/empresa/contactos/${ idempresa }`)
        //         console.log(data)
        //     }catch( error ){
        //         console.log( error )
        //     }

        // },

        async crearSucursal ( datos ){
            try{

                const sucursal = await axios.post( `${ process.env.VUE_APP_PATH_API }v1/sucursal/crear`, datos )

                return sucursal.data

            }catch( error ){

                return ( error.response.data )

            }
            

        }
    }
})