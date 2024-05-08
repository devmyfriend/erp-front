import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from 'pinia';

export const useUsuarios = defineStore('Usuarios', {
    state: () => ({
        ListadoUsuarios: [],
        ListadoTiposUsuario: [],
    }),
    getters: {
        getUsuarios: (state) => {
            return state.ListadoUsuarios;
        },
        getTiposUsuario: (state) => {
            return state.ListadoTiposUsuario;
        }
    },
    actions: {
        async cargarUsuarios(pagina){
            try {
                this.ListadoUsuarios = [{
                    UsuarioId: 1,
                    TipoUsuario: "Administrador",
                    TipoUsuarioId: 1,
                    ApellidoPaterno: "Bacab",
                    ApellidoMaterno: "Carambola",
                    Nombres: "Santiago",
                },
                {
                    UsuarioId: 2,
                    TipoUsuario: "Usuario",
                    TipoUsuarioId: 2,
                    ApellidoPaterno: "Gonzalez",
                    ApellidoMaterno: "Perez",
                    Nombres: "Juan",
                },
                {
                    UsuarioId: 3,
                    TipoUsuario: "Contador",
                    TipoUsuarioId: 4,
                    ApellidoPaterno: "Chan",
                    ApellidoMaterno: "Castillo",
                    Nombres: "Karime",
                },
                {
                    UsuarioId: 4,
                    TipoUsuario: "Gerente",
                    TipoUsuarioId: 3,
                    ApellidoPaterno: "Sanchez",
                    ApellidoMaterno: "Lopéz",
                    Nombres: "Adrian",
                }
            ];
                return true;
            }catch(error){
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los usuarios',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        async cargarTiposUsuario(){
            try {
                this.ListadoTiposUsuario = [
                    {
                        TipoUsuarioId: 1,
                        TipoUsuario: "Administrador"
                    },
                    {
                        TipoUsuarioId: 2,
                        TipoUsuario: "Usuario"
                    },
                    {
                        TipoUsuarioId: 3,
                        TipoUsuario: "Gerente"
                    },
                    {
                        TipoUsuarioId: 4,
                        TipoUsuario: "Contador"
                    }
                ];
                return true;
            }catch(error){
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los tipos de usuario',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
    }
});