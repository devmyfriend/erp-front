import axios from "axios";
import { defineStore } from "pinia";

export const useEmpresas = defineStore( 'empresas', {
    state: ()=>({
        lista:  [],
        paginas: {
            pagAct: 1,
            pagMax: 1,
            cantidad: 5,
            longitud: 0
        },
        propietaria: false,
        texto: '',
    }),
    getters:{
        getListado( state ){
            return state.lista
        },
        getPaginas( state ){
            return state.paginas
        }
    },
    actions:{
        async cargarListado(){
            if (this.texto == null || this.texto == undefined || this.texto == '') {
                try{
                    const long = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/empresas/longitud/propiedad=${this.propietaria}`)
                    const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresas/listado/offset=${ (this.paginas.cantidad * (this.paginas.pagAct - 1) ) }&limit=${ this.paginas.cantidad }&propiedad=${this.propietaria}`)
                    
                    if( datos.status === 200 && datos.statusText==="OK"){
                        this.lista = datos.data.resultado
                    }                

                    if (long.status === 200 && long.statusText === "OK") {
                        this.paginas.longitud = long.data.resultado
                        this.paginas.pagMax = Math.ceil( this.paginas.longitud / this.paginas.cantidad )   
                    }
                }catch( error ){
                    console.log( error )
                    throw new Error( error )
                }
            }else{
                try{
                    const long = await axios.get( `${ process.env.VUE_APP_PATH_API }v1/empresas/longitudBusqueda/propiedad=${this.propietaria}&texto=${this.texto}`)
                    const datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresas/busqueda/offset=${(this.paginas.cantidad * (this.paginas.pagAct - 1))}&limit=${this.paginas.cantidad}&propiedad=${this.propietaria}&texto=${this.texto}`)
                    
                    this.paginas.pagAct = 1;                    //  I M P O R T A N T
    
    
                    if( datos.status === 200 && datos.statusText==="OK"){
                        this.lista = datos.data.resultado
                    }                
    
                    if (long.status === 200 && long.statusText === "OK") {
                        this.paginas.longitud = long.data.resultado
                        this.paginas.pagMax = Math.ceil( this.paginas.longitud / this.paginas.cantidad )   
                    }
                }catch( error ){
                    console.log( error )
                    throw new Error( error )
                }
            }
        },
        async paginador(opcion, customPag){
            try{
                const oldPag = this.paginas.pagAct
                let datos;

                if(this.paginas.pagAct <= 1 && (opcion === 1 || opcion === 0)){
                    this.paginas.pagAct = 1
                }else if(this.paginas.pagAct >= this.paginas.pagMax && (opcion === 2 || opcion === 3)){
                    this.paginas.pagAct = this.paginas.pagMax
                }else{
                    if(opcion === 0){
                        this.paginas.pagAct = 1
                    }else if(opcion === 1 && this.paginas.pagAct > 1){
                        this.paginas.pagAct -= 1
                    }else if(opcion === 2 && this.paginas.pagAct < this.paginas.pagMax){
                        this.paginas.pagAct += 1
                    }else if (opcion === 3){
                        this.paginas.pagAct = this.paginas.pagMax
                    }else if (opcion === -1){
                        if( customPag > 1 && customPag <= this.paginas.pagMax){
                            this.paginas.pagAct = customPag
                        }else{
                            this.paginas.pagAct = 1
                            alert("La página ingresada no existe");
                        }
                    }
                }

                if(oldPag !== this.paginas.pagAct){

                    if (this.texto == null || this.texto == undefined || this.texto == '') {
                        datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresas/listado/offset=${ (this.paginas.cantidad * (this.paginas.pagAct - 1))}&limit=${this.paginas.cantidad}&propiedad=${this.propietaria}`)
                    }else{
                        datos = await axios.get(`${ process.env.VUE_APP_PATH_API }v1/empresas/busqueda/offset=${(this.paginas.cantidad * (this.paginas.pagAct - 1))}&limit=${this.paginas.cantidad}&propiedad=${this.propietaria}&texto=${this.texto}`)
                    }

                    if( datos.status === 200 && datos.statusText==="OK"){
                        this.lista = datos.data.resultado
                    }      
                }
            }catch( error ){
                console.log( error )
                throw new Error( error )
            }
        },
        setPropietaria( propiedad ){
            this.propietaria = propiedad
        },
        setTexto( texto ){
            this.texto = texto
        },
        setPagAct( pagAct ){
            this.paginas.pagAct = pagAct
        },
    }
})