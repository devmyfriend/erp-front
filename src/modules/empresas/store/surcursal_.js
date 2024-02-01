

import axios from "axios";
import { defineStore } from "pinia";

export const useSucursal = defineStore( 'sucursal', {
    state: ()=>({
        Sucursal:{
            Nombre: String,
            EntidadNegocioId: Number,
                
        },
        Domicilio:{
            Calle:          String,
            NumeroExt:      String,
            NumeroInt:      String,
            CodigoPostal:   String,
            ClaveEstado:    String,
            ClaveMunicipio: String,
            ClaveLocalidad: String,
            ClaveColonia:   String,
            ClavePais:      String
        }
    }),
    actions:{
        async crearSucursal( datos ){
            // this.Sucursal.Nombre = datos.nombresucursal
            // this.Sucursal.EntidadNegocioId = datos.idempresa
            // this.Domicilio.Calle = datos.Calle
            // this.Domicilio.NumeroExt = datos.noext
            // this.Domicilio.NumeroInt = datos.noint
            // this.Domicilio.ClaveColonia = datos.colonia
            // this.Domicilio.ClaveEstado = datos.estado
            // this.Domicilio.ClaveMunicipio = datos.municipio
            // this.Domicilio.ClavePais = datos.pais
            // this.Domicilio.ClaveLocalidad = datos.ciudad
            // this.Domicilio.CodigoPostal = datos.codigopostal

            //path /api/v1/sucursal/crear

            const data = await axios.post( `${ process.env.VUE_APP_PATH_API }v1/sucursal/crear`,{
                datos
            })

            console.log(data)

        },

        async cargarResponsables( idempresa ){

            try{

                // /api/v1/empresa/contactos/{id}

                const data = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/empresa/contactos/${ idempresa }`)

                console.log( data )

            }catch( error ){
                console.log( error )
                
            }

        }
    }
})