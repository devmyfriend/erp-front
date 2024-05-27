import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useProductos = defineStore('Productos',{
    state: () => ({
        ListadoProductos: [],
        ListadoTiposProducto: [],
        ListadoClavesUnidades: [],
        ListadoClavesProductos: [],
        Producto: {},

        ListadoMembresias: [],
    }),
    getters:{
        getProductos(state){
            return state.ListadoProductos;
        },
        getProducto(state){
            return state.Producto;
        },
        getMembresias(state){
            return state.ListadoMembresias;
        },
        getTiposProducto(state){
            return state.ListadoTiposProducto;
        },
        getClavesUnidades(state){
            return state.ListadoClavesUnidades;
        },
        getClavesProductos(state){
            return state.ListadoClavesProductos;
        },
    },
    actions:{
        async cargarProductos(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/productos`);

                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoProductos = datos.data.response;
                    return true;
                }
            }catch (error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });
            }
        },
        async cargarTiposProducto(){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/productos/tipo`);

                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoTiposProducto = datos.data.response;
                    return true;
                }
            }catch (error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });
            }
        },
        async cargarClavesUnidades(pagina){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/unidades/${pagina}`);

                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoClavesUnidades = datos.data;
                    return true;
                }

            }catch (error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });
            }
        },
        async cargarClavesProductos(pagina){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/productos/servicio/palabra/${pagina}`);
                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoClavesProductos = datos.data.response;
                    return true;
                }

            }catch (error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });
            }
        },

        async obtenerProducto(clave){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/productos/detalle/${clave}`);

                if(datos.status === 200 && datos.statusText === "OK"){
                    this.Producto = datos.data.response[0];
                    return true;
                }
            }catch(error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });
            }
        },

        async crearProducto(producto){
            try{
                const data = await axios.post(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/productos/crear`, producto);

                if(data.status === 200 && data.statusText === "OK"){
                    Swal.fire({
                        title: `${data.data.message}:`,
                        text:  `Producto con ID: ${data.data.ProductoId}`,
                        icon: "success",
                    });
                    return true;
                }
            }catch (error){
                const { response } = error.request;
                const msg = JSON.parse(response);
                console.log(error);
                 Swal.fire({
                    title: msg.status ? `${msg.status}` : `Error`,
                    text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                    icon: "error",
                });
            }
        },

        async actualizarProducto(producto){
            try{
                const data = await axios.put(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/productos/editar/${producto.ProductoId}`, producto);

                if(data.status === 200 && data.statusText === "OK"){
                    Swal.fire({
                        title: `${data.data.message}:`,
                        text:  `Producto con ID: ${producto.ProductoId}`,
                        icon: "success",
                    });
                    return true;
                }

            }catch (error){
                const { response } = error.request;
                const msg = JSON.parse(response);
                console.log(error);
                    Swal.fire({
                        title: msg.status ? `${msg.status}` : `Error`,
                        text: msg.error ? msg.error : msg.errors[0] === 'Invalid value' ? `${msg.errors[1]}` : `${msg.errors[0]}`,
                        icon: "error",
                    });
            }
        },

        async buscarProductos(nombre, tipo){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/productos/buscar/${nombre}`);
                
                if(datos.status === 200 && datos.statusText === "OK"){
                    if (tipo === 'Todos'){
                        this.ListadoProductos = datos.data.response;
                        console.log('El tipo es: ', tipo);
                    }else{
                        console.log('Filtrando por tipo ' + tipo + '...');
                        this.ListadoProductos = datos.data.response.filter((producto) => producto.NombreTipoProducto.toLowerCase() === tipo.toLowerCase());
                    }
                    return true;
                }
            }catch (error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });
            }
        },
        async buscarClavesProductos(palabra){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/productos/servicio/buscar/descripcion/${palabra}`);

                if(datos.data.response.length === 0){
                    Swal.fire({
                        title: "No se encontraron resultados",
                        text: "Intente con otra palabra",
                        icon: "info",
                    });
                    return false;
                }

                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoClavesProductos = datos.data.response;
                    return true;
                }

            }catch (error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });                
            }
        },
        async buscarClavesUnidades(palabra){
            try{
                const datos = await axios.get(`${process.env.VUE_APP_PATH_API}v1/unidades/buscar/nombre/${palabra}`);

                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoClavesUnidades = datos.data;
                    return true;
                }

            }catch (error){
                console.log(error);
                const { response } = error.request;
                Swal.fire({
                    title: `${response.message ? response.message : "Error"}`,
                    text: 'No se encontraron resultados',
                    icon: "info",
                });
            }   
        },

        async borrarProducto(id){
            try{
                const payload = {
                    "ProductoId": id,
                    "BorradoPor": 2,
                };
                const datos = await axios.delete(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/productos/borrar`, {data: payload});

                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: `${datos.data.message}`,
                        text: `Producto con ID: ${id} desactivado correctamente`,
                        icon: "success",
                    });
                    return true;
                }
            }catch (error){
                console.log(error);
                Swal.fire({
                    title: "Error",
                    text: JSON.stringify(error.message),
                    icon: "error",
                });
            }
        },
    }
});