

import axios from "axios";
import { defineStore } from "pinia";


export const useEmpresa = defineStore( 'empresa', {
    state: ()=>({
        IdEmpresa:       '',
        RFC:             '',
        RazonSocial:     '',
        Pais:            '',
        Empresa:         '',
        PersonaFisica:   false,
        PersonaMoral:    false,
        RegimenFiscal:   '',
        NombreComercial: '',
        ListaPaises :    [],
        ListaRegimenes:  [],
        listaEmpresas:   []
    }),
    getters: {
        listapaises( state ){
            return state.ListaPaises
        },
        listaListadoEmpresas( state ){
            return state.listaEmpresas
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
                
                const { listadopais } = datos.data
                
                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaPaises = listadopais
                }

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },
       async cargarListadoEmpresas(){
            try{
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/viewListadoEmpresas/` )
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
        },
        async cargarRegimenes (){
            try{
                
                const  datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/regimen/` )
                console.log("Datos de Regimen \n", datos.data)
                const { listadoregimen } = datos.data

                if( datos.status === 200 && datos.statusText==="OK"){
                     this.ListaRegimenes = listadoregimen

                }
            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        }
    }

})
