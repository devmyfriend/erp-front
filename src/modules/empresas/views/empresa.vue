<template>
    <h1>Empresa</h1>
    <div class="frame">
        <Modal>
            <template v-slot:header>
                <div class="headerSucursal">
                    <div class="tituloSucursal">
                        <h2>Sucursal</h2>
                    </div>
                    <div class="cerrarSucursal">
                        <img src="" alt="Boton Cerrar">
                    </div>
                </div>
            </template>
            <template v-slot:body>
                <div class="formularioSucursal">
                    <form>
                        <fieldset>
                            <label for="">Nombre del responsable</label>
                            <select class="responsableSucursal" name="txtResponsable" id="idResponsable">
                                <option value="">Nombre del responsable</option>
                            </select>
                        </fieldset>
                        <fieldset>
                            <label for="">Domicilio</label> <br>
                            <input class="coloniaSucursal" type="text" name="txtColonia" id="idColonia" placeholder="Colonia"> <br>
                            <input class="calleSucursal" type="text" name="txtCalle" id="idCalle" placeholder="Calle">
                            <input class="noextintSucursal" type="text" name="txtNoExt" id="idNoExt" placeholder="No. Ext">
                            <input class="noextintSucursal" type="text" name="txtNoInt" id="idNoInt" placeholder="No. Int">
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
            </template>
        </Modal>
        <div class="contenedor">
            <div class="datosEmpresa">
                <DatosEmpresa 
                    esextranjero = ""
                    esnuevo = ""            
                    idEmpresa = ""          
                    nombrecomercial = ""            
                    nombreoficial = ""      
                    pais = ""               
                    paisnombre = ""         
                    personafisca = ""       
                    personamoral = ""       
                    regimenfiscal = ""      
                    rfc = ""                
                    taxid = ""              
                />
            </div>
            <div class="datosContactos">
                <h2>Contacto</h2>
            </div>
        </div>
        <div class="botones">
           <button class="btn btn-success"> Guardar</button> 
           <button class="btn btn-danger">Cancelar</button>
        </div>
    </div>
</template>

<script>

    import DatosEmpresa from '../components/frmDatosGrales.vue'
    import DatosSucursal from '../components/sucursal.vue'
    import Modal from '../components/modal.vue'
    export default{
        components:{
            DatosEmpresa,
            DatosSucursal,
            Modal
        }

    }

</script>

<style lang="scss" scoped>

    @import '../../../styles/variables.scss';


    h1{
        font-size: 1.75rem;
        font-weight: bold;
        text-align: left;
        margin: 1.5rem ;
    }

    .frame{
        background-color: $panel;
        height: 50.875rem;
        margin: 1.5rem ;
        padding:  0 0.625rem 0 0.625rem;
        width: 82.9375rem;
    }

    .contenedor{
        display: flex;
        justify-content: space-between;
    }

    .datosEmpresa{
        border-right: solid 1px #000;
        display: inline-block;
        width: 50%;
    }
    .datosContactos{
        background-color: darkmagenta;
        color:#fff;
        display: inline-block;
        width: 50%;
        
    }
    .botones{
        width: 100%;
        height: 5.75rem;
        padding-top: 1.8125rem;
    }

    button{
        width: 9.375rem;
        height: 2.1875rem;
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: auto;
        margin-bottom: auto;
    }
    .sucursales{
        border: 1px solid #fff;
        color:#fff;
        text-align: left;
    }
    .sucursales h2{
        text-align:left;
    }

    .framesucursal{
        background-color: $panel;
        height: 50.875rem;
        margin: 1.5rem ;
        padding:  0 0.625rem 0 0.625rem;
        width: 40.84375rem;
        z-index: 50;
    }

    .headerSucursal{
        margin: 0;
        padding: 1.5rem;
        width: 100%;
    }

    .tituloSucursal{
        float: left;
        margin: 0;
        padding: 0;
        text-align: left;
        width: 50%;
    }
    .cerrarSucursal{
        float: left;
        margin: 0;
        padding: 0;
        text-align: right;
        width: 50%;
    }
    .formularioSucursal{
        width: 100%;
        margin-top: 1.700625rem;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        margin-bottom: 1.5rem;
        text-align: left;
        padding: 0;
    }

    select{
        height: 2.02375rem;
        padding: $padding-input;
        border-radius: $radius;
        border: none;
        color: #999999;
    }
    .responsableSucursal{
        width: 37.8125rem;
        margin-top: .5rem;
        // height: 2.02375rem;
        // padding: $padding-input;
        // border-radius: $radius;
        // border: none;
        // color: #999999;
        
    }
    .formularioSucursal input{
        border-radius: $radius;
        border: none;
        height: 2.02375rem;
        margin-left: 0rem;
        margin-right: .5rem;
        margin-top: .5rem;
        margin-bottom: .5rem;
        padding: $padding-input;
        color:#999999
    }
    .coloniaSucursal{
        width: 37.8125rem;
    }
    .calleSucursal {
        width: 18.75rem;
    }
    .noextintSucursal{
        width: 8.991rem;
        // margin-left: 8px;
        // margin-right: 8px;
    }
    .grupoField{
        width: 50%;
        float:left;
    }
    .codigoPostal{
        width: 18.75rem;
    }
    .estadoSucursal, .municipioSucursal, .ciudadSucursal{
        width: 17.45rem;
        margin-top: .5rem;

    }

</style>