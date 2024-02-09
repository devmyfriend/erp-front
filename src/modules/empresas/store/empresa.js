

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

        async crearEmpresa( datos ){
            try{

                const empresa  = await axios.post(`${ process.env.VUE_APP_PATH_API }v1/empresa/crear`, datos )

                this.EmpresaId = empresa.data.EmpresaId
                
                return empresa.data

            }catch( error ){
                return (error.response.data)
            }
        },

        async obtenerEmpresa ( idempresa ){

            try{

                const empresa = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/empresa/${ idempresa }`)

                return empresa

            }catch( error ){
                return error.response
            }
        },

        async actualizarEmpresa ( datos ){
            try{

                const empresa = await axios.patch( `${ process.env.VUE_APP_PATH_API }v1/empresa/editar/`, datos )
                return empresa.data

            }catch( error ){
                return error.response
            }

        }

        
 
    }

})
