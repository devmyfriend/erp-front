

import axios from "axios";
import { defineStore } from "pinia";


export const useEmpresa = defineStore( 'empresa', {
    state: ()=>({
        EmpresaId:       '',
        RFC:             '',
        RazonSocial:     '',
        Pais:            '',
        PersonaFisica:   false,
        PersonaMoral:    false,
        RegimenFiscal:   '',
        NombreComercial: '',

        ListaPaises :    [],
        ListaRegimenes:  [],
        ListaEstados:    [],
        ListaMunicipios: [],
        ListaCiudades:   [],
        ListaColonias:   [],

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

        getPaises ( state ){
            return state.ListaPaises
        },
        getEstados ( state ){
            return state.ListaEstados
        },
        getMunicipios ( state ){
            return state.ListaMunicipios
        },
        getCiudades ( state ){
            return state.ListaCiudades
        },
        getColonias ( state ){
            return state.ListaColonias

        NombrePais ( state ){
            return ( ClavePais )=> state.ListaPaises.find((pais) => pais.ClavePais === ClavePais)
        },
        IdEmpresa (state){
            return state.EmpresaId

        }
    },
    actions:{
        async cargarPaises(){
            try{
                const  datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/pais/` )
                
                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaPaises = datos.data

                }
            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },

        async cargarRegimenes (){
            try{
                
                // const  datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/empresa/regimen/listado/` )
                const  datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/catalogo/sat/cfdi` )

                const resultado = datos.data.map( ( objecto )=>{
                    

                    const item ={
                        ClaveRegimenFiscal : objecto.regimen.ClaveRegimenFiscal,
                        Descripcion:         objecto.regimen.Descripcion,
                        Fisica:              objecto.regimen.Fisica,
                        Moral:               objecto.regimen.Moral

                    }

                    return  item

                })               
               
                if( datos.status === 200 && datos.statusText==="OK"){
                     this.ListaRegimenes = resultado
                }

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },

        async cargarEstados(cPais){
            try{
                const  datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/pais/estados/${cPais}` )

                if ( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaEstados = datos.data
                }
            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },


    }
 
})
