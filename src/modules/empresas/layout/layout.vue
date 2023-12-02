<template>
    <div class="mainContainer main d-flex flex-row vh-100">
        <div class="sideNav nav col-1 position-relative vh-100" style="min-width: 6.25rem; min-height: 100vh;">
            <div class="d-flex flex-column align-items-center mx-auto row-gap-3">
                <a href="#" class="empLogo mx-auto mb-4 mw-100 mh-100">
                    <img src="@/assets/img/imgEmpresa.svg" class="w-100">
                </a>
                <a  class="d-flex flex-column align-items-center text-center text-decoration-none moduloSide mb-3">
                    <img src="@/assets/img/orgIco.svg" class="w-25">
                    <span class="section-title">Organización</span>
                </a>
                <a href="#" class="d-flex flex-column align-items-center text-center text-decoration-none moduloSide mb-3">
                    <img src="@/assets/img/ventaIco.svg" class="w-50">
                    <span class="section-title">Ventas</span>
                </a>
                <a href="#" class="d-flex flex-column align-items-center text-center text-decoration-none moduloSide mb-3">
                    <img src="@/assets/img/compraIco.svg" class="w-50">
                    <span class="section-title">Compras</span>
                </a>
                <a href="#" class="d-flex flex-column align-items-center text-center text-decoration-none moduloSide mb-3">
                    <img src="@/assets/img/catIco.svg" class="w-25">
                    <span class="section-title">Catálogo</span>
                </a>
                <a href="#" class="d-flex flex-column align-items-center text-center text-decoration-none moduloSide mb-3">
                    <img src="@/assets/img/cfgIco.svg" class="w-25">
                    <span class="section-title">Configuración</span>
                </a>            
                <a href="#" class="d-flex flex-column align-items-center text-center text-decoration-none moduloSide mb-0 mt-5">
                    <img src="@/assets/img/logoutIco.svg" class="w-50 mt-5">
                    <span class="section-title">Logout</span>
                </a>
            </div>
        </div>
        <div class="col-11">
            <div class="navMain d-flex justify-content-between align-items-center px-2 py-1">
                <a class="navbar-brand ps-3" href="#">GRUPO COMERCIAL MYFRIEND</a>
                <a class="iconUsr pe-3" href="#"> <img src="@/assets/img/userIco.svg" alt="Usuario" ></a>
            </div>

            <div class="container contNegro w-100 col-12">
            <!-- <div class="container contNegro w-100 position-absolute"> -->
                <div class="container contAzul w-100">
                    
                    <div class="container contRojo">
                        <router-view />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
    setup() {

        return {

        };
    },
    components: {
    },
  
});
</script>

<style>
.body{
    margin: 0px;
    padding: 0px;
}
.sideNav{
    background-color: #343A40;
    color: #CBCBCB;
}
.section-title{
    color: #CBCBCB;
}
.navMain{
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    background-color: #D9D9D9;
}
</style>