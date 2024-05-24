import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";
const VUE_APP_PATH_API_PRODUCTS = 'http://localhost:3000/api/';
export const useUnidades = defineStore('Unidades',{
    state: () => ({
        ListadoUnidades: [],
    }),
    getters: {
        getUnidades: (state) => {
            return state.ListadoUnidades;
        }
    },
    actions: {
        async cargarUnidades(pagina) {
            try {
                const response = await axios.get(`${process.env.VUE_APP_PATH_API}v1/unidades/${pagina}`);

                if (response.status === 200 && response.statusText === "OK"){
                    this.ListadoUnidades = response.data;
                    return true;        
                }
                else if (this.ListadoUnidades.length === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'No hay registros',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async crearUnidad(unidad) {
            try {
                const response = await axios.post(`${ process.env.VUE_APP_PATH_API }v1/unidades/clave`, unidad);

                if (response.status === 200 && response.statusText === "OK"){
                    Swal.fire({
                        icon: 'success',
                        title: `${response.data.message}: ${response.data.unitKeyAdd.ClaveUnidadSat}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return true;
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        async editarUnidad(unidad) {
            try {
                const response = await axios.patch(`${ process.env.VUE_APP_PATH_API }v1/unidades/editar`, unidad);

                if (response.status === 200 && response.statusText === "OK"){
                    Swal.fire({
                        icon: 'success',
                        title: `${response.data.message}: ${unidad.ClaveUnidadSat}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return true;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async buscarUnidades(txt, opc) {
            try {
                /* const response = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/unidades/buscar/${id}`); */
                let response = '';

                if(opc === undefined || opc === '1'){
                    response = await axios.get(`${process.env.VUE_APP_PATH_API}v1/unidades/buscar/${txt}`);
                    if(response.data.length === 0){
                        Swal.fire({
                            icon: 'info',
                            title: 'No se encontraron registros',
                            showConfirmButton: false,
                            timer: 1500
                    })
                    }
                }else{
                    response = await axios.get(`${process.env.VUE_APP_PATH_API}v1/unidades/buscar/nombre/${txt}`); 
                }

                if (response.status === 200 && response.statusText === "OK"){
                    this.ListadoUnidades = response.data;
                    return this.ListadoUnidades;
                }
            } catch (error) {
                console.log(error);
                if(error.response.status === 404){
                    Swal.fire({
                        icon: 'info',
                        title: 'No se encontraron registros',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: `[Error]: ${error.response.data.message}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                this.cargarUnidades(1);
            }
        },
        async borrarUnidad(id) {
            try {
                const datos = {
                    ClaveUnidadSat: id,
                }
                const response = await axios.delete(`${ process.env.VUE_APP_PATH_API }v1/unidades/borrar`, { data: datos});

                if (response.status === 200 && response.statusText === "OK"){
                    Swal.fire({
                        icon: 'success',
                        title: `${response.data.message}: ${id}` ,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return true;
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.error,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },

    }
});