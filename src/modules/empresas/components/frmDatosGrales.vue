<template lang="">
    <div>
        <div class="frame">
            <h1>Datos generales</h1>
            <form>
               <fieldset>
                   <input v-model="idempresa" class="idEmpresa" type="text" name="idEmpresa" id="idEmpresa" placeholder="Id Empresa">
                   <span class="logotipo">Logotipo</span>
                    <input class="imageLogo" type="file" name="logotipo" id="idLogotipo" accept="image/jpeg, image/png" @change="validateFile">
                    <div v-if="fileTypeError" style="color: red;">Formato de archivo no válido. Se aceptan solo archivos JPG y PNG.</div>
               </fieldset> 
               <fieldset>
                   <input v-model="rfc" class="rfc" type="text" name="RFC" id="idRFC" placeholder="R. F. C." required minlength=12 maxlength=13 />
                   <input v-model="nombreoficial" class="nombreOficial" type="text" name="nombreOficial" id="idRazonSocial" placeholder="Razón Social">
               </fieldset>
               <fieldset>
                    <label class="labelPais" for="pais">País</label>
                    <select class="pais" name="pais" id="idPais" v-model="pais">
                        <option selected value=""></option>
                        <option v-for="optPais in ListaPaises" :key="optPais.ClavePais"  :value="optPais.ClavePais">{{optPais.Descripcion}}</option>
                    </select>
               </fieldset>
               <fieldset>
                    <label class="labelPersonas" for="personaFisica">Persona Fisica</label>
                    <input class="Persona" 
                           type="radio" 
                           name="persona" 
                           id="idPersonaFisica"
                           v-on:click="PersonaSelecionada(true)" 
                           :checked="personafisica"
                           
                    >
                    <label class="labelPersonas" for="personaMoral">Persona Moral</label>
                    <input class="Persona" 
                           type="radio" 
                           name="persona" 
                           id="idPersonaMoral" 
                           v-on:click="PersonaSelecionada(false)"
                           :value="personamoral"
                           
                    >
                    <input v-if="esextranjero" class="taxId" type="text" name="taxId" id="idTaxId" placeholder="Tax Id">
               </fieldset>
               <fieldset>
                    <select class="claveRegimenFiscal" name="claveRegimenFiscal" id="idClaveRegimenFiscal">
                        <option selected value="">Régimen Fiscal</option>
                        <option v-for="regimen in listaregimenes" :key="regimen.ClaveRegimenFiscal" :value="regimen.ClaveRegimenFiscal">{{regimen.Descripcion}}</option>
                    </select>
               </fieldset>
               <fieldset> 
                    <input class="nombreComercial" type="text" name="nombreComercial" id="idNombreComercial" placeholder="Nombre comercial">
               </fieldset>

               <hr>
               <h1>Domicilio</h1>
               <fieldset>
               <input v-model="idempresa" class="calleDomicilio" type="text" name="calleDomicilio" id="calleDomicilio" placeholder="Calle">
               <input v-model="numExtDomicilio" class="numExtDomicilio" type="text" name="numExtDomicilio" id="numExtDomicilio" placeholder="No. Ext." required/>
               <input v-model="numIntDomicilio" class="numIntDomicilio" type="text" name="numIntDomicilio" id="numIntdomicilio" placeholder="No. Int." required/>
               </fieldset>
               <fieldset>
               <input v-model="codigoPostal" class="codigoPostal" type="text" name="codigoPostal" id="codigoPostal" placeholder="Código Postal"/>
               <label class="labelEstados" for="estado">Estado</label>
               <select class="claveEstado" name="estado" id="idEstado" v-model="estado">
                        <option selected value="">Estado</option>
                        <option v-for="optEstado in ListaEstados" :key="optEstado.ClaveEstado" :value="optEstado.ClaveEstado">{{optEstado.Descripcion}}</option>
                    </select>
            </fieldset>

                <label class="labelMunicipio" for="municipio">Deleg./Municipio</label>
                <select class="municipio" name="municipio" id="municipio">
                    <option selected value="">Municipio</option>
                    <option v-for="optMunicipio in ListaMunicipios" :key="optMunicipio.claveMunicipio" :value="optMunicipio.claveMunicipio">{{optMunicipio.Descripcion}}</option>
                </select>

               <fieldset>
                <label class="labelCiudad" for="ciudad">Ciudad</label>
                <select class="ciudad" name="ciudad" id="ciudad">
                <option selected value=""></option>
                <option value=""></option>
            </select>
               </fieldset>

               <fieldset>
                <label class="labelColonia" for="colonia">Colonia</label>
                <select class="colonia" name="colonia" id="colonia">
                <option selected value=""></option>
                <option value=""></option>
            </select>
               </fieldset>

            </form>
        </div>
    </div>
</template>


<script>
import { ref, watch, computed, onMounted } from 'vue'

const { useEmpresa } = require('../store/empresa')

function validateFile(event) {
    const file = event.target.files[0];
    const fileTypeError = document.getElementById('fileTypeError');

    if (file) {
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            fileTypeError.style.display = 'block';
            event.target.value = '';
        } else {
            fileTypeError.style.display = 'none';
        }
    }
}

export default {

    name: 'frmDatosGrenerales',
    props:{
        descripcionregimen: String,
        esextranjero:       Boolean,
        esnuevo:            Boolean,
        idEmpresa:          String,
        nombrecomercial:    String,        
        nombreoficial:      String,
        pais:               String,
        paisnombre:         String,
        personafisca:       Boolean,
        personamoral:       Boolean,
        regimenfiscal:      String,
        rfc:                String,
        taxid:              String,
    },

    
    
    setup( props ){

        const descripcionregimen = ref( props.descripcionregimen )
        const esextranjero       = ref( props.esextranjero )
        const idempresa          = ref( props.idEmpresa )
        const ListaPaises        = ref( [] )
        const listaregimenes     = ref( [])
        const nombrecomercial    = ref( props.nombrecomercial )
        const nombreoficial      =  ref( props.nombreoficial )
        const pais               = ref( props.pais )
        const paisnombre         = ref( props.nombrepais )
        const personafisica      = ref( props.personafisca )
        const personamoral       = ref( props.personamoral )
        const regimenfiscal      = ref( props.regimenfiscal )
        const rfc                = ref( props.rfc )
        const taxid              = ref( props.taxid )

        const store = useEmpresa()

        onMounted(() => {
            //listaregimenes.value = ListaRegimenFiscales.filter( regimen => regimen.Fisica === 1)


            store.cargarPaises().then(() => {
                ListaPaises.value = store.listapaises

            })

            store.cargarRegimenes().then(() => {
                listaregimenes.value = store.listaPFisica

            })


        })



        const PersonaSelecionada = (valor) => {
            personafisica.value = valor
            personamoral.value = !personafisica.value

        }

        watch( pais, ( pais ) => {
            esextranjero.value = false
            if( pais.length>0 && pais!=='MEX' ){
                esextranjero.value = !esextranjero.value
                personafisica.value = true
            }
        })

        watch( personafisica, ( fisica )=>{
            
            if(fisica){
                listaregimenes.value = store.listaPFisica
            }else{
                listaregimenes.value = store.listaPMoral
            }
        })
        
        return{
            esextranjero,
            idempresa,
            ListaPaises,
            listaregimenes,
            nombrecomercial,
            nombreoficial,
            pais,
            personafisica,
            personamoral,
            regimenfiscal,
            rfc,
            taxid,


            PersonaSelecionada,

        }

    }

}

</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';


.frame {
    align-items: left;
    // background-color: $panel;
    height: 43.5rem;
    padding: 1.5rem 1.5rem 0rem 1.5rem;
    text-align: left;
    width: 40.93rem;
}

h1 {
    color: #fff;
    font-size: 2rem;
    text-align: left;
}

fieldset {
    margin-top: .5rem;
    margin-bottom: .5rem;
}

.idEmpresa {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    padding: $padding-input;
    width: 9.0625rem;
    color: #999999
}

.logotipo {
    font-size: 1.125rem;
    margin-left: .5rem;
    margin-right: .5rem;
}

.rfc {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    padding: $padding-input;
    width: 9.0625rem;
    color: #999999
}

.nombreOficial {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 26.9999rem;
    color: #999999
}

.labelPais {
    font-size: 1.125rem;
    margin-left: .5rem;
    margin-right: 6.3125rem;
}

.pais {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: .5rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 26.9999rem;
    color: #999999;
}

.labelPersonas {
    margin-right: 2.0625rem;
}

.labelEstados {
    font-size: 1.125rem;
    margin-left: .5rem;
    margin-right: .5rem;
}

.taxId {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    padding: $padding-input;
    width: 9.0625rem;
    color: #999999;
}

.Persona {
    margin-right: .5rem;
    width: 1.01rem;
}

.claveRegimenFiscal {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 36.55rem;
    color:#999999
}

.nombreComercial{
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 36.55rem;
    color:#999999
}

.calleDomicilio {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 19.125rem;
    color: #999999
}

.numExtDomicilio {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 8.0625rem;
    color: #999999
}

.labelEstados {
    font-size: 1.125rem;
    margin-left: .5rem;
    margin-right: .5rem;
}

.claveEstado {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 22.72rem;
    color: #999999
}

.numIntDomicilio {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 8.0625rem;
    color: #999999
}

.codigoPostal {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    padding: $padding-input;
    width: 9.0625rem;
    color: #999999
}

.labelMunicipio {
    font-size: 1.125rem;
    margin-right: 0.65rem;
}

.municipio {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 26.80rem;
    color: #999999
}

.labelCiudad {
    font-size: 1.125rem;
    margin-right: 5.4rem;
}

.ciudad {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 26.80rem;
    color: #999999
}

.labelColonia {
    font-size: 1.125rem;
    margin-right: 5.2rem;
}

.colonia {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 26.80rem;
    color: #999999
}

select{
    color: #999999
}

.claveEstado {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 22.72rem;
    color: #999999
}

.nombreComercial {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 36.55rem;
    color: #999999
}

.calleDomicilio {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 19.125rem;
    color: #999999
}

.numExtDomicilio {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 8.0625rem;
    color: #999999
}



.numIntDomicilio {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 8.0625rem;
    color: #999999
}

.codigoPostal {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    padding: $padding-input;
    width: 9.0625rem;
    color: #999999
}

.labelMunicipio {
    font-size: 1.125rem;
    margin-right: 0.65rem;
}

.municipio {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 26.80rem;
    color: #999999
}

.labelCiudad {
    font-size: 1.125rem;
    margin-right: 5.4rem;
}

.ciudad {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 26.80rem;
    color: #999999
}

.labelColonia {
    font-size: 1.125rem;
    margin-right: 5.2rem;
}

.colonia {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 26.80rem;
    color: #999999
}

select {
    color: #999999
}

option {
    color: #999999;
}
</style>