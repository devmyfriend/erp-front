<template lang="">
    <div>
        <div class="frame">
            <h1>Datos generales</h1>
            <form>
               <fieldset>
                   <input 
                        v-model="idempresa" 
                        class="idEmpresa" 
                        type="text" 
                        name="idEmpresa" 
                        id="idEmpresa" 
                        placeholder="Id Empresa"
                        @input="actualizarValores"
                    />
                   <span class="logotipo">Logotipo</span>
                    <input 
                        class="imageLogo" 
                        type="file" 
                        name="logotipo" 
                        id="idLogotipo" 
                        accept="image/jpeg, image/png" 
                        @change="validarArchivo"
                    />
                    <!-- <div v-if="fileTypeError" style="color: red;">Formato de archivo no válido. Se aceptan solo archivos JPG y PNG.</div> -->
               </fieldset> 
               <fieldset>
                   <input 
                        v-model="rfc" 
                        class="rfc" 
                        type="text" 
                        name="RFC" 
                        id="idRFC" 
                        placeholder="R. F. C." 
                        required 
                        minlength=12 
                        maxlength=13
                        @input="actualizarValores" 
                    />
                   <input 
                        v-model="nombreoficial" 
                        class="nombreOficial" 
                        type="text" 
                        name="nombreOficial" 
                        id="idRazonSocial" 
                        placeholder="Razón Social"
                        @input="actualizarValores"
                    />
               </fieldset>
               <fieldset>
                    <label class="labelPais" for="pais">País</label>
                    <select class="pais" name="pais" id="idPais" v-model="pais" @change="actualizarValores">
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
                           @input="actualizarValores"
                    />
                    <label class="labelPersonas" for="personaMoral">Persona Moral</label>
                    <input class="Persona" 
                           type="radio" 
                           name="persona" 
                           id="idPersonaMoral" 
                           v-on:click="PersonaSelecionada(false)"
                           :value="personamoral"
                           @input="actualizarValores"
                    />
                    <input v-if="esextranjero" class="taxId" type="text" name="taxId" id="idTaxId" placeholder="Tax Id">
               </fieldset>
               <fieldset>
                    <select class="claveRegimenFiscal" name="claveRegimenFiscal" id="idClaveRegimenFiscal" @change="actualizarValores">
                        <option selected value="">Régimen Fiscal</option>
                        <option v-for="regimen in listaregimenes" :key="regimen.ClaveRegimenFiscal" :value="regimen.ClaveRegimenFiscal">{{regimen.Descripcion}}</option>
                    </select>
               </fieldset>
               <fieldset> 
                    <input class="nombreComercial" 
                           type="text" 
                           name="nombreComercial" 
                           id="idNombreComercial" 
                           placeholder="Nombre comercial" 
                           @input="actualizarValores"
                    />
               </fieldset>
               <hr>
               <h1>Domicilio</h1>
               <fieldset>
               <input v-model="calle" 
                      class="calleDomicilio" 
                      type="text" 
                      name="calleDomicilio" 
                      id="calleDomicilio" 
                      placeholder="Calle"
                      @input="actualizarValores"
                />
               <input v-model="noext" 
                      class="numExtDomicilio"
                      type="text"
                      name="numExtDomicilio" 
                      id="numExtDomicilio" 
                      placeholder="No. Ext." 
                      required
                      @input="actualizarValores"
                />
               <input v-model="noint" 
                      class="numIntDomicilio"
                      type="text"
                      name="numIntDomicilio" 
                      id="numIntdomicilio" 
                      placeholder="No. Int." 
                      required
                      @input="actualizarValores"
                />
               </fieldset>
               <fieldset>
                <input v-model="codigopostal" 
                       class="codigoPostal" 
                       type="text" 
                       name="codigoPostal" 
                       id="codigoPostal" 
                       placeholder="Código Postal"
                       @input="actualizarValores"
                 />
                <label class="labelEstados" for="estado">Estado</label>
                <select class="claveEstado" name="estado" id="idEstado" v-model="estado" @change="actualizarValores">
                    <option selected value="{{estado}}">{{estadonombre}}</option>
                    <!-- <option v-for="optEstado in ListaEstados" :key="optEstado.ClaveEstado" :value="optEstado.ClaveEstado">{{optEstado.Descripcion}}</option> -->
                </select>
               </fieldset>
               <fieldset>
                   <label class="labelMunicipio" for="municipio">Deleg./Municipio</label>
                   <select class="municipio" name="municipio" id="municipio" v-model="municipio" @change="actualizarValores">
                       <option selected value="{{municipio}}">{{municipionombre}}</option>
                       <!-- <option v-for="optMunicipio in ListaMunicipios" :key="optMunicipio.claveMunicipio" :value="optMunicipio.claveMunicipio">{{optMunicipio.Descripcion}}</option> -->
                   </select>   
               </fieldset>
               <fieldset>
                <label class="labelCiudad" for="ciudad">Ciudad</label>
                <select class="ciudad" name="ciudad" id="ciudad" v-model="ciudad" @change="actualizarValores">
                    <option selected value="{{ciudad}}">{{ciudadnombre}}</option>
                    <option value="1">Cancun</option>
                    <option value="2">Chetumal</option>
                    <option value="3">Playa del Carmne</option>
                    <option value="4">Cozumel</option>
                </select>
               </fieldset>

               <fieldset>
                <label class="labelColonia" for="colonia">Colonia</label>
                <select class="colonia" name="colonia" id="colonia" v-model="colonia" @change="actualizarValores">
                    <option selected value="{{colonia}}">{{colonianombre}}</option>
                    <option value="1">Colonia 1</option>
                    <option value="2">Colonia 2</option>
                    <option value="3">Colonia 3</option>
                    <option value="4">Colonia 4</option>
                </select>
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                        <path
                            d="M12 0C5.37097 0 0 4.92339 0 11C0 17.0766 5.37097 22 12 22C18.629 22 24 17.0766 24 11C24 4.92339 18.629 0 12 0Z"
                            fill="#999999" />
                        <path
                            d="M19.0179 9.03449H13.4732V3.37168C13.4732 2.67681 12.9214 2.11328 12.2411 2.11328H11.0089C10.3286 2.11328 9.77679 2.67681 9.77679 3.37168V9.03449H4.23214C3.55177 9.03449 3 9.59802 3 10.2929V11.5513C3 12.2462 3.55177 12.8097 4.23214 12.8097H9.77679V18.4725C9.77679 19.1674 10.3286 19.7309 11.0089 19.7309H12.2411C12.9214 19.7309 13.4732 19.1674 13.4732 18.4725V12.8097H19.0179C19.6982 12.8097 20.25 12.2462 20.25 11.5513V10.2929C20.25 9.59802 19.6982 9.03449 19.0179 9.03449Z"
                            fill="white" />
                    </svg>

                </a>
               </fieldset>
            </form>
        </div>
    </div>
</template>


<script>
import { ref, watch, computed, onMounted, effect } from 'vue'


const { useEmpresa } = require('../store/empresa')
const { useDomicilioSAT } = require('../store/domiciliosat')

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
        esextranjero:{
            type: Boolean,
            default: false,
            require: true
        },
        esnuevo:            Boolean,
        idempresa:{         
            type: String,
            default: '',
            require: false
        },
        nombrecomercial:    String,        
        nombreoficial:      String,
        pais:               String,
        paisnombre:         String,
        personafisca:       Boolean,
        personamoral:       Boolean,
        regimenfiscal:      String,
        rfc:                String,
        taxid:              String,

        calle:              String,
        ciudad:             String,
        ciudadnombre:       String,
        codigopostal:       String,
        colonia:            String,
        colonianombre:      String,
        estado:             String,
        estadonombre:       String,
        municipio:          String,
        municipionombre:    String,
        noext:              String,
        noint:              String,
        ListaPaises:        Array,
        listaregimenes:     Array,
    },
    emits:[
        'actualizarValores'
    ],
    
    
    setup( props, { emit } ){

        const descripcionregimen = ref( props.descripcionregimen )
        const esextranjero       = ref( props.esextranjero )
        const idempresa          = ref( props.idempresa )
        const ListaPaises        = ref( [])
        const listaregimenes     = ref( [] )
        const nombrecomercial    = ref( props.nombrecomercial )
        const nombreoficial      =  ref( props.nombreoficial )
        const pais               = ref( props.pais )
        const paisnombre         = ref( props.nombrepais )
        const personafisica      = ref( props.personafisca )
        const personamoral       = ref( props.personamoral )
        const regimenfiscal      = ref( props.regimenfiscal )
        const rfc                = ref( props.rfc )
        const taxid              = ref( props.taxid )

        const calle              = ref(props.calle)              
        const ciudad             = ref(props.ciudad)             
        const ciudadnombre       = ref(props.ciudadnombre)       
        const codigopostal       = ref(props.codigopostal)       
        const colonia            = ref(props.colonia)            
        const colonianombre      = ref(props.colonianombre)      
        const estado             = ref(props.estado)             
        const estadonombre       = ref(props.estadonombre)       
        const municipio          = ref(props.municipio)          
        const municipionombre    = ref(props.municipionombre)    
        const noext              = ref(props.noext)              
        const noint              = ref(props.noint)   
        
        const listadoestado      = ref( [] )

        // [Nota:]
        // Se comento para que el componente padre haga la creacion del store y el llenado

        const store = useEmpresa()
        const storeDomicilio = useDomicilioSAT()

        onMounted(() => {
            // store.cargarPaises().then(() => {
            //     ListaPaises.value = store.listapaises
            // })

            // store.cargarRegimenes().then(() => {
            //     listaregimenes.value = store.listaPFisica
            // })

            if( pais.value === 'MEX' ){
                esextranjero.value = false
            }

            ListaPaises.value = store.listapaises
            listaregimenes.value = store.listaPFisica
            listadoestado.value = storeDomicilio.listadoestado


        })

        const cargarPaises = computed( ()=> ListaPaises.value = store.listapaises )
        const cargarRegimenes = computed( ()=> ListaPaises.value = store.listaPFisica )



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

        const actualizarValores = ()=>{
            emit('actualizarValores',{
                calle           : calle.value,              
                ciudad          : ciudad.value,              
                ciudadnombre    : ciudadnombre.value,
                codigopostal    : codigopostal.value,       
                colonia         : colonia.value,
                colonianombre   : colonianombre.value,
                esextranjero    : esextranjero.value,
                estado          : estado.value,
                estadonombre    : estadonombre.value,       
                idempresa       : idempresa.value,
                municipio       : municipio.value,          
                municipionombre : municipionombre.value,     
                noext           : noext.value,
                noint           : noint.value,         
                nombrecomercial : nombrecomercial.value,
                nombreoficial   : nombreoficial.value,
                pais            : pais.value,
                paisnombre      : paisnombre.value,
                personafisica   : personafisica.value,
                personamoral    : personamoral.value,
                regimenfiscal   : regimenfiscal.value,
                rfc             : rfc.value,
                taxid           : taxid.value,
            })
        }


        
        

        // function validarArchivo( event ) {
        //     const archivo = event.target.files[0];
        //     const fileTypeError = document.getElementById('fileTypeError');
        //     console.log(fileTypeError)

        //     fileTypeError.style.display = 'none';

        //     if ( archivo ) {
        //         if (![ 'image/jpeg', 'image/png' ].includes( archivo.type ) ) {
        //             fileTypeError.style.display = 'block';
        //             event.target.value = '';
        //         }
        //     }
        // }

        
        return{
            esextranjero,
            idempresa,
            ListaPaises,
            listaregimenes,
            nombrecomercial,
            nombreoficial,
            pais,
            paisnombre,
            personafisica,
            personamoral,
            regimenfiscal,
            rfc,
            taxid,

            calle,              
            ciudad,             
            ciudadnombre,       
            codigopostal,       
            colonia,            
            colonianombre,      
            estado,             
            estadonombre,       
            municipio,          
            municipionombre,    
            noext,              
            noint,              

            listadoestado,

            actualizarValores,
            PersonaSelecionada,
            // validarArchivo,

        }

    }

}

</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';


.frame {
    align-items: left;
    // background-color: $panel;
    // height: 43.5rem;
    height: 38.5rem;
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
    width: 24.431875rem;
    color: #999999
}

select {
    color: #999999
}

option {
    color: #999999;
}
</style>