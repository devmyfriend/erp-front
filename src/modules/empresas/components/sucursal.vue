<template>
    <div>
        <div class="encabezado">
            <div class="titulo">
                <h2>Surcursal</h2>
            </div>
            <div class="cerrar">
                <button class="btnCerrar">X</button>
            </div>
        </div>
        <div class="formulario">
            <fieldset>
                <div class="labels">
                    <label for="">Nombre del reponsable</label>
                    <img src="" alt="Agregar">
                </div>
                <select name="sltNombreResponsable" id="idNombreResponsable">
                    <option value="" selected>Nombre del responsable</option>
                </select>
            </fieldset>
            <fieldset>
                <label for="">Domicilio</label><br>
                <input type="text" name="txtColonia" id="idColonia" placeholder="Plaza, Av. etc." />
            </fieldset>
            <fieldset>
                <inpit type="text" name="txtCalle" id="idCalle" placerholer="Calle" />
                <inpit type="text" name="txtNoExt" id="idNoExt" placerholer="No. Ext." />
                <inpit type="text" name="txtNoInt" id="idNoInt" placerholer="No. int." />
            </fieldset>
            <fieldset>
                <div class="codigopostal">
                    <label for="">Código Postal</label>
                    <input type="text" name="txtCodigoPostal" id="idCodigoPostal" placeholder="Código Postal">
                </div>
                <div class="estado">
                    <label for="">Estado</label>
                    <input type="text" name="txtEstado" id="idEstado" placeholder="Estado">
                </div>
            </fieldset>
            <fieldset>
                <div class="codigopostal">
                    <label for="">Municipio</label>
                    <input type="text" name="txtMunicipio" id="idMunicipio" placeholder="Municipio">
                </div>
                <div class="estado">
                    <label for="">Localidad</label>
                    <input type="text" name="txtLocalidad" id="idLocalidad" placeholder="Localidad">
                </div>
            </fieldset>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

@import '../../../styles/variables.scss';    
.frame{
        background-color: $panel;
        height: 50.875rem;
        margin: 1.5rem ;
        padding:  0 0.625rem 0 0.625rem;
        width: 82.9375rem;
}

.enccabezado{
    display: flex;
}
.titulo{
    width: 50%;
    display: inline-block;
    text-align: left;
    padding: 1.5rem;
    color: #000;
}
.cerrar{
    width: 50%;
    display: inline-block;
    text-align: right;
    padding: 1.5rem;
}

.btncCerrar{
    background-color: #fff;
    color: $panel;
    width: 2.625rem;
    height: 2.1875rem;
    border-radius: 0;
    font-size: 2rem;

}

</style>