<!-- 
    script setup
   
   
    const props = defineProps({
  mensaje: {
    type: String,
    required: true
  }
});


import { defineEmits } from 'vue';
const emit = defineEmits();
const enviarEvento = () => {
  emit('evento-enviado', { mensaje: '¡Evento enviado desde el hijo!' });
};

 -->

 <!-- props necesarios: -->
    <!-- 
    "encabezados": array de objetos
    "registros": array de objetos
    "cantidadRegistros": number
    "acciones": number (0 sin acciones, 1 solo editar, 2 eliminar y editar)
    "pBusqueda" Bool //Recibe una flag (bool) para que se actualicen los datos de la tabla, cargando los registros desde el state
    "pAccion" Bool//Recibe una flag (bool) para que se actualicen los datos de la tabla, cargando los registros desde el state
    "pRegistroNuevo" Object //Recibe un objeto con el registro temporal
    "pSaveAll" Bool //Recibe una flag (bool) para que se guarden los registros temporales nuevos en la BD (y se borre ese array temporal)
    -->

  <!-- Emits necesarios  -->
    <!-- 
        "eAccion" // Emite un evento con: El ID del registro a gestionar, una opcion (int) para decidir si edita o elimina
        "eDesactivarRegistroNuevo" // Emite un evento para desactivar la flag de registro nuevo
        "eDesactivarBusqueda" // Emite un evento para desactivar la flag de busqueda
        "eDesactivarAccion" // Emite un evento para desactivar la flag de accion
        "eDesactivarSaveAll" // Emite un evento para desactivar la flag de saveAll. Además envía un bool de resultado, si se guardó o no.
    -->

  <!-- Acciones de la tabla -->
    
    <!-- 
    * Debe pintar los registros y encabezados recibidos
    * Dependiendo de [cantidadRegistros] debe limitar el scroll infinito
    * Dependiendo de [acciones] debe pintar botones de editar y/o eliminar
    * Agregar al [arrayTemporal] los registros nuevos
    * Fusionar [registros] con [arrayTemporal] para crear [registrosFinales] y pintar este array en la tabla

    -->


    <!-- Debe manejar 3 listas de registros:
        *La original con los registros en BD
        *El [arrayTemporal] que se pinta en la tabla:
            *Se compone de:
                La original (props.registros)
                Los registros temporales que se agregan o eliminan (arrayTemporal)
                La lista final con ambos registros (registrosFinales)
    -->