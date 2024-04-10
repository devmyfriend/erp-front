import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

const ruta_local = 'http://localhost:3000/api/';

export const useRegimenFiscal = defineStore("RegimenFiscal", {
    state: () => ({
        ListaRegimenFiscal: [],
    }),
    getters: {
        getRegimenFiscal(state) {
            return state.ListaRegimenFiscal;
        },
    },
    actions: {
            async cargarRegimenFiscal() {
                try {
                    const datos = await axios.get(`${ruta_local}v1/catalogo/sat/regimenfiscal/lista`);
                    this.ListaRegimenFiscal = datos.data;
                } catch (error) {
                    console.log("[Error]: " + error);
                }
            },
            async buscarRegimenFiscal(Descripcion) {
                try {
                    return this.ListaRegimenFiscal.filter((regimenFiscal) =>
                    regimenFiscal.Descripcion.toLowerCase().includes(Descripcion.toLowerCase())
                    );
                } catch (error) {
                    console.log("[Error]: " + error);
                    Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo cargar la información",
                    });
                }
            },
            async buscarRegimenesXCFDi( idRegimen ){
                try{
                    const datos = await axios.get(`${ruta_local}v1/catalogo/sat/cfdi`);
    
                    if (datos.status === 200 && datos.statusText === "OK" && datos.data.length > 0) {
                        let respuesta = datos.data.filter( (item) => item.regimen.ClaveRegimenFiscal === idRegimen ).map( (item) => item.cfdi );
                        return respuesta;
                    }
                }catch( error ){
                    console.log("[Error]: " + error );
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo cargar la información',
                    });
                }
            },
        },
    });