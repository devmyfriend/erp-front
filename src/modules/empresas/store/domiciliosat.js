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

        listaMunicipios( state ){
            return state.ListaMunicipios
        },

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
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/pais/estados/${ clavePais }` )
                // console.log( datos )
                if( datos.status === 200  && datos.statusText === "OK" ){
                     const { data } = datos 
                    console.log('listado de estados')
                    console.log(data) 
                    this.ListaEstados = data
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

        },

        async cargarDatosGrales ( codigopostal, claveestado ){
            try{
                if( codigopostal.length >0 && codigopostal && claveestado && claveestado.length >0 ){ 
                    const data = {
                        cp: codigopostal,
                        ClaveEstado: claveestado
                    }

                    const datos = await axios.post( `${ process.env.VUE_APP_PATH_API }v1/pais/estados/colonias`,data )

                    if( datos.status === 200  && datos.statusText === "OK" ){
                        const { colonias, localidades, municipios } = datos.data
                        this.ListaColonia = colonias
                        this.ListaMunicipios = municipios 
                        this.Localidades = localidades
                    }
                }

            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        }
    }
})