<template>
    <div class="frame">
        <h1>Datos generales</h1>
            <form>
               <fieldset>
                   <input v-model="idempresa" class="idEmpresa" type="text" name="idEmpresa" id="idEmpresa" placeholder="Id Empresa">
                   <span class="logotipo">Logotipo</span>
                   <input class="imageLogo" type="file" name="logotipo" id="idLogotipo">
               </fieldset> 
               <fieldset>
                   <input v-model="rfc" class="rfc" type="text" name="RFC" id="idRFC" placeholder="R. F. C." />
                   <input v-model="nombreoficial" class="nombreOficial" type="text" name="nombreOficial" id="idRazonSocial" placeholder="Razón Social">
               </fieldset>
               <fieldset>
                    <label class="labelPais" for="pais">País</label>
                    <select class="pais" name="pais" id="idPais" v-model="pais">
                        <option selected value=""></option>
                        <option value="MEX">Mexico</option>
                        <option value="USA">Estados Unidos</option>
                        <option value="CAN">Canada</option>
                    </select>
               </fieldset>
               <fieldset>
                    <label class="labelPersonas" for="personaFisica">Persona Fisica</label>
                    <input class="Persona" 
                           type="radio" 
                           name="persona" 
                           id="idPersonaFisica"
                           v-on:click="PersonaSelecionada(true)" 
                    >
                    <label class="labelPersonas" for="personaMoral">Persona Moral</label>
                    <input class="Persona" 
                           type="radio" 
                           name="persona" 
                           id="idPersonaMoral" 
                           v-on:click="PersonaSelecionada(false)"
                    >
                    <input v-if="esextrangejo" class="taxId" type="text" name="taxId" id="idTaxId" placeholder="Tax Id">
               </fieldset>
               <fieldset>
                    <select class="claveRegimenFiscal" name="claveRegimenFiscal" id="idClaveRegimenFiscal">
                        <option selected value="">Régimen Fiscal</option>
                        <option value="">Régimen General de Ley para las personas morales</option>
                        <option value="">Régimen General de ley para las personas fisicas con activadad empresarial</option>
                        <option value="">Sin obligaciones</option>
                    </select>
               </fieldset>
               <fieldset>
                    <input class="nombreComercial" type="text" name="nombreComercial" id="idNombreComercial" placeholder="Nombre comercial">
               </fieldset>
            </form>
        
        
    </div>
</template>

<script>

import { ref, watch } from 'vue'


export default{

    name: 'frmDatosGrenerales',
    props:{
        esnuevo:         Boolean,
        idEmpresa:       String,
        nombrecomercial: String,        
        nombreoficial:   String,
        pais:            String,
        personafisca:    Boolean,
        personamoral:    Boolean,
        regimenfiscal:   String,
        rfc:             String,
        taxid:           String,
    },

    
    
    setup( props ){
        const esextrangejo    = ref( false )
        const idempresa       = ref('')
        const nombrecomercial = ref( '' )
        const nombreoficial   =  ref('')
        const pais            = ref('')
        const personafisica   = ref( true )
        const personamoral    = ref( false )
        const regimenfiscal   = ref( '' )
        const rfc             = ref('')
        const taxid           = ref( '' )


        const PersonaSelecionada = (valor)=>{
            personafisica.value = valor
            personamoral.value = !personafisica.value
        }

        watch( pais, ( pais ) => {
            esextrangejo.value = false
            if( pais.length > 0 && pais!=='MEX' ){
                console.log(`Pais seleccionado ${ pais }`)
                esextrangejo.value = !esextrangejo.value
            }
        })

        

        return{
             esextrangejo,
             idempresa,
             nombrecomercial,
             nombreoficial,
             pais,
             personafisica,
             personamoral,
             regimenfiscal,
             rfc,
             taxid,

             PersonaSelecionada
        }

    }

}


</script>

<style scoped lang="scss">

@import '../../../styles/variables.scss';

    .frame{
        align-items: left;
        background-color: $panel;
        height: 43.5rem;
        padding: 1.5rem 1.5rem 0rem 1.5rem;
        text-align: left;
        width: 40.93rem;
    }

    h1{
        color: #fff;
        font-size: 2rem;
        text-align: left;
    }

    fieldset{
        margin-top: .5rem;
        margin-bottom: .5rem;
    }

    .idEmpresa{
        border-radius: $radius;
        border: none;
        height: 2.02375rem;
        padding: $padding-input;
        width: 9.0625rem;
        color:#999999
    }

    .logotipo{
        font-size: 1.125rem;
        margin-left: .5rem;
        margin-right: .5rem;
    }

    .rfc{
        border-radius: $radius;
        border: none;
        height: 2.02375rem;
        padding: $padding-input;
        width: 9.0625rem;
        color:#999999
    }

    .nombreOficial{
        border-radius: $radius;
        border: none;
        height: 2.02375rem;
        margin-left: 8px;
        margin-right: 8px;
        padding: $padding-input;
        width: 26.9999rem;
        color:#999999
    }

    .labelPais{
        font-size: 1.125rem;
        margin-left: .5rem;
        margin-right: 6.3125rem;
    }
    .pais{
        border-radius: $radius;
        border: none;
        height: 2.02375rem;
        margin-left: .5rem;
        margin-right: .5rem;
        padding: $padding-input;
        width: 26.9999rem;
        color: #999999;
    }

    .labelPersonas{
        margin-right: 2.0625rem;
    }

    .taxId{
        border-radius: $radius;
        border: none;
        height: 2.02375rem;
        padding: $padding-input;
        width: 9.0625rem;
        color: #999999;
    }

    .Persona{
        margin-right: .5rem;
        width: 1.01rem;
    }

    .claveRegimenFiscal{
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

    select{
        color: #999999
    }
    
    option{
        color: #999999;
    }


</style>