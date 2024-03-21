import axios from "axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useProductos = defineStore('Productos',{
    state: () => ({
        ListadoProductos: [],
        Producto: {},
    }),
    getters:{
        getProductos(state){
            return state.ListadoProductos;
        },
        getProducto(state){
            return state.Producto;
        },
    },
    actions:{
        async cargarProductos(tipo){
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
/*         async crearProducto(producto, tipo){
            try{
                let body = {
                    "CodigoProducto": "",
                    "NombreProducto": "",
                    "DescripcionProducto": "",
                    "UnidadBase": 0,
                    "UnidadCompra": 0,
                    "UnidadVenta": 0,
                    "UnidadFiscal": 0,
                    "ClaveProductoServicio": "",
                    "ClaveUnidadSat": "",
                    "ImpuestoCompuestoId": 0,
                    "LineaId": 0,
                    "CategoriaId_1": "",
                    "CategoriaId_2": "",
                    "CreadoPor": 1
                };

                for (var clave in producto) {
                    if (producto.hasOwnProperty(clave)) {
                      body[clave] = producto[clave];
                    }
                }                
                const datos = await axios.post(`http://lachosoft.cloud:7000/api/v1/${tipo}`, body);
                if(datos.status === 200 && datos.statusText === "OK"){
                    Swal.fire({
                        title: "Producto creado",
                        text: `${datos.message}: ${datos.response.CodigoProducto}`,
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
        }, */
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
        }
    }
});