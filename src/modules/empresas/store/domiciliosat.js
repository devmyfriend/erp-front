import axios from "axios";
import { defineStore } from 'pinia'

export const useDomicilioSAT = defineStore( 'domicilioSAT', {
    state: ()=>({
        ListaEstados:      [],
        ListaMunicipios:   [],
        ListaCiudades:     [],
        ListaColonia:      [],
        ListaPaises:       [],
    }),
    getters:{
        listadoestado(){
            return this.ListaEstados
        },
        listadomunicipio(){
            return this.ListaMunicipios
        },
        listadociudad(){
            return this.ListaCiudades
        },
        listadopais(){
            return this.ListaPaises
        },
        
/*         listamunicipios( state, claveEstado ){
            return state.ListaMunicipios.filter( municipio => municipio.ClaveEstado === claveEstado )
        }, */
        listaciudades( state, claveEstado ){
            return state.ListaCiudades.filter( ciudad => ciudad.ClaveEstado === claveEstado )
        }
    },
    actions:{
        async cargaDatos(){
            try{
                
                const [ datosEstados, datosMunicipios, datosCiudades, datosColonias ] = await Promise.all([
                    axios.get( `${ process.env.VUE_APP_PATH_API }v1/sat/estado` ),
                    axios.get( `${ process.env.VUE_APP_PATH_API }v1/sat/municipio` ),
                    axios.get( `${ process.env.VUE_APP_PATH_API }v1/sat/localidad` ),
                    axios.get( `${ process.env.VUE_APP_PATH_API }v1/sat/colonias` ),
                ])
                
                if( datosEstados.status === 200  && datosEstados.statusText === "OK" ){
                    const { listadoEstado } = datosEstados.data
                    this.ListaEstados = listadoEstado
                }

                if( datosMunicipios.status === 200  && datosMunicipios.statusText === "OK" ){

                    const { listadoMunicipio } = datosMunicipios.data
                    // console.log("[ListMunicipios]: " + listadoMunicipio)
                    this.ListaMunicipios = listadoMunicipio
                }

                if( datosCiudades.status === 200  && datosCiudades.statusText === "OK" ){
                    const { listadoLocalidad } = datosCiudades.data
                    this.ListaCiudades = listadoLocalidad
                }

                if( datosColonias.status === 200  && datosColonias.statusText === "OK" ){
                    const { listadoColonias } = datosColonias.data
                    this.ListaColonia = listadoColonias
                }

            }catch( error ){
                console.log( error )
                throw new Error ( error )
            }
        },
        async cargarEstados(pais){
            try{
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/domicilio/sat/estado/${pais}` )

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaEstados = datos.data.listadoEstados
                }
            }catch( error ){
                console.log( error )
                throw new Error ( error )
            }
        },
        async cargarMunicipios(estado){
            try{
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/domicilio/sat/municipio/${estado}` )

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaMunicipios = datos.data.listadoMunicipios
                }
            }catch( error ){
                console.log( error )
                throw new Error ( error )
            }
        },
        async cargarLocalidades(estado){
            try{
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/domicilio/sat/localidad/${estado}` )

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaCiudades = datos.data.listadoLocalidades
                }
            }catch( error ){
                console.log( error )
                throw new Error ( error )
            }
        },
        async cargarPaises(){
            try{
                const datos = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/domicilio/sat/pais` )

                if( datos.status === 200 && datos.statusText==="OK"){
                    this.ListaPaises = datos.data.listadoPaises
                }
            }catch( error ){
                console.log( error )
                throw new Error ( error )
            }
        },
    }
})