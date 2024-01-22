import axios from "axios";
import { defineStore } from "pinia";

export const useEmpresas = defineStore( 'empresas', {
    state: ()=>({
        ListadoEmpresas:  [],
        Paginacion: {
            PaginaActual: 1,
            PaginaMaxima: 1,
            Paginado: 5,
            Total: 0
        },
        propietaria: false
    }),
    getters:{
        getListado( state ){
            return state.ListadoEmpresas
        },
        getPaginas( state ){
            return state.Paginacion
        }
    },
    actions:{
        async cargarEmpresas(){
            try{

                const body = {
                    "esPropietaria": false,
                    "Saltos": 0,
                    "Limite": 5,
                    "Opc": 1
                  }
                  
                const datos = {
                    "data": {
                      "Total": 17,
                      "Listado": [
                        {
                          "EntidadNegocioId": "00000000001",
                          "NombreOficial": "The fit gym",
                          "RFC": "string",
                          "esPropietaria": 1,
                          "Telefono": "7854216843",
                          "Direccion": "alksjdalksdj aslñd asñldk aasd"
                        },
                        {
                          "EntidadNegocioId": "00000000004",
                          "NombreOficial": "Corporativo MyFriend",
                          "RFC": "1594684534512",
                          "esPropietaria": 1,
                          "Telefono": "7854216843",
                          "Direccion": "alksjdalksdj aslñd asñldk aasd"
                        },
                        {
                          "EntidadNegocioId": "00000000005",
                          "NombreOficial": "The Fit Bar",
                          "RFC": "7568491543268",
                          "esPropietaria": 1,
                          "Telefono": "7854216843",
                          "Direccion": "alksjdalksdj aslñd asñldk aasd"
                        },
                        {
                          "EntidadNegocioId": "00000000006",
                          "NombreOficial": "Empacadora de Frutos y Jugos",
                          "RFC": "7564891643468",
                          "esPropietaria": 0,
                          "Telefono": "7854216843",
                          "Direccion": "alksjdalksdj aslñd asñldk aasd"
                        },
                        {
                          "EntidadNegocioId": "00000000007",
                          "NombreOficial": "Grupo Herdez, S.A.B. de C.V.",
                          "RFC": "8765213496485",
                          "esPropietaria": 0,
                          "Telefono": "7854216843",
                          "Direccion": "alksjdalksdj aslñd asñldk aasd"
                        },
                        {
                            "EntidadNegocioId": "00000000008",
                            "NombreOficial": "Active Lifestyle Center",
                            "RFC": "987654321",
                            "esPropietaria": 1,
                            "Telefono": "7854321098",
                            "Direccion": "123 Fitness Street"
                        },
                        {
                            "EntidadNegocioId": "00000000009",
                            "NombreOficial": "Wellness Oasis",
                            "RFC": "123456789",
                            "esPropietaria": 1,
                            "Telefono": "7854765432",
                            "Direccion": "456 Health Avenue"
                        },
                        {
                            "EntidadNegocioId": "00000000010",
                            "NombreOficial": "Revitalize Hub",
                            "RFC": "564738291",
                            "esPropietaria": 0,
                            "Telefono": "7854901234",
                            "Direccion": "789 Vitality Lane"
                        },
                        {
                            "EntidadNegocioId": "00000000011",
                            "NombreOficial": "Purely Fresh",
                            "RFC": "192837465",
                            "esPropietaria": 0,
                            "Telefono": "7854034567",
                            "Direccion": "234 Freshness Boulevard"
                        },
                        {
                            "EntidadNegocioId": "00000000012",
                            "NombreOficial": "Energize Café",
                            "RFC": "394857162",
                            "esPropietaria": 1,
                            "Telefono": "7854678901",
                            "Direccion": "567 Energy Drive"
                        },
                        {
                            "EntidadNegocioId": "00000000013",
                            "NombreOficial": "FitFusion Express",
                            "RFC": "928374651",
                            "esPropietaria": 1,
                            "Telefono": "7854012345",
                            "Direccion": "890 Fitness Plaza"
                        },
                        {
                            "EntidadNegocioId": "00000000014",
                            "NombreOficial": "Organic Squeeze",
                            "RFC": "837465192",
                            "esPropietaria": 0,
                            "Telefono": "7854456789",
                            "Direccion": "123 Organic Avenue"
                        },
                        {
                            "EntidadNegocioId": "00000000015",
                            "NombreOficial": "Vitamin Boost",
                            "RFC": "746192835",
                            "esPropietaria": 0,
                            "Telefono": "7854890123",
                            "Direccion": "456 Vitamin Lane"
                        },
                        {
                            "EntidadNegocioId": "00000000016",
                            "NombreOficial": "Zen Wellness",
                            "RFC": "384756291",
                            "esPropietaria": 1,
                            "Telefono": "7854035678",
                            "Direccion": "789 Serenity Street"
                        },
                        {
                            "EntidadNegocioId": "00000000017",
                            "NombreOficial": "Nature's Bounty",
                            "RFC": "384756291",
                            "esPropietaria": 1,
                            "Telefono": "7854012890",
                            "Direccion": "234 Nature Road"
                        },
                        {
                            "EntidadNegocioId": "00000000001",
                            "NombreOficial": "The fit gym",
                            "RFC": "string",
                            "esPropietaria": 1,
                            "Telefono": "7854216843",
                            "Direccion": "alksjdalksdj aslñd asñldk aasd"
                          },
                          {
                            "EntidadNegocioId": "00000000004",
                            "NombreOficial": "Corporativo MyFriend",
                            "RFC": "1594684534512",
                            "esPropietaria": 1,
                            "Telefono": "7854216843",
                            "Direccion": "alksjdalksdj aslñd asñldk aasd"
                          },
                          {
                            "EntidadNegocioId": "00000000005",
                            "NombreOficial": "The Fit Bar",
                            "RFC": "7568491543268",
                            "esPropietaria": 1,
                            "Telefono": "7854216843",
                            "Direccion": "alksjdalksdj aslñd asñldk aasd"
                          },
                          {
                            "EntidadNegocioId": "00000000006",
                            "NombreOficial": "Empacadora de Frutos y Jugos",
                            "RFC": "7564891643468",
                            "esPropietaria": 0,
                            "Telefono": "7854216843",
                            "Direccion": "alksjdalksdj aslñd asñldk aasd"
                          },
                          {
                            "EntidadNegocioId": "00000000007",
                            "NombreOficial": "Grupo Herdez, S.A.B. de C.V.",
                            "RFC": "8765213496485",
                            "esPropietaria": 0,
                            "Telefono": "7854216843",
                            "Direccion": "alksjdalksdj aslñd asñldk aasd"
                          },
                          {
                              "EntidadNegocioId": "00000000008",
                              "NombreOficial": "Active Lifestyle Center",
                              "RFC": "987654321",
                              "esPropietaria": 1,
                              "Telefono": "7854321098",
                              "Direccion": "123 Fitness Street"
                          },
                          {
                              "EntidadNegocioId": "00000000009",
                              "NombreOficial": "Wellness Oasis",
                              "RFC": "123456789",
                              "esPropietaria": 1,
                              "Telefono": "7854765432",
                              "Direccion": "456 Health Avenue"
                          },
                          {
                              "EntidadNegocioId": "00000000010",
                              "NombreOficial": "Revitalize Hub",
                              "RFC": "564738291",
                              "esPropietaria": 0,
                              "Telefono": "7854901234",
                              "Direccion": "789 Vitality Lane"
                          },
                          {
                              "EntidadNegocioId": "00000000011",
                              "NombreOficial": "Purely Fresh",
                              "RFC": "192837465",
                              "esPropietaria": 0,
                              "Telefono": "7854034567",
                              "Direccion": "234 Freshness Boulevard"
                          },
                          {
                              "EntidadNegocioId": "00000000012",
                              "NombreOficial": "Energize Café",
                              "RFC": "394857162",
                              "esPropietaria": 1,
                              "Telefono": "7854678901",
                              "Direccion": "567 Energy Drive"
                          },
                          {
                              "EntidadNegocioId": "00000000013",
                              "NombreOficial": "FitFusion Express",
                              "RFC": "928374651",
                              "esPropietaria": 1,
                              "Telefono": "7854012345",
                              "Direccion": "890 Fitness Plaza"
                          },
                          {
                              "EntidadNegocioId": "00000000014",
                              "NombreOficial": "Organic Squeeze",
                              "RFC": "837465192",
                              "esPropietaria": 0,
                              "Telefono": "7854456789",
                              "Direccion": "123 Organic Avenue"
                          },
                          {
                              "EntidadNegocioId": "00000000015",
                              "NombreOficial": "Vitamin Boost",
                              "RFC": "746192835",
                              "esPropietaria": 0,
                              "Telefono": "7854890123",
                              "Direccion": "456 Vitamin Lane"
                          },
                          {
                              "EntidadNegocioId": "00000000016",
                              "NombreOficial": "Zen Wellness",
                              "RFC": "384756291",
                              "esPropietaria": 1,
                              "Telefono": "7854035678",
                              "Direccion": "789 Serenity Street"
                          },
                          {
                              "EntidadNegocioId": "00000000017",
                              "NombreOficial": "Nature's Bounty",
                              "RFC": "384756291",
                              "esPropietaria": 1,
                              "Telefono": "7854012890",
                              "Direccion": "234 Nature Road"
                          }
                      ]
                    }
                  };
                  
                this.ListadoEmpresas = datos.data.Listado
                this.Paginacion.Total = datos.data.Total
                this.Paginacion.PaginaMaxima = Math.ceil(this.Paginacion.Total / this.Paginacion.Paginado);


/*                 const body = req.body;
                
                if (body.Limite === undefined) {
                    body.Limite = this.Paginacion.Paginado
                }
                
                const datos = await axios.post(`${process.env.VUE_APP_PATH_API}v1/empresas/`, body)

                if( datos.status === 200 && datos.statusText==="OK"){
                    console.log("Eston son los datos: " + datos.data )
                    this.ListadoEmpresas = datos.data.Listado
                    this.Paginacion.Total = datos.data.Total
                    this.Paginacion.PaginaMaxima = Math.ceil( this.Paginacion.Total / this.Paginacion.Paginado )
                } */
            }catch ( error ){
                console.log( error )
                throw new Error( error )
            }
        },
        setPropietaria( propietaria ){
            this.propietaria = propietaria
        }
    }
})