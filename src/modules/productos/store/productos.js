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
        async crearProducto(producto, tipo){
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
        },
        async buscarProducto(id){
            try{
                if (tipo === undefined) {
                    throw new Error("No se ha definido el tipo de producto");
                }else{
                    const datos = await axios.get(`http://lachosoft.cloud:7000/api/v1/productos/${id}`);
                    if(datos.status === 200 && datos.statusText === "OK"){
                        this.Producto = datos.data.response;
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
        }
    }
});