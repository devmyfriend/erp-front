<template>
<!-- Modal agregar contacto -->
    <div class="modal fade modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalEle" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"> Buscar: {{ modo }} </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <h4 class="mb-4">{{ modo }}</h4>
                            </div>
                        </div>  
                        <div class="row formulario">
                        <!-- Contenido  -->
                        <buscadorClaveSAT v-if="modo == 'Clave Producto SAT'" />
                        <buscadorClaveUnidadSAT v-if="modo == 'Clave Unidad SAT'" />
                        <buscadorImpuestos v-if="modo == 'Clave Impuesto'" />

                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="registro in registros">
                                    <td> {{ registro.nombre }}</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button @click="GuardarTODO" type="button" class="btn btn-primary">Seleccionar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="Cerrar">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script setup>
    import {Modal} from 'bootstrap'
    import { ref, onMounted } from 'vue'
    import buscadorClaveSAT from '@/modules/productos/components/buscador/buscadorClaveSAT.vue'
    import tablaInfinita from '@/shared/sTablaInfinita.vue'
    import buscadorClaveUnidadSAT from '@/modules/productos/components/buscador/buscadorClaveUnidadSAT.vue'
    import buscadorImpuestos from '@/modules/productos/components/buscador/buscadorImpuestos.vue'
    

    let modalEle = ref(null)
    let modalObj = null

    const props = defineProps({
        modo: {
            type: String,
            default: 'Buscar'    
        }
    })
    const emit = defineEmits(['cerrarModal'])

    const listado = ref([]);

    onMounted(() => {
        modalObj = new Modal(modalEle.value) 
        if (props.modo !== null) {
            modalObj.show()
        }else{
            Swal.fire('Error', 'No se ha definido el modo', 'error')
            modalObj.hide()
            emit('cerrarModal')
        }
        console.log(props.modo);
    })

    function GuardarTODO() {
        modalObj.hide();
        emit('cerrarModal')
    }
    
    function Cerrar() {
        modalObj.hide();
        emit('cerrarModal')
    }

    function test() {
        console.log('test');
        listado.value = [{id: 1, nombre: 'Juan', apellido: 'Perez', correo: 'IAmJackex@gmail.com'},{id: 2, nombre: 'Juan', apellido: 'Perez', correo: 'IAmJackex@gmail.com'},
     {id: 3, nombre: 'Juan', apellido: 'Perez', correo: 'asdasdadasdasad@gmail.com'}, {id: 4, nombre: 'Juan', apellido: 'Perez', correo: 'asdasdadasdasad@gmail.com'}]
    }

</script>

  
<style scoped>
    h4, h5 {
      color: black;
    }
    .formulario {
      display: flex;
      flex-direction: column;
    }
</style>