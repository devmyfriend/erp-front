

import axios from "axios";
import { defineStore } from "pinia";

export const useEmpresa = defineStore( 'empresa', {
    state:{
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
    },
    actions:{
        async CrearSucursal( datos ){
            console.log (datos)
        }
    }
})