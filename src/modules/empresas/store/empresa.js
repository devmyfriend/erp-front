

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
        ListaCP:        [],
        ListaColonias: [],

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
        },
        listaCP( state ){
            return state.ListaCP
        },
        listaColonias( state ){
            return state.ListaColonias
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
        async cargarRegimenes (){
            try{
                
                const  datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/regimen/` )
                
                const { listadoregimen } = datos.data

                if( datos.status === 200 && datos.statusText==="OK"){
                     this.ListaRegimenes = listadoregimen

                }

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },
        async cargarCP(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/domicilio/sat/codigospostal`)
            
                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaCP = datos.data.listadocodigos
                }
            }catch(error){
                console.log( error )
                throw new Error( error )
            }
        },
        async cargarColoniasPorCP( cp ){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/domicilio/sat/${cp}`)
                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaColonias = datos.data.listadoColonias
                }

            }catch(error){
                console.log( error )
                throw new Error( error )
            }
        },
        async crearColonia(body){
            try{
                const datos = await axios.post(`${process.env.VUE_APP_PATH_API}v1/colonias/crear`, body)
                

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaColonias = datos.data.listadoColonias
                }

            }catch(error){
                console.log( error )
                throw new Error( error )
            }
        }
    }

})
