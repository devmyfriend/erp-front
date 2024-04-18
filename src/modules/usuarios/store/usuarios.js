import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from 'pinia';

export const useUsuarios = defineStore('Usuarios', {
    state: () => ({
        ListadoUsuarios: [],
    }),
    getters: {
        getUsuarios: (state) => {
            return state.ListadoUsuarios;
        }
    },
    actions: {
        async cargarUsuarios(pagina){
            try {
                const response = await axios.get(`${process.env.VUE_APP_PATH_API}v1/usuarios/${pagina}`);
            }catch(error){
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los usuarios',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }
});