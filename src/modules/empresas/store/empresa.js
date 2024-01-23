

import axios from "axios";
import { defineStore } from "pinia";


export const useEmpresa = defineStore( 'empresa', {
    state: ()=>({
        IdEmpresa:       '',
        RFC:             '',
        RazonSocial:     '',
        Pais:            '',
        PersonaFisica:   false,
        PersonaMoral:    false,
        RegimenFiscal:   '',
        NombreComercial: '',
        ListaPaises :    [],
        ListaRegimenes:  [],

        Calle: '',
        NoInt: '',
        NoExt: '',
        Colonia: '',
        Estado: '',
        Municipio: '',
        Ciudad: '',
        CodigoPostal: ''
    }),
    getters: {
        listapaises( state ){
            return state.ListaPaises
        },
        listaregimen( state ){
            // console.log( state.ListaRegimenes.filter( regimen, regimen => regimen.Fisica === true ) )
            return state.ListaRegimenes.filter( regimen=>regimen.Fisica === true )
        },
        listaPFisica ( state ){
            return state.ListaRegimenes.filter( regimen=>regimen.Fisica === true )
        },
        listaPMoral ( state ){
            return state.ListaRegimenes.filter( regimen=>regimen.Moral === true )
        }
    },
    actions:{
        async cargarPaises(){
            try{
                
                const  datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/pais/` )
                
                const data = datos.data
                
                if( datos.status === 200 && datos.statusText==="OK"){ 
                    this.ListaPaises = data
                }

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },

        async cargarRegimenes (){
            try{
                
                const  datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/empresa/regimen/listado/` )

                const resultado = datos.data                
               
 
                if( datos.status === 200 && datos.statusText==="OK"){
                     this.ListaRegimenes = resultado

                      console.log('carga de regimen')
                      console.log(this.ListaRegimenes)
                }

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },

        async crearEmpresa( datos ){
            try{
                console.log( datos )
                /*TODO: falta realizar la conexion para validar que los estatus esten de forma correcta*/
                // const empresa  = await axios.post(`${ process.env.VUE_APP_PATH_API }v1/fiscales/empresa/crear`,datos)

                return 'ok'

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        }

    }

})
