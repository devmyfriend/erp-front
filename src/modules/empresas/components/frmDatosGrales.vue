<template lang="es">
    <div>
        <div class="frame">
            <h1>Datos generales</h1>
            <form>
               <fieldset>
                   <input 
                        v-model="idempresa" 
                        class="compo_base compo_corto" 
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
                        class="compo_base compo_corto" 
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
                        class="compo_med" 
                        type="text" 
                        name="compo_med" 
                        id="idRazonSocial" 
                        placeholder="Razón Social"
                        required
                        @input="actualizarValores"
                    />
               </fieldset>
               <fieldset>

                    <label class="label_med" for="pais">País</label>
                    <select class="compo_med" name="pais" id="idPais" v-model="pais" @change="actualizarValores">
                        <option v-for="opcion in ListaPaises" :key="opcion">{{ opcion.Descripcion }}</option>

                    </select>

               </fieldset>
               <fieldset>
                    <label class="label_med pFisica" for="personaFisica">Persona Fisica</label>
                    <input class="radio" 
                           type="radio" 
                           name="persona" 
                           id="idPersonaFisica"
                           v-on:click="PersonaSelecionada(true)" 
                           :checked="personafisica"
                           @input="actualizarValores"
                    />
                    <label class="label_med pMoral" for="personaMoral">Persona Moral</label>
                    <input class="radio" 
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

                    <select class="compo_lg" name="claveRegimenFiscal" id="idClaveRegimenFiscal" @change="actualizarValores">

                        <option selected value="">Régimen Fiscal</option>
                        <option v-for="regimen in listaregimenes" :key="regimen.ClaveRegimenFiscal" :value="regimen.ClaveRegimenFiscal">{{regimen.Descripcion}}</option>
                    </select>
               </fieldset>
               <fieldset> 
                    <input class="compo_lg" 
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
                      class="compo_base calle" 
                      type="text" 
                      name="calleDomicilio" 
                      id="calleDomicilio" 
                      placeholder="Calle"
                      @input="actualizarValores"
                />
               <input v-model="noext" 
                      class="compo_base compo_corto noext"
                      type="text"
                      name="numExtDomicilio" 
                      id="numExtDomicilio" 
                      placeholder="No. Ext." 
                      required
                      @input="actualizarValores"
                />
               <input v-model="noint" 
                      class="compo_base compo_corto noint"
                      type="text"
                      name="numIntDomicilio" 
                      id="numIntdomicilio" 
                      placeholder="No. Int." 
                      required
                      @input="actualizarValores"
                />
               </fieldset>
               <fieldset>
                <input v-model="codigopostal" class="compo_base compo_corto" type="text" name="codigoPostal" id="codigoPostal" placeholder="Código Postal" @input="actualizarValores; validarCargaColonias;"/>
                <label class="labelEstados" for="estado">Estado</label>

                <select class="compo_base cEstado" name="estado" id="idEstado" v-model="estado" :disabled="modoEstado" @change="actualizarValores; validarCargaColonias;">
                    <option v-for="opcion in listadoestado" :key="opcion">{{ opcion.Nombre }}</option>
                </select>
               </fieldset>
               <fieldset>
                    <label class="label_med" for="municipio">Deleg./Municipio</label>
                    <select class="compo_med" name="municipio" id="idmunicipio" v-model="municipio" :disabled="modoMunicipio" @change="actualizarValores">
                        <option v-for="opcion in listadoMunicipios" :key="opcion">{{ opcion.municipio}}</option>
                    </select>
                   

               </fieldset>
               
               <fieldset>

                <label class="label_med" for="ciudad">Ciudad</label>
                <select class="compo_med" name="ciudad" id="ciudad" v-model="ciudad" :disabled="modoCiudad" @change="actualizarValores">
                    <option v-for="opcion in listadoCiudades" :key="opcion">{{ opcion.localidad}}</option>
                </select>


               </fieldset>
                <fieldset class="fsColonias">
                    
                    <label class="label_med" for="colonia">Colonia</label>
                        <select class="compo_med" name="colonia" id="colonia" v-model="colonia" :disabled="modoColonia" @change="actualizarValores">
                            <option v-for="opcion in optColonia" :key="opcion">{{ opcion.NombreColonia }}</option>
                        </select>
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

        const listaregimenes     = ref( [] )
        
        const ListaPaises        = ref( [])
        const clavePais          = ref( '' )

        const listadoestado      = ref( [] )
        const claveEstado        = ref( '' )
        const modoEstado         = ref( true )

        const listadoMunicipios  = ref( [] )
        const claveMunicipio     = ref( '' )
        const modoMunicipio      = ref( true )
        
        const listadoCiudades    = ref( [] )
        const modoCiudad         = ref( true )

        const optColonia         = ref( [] )
        const nuevaColonia       = ref('')
        const modoColonia        = ref( true )


        // [Nota:]
        // Se comento para que el componente padre haga la creacion del store y el llenado

        const storeEmpresa = useEmpresa()
        const storeDomicilio = useDomicilioSAT()

        onMounted(() => {
            store.cargarPaises().then(() => {
                ListaPaises.value = store.getPaises
            })


        // const cargarPaises = computed( ()=> ListaPaises.value = store.listapaises )
        // const cargarRegimenes = computed( ()=> ListaPaises.value = store.listaPFisica )

        // onMounted(() => { 


/*             ListaPaises.value = store.listapaises
            listaregimenes.value = store.listaPFisica
            listadoestado.value = storeDomicilio.listadoestado */
        })

        /* const cargarPaises = computed( ()=> ListaPaises.value = store.listapaises ) */
        const cargarRegimenes = computed( ()=> ListaPaises.value = store.listaPFisica )

        const PersonaSelecionada = (valor) => {
            personafisica.value = valor
            personamoral.value = !personafisica.value
        }

        watch( pais, ( newPais ) => {
/*             esextranjero.value = false
            if( pais.length>0 && pais!=='MEX' ){
                esextranjero.value = !esextranjero.value
                personafisica.value = true
            } */
            ListaPaises.value.forEach(paisAct => {
                if (paisAct.Descripcion === newPais) {
                    clavePais.value = paisAct.ClavePais;
                    store.cargarEstados(clavePais.value).then(() => {
                        listadoestado.value = store.getEstados
                    })
                }
            });

        })

        watch(codigopostal, (CP) => {
            if (CP.length === 5) {
                modoEstado.value = false
            } else {
                modoEstado.value = true
                optColonia.value.length = 0;

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


        watch( estado, ( est )=>{
            listadoestado.value.forEach(estadoAct => {
                if (estadoAct.Nombre === est) {
                    claveEstado.value = estadoAct.ClaveEstado;
                    store.cargarMunicipiosYColonias(codigopostal.value, claveEstado.value).then(() => {
                        listadoMunicipios.value = store.getMunicipios
                        listadoCiudades.value = store.getCiudades
                    })
                }
            });
            modoMunicipio.value = false
        })

        watch( municipio, ( mun )=>{
            modoCiudad.value = false
        })
    
        watch( ciudad , ( ciu )=>{
            modoColonia.value = false
            optColonia.value = store.getColonias
            console.log("[Colonias]: " + JSON.stringify(optColonia.value));
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


        const validarCargaColonias = () => { 
            console.log("No esta entrando aasda: ")
            var regex = /^[0-9]+$/;
            if (claveEstado.value!== '') {
                store.cargarMunicipiosYColonias(codigopostal.value, claveEstado.value).then(() => {
                    optColonia.value = store.getColonias
                    listadoMunicipios.value = store.getMunicipios
                    console.log("[Municipios]: " + JSON.stringify(listadoMunicipios.value))
                })
            }else{
                console.log("No esta entrando")
                optColonia.value.length = 0;
            }
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
            colonia,
            nuevaColonia,
            optColonia,
            claveEstado,
            claveMunicipio,
            listadoMunicipios,
            listadoCiudades,
            clavePais,

            validarCargaColonias,
            modoEstado,
            modoMunicipio,
            modoCiudad,
            modoColonia,
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

.compo_base{
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    padding: $padding-input;
    color: #999999;
}
.compo_lg {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 36.3501rem;
    color:#999999;
}
.compo_corto {
    width: 9.0625rem;
}
.noext, .noint{
    margin-right: 8px;
}
.cEstado{
    width: 22.72rem;
}
.calle{
    width: 17.125rem;
    margin-right: 0.5rem;
}

.logotipo {
    font-size: 1.125rem;
    margin-left: .5rem;
    margin-right: .5rem;
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

.labelEstados {
    font-size: 1.125rem;
    margin-left: .5rem;
    margin-right: .5rem;
}

.compo_med {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    padding: $padding-input;
    width: 26.80rem;
    color: #999999
}

.label_med{
    font-size: 1.125rem;
    width: 9.01543125rem;
}

.pFisica, .pMoral{
    margin-right: 0.5rem;
}
.radio{
    margin-right: 0.5rem;
}

select {
    color: #999999
}

option {
    color: #999999;
}

.fsColonias{
    display: flex;
    align-items: center;
}

.inpColonia {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 8px;
    margin-right: 8px;
    padding: $padding-input;
    width: 16.431875rem !important;
    color: #999999
}

</style>