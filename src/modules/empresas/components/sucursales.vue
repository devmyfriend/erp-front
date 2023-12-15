<template>
    <div class="formularioSucursal">
        <div class="busqueda">
            <fieldset>
                <input type="text" placeholder="Buscar" class="buscar">
                <img class="icono" src="@/assets/img/plus.png" />
            </fieldset>
        </div>
        <div class="tablaDatos">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id Sucursal</th>
                        <th scope="col">Contacto</th>
                        <th scope="col">Domicilio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Juan Perez</td>
                        <td>Domicilio Conocido</td>
                        <td>
                            <span>
                                <img  class="icono" src="@/assets/img/edit-icon.png" />
                            </span>
                            <span>
                                <img  class="icono" src="@/assets/img/remove-icon.png" />
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> 
        <div class="salir">
            <button class="btn btn-save">Salir</button>
        </div>
    </div>
</template>

<script>





</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';   

.formularioSucursal {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 4.88875rem;
    padding: 0;
    text-align: left;
    width: 100%;
}

.busqueda{
    width: 100%;
}

.formularioSucursal input {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 0rem;
    margin-right: .5rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    padding: $padding-input;
    color: #999999
}

.buscar{
    width: 34.25rem;
    // display: inline-block;
}

.tablaDatos{
    // display: inline-block;
    width: 100%;
    padding-right: 3.7rem;
    margin-top: 0.5rem;

}
.salir{
    width: 50%;
    text-align: center;
    position: absolute;
    bottom: 2.5rem;
}
.salir button{
    width: 9.375rem;
    height: 2.0875rem;
}

.icono {
  width: 1.5rem;
}
.alerta{
  color:red;
  font-weight: 600;
}
h5,p{
  color:black;
}



</style>