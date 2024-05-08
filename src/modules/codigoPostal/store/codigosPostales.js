import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useCodigosPostales = defineStore( 'codigosPostales',{
    state: ()=>({
        ListaCodigosPostales: [],
    }),
    getters:{
        getCodigosPostales( state ){
            return state.ListaCodigosPostales;
        }
    },
    actions:{
        async cargarCodigosPostales(){
            try{
                const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/catalogo/cp`);
                
                if( datos.status === 200 && datos.statusText === "OK" && datos.data.length > 0){
                    this.ListaCodigosPostales = datos.data;
                }
            }catch( error ){
                console.log("[Error]: " + error );
            }
        },
        async buscarCodigosPostales( cp ){
            try{
                let datos = await axios.post(`${ process.env.VUE_APP_PATH_API }v1/catalogo/cp/buscar`, { cp: cp });
                if( datos.status === 200 && datos.statusText === "OK" && datos.data.length > 0){
                    datos.data[0].estado === null ? datos.data[0].estado = "No aplica" : datos.data[0].estado;
                    datos.data[0].municipio === null ? datos.data[0].municipio = "No aplica" : datos.data[0].municipio;
                    datos.data[0].localidad === null ? datos.data[0].localidad = "No aplica" : datos.data[0].localidad;
                    Swal.fire({
                        title: 'Información de Ubicación:',
                        html: `
                        <style>
                        .inicio{
                            display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;
                        }
                        </style>
                          <div class="inicio">
                            <br>
                            <p><strong>* Código Postal:</strong> ${datos.data[0].codigo_postal}</p>
                            <p><strong>* País:</strong> ${datos.data[0].pais}</p>
                            <p><strong>* Estado:</strong> ${datos.data[0].estado}</p>
                            <p><strong>* Municipio:</strong> ${datos.data[0].municipio}</p>
                            <p><strong>* Localidad:</strong> ${datos.data[0].localidad}</p>
                          </div>
                        `,
                        confirmButtonText: 'Cerrar'
                      });
                }
            }catch ( error ){
                Swal.fire({
                    title: "Error",
                    text: `No se encontró el código postal ${ cp }`,
                    icon: "error",
                    showConfirmButton: true,
                });
            }
        }
    }
})