<template>
    <div class="formularioSucursal">
        <form>
            <fieldset>
                <label for="">Nombre del responsable</label>
                <select class="responsableSucursal" name="txtResponsable" id="idResponsable">
                    <option va lue="">Nombre del responsable</option>
                </select>
            </fieldset>
            <fieldset>
                <label for="">Domicilio</label> <br>
                <input class="calleSucursal" type="text" name="txtCalle" id="idCalle" placeholder="Calle">
                <input class="noextintSucursal" type="text" name="txtNoExt" id="idNoExt" placeholder="No. Ext">
                <input class="noextintSucursal" type="text" name="txtNoInt" id="idNoInt" placeholder="No. Int">
                <input class="coloniaSucursal" type="text" name="txtColonia" id="idColonia"
                    placeholder="Colonia"> <br>
            </fieldset>
            <fieldset>
                <div class="grupoField">
                    Código Postal
                    <input class="codigoPostal" type="test" name="txtCodigoPostal" placeholder="Código Postal">
                </div>
                <div class="grupoField">
                    Estado
                    <select class="estadoSucursal" name="txtEstado" id="idEstado">
                        <option value="">Estado</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div class="grupoField">
                    Municipio
                    <select class="municipioSucursal" name="txtEstado" id="idEstado">
                        <option value="">Municipio</option>
                    </select>
                </div>
                <div class="grupoField">
                    Localidad
                    <select class="ciudadSucursal" name="txtEstado" id="idEstado">
                        <option value="">Ciudad</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <Telefonos
                    :Lista="listatelfonos"
                    :tipoTabla="tablatelfono"
                ></Telefonos>
            </fieldset>
            <fieldset>
                <Emails
                    :Lista="listaemails"
                    :tipoTabla="tablaemail"
                >
                </Emails>
            </fieldset>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import Telefonos from '@/shared/datosTabla.vue'
import Emails from '@/shared/datosTabla.vue'

export default {
    components:{
        Emails,
        Telefonos,
    },
    
    setup () {

        const listaemails = ref( [] )
        const listatelfonos     = ref( [] )
        const tablaemail = ref('correo')
        const tablatelfono = ref( 'telefono' )
        
        
        listatelfonos.value=[{
            index    : 1,
            telefono : '998809203'}
        ]

        listaemails.value=[{
            index:1,
            email:'horaciohdez@gmail.com'
        }]

        return {

            listaemails,
            listatelfonos,
            tablaemail,
            tablatelfono,
            

        }
    }
}
</script>

<style lang="scss" scoped>

@import '../../../styles/variables.scss';    

.formularioSucursal {
    display: flex;
    margin-bottom: 1.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-top: 4.88875rem;
    padding: 0;
    text-align: left;
    width: 100%;
}

select {
    height: 2.02375rem;
    padding: $padding-input;
    border-radius: $radius;
    border: none;
    color: #999999;
}

.responsableSucursal {
    width: 37.8125rem;
    margin-top: .5rem;
    // height: 2.02375rem;
    // padding: $padding-input;
    // border-radius: $radius;
    // border: none;
    // color: #999999;

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

.coloniaSucursal {
    width: 37.8125rem;
}

.calleSucursal {
    width: 18.75rem;
}

.noextintSucursal {
    width: 8.991rem;
    // margin-left: 8px;
    // margin-right: 8px;
}

.grupoField {
    width: 50%;
    float: left;
}

.codigoPostal {
    width: 18.75rem;
}

.estadoSucursal, .municipioSucursal, .ciudadSucursal {
    width: 17.45rem;
    margin-top: .5rem;

}
</style>