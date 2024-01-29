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
                        required
                        @input="actualizarValores"
                    />
               </fieldset>
               <fieldset>
                    <label class="labelPais" for="pais">País</label>
                    <select class="pais" name="pais" id="idPais" v-model="pais" @change="actualizarValores">
                        <!-- <option selected value="MEX">México</option> --> 
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
                    <select class="claveRegimenFiscal" name="claveRegimenFiscal" v-model="regimenfiscal" id="idClaveRegimenFiscal" @change="actualizarValores">
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
                           v-model="nombrecomercial"
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
                <input class="estado" type="text" name="estasdo" id="estado" placeholder="Estado">
               </fieldset>
               <fieldset>
                   <label class="labelMunicipio" for="municipio">Deleg./Municipio</label>
                   <input class="municipio" type="text" name="municipio" id="municipio" placeholder="Municipio">
               </fieldset>
               <fieldset>
                <label class="labelCiudad" for="ciudad">Ciudad</label>
                <input class="ciudad" type="text" name="ciudad" id="ciudad" placeholder="Ciudad">
               </fieldset>
               <fieldset v-if="!nuevaColonia">
                <label class="labelColonia" for="colonia">Colonia</label>
                <input class="colonia" type="text" name="colonia" id="colonia" placeholder="Colonia">
               </fieldset>
            </form>
        </div>
    </div>
</template>


<script>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia';


const { useEmpresa } = require('../store/empresa')
const { useDomicilioSAT } = require('../store/domiciliosat')

// function validateFile(event) {
//     const file = event.target.files[0];
//     const fileTypeError = document.getElementById('fileTypeError');

//     if (file) {
//         if (!['image/jpeg', 'image/png'].includes(file.type)) {
//             fileTypeError.style.display = 'block';
//             event.target.value = '';
//         } else {
//             fileTypeError.style.display = 'none';
//         }
//     }
// }

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

        listaestados:       Array,
    },
    emits:[
        'actualizarValores'
    ],
    
    
    setup( props, { emit } ){


        
        const descripcionregimen = ref( props.descripcionregimen )
        const esextranjero       = ref( props.esextranjero )
        const idempresa          = ref( props.idempresa )
        const ListaPaises        = ref( props.ListaPaises ) 
        const listaregimenes     = ref( props.listaregimenes )
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
        
        const listadoestado      = ref( props.listaestados )
        const listamunicipio     = ref( [] )
        const listalocalidad     = ref( [] )
        const listacolonias      = ref( [] )

        const nuevaColonia       = ref( false )

        // [Nota:]
        // Se comento para que el componente padre haga la creacion del store y el llenado

        const storeEmpresa = useEmpresa()
        const storeDomicilio = useDomicilioSAT()

        const { Estado } = storeToRefs( storeDomicilio ) 

        // const cargarPaises = computed( ()=> ListaPaises.value = store.listapaises )
        // const cargarRegimenes = computed( ()=> ListaPaises.value = store.listaPFisica )

        // onMounted(() => { 

            // if( pais.value === 'MEX' ){
            //     esextranjero.value = false
            // }

        //     // ListaPaises.value = store.listapaises
        //     // listaregimenes.value = store.listaPFisica
        //     // listadoestado.value = storeDomicilio.Estado( pais.value )  

        //     // console.log(listadoestado)

            // cargarPaises()
        //     cargarRegimenes()


        // })

        onMounted(()=>{
            cargarPaises()
            cargarEstados()
        })
        
        const cargarPaises = ()=>{
            ListaPaises.value = storeEmpresa.listapaises
            // console.log('se cargo paises')
            // console.log(ListaPaises.value)
        }

        const cargarEstados= ()=>{
            listadoestado.value = storeDomicilio.Estado( pais.value )
        }
        

        const PersonaSelecionada = (valor) => {
            personafisica.value = valor
            personamoral.value = !personafisica.value
        }

        const nuevacolonia = ()=>{
            nuevaColonia.value = true
        }

        const cerrarcolonia = ()=>{
            nuevaColonia.value = false
        }

        watch( pais, ( pais ) => {
            esextranjero.value = false
            if( pais.length>0 && pais!=='MEX' ){
                esextranjero.value = !esextranjero.value
                personafisica.value = true
                // listadoestado.value = Estado( pais ) 
            }
        })

        watch( personafisica, ( fisica )=>{
            
            if(fisica){
                // console.log(store.listaPFisica)
                console.log('persona fisica')
                listaregimenes.value = storeEmpresa.listaPFisica

            }else{
                console.log('persona moral')
                listaregimenes.value = storeEmpresa.listaPMoral
            }
        }) 

        // watch(estado,( estado )=>{
            
        //     if( estado.length > 0 &&  estado != '' ){
        //         storeDomicilio.cargarMunicipio( estado ).then(()=>{
        //             listamunicipio.value = storeDomicilio.listaMunicipios 
        //         })
    
        //         storeDomicilio.cargarLocalidad( estado ).then(()=>{
        //             listalocalidad.value = storeDomicilio.listadoLocalidades 
        //         })
        //     }

        // })

        watch( codigopostal, ( codigopostal )=>{
            // if( codigopostal.length === 5 ){ 
            //     storeDomicilio.cargarColonia( codigopostal ).then( ()=>{
            //         listacolonias.value = storeDomicilio.listadoColonias
            //     })
            // } 
                if( codigopostal.length === 5 ){
                    storeDomicilio.cargarDatosGrales( codigopostal, estado.value).then(()=>{
                        listamunicipio.value = storeDomicilio.listaMunicipios
                        listalocalidad.value = storeDomicilio.listadoLocalidades
                        listacolonias.value = storeDomicilio.listadoColonias
                        console.log(listacolonias)
                    })
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

        // const guardar= ()=>{
        //     const datos = {
        //         Entidad:{
                    
        //             ClavePais:          pais.value,
        //             ClaveRegimenFiscal: regimenfiscal.value,
        //             NombreComercial:    nombrecomercial.value,
        //             NombreOficial:      nombreoficial.value,
        //             PersonaFisica:      personafisica.value,
        //             PersonaMoral:       personamoral.value,
        //             RFC:                rfc.value,
        //         },
        //         Domicilio:{
        //             Calle: calle.value,
        //             ClaveColonia: colonia.value,
        //             ClaveEstado: estado.value,
        //             ClaveLocalidad: ciudad.value,
        //             ClaveMunicipio: municipio.value,
        //             CodigoPostal: codigopostal.value,
        //             NumeroExt: noext.value,
        //             NumeroInt: noint.value,
        //             Pais: pais.value,
        //         }
        //     }

        //     storeEmpresa.crearEmpresa( datos )
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
            listamunicipio,
            listalocalidad,
            listacolonias,

            nuevaColonia,
            nuevacolonia,
            cerrarcolonia,
             

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
    width: 26.80rem;
    color: #999999
}

.estado {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 22.2rem;
    color: #999999
}
.coloniaEditable {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 21.431875rem;
    color: #999999
}

select {
    color: #999999
}

option {
    color: #999999;
}

.btnColonia{
    margin-left: .5rem;
    margin-right: .5rem;
    cursor: pointer;
    color: #999999;
    fill: #999999;
}

.btnColonia:hover{
    margin-left: .5rem;
    margin-right: .5rem;
    fill: #fff;
    color: #fff;
    cursor:pointer
}
</style>