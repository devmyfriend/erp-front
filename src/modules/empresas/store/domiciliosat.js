import axios from "axios";
import { defineStore } from 'pinia'

export const useDomicilioSAT = defineStore( 'domicilioSAT', {
    state: ()=>({
        ListaEstados:      [],
        ListaMunicipios:   [],
        ListaCiudades:     [],
        ListaColonia:      [],

    }),
    getters:{
        listamunicipios( state, claveEstado ){
            return state.ListaMunicipios.filter( municipio => municipio.ClaveEstado === claveEstado )
        },
        listaciudades( state, claveEstado ){
            return state.ListaCiudades.filter( ciudad => ciudad.ClaveEstado === claveEstado )
        }
    },
    actions:{
        async cargaDatos(){
            try{
                
                /*TODO: 
                    validar el consumo de estos endpoints por que no resuelven municipio y localidad
                */
                const [ datosEstados, datosMunicipios, datosCiudades ] = await Promise.all([
                    axios.get( `${ process.env.VUE_APP_PATH_API }v1/estado/` ),
                    axios.get( `${ process.env.VUE_APP_PATH_API }v1/municipio` ),
                    axios.get( `${ process.env.VUE_APP_PATH_API }v1/localidad/` ),
                ])

                
                console.log(datosEstados)
                console.log(datosMunicipios)
                console.log(datosCiudades)

                if( datosEstados.status === 200  && datosEstados.statusText === "OK" ){
                    const { listadoEstado } = datosEstados.data
                    this.ListaEstados = listadoEstado
                }

                if( datosMunicipios.status === 200  && datosMunicipios.statusText === "OK" ){
                    const { listadoMunicipios } = datosMunicipios.data
                    this.ListaMunicipios = listadoMunicipios
                }

                if( datosCiudades.status === 200  && datosCiudades.statusText === "OK" ){
                    const { listadoCiudades } = datosCiudades.data
                    this.ListaCiudades = listadoCiudades
                }

            }catch( error ){
                console.log( error )
                throw new Error ( error )
            }
        }
    }
})