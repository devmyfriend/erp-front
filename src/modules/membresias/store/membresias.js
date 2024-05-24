import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useMembresias = defineStore('Membresias',{
    state: () => ({
        ListadoMembresias: [],
        Membresia: {},

        ListadoTiposMembresias: [],
        ListadoPeriodosMembresias: [],
    }),
    getters:{
        getMembresias(state){
            return state.ListadoMembresias;
        },
        getMembresia(state){
            return state.Membresia;
        },
        getTiposMembresias(state){
            return state.ListadoTiposMembresias;
        },
        getPeriodosMembresias(state){
            return state.ListadoPeriodosMembresias;
        }
            
    },
    actions:{
        async cargarMembresias(){
            try {
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias`);

                if (datos.status === 200) {
                    this.ListadoMembresias = datos.data.response;
                    return true;
                }
            } catch (error) {
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async buscarMembresiaPorId(id){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/detalle/${id}`);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.Membresia = datos.data.response;
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async buscarMembresiaPorNombre(nombre){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/buscar/${nombre}`);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoMembresias = datos.data.response;
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async buscarTipoMembresiasPorNombre(nombre){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/tipo/buscar/${nombre}`);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoTiposMembresias = datos.data.response;
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async buscarPeriodoMembresiasPorNombre(nombre){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/periodo/buscar/${nombre}`);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoPeriodosMembresias = datos.data.response;
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async crearMembresia(data){
            try{
                const datos = await axios.post(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/crear`, data);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoMembresias = datos.data.response;
                    Swal.fire({
                        title: `${datos.data.message}:`,
                        text:  `Membresía creada correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async editarMembeesia(data){
            try{
                const datos = await axios.put(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/editar`, data);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoMembresias = datos.data.response;
                    Swal.fire({
                        title: `${datos.data.message}:`,
                        text: `Membresía con ID: ${data.MembresiaId} editada correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async borrarMembresia(data){
            try{
                const datos = await axios.delete(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/borrar`, {data: data});

                if(datos.status === 200 && datos.statusText === 'OK'){

                    Swal.fire({
                        title: `${datos.data.message}`,
                        text: `Membresia con ID: ${data.MembresiaId} desactivada correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },

        async cargarTiposMembresias(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/tipo`);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoTiposMembresias = datos.data.response;
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async crearTipoMembresia(data){
            try{
                const datos = await axios.post(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/tipo/crear`, data);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoTiposMembresias = datos.data.response;
                    Swal.fire({
                        title: `${datos.data.message}:`,
                        text:  `Tipo de membresía creado correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async editarTipoMembresia(data){
            console.log('asdkasldjalskdjladj');
            try{
                const datos = await axios.put(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/tipo/editar`, data);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoTiposMembresias = datos.data.response;
                    Swal.fire({
                        title: `${datos.data.message}:`,
                        text: `Tipo de membresía con ID: ${data.TipoMembresiaId} editado correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async borrarTipoMembresia(data){
            try{
                console.log ('Borrar el tipo de membresia: ', JSON.stringify(data));
                const datos = await axios.delete(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/tipo/borrar`, {data: data});

                if(datos.status === 200 && datos.statusText === 'OK'){
                    Swal.fire({
                        title: `${datos.data.message}`,
                        text: `Tipo de membresía con ID: ${data.TipoMembresiaId} desactivado correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },

        async cargarPeriodoMembresias(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/periodo`);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoPeriodosMembresias = datos.data.response;
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async crearPeriodoMembresia(data){
            try{
                const datos = await axios.post(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/periodo/crear`, data);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoTiposMembresias = datos.data.response;
                    Swal.fire({
                        title: `${datos.data.message}:`,
                        text:  `Periodo de membresía creado correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async editarPeriodoMembresia(data){
            try{
                const datos = await axios.put(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/periodo/editar`, data);

                if(datos.status === 200 && datos.statusText === 'OK'){
                    this.ListadoTiposMembresias = datos.data.response;
                    Swal.fire({
                        title: `${datos.data.message}:`,
                        text: `Periodo de membresía con ID: ${data.TipoPeriodoId} editado correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },
        async borrarPeriodoMembresia(data){ 
            try{
                const datos = await axios.delete(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/membresias/periodo/borrar`, {data: data});

                if(datos.status === 200 && datos.statusText === 'OK'){
                    Swal.fire({
                        title: `${datos.data.message}`,
                        text: `Periodo de membresía con ID: ${data.TipoPeriodoId} desactivado correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch(error){
                console.error(error);
                const { response } = error.request;
                const msg = JSON.parse(response);
                Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },

    }
});