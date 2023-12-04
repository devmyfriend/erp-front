<template>
    <h1 style="color: #000000;">Empresa</h1>
    <div class="frame">
        <Modal>
            <template v-slot:header>

                <div class="headerSucursal">
                    <div class="tituloSucursal">
                        <h2>Sucursal</h2>
                    </div>
                    <div class="cerrarSucursal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="35" viewBox="0 0 42 35" fill="none">
                            <path
                                d="M38.0625 0H3.9375C1.76367 0 0 1.67969 0 3.75V31.25C0 33.3203 1.76367 35 3.9375 35H38.0625C40.2363 35 42 33.3203 42 31.25V3.75C42 1.67969 40.2363 0 38.0625 0ZM31.2047 22.6953C31.5984 23.0703 31.5984 23.6797 31.2047 24.0547L27.8824 27.2188C27.4887 27.5938 26.8488 27.5938 26.4551 27.2188L21 21.9766L15.5449 27.2188C15.1512 27.5938 14.5113 27.5938 14.1176 27.2188L10.7953 24.0547C10.4016 23.6797 10.4016 23.0703 10.7953 22.6953L16.2996 17.5L10.7953 12.3047C10.4016 11.9297 10.4016 11.3203 10.7953 10.9453L14.1176 7.78125C14.5113 7.40625 15.1512 7.40625 15.5449 7.78125L21 13.0234L26.4551 7.78125C26.8488 7.40625 27.4887 7.40625 27.8824 7.78125L31.2047 10.9453C31.5984 11.3203 31.5984 11.9297 31.2047 12.3047L25.7004 17.5L31.2047 22.6953Z"
                                fill="white" />
                        </svg>
                    </div>
                </div>
            </template>
            <template v-slot:body>
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
            </template>
        </Modal>
        <div class="contenedor">
            <div class="datosEmpresa">
                <DatosEmpresa esextranjero="" esnuevo="" idEmpresa="" nombrecomercial="" nombreoficial="" pais=""
                    paisnombre="" personafisca="" personamoral="" regimenfiscal="" rfc="" taxid="" />
            </div>
            <div class="datosContactos">
                <h1>Contacto</h1>
                <form>
                    <fieldset class="container">
                        <input type="text" class="inputCorreo" placeholder="Contacto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 25 20" fill="none">
<path d="M24.375 8.125H21.875V5.625C21.875 5.28125 21.5938 5 21.25 5H20C19.6562 5 19.375 5.28125 19.375 5.625V8.125H16.875C16.5312 8.125 16.25 8.40625 16.25 8.75V10C16.25 10.3438 16.5312 10.625 16.875 10.625H19.375V13.125C19.375 13.4688 19.6562 13.75 20 13.75H21.25C21.5938 13.75 21.875 13.4688 21.875 13.125V10.625H24.375C24.7188 10.625 25 10.3438 25 10V8.75C25 8.40625 24.7188 8.125 24.375 8.125ZM8.75 10C11.5117 10 13.75 7.76172 13.75 5C13.75 2.23828 11.5117 0 8.75 0C5.98828 0 3.75 2.23828 3.75 5C3.75 7.76172 5.98828 10 8.75 10ZM12.25 11.25H11.5977C10.7305 11.6484 9.76562 11.875 8.75 11.875C7.73438 11.875 6.77344 11.6484 5.90234 11.25H5.25C2.35156 11.25 0 13.6016 0 16.5V18.125C0 19.1602 0.839844 20 1.875 20H15.625C16.6602 20 17.5 19.1602 17.5 18.125V16.5C17.5 13.6016 15.1484 11.25 12.25 11.25Z" fill="#999999"/>
</svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                            <path
                                d="M12 0C5.37097 0 0 4.92339 0 11C0 17.0766 5.37097 22 12 22C18.629 22 24 17.0766 24 11C24 4.92339 18.629 0 12 0Z"
                                fill="#999999" />
                            <path
                                d="M19.0179 9.03449H13.4732V3.37168C13.4732 2.67681 12.9214 2.11328 12.2411 2.11328H11.0089C10.3286 2.11328 9.77679 2.67681 9.77679 3.37168V9.03449H4.23214C3.55177 9.03449 3 9.59802 3 10.2929V11.5513C3 12.2462 3.55177 12.8097 4.23214 12.8097H9.77679V18.4725C9.77679 19.1674 10.3286 19.7309 11.0089 19.7309H12.2411C12.9214 19.7309 13.4732 19.1674 13.4732 18.4725V12.8097H19.0179C19.6982 12.8097 20.25 12.2462 20.25 11.5513V10.2929C20.25 9.59802 19.6982 9.03449 19.0179 9.03449Z"
                                fill="white" />
                        </svg>
                    </fieldset>
                    <div class="container">
                        <table class="table table-primary" style="font-size: 13px; width: 36.55rem; margin-left: .4rem;">
                            <thead>
                                <tr>
                                    <th class="p-3 mb-2 bg-primary text-white">Id Contacto</th>
                                    <th class="p-3 mb-2 bg-primary text-white">Contacto</th>
                                    <th class="p-3 mb-2 bg-primary text-white">Puesto</th>
                                </tr>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nombre</td>
                                    <td>Puesto</td>

                                </tr>
                            </tbody>
                            </thead>
                        </table>
                    </div>

                    <fieldset class="container">
                        <input type="text" class="inputTelefono" placeholder="Telefono">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                            <path
                                d="M12 0C5.37097 0 0 4.92339 0 11C0 17.0766 5.37097 22 12 22C18.629 22 24 17.0766 24 11C24 4.92339 18.629 0 12 0Z"
                                fill="#999999" />
                            <path
                                d="M19.0179 9.03449H13.4732V3.37168C13.4732 2.67681 12.9214 2.11328 12.2411 2.11328H11.0089C10.3286 2.11328 9.77679 2.67681 9.77679 3.37168V9.03449H4.23214C3.55177 9.03449 3 9.59802 3 10.2929V11.5513C3 12.2462 3.55177 12.8097 4.23214 12.8097H9.77679V18.4725C9.77679 19.1674 10.3286 19.7309 11.0089 19.7309H12.2411C12.9214 19.7309 13.4732 19.1674 13.4732 18.4725V12.8097H19.0179C19.6982 12.8097 20.25 12.2462 20.25 11.5513V10.2929C20.25 9.59802 19.6982 9.03449 19.0179 9.03449Z"
                                fill="white" />
                        </svg>
                    </fieldset>

                    <div class="container">
                        <table class="table table-secondary" style="font-size: 13px; width: 36.55rem; margin-left: .4rem;">
                            <thead>
                                <tr>
                                    <th class="p-3 mb-2 bg-primary text-white">Id del Tel</th>
                                    <th class="p-3 mb-2 bg-primary text-white">Numero Telefonico</th>
                                    <th class="p-3 mb-2 bg-primary text-white">Acciones</th>
                                </tr>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nombre</td>
                                    <td>Puesto</td>


                                </tr>
                            </tbody>
                            </thead>
                        </table>
                    </div>

                    <fieldset class="container">
                        <input type="text" class="inputCorreo" placeholder="Correo Electronico">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                            <path
                                d="M12 0C5.37097 0 0 4.92339 0 11C0 17.0766 5.37097 22 12 22C18.629 22 24 17.0766 24 11C24 4.92339 18.629 0 12 0Z"
                                fill="#999999" />
                            <path
                                d="M19.0179 9.03449H13.4732V3.37168C13.4732 2.67681 12.9214 2.11328 12.2411 2.11328H11.0089C10.3286 2.11328 9.77679 2.67681 9.77679 3.37168V9.03449H4.23214C3.55177 9.03449 3 9.59802 3 10.2929V11.5513C3 12.2462 3.55177 12.8097 4.23214 12.8097H9.77679V18.4725C9.77679 19.1674 10.3286 19.7309 11.0089 19.7309H12.2411C12.9214 19.7309 13.4732 19.1674 13.4732 18.4725V12.8097H19.0179C19.6982 12.8097 20.25 12.2462 20.25 11.5513V10.2929C20.25 9.59802 19.6982 9.03449 19.0179 9.03449Z"
                                fill="white" />
                        </svg>
                    </fieldset>

                    <div class="container">
                        <table class="table table-secondary" style="font-size: 13px; width: 36.55rem; margin-left: .4rem;">
                            <thead>
                                <tr>
                                    <th class="p-3 mb-2 bg-primary text-white">Id Contacto</th>
                                    <th class="p-3 mb-2 bg-primary text-white">Contacto</th>
                                    <th class="p-3 mb-2 bg-primary text-white">Puesto</th>
                                </tr>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nombre</td>
                                    <td>Puesto</td>

                                </tr>
                            </tbody>
                            </thead>
                        </table>
                    </div>

                </form>
            </div>
        </div>
        <div class="botones">
            <button class="btn btn-save"> Guardar</button>
            <button class="btn btn-danger">Cancelar</button>
        </div>
    </div>
</template>

<script>

import DatosEmpresa from '../components/frmDatosGrales.vue'
import DatosSucursal from '../components/sucursal.vue'
import Modal from '../components/modal.vue'
export default {
    components: {
        DatosEmpresa,
        DatosSucursal,
        Modal
    }

}

</script>

<style lang="scss" scoped>
@import '../../../styles/variables.scss';


h1 {
    text-align: left;
    margin: 1.4rem;
}

.frame {
    align-items: left;
    background-color: $panel;
    height: 50.875rem;
    margin: 1.5rem;
    margin-top: 0px;
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
}

.sucursales h2 {
    text-align: left;
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

.estadoSucursal,
.municipioSucursal,
.ciudadSucursal {
    width: 17.45rem;
    margin-top: .5rem;

}

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
}</style>