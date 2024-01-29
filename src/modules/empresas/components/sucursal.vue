<template>
    <div class="formularioSucursal">
        <form @submit.prevent="guardar()">
            <fieldset>
                <!-- <label for="">Nombre de la sucursal</label> <br> -->
                <input v-model="nombresucursal" class="nombreSucursal" type="text" name="txtCalle" id="idCalle" placeholder="Nombre de Sucursal">
            </fieldset>
            <fieldset>
                <!-- <label for="">Nombre del responsable</label> -->
                <select v-model="responsable" class="responsableSucursal" name="txtResponsable" id="idResponsable">
                    <option value="">Nombre del responsable</option>
                </select>
            </fieldset>
            <fieldset>
                <label for="">Domicilio</label> <br>
                <input v-model="calle" class="calleSucursal" type="text" name="txtCalle" id="idCalle" placeholder="Calle">
                <input v-model="noext" class="noextintSucursal" type="text" name="txtNoExt" id="idNoExt" placeholder="No. Ext">
                <input v-model="noint" class="noextintSucursal" type="text" name="txtNoInt" id="idNoInt" placeholder="No. Int">
                <!-- <select v-model="colonia" class="responsableSucursal" name="txtResponsable" id="idResponsable">
                    <option value="" selected>Colonia</option>
                    <option value="0215">Supermanzana 24</option>
                    <option value="0216">Supermanzana 25</option>
                    <option value="0214">Supermanzana 26</option>
                    <option value="0217">Supermanzana 27</option>
                    <option value="0474">Supermanzana 28</option>
                    <option value="0219">Supermanzana 30</option>
                    
                </select> <br> -->
                <input class="responsableSucursal" type="text" placeholder="Colonia">
            </fieldset>
            <fieldset>
                <div class="grupoField">
                    <!-- Código Postal -->
                    <input v-model="codigopostal" class="codigoPostal" type="test" name="txtCodigoPostal" placeholder="Código Postal">
                </div>
                <div class="grupoField">
                    <!-- Estado -->
                    <!-- <select v-modal="estado" class="estadoSucursal" name="txtEstado" id="idEstado">
                        <option value="" selected>Estado</option>
                        <option value="ROO">Quintana Roo</option>
                    </select> -->
                    <input class="estadoSucursal" type="text" placeholder="Estado" name="txtEstado" id="estado">
                </div>
            </fieldset>
            <fieldset>
                <div class="grupoField">
                    <!-- Municipio -->
                    <!-- <select v-modal="municipio" class="municipioSucursal" name="txtEstado" id="idEstado">
                        <option value="" selected>Municipio</option>
                        <option value="005">Benito Juarez</option>
                    </select> -->
                    <input class="municipioSucursal" type="text" placeholder="Municipio" name="txtMunicipio" id="idMunicipio">
                </div>
                <div class="grupoField">
                    <!-- Localidad -->
                    <!-- <select v-modal="ciudad" class="ciudadSucursal" name="txtEstado" id="idEstado">
                        <option value="" selected>Ciudad</option>
                        <option value="01">Cancun</option>
                    </select> -->
                    <input class="ciudadSucursal" type="text" placeholder="Ciudad" name="txtCiudad" id="idCiudad">
                </div>
            </fieldset>
            <fieldset style="margin-top: 1.5rem;">
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
            <div class="botones">
                <button class="btn btn-save" @click="guardar"> Guardar</button>
                <button class="btn btn-danger">Cancelar</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import Telefonos from '@/shared/datosTabla.vue'
import Emails from '@/shared/datosTabla.vue'

import { useSucursal } from '../store/surcursal'

export default {
    components:{
        Emails,
        Telefonos,
    },
    props:{
        idempresa: Number,
    },
    setup ( props ) {

        const listaemails   = ref( [] )
        const listatelfonos = ref( [] )
        const tablaemail    = ref('correo')
        const tablatelfono  = ref( 'telefono' )
        
        const idempresa      = ref ( props.idempresa )
        const nombresucursal = ref ('')
        const calle          = ref ('')
        const noext          = ref ('')
        const noint          = ref ('')
        const colonia        = ref ('')
        const codigopostal    = ref ('')
        const estado         = ref ('')
        const municipio      = ref ('')
        const ciudad         = ref ('')
        const responsable    = ref ('')
        
        listatelfonos.value=[{
            index    : 1,
            telefono : '998809203'}
        ]

        listaemails.value=[{
            index:1,
            email:'horaciohdez@gmail.com'
        }]

        const storeScursal = useSucursal()

        const guardar = ()=>{
            const datos ={
                Sucursal:{
                    idempresa,
                    nombresucursal,
                    CreadoPor: 1
                },
                datos:{
                    calle,
                    ciudad,
                    codigopostal,
                    colonia,
                    estado,
                    municipio,
                    noext,
                    noint,
                    pais: 'MEX',
                }
            }

            const data = storeScursal.crearSucursal( datos )

        }

        return {

            calle,
            ciudad,
            codigopostal,
            colonia,
            estado,
            municipio,
            noext,
            noint,
            nombresucursal,
            responsable,

            listaemails,
            listatelfonos,
            tablaemail,
            tablatelfono,
            
            guardar,

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

.nombreSucursal{
    width: 37.8125rem;
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

.botones {
    width: 100%;
    height: 5.75rem;
    padding-top: 1.8125rem;
    text-align: center;
}

button {
    width: 9.375rem;
    height: 2.1875rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: auto;
    margin-bottom: auto;
}
</style>