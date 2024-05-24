import axios from "axios";
import { defineStore } from "pinia";
import Swal from 'sweetalert2';

const VUE_APP_PATH_API_PRODUCTS = 'http://localhost:3000/api/';

export const useCFDi = defineStore( 'CFDi',{
    state: ()=>({
        ListaCFDi: [],
    }),
    getters:{
        getCFDi( state ){
            return state.ListaCFDi;
        }
    },
    actions:{
        async cargarCFDi(){
            try{
                const datos = await axios.get(`${VUE_APP_PATH_API_PRODUCTS}v1/catalogo/sat/cfdi/lista`);
                this.ListaCFDi = datos.data;
            }catch( error ){
                console.log("[Error]: " + error );
            }
        },
        async buscarCFDi( Descripcion ){
            try{
                return this.ListaCFDi.filter( cfdi => cfdi.Descripcion.toLowerCase().includes( Descripcion.toLowerCase() ) );
            }catch( error ){
                console.log("[Error]: " + error );
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar la información',
                });
            }
        },
        
    }
});