import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useProductos = defineStore('Productos',{
    state: () => ({
        ListadoProductos: [],
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

        getClavesUnidades(state){
            return state.ListadoClavesUnidades;
        },
        getClavesProductos(state){
            return state.ListadoClavesProductos;
        },
    },
    actions:{
/*         async cargarProductos(tipo){
            try{
                if (tipo === undefined) {
                    const datos = await axios.get(`http://lachosoft.cloud:7000/api/v1/productos`);
                    if(datos.status === 200 && datos.statusText === "OK"){
                        this.ListadoProductos = datos.data.response;
                        this.ListadoProductos = this.ListadoProductos.slice(0,15);
                        return true;
                    }                    
                }else{
                    const datos = await axios.get(`http://lachosoft.cloud:7000/api/v1/productos/${tipo}`);
                    if(datos.status === 200 && datos.statusText === "OK"){
                        this.ListadoProductos = datos.data.response;
                        this.ListadoProductos = this.ListadoProductos.slice(0,15);
                        return true;
                    }
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
        async crearProducto(producto, tipo){
            try{
                const pet = await axios.post(`http://lachosoft.cloud:7000/api/v1/productos/${tipo}`, producto);
                if(pet.status === 200 && pet.statusText === "OK"){
                    Swal.fire({
                        title: "Producto creado",
                        text: `${pet.data.message}: ${pet.data.response[0].CodigoProducto}`,
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
        async buscarProducto(id){
            try{
                const datos = await axios.get(`http://lachosoft.cloud:7000/api/v1/productos/detalle/${id}`);
                if(datos.status === 200 && datos.statusText === "OK"){
                    this.Producto = datos.data.response[0];
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
        async borrarProducto(t, id){
            try{
                const p = {
                    "CodigoProducto": id,
                    "BorradoPor": 2,
                };
                const datos = await axios.delete(`http://lachosoft.cloud:7000/api/v1/productos/${t}`, {data: p});

                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Producto eliminado",
                        text: `${datos.message}`,
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
        async reactivarProducto(id){
            try{
                const p = {
                    "CodigoProducto": id,
                    "ActualizadoPor": 2
                }
                const datos = await axios.put(`http://lachosoft.cloud:7000/api/v1/productos/activar`, p);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: `${datos.data.message}`,
                        text: `Clave producto: ${id}`,
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
        async actualizarProducto(t, producto){
            try{
                const id = producto.CodigoProducto;
                const datos = await axios.put(`http://lachosoft.cloud:7000/api/v1/productos/${t}/${id}`, producto);


                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: `Producto actualizado`,
                        text: `${datos.data.message} con id: ${id}`,
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
        



        async cargarPoliticasMembresia(){
            try{
                const datos = await axios.get(`http://lachosoft.cloud:7000/api/v1/politicasMembresia`);
                if(datos.status === 200 && datos.statusText === "OK"){
                    this.ListadoMembresias = datos.data.response;
                    this.ListadoMembresias = this.ListadoMembresias.slice(0,5);
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
        async crearPoliticaMembresia(politica){
            try{
                const pet = await axios.post(`http://lachosoft.cloud:7000/api/v1/politicasMembresia`, politica);
                if(pet.status === 200 && pet.statusText === "OK"){
                    Swal.fire({
                        title: "Politica creada",
                        text: `${pet.data.message}: ${pet.data.response[0].PoliticasMembreciasId}`,
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
        async actualizarPoliticaMembresia(producto){
            try{
                console.log(JSON.stringify(producto));
                const id = producto.PoliticasMembreciasId;
                delete producto.PoliticasMembreciasId;
                console.log(JSON.stringify(producto));
                const datos = await axios.put(`http://lachosoft.cloud:7000/api/v1/politicasMembresia/${id}`, producto);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: `Politica actualizada`,
                        text: `${datos.message} con id: ${id}`,
                        icon: "success",
                    });
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
        async borrarPoliticaMembresia(id){
            try{
                const p = {
                    "PoliticasMembreciasId": id,
                    "BorradoPor": 2,
                };
                const datos = await axios.delete(`http://lachosoft.cloud:7000/api/v1/politicasMembresia`, {data: p});
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Politica eliminada",
                        text: `${datos.message}`,
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
        },   */      


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

        async crearProducto(producto){
            try{
                const data = await axios.post(`${process.env.VUE_APP_PATH_API_PRODUCTS}v1/productos/crear`, producto);

                if(data.status === 200 && data.statusText === "OK"){
                    Swal.fire({
                        title: "Producto creado",
                        text: `${data.data.message}: ${data.data.response[0].CodigoProducto}`,
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
    }
});