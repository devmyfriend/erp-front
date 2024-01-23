import axios from "axios";
import { defineStore } from 'pinia'

export const useDomicilioSAT = defineStore( 'domicilioSAT', {
    state: ()=>({
        ListaEstados:      [],
        ListaMunicipios:   [],
        Localidades:       [],
        ListaColonia:      [],

    }),
    getters:{
        listaEstados( state ){
            return state.ListaEstados.filter( estado => estado.ClavePais === 'MEX' )
            // return state.ListaEstados
        },

        Estado: ( state ) => {
            return ( clavepais )=>state.ListaEstados.filter( estado => estado.ClavePais === clavepais )
        },

        // listaMunicipios( state ){
        //     return state.ListaMunicipios
        // },

        listadoLocalidades( state ){
            return state.Localidades
        },

        listadoColonias ( state ){
            return state.ListaColonia
        }
        
    },
    actions:{
        
        async cargarEstado( clavePais ){
            try{
                console.log( `clave de pais en piña ${ clavePais }` )
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/pais/estados/${ clavePais }` )
                console.log( datos )
                if( datos.status === 200  && datos.statusText === "OK" ){
                    const { listadoEstado } = datos.data
                    this.ListaEstados = listadoEstado
                }

            }catch ( error){
                console.log( error )
                throw new Error( error )
            }
        },
        
        async cargarMunicipio( claveestado ){
            try{
                
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/domicilio/sat/municipio/${ claveestado }` )
                
                if( datos.status === 200  && datos.statusText === "OK" ){
                    const { listadoMunicipios } = datos.data
                    this.ListaMunicipios = listadoMunicipios
                }

            }catch ( error){
                console.log( error )
                throw new Error( error )
            }
        },

        async cargarLocalidad( claveestado ){

            try{
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/domicilio/sat/localidad/${ claveestado }` )

                if( datos.status === 200  && datos.statusText === "OK" ){
                    console.log(datos.data)
                    const { listadoLocalidades } = datos.data
                    this.Localidades = listadoLocalidades
                }

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }

        },

        async cargarColonia( codigopostal ){
            try{
               
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/domicilio/sat/${ codigopostal }` )

                if( datos.status === 200  && datos.statusText === "OK" ){
                    console.log(datos.data)
                    const { listadoColonias } = datos.data
                    this.ListaColonia = listadoColonias
                }

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }

        }

    }
})