<template>
    <h1>Empresa</h1>
    <div class="frame">
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
                <div class="sucursales">
                    <h2>Sucursales</h2>
                    <img src="" alt="Agregar sucursal"> <span>Agregar sucursal </span>  
                    <img src="" alt="ver sucursal"> <span>Ver sucursales</span>
                </div>
            </div>
            <div class="datosContactos">
                <h2>Contacto</h2>
                <div class="framesucursal">
                    <DatosSucursal />
                </div>
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
    export default{
        components:{
            DatosEmpresa,
            DatosSucursal
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

</style>