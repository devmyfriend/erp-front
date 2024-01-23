<template>
    <h1>Empresa</h1>
    <div class="frame">
        <ModalSucursal v-if="seEditaSucursal && haySucursal" >
            <template v-slot:header>
                <div class="headerSucursal">
                    <div class="tituloSucursal">
                        <h2>Actualizar Sucursal</h2>
                    </div>
                    <div class="cerrarSucursal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="35" viewBox="0 0 42 35" fill="none"  @click="abrircerrarSucursal">
                            <path
                                d="M38.0625 0H3.9375C1.76367 0 0 1.67969 0 3.75V31.25C0 33.3203 1.76367 35 3.9375 35H38.0625C40.2363 35 42 33.3203 42 31.25V3.75C42 1.67969 40.2363 0 38.0625 0ZM31.2047 22.6953C31.5984 23.0703 31.5984 23.6797 31.2047 24.0547L27.8824 27.2188C27.4887 27.5938 26.8488 27.5938 26.4551 27.2188L21 21.9766L15.5449 27.2188C15.1512 27.5938 14.5113 27.5938 14.1176 27.2188L10.7953 24.0547C10.4016 23.6797 10.4016 23.0703 10.7953 22.6953L16.2996 17.5L10.7953 12.3047C10.4016 11.9297 10.4016 11.3203 10.7953 10.9453L14.1176 7.78125C14.5113 7.40625 15.1512 7.40625 15.5449 7.78125L21 13.0234L26.4551 7.78125C26.8488 7.40625 27.4887 7.40625 27.8824 7.78125L31.2047 10.9453C31.5984 11.3203 31.5984 11.9297 31.2047 12.3047L25.7004 17.5L31.2047 22.6953Z"
                                fill="white" />
                        </svg>
                    </div>
                </div>
            </template>
            <template v-slot:body>
                <Sucursal></Sucursal>
            </template>
            <template v-slot:footer>
                <div class="footButon">
                    <button class="btn btn-save" type="button">Guardar</button>
                    <button class="btn btn-danger" type="button">Cancelar</button>
                </div>
            </template>
        </ModalSucursal>

        <Modal v-if="haySucursal" >
            <template v-slot:header>

                <div class="headerSucursal">
                    <div class="tituloSucursal">
                        <h2>Sucursal</h2>
                    </div>
                    <div class="cerrarSucursal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="35" viewBox="0 0 42 35" fill="none"  @click="abrircerrarSucursal">
                            <path
                                d="M38.0625 0H3.9375C1.76367 0 0 1.67969 0 3.75V31.25C0 33.3203 1.76367 35 3.9375 35H38.0625C40.2363 35 42 33.3203 42 31.25V3.75C42 1.67969 40.2363 0 38.0625 0ZM31.2047 22.6953C31.5984 23.0703 31.5984 23.6797 31.2047 24.0547L27.8824 27.2188C27.4887 27.5938 26.8488 27.5938 26.4551 27.2188L21 21.9766L15.5449 27.2188C15.1512 27.5938 14.5113 27.5938 14.1176 27.2188L10.7953 24.0547C10.4016 23.6797 10.4016 23.0703 10.7953 22.6953L16.2996 17.5L10.7953 12.3047C10.4016 11.9297 10.4016 11.3203 10.7953 10.9453L14.1176 7.78125C14.5113 7.40625 15.1512 7.40625 15.5449 7.78125L21 13.0234L26.4551 7.78125C26.8488 7.40625 27.4887 7.40625 27.8824 7.78125L31.2047 10.9453C31.5984 11.3203 31.5984 11.9297 31.2047 12.3047L25.7004 17.5L31.2047 22.6953Z"
                                fill="white" />
                        </svg>
                    </div>
                </div>
            </template>
            <!-- <template v-slot:body>
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
                    </form>
                </div>
            </template> -->
            <template v-slot:body>
                <Sucursal 
                    :idempresa="1"
                />
            </template>
        </Modal>
        <!-- <Modal>
            <template v-slot:header>
                <div class="headerSucursal">
                    <div class="tituloSucursal">
                        <h2>Sucursal</h2>
                    </div>
                    <div class="cerrarSucursal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="35" viewBox="0 0 42 35" fill="none"  @click="abrircerrarSucursal">
                            <path
                                d="M38.0625 0H3.9375C1.76367 0 0 1.67969 0 3.75V31.25C0 33.3203 1.76367 35 3.9375 35H38.0625C40.2363 35 42 33.3203 42 31.25V3.75C42 1.67969 40.2363 0 38.0625 0ZM31.2047 22.6953C31.5984 23.0703 31.5984 23.6797 31.2047 24.0547L27.8824 27.2188C27.4887 27.5938 26.8488 27.5938 26.4551 27.2188L21 21.9766L15.5449 27.2188C15.1512 27.5938 14.5113 27.5938 14.1176 27.2188L10.7953 24.0547C10.4016 23.6797 10.4016 23.0703 10.7953 22.6953L16.2996 17.5L10.7953 12.3047C10.4016 11.9297 10.4016 11.3203 10.7953 10.9453L14.1176 7.78125C14.5113 7.40625 15.1512 7.40625 15.5449 7.78125L21 13.0234L26.4551 7.78125C26.8488 7.40625 27.4887 7.40625 27.8824 7.78125L31.2047 10.9453C31.5984 11.3203 31.5984 11.9297 31.2047 12.3047L25.7004 17.5L31.2047 22.6953Z"
                                fill="white" />
                        </svg>
                    </div>
                </div>
            </template>
            <template v-slot:body>
                <div>
                </div>
                <Sucursales></Sucursales>
            </template>
        </Modal>  -->
        <div class="contenedor">
            <div class="datosEmpresa">
                <DatosEmpresa 
                    :esextranjero = "esextranjero" 
                    :esnuevo = "esnuevo" 
                    :idempresa = "idempresa" 
                    :nombreoficial ="nombreoficial" 
                    :pais="pais"
                    :paisnombre="paisnombre" 
                    :personafisca = "true" 
                    :personamoral = "false" 
                    :regimenfiscal = "regimenfiscal" 
                    :rfc = "rfc" 
                    :taxid="taxid" 
                    :calle="calle"              
                    :ciudad="ciudad"             
                    :ciudadnombre="ciudadnombre"       
                    :codigopostal="codigopostal"       
                    :colonia="colonia"            
                    :colonianombre="colonianombre"      
                    :estado="estado"             
                    :estadonombre="estadonombre"       
                    :municipio="municipio"          
                    :municipionombre="municipionombre"    
                    :noext="noext"              
                    :noint="noint"
                    :Lista-Paises="ListaPaises"
                    :listaregimenes="listaregimenes"
                    :listaestados="listaestado"
                    
                    @actualizarValores="actualizarValoresComponenteHijo"  

                />
                <div class="sucursales">
                    <h3>Sucursales</h3>
                    <a @click="abrircerrarSucursal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                                <path
                                    d="M12 0C5.37097 0 0 4.92339 0 11C0 17.0766 5.37097 22 12 22C18.629 22 24 17.0766 24 11C24 4.92339 18.629 0 12 0Z"
                                    fill="#999999" />
                                <path
                                    d="M19.0179 9.03449H13.4732V3.37168C13.4732 2.67681 12.9214 2.11328 12.2411 2.11328H11.0089C10.3286 2.11328 9.77679 2.67681 9.77679 3.37168V9.03449H4.23214C3.55177 9.03449 3 9.59802 3 10.2929V11.5513C3 12.2462 3.55177 12.8097 4.23214 12.8097H9.77679V18.4725C9.77679 19.1674 10.3286 19.7309 11.0089 19.7309H12.2411C12.9214 19.7309 13.4732 19.1674 13.4732 18.4725V12.8097H19.0179C19.6982 12.8097 20.25 12.2462 20.25 11.5513V10.2929C20.25 9.59802 19.6982 9.03449 19.0179 9.03449Z"
                                    fill="white" />
                        </svg>    
                        <span class="labelSucursal">
                            Agregar Sucursales
                        </span>
                    </a>
                    <a @click="verSucursal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
                            <path d="M24.4295 4.81331L21.7956 0.608766C21.5602 0.231331 21.1422 0 20.6958 0H4.29966C3.85323 0 3.43522 0.231331 3.19983 0.608766L0.565897 4.81331C-0.79368 6.98458 0.411677 10.0041 2.95226 10.349C3.13489 10.3734 3.32158 10.3856 3.50827 10.3856C4.70957 10.3856 5.77288 9.85795 6.5034 9.04221C7.23392 9.85795 8.30129 10.3856 9.49853 10.3856C10.6998 10.3856 11.7631 9.85795 12.4937 9.04221C13.2242 9.85795 14.2915 10.3856 15.4888 10.3856C16.6901 10.3856 17.7534 9.85795 18.4839 9.04221C19.2185 9.85795 20.2818 10.3856 21.479 10.3856C21.6698 10.3856 21.8524 10.3734 22.0351 10.349C24.5838 10.0081 25.7932 6.98864 24.4295 4.81331ZM21.4872 11.6883C21.0813 11.6883 20.6795 11.6274 20.2899 11.5341V15.5844H4.70551V11.5341C4.3159 11.6234 3.91411 11.6883 3.50827 11.6883C3.26476 11.6883 3.0172 11.6721 2.77775 11.6396C2.55047 11.6071 2.32726 11.5544 2.11216 11.4935V19.4805C2.11216 20.1989 2.69252 20.7792 3.41086 20.7792H21.5927C22.311 20.7792 22.8914 20.1989 22.8914 19.4805V11.4935C22.6722 11.5584 22.4531 11.6112 22.2258 11.6396C21.9782 11.6721 21.7347 11.6883 21.4872 11.6883Z" fill="#999999"/>
                        </svg>
                        Ver Sucursal
                    </a>
                </div>
            </div>
            <div class="datosContactos">
                <Contacto></Contacto>
            </div>
        </div>
        <div class="botones">
            <button class="btn btn-save" @click="guardar"> Guardar</button>
            <button class="btn btn-danger">Cancelar</button>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2'


import DatosEmpresa from '../components/frmDatosGrales.vue'
import DatosSucursal from '../components/sucursal.vue'
import Modal from '../components/modal.vue'
import ModalSucursal from '../components/modalSucursal.vue'
import Sucursal from '../components/sucursal.vue'
import Contacto from '../../contacto/components/frmContacto.vue'
import Sucursales from '../components/sucursales.vue'


import { useEmpresa } from '../store/empresa'
import { useDomicilioSAT } from '../store/domiciliosat';

export default {
    components: {
        Contacto,
        DatosEmpresa,
        DatosSucursal,
        Modal,
        ModalSucursal,
        Sucursal,
        Sucursales
    },

    setup(){
        const descripcionregimen = ref( '' )
        const esextranjero       = ref( false )
        const esnuevo            = ref( true )
        const idempresa          = ref( 0 )
        const ListaPaises        = ref( [] )
        const listaregimenes     = ref( [] )
        const nombrecomercial    = ref( '' )
        const nombreoficial      =  ref( '' )
        const pais               = ref( 'MEX' )
        const paisnombre         = ref( 'México' )
        const personafisica      = ref( '' )
        const personamoral       = ref( '' )
        const regimenfiscal      = ref( '' )
        const rfc                = ref( '' )
        const taxid              = ref( '' )
        const espropietaria      = ref( false )

        const calle              = ref( '' )
        const ciudad             = ref( '' )
        const ciudadnombre       = ref( '' )
        const codigopostal       = ref( '' )
        const colonia            = ref( '' )
        const colonianombre      = ref( '' )
        const estado             = ref( '' )
        const estadonombre       = ref( '' )
        const municipio          = ref( '' )
        const municipionombre    = ref( '' )
        const noext              = ref( '' )
        const noint              = ref( '' )

        const listaestado    = ref( [] )
        const listamunicipio    = ref( [] )
        const listalocalidad    = ref( [] )
        const listacolonia    = ref( [] )

        const haySucursal = ref ( false )
        const seEditaSucursal = ref ( false )

        const storeEmpresa = useEmpresa()
        const storeDomicilio = useDomicilioSAT()

        // const router = useRoute()
        // espropietaria = router.params.propietaria

        // const validarEsNuevo = ()=>{
        //     if(router.params.id && router.params.id > 0){
        //        esnuevo.value = false 
        //        idempresa.value  = router.params.id
        //     }
        // }

        onMounted( ()=>{
            
            // store.cargarPaises().then( ( error, datos )=>{
            //     if( error ){
            //         console.log(error)
            //     }
            //     console.log(datos)
            // })
            // store.cargarRegimenes()
            // await storeDomicilio.cargaDatos()

            // await storeDomicilio.cargarEstado()

            // listaestado.value = storeDomicilio.listaEstados
            
            // storeEmpresa.cargarPaises().then(()=>{
            //     ListaPaises.value = storeEmpresa.listapaises
            // })
            enlistarPaises()
            
            enlistarRegimenes()

            enlistarEstados( pais.value )
            
            // enlistarEstados( pais.value ) 

            

        })

        const enlistarRegimenes = ()=>{
            storeEmpresa.cargarRegimenes().then(()=>{
                console.log(storeEmpresa.ListaRegimenes)
                listaregimenes.value = storeEmpresa.listaregimen

                console.log('se cargo la lista de regimenes')
                console.log(listaregimenes.value) 
            })
        }

        const enlistarPaises =()=>{
            storeEmpresa.cargarPaises().then(()=>{
                ListaPaises.value = storeEmpresa.listapaises
                // console.log('enlistar')
                // console.log(ListaPaises.value)
            })
        }

        const enlistarEstados = ( )=>{
            storeDomicilio.cargarEstado(pais.value).then(()=>{
                listaestado.value = storeDomicilio.Estado( pais.value )
                console.log('enlistar estados')
                console.log(listaestado.value) 
            })
        }

        const abrircerrarSucursal= ()=> { 
            haySucursal.value = !haySucursal.value
        }


        
        const actualizarValoresComponenteHijo = ( valores )=>{
                calle.value           = valores.calle              
                ciudad.value          = valores.ciudad              
                ciudadnombre.value    = valores.ciudadnombre
                codigopostal.value    = valores.codigopostal       
                colonia.value         = valores.colonia
                colonianombre.value   = valores.colonianombre
                esextranjero.value    = valores.esextranjero
                estado.value          = valores.estado
                estadonombre.value    = valores.estadonombre       
                idempresa.value       = valores.idempresa
                municipio.value       = valores.municipio          
                municipionombre.value = valores.municipionombre     
                noext.value           = valores.noext
                noint.value           = valores.noint         
                nombrecomercial.value = valores.nombrecomercial
                nombreoficial.value   = valores.nombreoficial
                pais.value            = valores.pais
                paisnombre.value      = valores.paisnombre
                personafisica.value   = valores.personafisica
                personamoral.value    = valores.personamoral
                regimenfiscal.value   = valores.regimenfiscal
                rfc.value             = valores.rfc
                taxid.value           = valores.taxid
        }

        const validarRFC = ()=>{
            if( rfc.value.length >= 12 && rfc.value.length <= 13 ){
                return false
            }else{
                return true
            }
        }
        
        const validarNombreOficial = ()=>{
            if( nombreoficial.value.length >= 3 ){
                return false
            }else{
                return true
            }
        }
        const validarCodigoPostal = ()=>{
            if( codigopostal.value.length === 5 ){
                return false
            }else{
                return true
            }
        }

        const validarPais = ()=>{
            if( pais.value.length === 3 ){
                return false
            }else{
                return true
            }
        }

        const validarRegimen = ()=>{
            if( regimenfiscal.value.length === 3 ){
                return false
            }else{
                return true
            }
        }

        const validarEstado = ()=>{
            if( estado.value.length === 3 ){
                return false
            }else{
                return true
            }
        }

        const validarMunicipio = ()=>{
            if( municipio.value.length === 3 ){
                return false
            }else{
                return true
            }
        }

        const validarLocalidad = ()=>{
            if( ciudad.value.length === 3 ){
                return false
            }else{
                return true
            }
        }

        const validarColonia = ()=>{
            if( colonia.value.length === 3 ){
                return false
            }else{
                return true
            }
        }



        const guardar = ()=>{

            const datos = {
                Entidad:{
                    
                    ClavePais:          pais.value,
                    ClaveRegimenFiscal: regimenfiscal.value,
                    EsPropietaria:      espropietaria.value,
                    NombreComercial:    nombrecomercial.value,
                    NombreOficial:      nombreoficial.value,
                    PersonaFisica:      personafisica.value,
                    PersonaMoral:       personamoral.value,
                    RFC:                rfc.value,
                },
                Domicilio:{
                    Calle:              calle.value,
                    ClaveColonia:       colonia.value,
                    ClaveEstado:        estado.value,
                    ClaveLocalidad:     ciudad.value,
                    ClaveMunicipio:     municipio.value,
                    CodigoPostal:       codigopostal.value,
                    NumeroExt:          noext.value,
                    NumeroInt:          noint.value,
                    Pais:               pais.value,
                }
            }

            let error = false

            if( validarRFC() ){
                error = true
                Swal.fire({
                    title: 'RFC',
                    text:  'El R.F.C. no cumple con los requerimientos basicos',
                    icon:  'error'
                })
            }

            if( validarNombreOficial() ){
                error = true
                Swal.fire({
                    title: 'Nombre Oficial',
                    text:  'El Nombre Oficial no cumple con los requerimientos basicos',
                    icon:  'error'
                })
            }

            if( validarCodigoPostal() ){
                error = true
                Swal.fire({
                    title: 'Código Postal',
                    text:  'El Código Postal no cumple con los requerimientos basicos',
                    icon:  'error'
                })
            }

            if( validarPais() ){
                error = true
                Swal.fire({
                    title: 'País',
                    text:  'El País no fue seleccionado',
                    icon:  'error'
                })
            }

            if( validarRegimen() ){
                error = true
                Swal.fire({
                    title: 'Régimen Fiscal',
                    text:  'El Régimen Fiscal no fue seleccionado',
                    icon:  'error'
                })
            }

            if( validarEstado() ){
                error = true
                Swal.fire({
                    title: 'Estado',
                    text:  'El Estado no fue seleccionado',
                    icon:  'error'
                })
            }

            if( validarMunicipio() ){
                error = true
                Swal.fire({
                    title: 'Municipio',
                    text:  'El Municipio no fue seleccionado',
                    icon:  'error'
                })
            }

            if( validarLocalidad() ){
                error = true
                Swal.fire({
                    title: 'Localidad',
                    text:  'La Localidad no fue seleccionada',
                    icon:  'error'
                })
            }

            if( validarColonia() ){
                error = true
                Swal.fire({
                    title: 'Colonia',
                    text:  'La Colonia no fue seleccionada',
                    icon:  'error'
                })
            }

            if( !error ){
                storeEmpresa.crearEmpresa( datos ).then( (error, datos)=>{
                    if(error){
                        Swal.fire({
                            title: 'Error',
                            text:  'No se puedo crear la empresa',
                            icon:  "error"
                        })
                    }
                    
                    Swal.fire({
                        title: 'Empresa Creada',
                        text:  datos,
                        icon: 'success'
                    })
                })
                Swal.fire({
                        title: "The Internet?",
                        text: "That thing is still around?",
                        icon: "question"
                })
            }
        }
        
        
        return{

            calle              ,
            ciudad             ,
            ciudadnombre       ,
            codigopostal       ,
            colonia            ,
            colonianombre      ,
            descripcionregimen ,
            esextranjero       ,
            esnuevo            ,
            estado             ,
            estadonombre       ,
            idempresa          ,
            ListaPaises        ,
            listaregimenes     ,
            municipio          ,
            municipionombre    ,
            noext              ,
            noint              ,
            nombrecomercial    ,
            nombreoficial      ,
            pais               ,
            paisnombre         ,
            personafisica      ,
            personamoral       ,
            regimenfiscal      ,
            rfc                ,
            taxid              ,
            espropietaria,

            listaestado,

            guardar,


            abrircerrarSucursal,
            actualizarValoresComponenteHijo,
            haySucursal,
            seEditaSucursal,
        }
    }

}

</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';


h1 {
    color: white;
    font-size: 2rem;
    text-align: left;
    margin: 1.4rem;
}

.frame {
    align-items: left;
    background-color: $panel;
    height: 50.875rem;
    margin: 1.5rem;
    padding: 0 0.625rem 0 0.625rem;
    width: 82.9375rem;
}

fieldset {
    margin-top: .5rem;
    margin-bottom: .5rem;
}


.contenedor {
    display: flex;
    justify-content: space-between;
}

.datosEmpresa {
    border-right: solid 1px #000;
    display: inline-block;
    width: 50%;
}

.datosContactos {
    background-color: 999999;
    color: #fff;
    display: inline-block;
    width: 50%;

}

.botones {
    width: 100%;
    height: 5.75rem;
    padding-top: 1.8125rem;
}

button {
    width: 9.375rem;
    height: 2.1875rem;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-top: auto;
    margin-bottom: auto;
}

.sucursales {
    border: 1px solid #fff;
    color: #fff;
    text-align: left;
    height: 5.875rem;
    width: 36.6875rem;
    text-align: left;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    
}

.sucursales h3 {
    text-align: left;
    margin-left: .5rem;
    margin-top: 0.75rem;
    margin-bottom: .5rem;
}
.sucursales .labelSucursal{
    margin-left: .5rem;
    margin-bottom: .5rem;
}
.agregarSucursal{
    margin: .5rem;
    border-radius: 100%;
    background-color: #999999;
    border-color: #999999;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
}
.sucursales img, svg{
    margin: .5rem;
    cursor: pointer;
}
.sucursales a{
    text-decoration: none;
}

.framesucursal {
    background-color: $panel;
    height: 50.875rem;
    margin: 1.5rem;
    padding: 0 0.625rem 0 0.625rem;
    width: 40.84375rem;
    z-index: 50;
}

.headerSucursal {
    margin: 0;
    padding: 1.5rem;
    // padding-top: .5rem;
    // padding-bottom: .5rem;
    // padding-left: 1.5rem;
    // padding-right: 1.5rem;
    width: 100%;
}

.tituloSucursal {
    float: left;
    margin: 0;
    padding: 0;
    text-align: left;
    width: 50%;
}

.cerrarSucursal {
    float: left;
    margin: 0;
    padding: 0;
    text-align: right;
    width: 50%;
}

.formularioSucursal {
    width: 100%;
    margin-top: 1.700625rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: left;
    padding: 0;
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

.tituloActualizarSucursal{
    float: left;
    margin-top: 1.5rem;
    margin-left: 1.5rem;
    padding: 0;
    text-align: left;
    width: 50%;
}

.cerrarModalSucursal{
    float: left;
    margin-top: 1.5rem;
    margin-right: 1.5rem;
    padding: 0;
    text-align: right;
    width: 50%;
}

// esto de aqui abajo no va

.labelContacto {
    font-size: 1.125rem;
    margin-left: .5rem;
    margin-right: 33.2rem;
}

.contacto {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-left: 5rem;
    margin-right: 15rem;
    padding: $padding-input;
    width: 28.9999rem;
    color: #999999;
}

.inputTelefono {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 36.55rem;
    color: #999999
}

.inputCorreo {
    border-radius: $radius;
    border: none;
    height: 2.02375rem;
    margin-right: .5rem;
    padding: $padding-input;
    width: 36.55rem;
    color: #999999;
}

.añadirBoton {
    background: none;
    border: none;
    margin-left: 1rem;
}


</style>