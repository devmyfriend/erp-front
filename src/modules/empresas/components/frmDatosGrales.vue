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
                    <option v-for="item in listadoestado" :key="item.ClaveEstado" :value="item.ClaveEstado">{{ item.Nombre }}</option>
                </select>
               </fieldset>
               <fieldset>
                   <label class="labelMunicipio" for="municipio">Deleg./Municipio</label>
                   <select class="municipio" name="municipio" id="municipio" v-model="municipio" @change="actualizarValores">
                       <option selected value="{{municipio}}">{{municipionombre}}</option>
                       <option v-for="item in listamunicipio" :key="item.ClaveMunicipio" :value="item.ClaveMunicipio">{{item.Nombre}}</option>
                   </select>   
               </fieldset>
               <fieldset>
                <label class="labelCiudad" for="ciudad">Ciudad</label>
                <select class="ciudad" name="ciudad" id="ciudad" v-model="ciudad" @change="actualizarValores">
                    <option selected value="{{ciudad}}">{{ciudadnombre}}</option>
                    <option v-for="item in listalocalidad" :key="item.ClaveLocalidad" :value="item.ClaveLocalidad"> {{item.Nombre}} </option>
                </select>
               </fieldset>

               <fieldset v-if="!nuevaColonia">
                <label class="labelColonia" for="colonia">Colonia</label>
                <select class="colonia" name="colonia" id="colonia" v-model="colonia" @change="actualizarValores">
                    <option selected value="{{colonia}}">{{colonianombre}}</option>
                    <option v-for="item in listacolonias" :key="item.ClaveColonia" :value="item.ClaveColonia">{{item.nombre}}</option>
                </select>
                <a @click="nuevacolonia()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none" >
                        <path
                            d="M12 0C5.37097 0 0 4.92339 0 11C0 17.0766 5.37097 22 12 22C18.629 22 24 17.0766 24 11C24 4.92339 18.629 0 12 0Z"
                            fill="#999999" />
                        <path
                            d="M19.0179 9.03449H13.4732V3.37168C13.4732 2.67681 12.9214 2.11328 12.2411 2.11328H11.0089C10.3286 2.11328 9.77679 2.67681 9.77679 3.37168V9.03449H4.23214C3.55177 9.03449 3 9.59802 3 10.2929V11.5513C3 12.2462 3.55177 12.8097 4.23214 12.8097H9.77679V18.4725C9.77679 19.1674 10.3286 19.7309 11.0089 19.7309H12.2411C12.9214 19.7309 13.4732 19.1674 13.4732 18.4725V12.8097H19.0179C19.6982 12.8097 20.25 12.2462 20.25 11.5513V10.2929C20.25 9.59802 19.6982 9.03449 19.0179 9.03449Z"
                            fill="white" />
                    </svg>

                </a> 
               </fieldset>
               <fieldset v-else>
                <label class="labelColonia" for="colonia">Colonia</label>
                <input type="text" class="coloniaEditable">
                
                <svg class="btnColonia" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" >
                    <path d="M21.1885 4.78228L17.0927 0.686475C16.6532 0.246935 16.057 3.25037e-06 15.4354 0H2.34375C1.04932 0 0 1.04932 0 2.34375V19.5312C0 20.8257 1.04932 21.875 2.34375 21.875H19.5312C20.8257 21.875 21.875 20.8257 21.875 19.5312V6.43955C21.875 5.81795 21.6281 5.22181 21.1885 4.78228ZM10.9375 18.75C9.21162 18.75 7.8125 17.3509 7.8125 15.625C7.8125 13.8991 9.21162 12.5 10.9375 12.5C12.6634 12.5 14.0625 13.8991 14.0625 15.625C14.0625 17.3509 12.6634 18.75 10.9375 18.75ZM15.625 3.88086V8.78906C15.625 9.11265 15.3626 9.375 15.0391 9.375H3.71094C3.38735 9.375 3.125 9.11265 3.125 8.78906V3.71094C3.125 3.38735 3.38735 3.125 3.71094 3.125H14.8691C15.0246 3.125 15.1736 3.18672 15.2834 3.29663L15.4534 3.46655C15.5078 3.52095 15.551 3.58554 15.5804 3.65663C15.6099 3.72772 15.625 3.80391 15.625 3.88086Z" fill="#999999"/>
                </svg>

                <a @click="cerrarcolonia()">
                    <svg class="btnColonia" xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
                        <path d="M22.6562 0H2.34375C1.0498 0 0 1.0498 0 2.34375V19.5312C0 20.8252 1.0498 21.875 2.34375 21.875H22.6562C23.9502 21.875 25 20.8252 25 19.5312V2.34375C25 1.0498 23.9502 0 22.6562 0ZM18.5742 14.1846C18.8086 14.4189 18.8086 14.7998 18.5742 15.0342L16.5967 17.0117C16.3623 17.2461 15.9814 17.2461 15.7471 17.0117L12.5 13.7354L9.25293 17.0117C9.01855 17.2461 8.6377 17.2461 8.40332 17.0117L6.42578 15.0342C6.19141 14.7998 6.19141 14.4189 6.42578 14.1846L9.70215 10.9375L6.42578 7.69043C6.19141 7.45605 6.19141 7.0752 6.42578 6.84082L8.40332 4.86328C8.6377 4.62891 9.01855 4.62891 9.25293 4.86328L12.5 8.13965L15.7471 4.86328C15.9814 4.62891 16.3623 4.62891 16.5967 4.86328L18.5742 6.84082C18.8086 7.0752 18.8086 7.45605 18.5742 7.69043L15.2979 10.9375L18.5742 14.1846Z" fill="#999999"/>
                    </svg>
                </a>
               </fieldset>
            </form>
        </div>
    </div>
</template>


<script>
import { ref, watch, computed, onMounted, effect } from 'vue'
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
        const ListaPaises        = ref( [] )
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

        //     if( pais.value === 'MEX' ){
        //         esextranjero.value = false
        //     }

        //     // ListaPaises.value = store.listapaises
        //     // listaregimenes.value = store.listaPFisica
        //     // listadoestado.value = storeDomicilio.Estado( pais.value )  

        //     // console.log(listadoestado)

        //     cargarPaises()
        //     cargarRegimenes()


        // })

        onMounted(()=>{
            cargarPaises()
        })
        
        const cargarPaises = ()=>{
            ListaPaises.value = storeEmpresa.listapaises
            console.log('se cargo paises')
            console.log(ListaPaises.value)
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
                listaregimenes.value = store.listaPFisica
            }else{
                listaregimenes.value = store.listaPMoral
            }
        })

        watch(estado,( estado )=>{
            
            if( estado.length > 0 &&  estado != '' ){
                storeDomicilio.cargarMunicipio( estado ).then(()=>{
                    listamunicipio.value = storeDomicilio.listaMunicipios 
                })
    
                storeDomicilio.cargarLocalidad( estado ).then(()=>{
                    listalocalidad.value = storeDomicilio.listadoLocalidades 
                })
            }

        })

        watch( codigopostal, ( codigopostal )=>{
            if( codigopostal.length === 5 ){ 
                storeDomicilio.cargarColonia( codigopostal ).then( ()=>{
                    listacolonias.value = storeDomicilio.listadoColonias
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
    width: 24.431875rem;
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