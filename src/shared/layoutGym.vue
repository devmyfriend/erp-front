<template>
    <div class="layout-background">
        <div class="layout-container">
            <div class="layout-sideNav">
                <div class="sideNav-logo">
                    <img src="@/assets/img/empresas/fitgym.svg" alt="Empresa">
                </div>            
                <div class="modulos-sideNav">
                    <router-link :to="{ name: 'Empresas'}">
                        <img src="@/assets/img/orgIco.svg" alt="Empresa">
                        <p>Organización</p>
                    </router-link>
  
                    <router-link :to="{ name: 'Empresas'}">
                        <img src="@/assets/img/ventaIco.svg" alt="Empresa">
                        <p>Venta</p>
                    </router-link>
  
                    <router-link :to="{ name: 'Empresas'}">
                        <img src="@/assets/img/compraIco.svg" alt="Empresa">
                        <p>Compra</p>
                    </router-link>
                    <router-link :to="{ name: 'Empresas'}">
                        <img src="@/assets/img/catIco.svg" alt="Empresa">
                        <p>Catálogo</p>
                    </router-link>
                    <router-link :to="{ name: 'Empresas' }">
                        <img src="@/assets/img/cfgIco.svg" alt="Empresa">
                        <p>Configuración</p>
                    </router-link>
                    <router-link :to="{ path: '/Menu' }">
                        <img src="@/assets/img/cfgIco.svg" alt="Empresa">
                        <p>MENU TEMPORAL</p>
                    </router-link>
                    <router-link to="/" class="Empresas logout">
                        <img src="@/assets/img/logoutIco.svg" alt="Empresa">
                        <p>Logout</p>
                    </router-link>
                </div>
            </div>
            <div class="contenedor">
                <div class="navegador d-flex justify-content-between align-items-center px-2 py-1">
                    <a class="navbar-brand ps-3" href="#">THE FIT GYM</a>
                    <a class="iconUsr pe-3" href="#"> <img src="@/assets/img/userIco.svg" alt="Usuario" ></a>
                </div>
                <div class="contenedor-Contenido">
                        <router-view/>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
    body{
     height: 100vh;
     width: 100vw;   
    }
    .layout-background{
        height: 100vh;
        width: 100vw;
    }
    .layout-container{
        height: 100vh;
        width: 100vw;
        background-color: white;
        margin: auto;
        display: flex;
    }
    .layout-sideNav{
        height: 100vh;
        background-color: #0f0f0f;
        width: 4.0625rem;
        min-width: 4.0625rem;
        color: #fff;
        
        letter-spacing: 2px;
        font-size: 0.5rem;
        font-weight: 700;
        word-break:keep-all;
        text-transform: uppercase;
    }
    .sideNav-logo{
        width: 80%;
        height: 50px;
        margin: auto;
        margin-top: 0.75rem;
        background-color: #fff;
        border-radius: 2rem;
    }
    .sideNav-logo img{
        width: 100%;
    }
    .modulos-sideNav {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: 100%;
    }
    .modulos-sideNav a{
        text-decoration: none;
        color: #fff;
        margin-top: 1.5rem;
        width: 100%;
    }
    .modulos-sideNav img {
        width: 1.5rem;
    }
    .modulos-sideNav p{ 
        margin-top: 0.5rem;
        padding: 0rem 0.25rem;
        width: 100%;
        word-break: break-all;
    }
    .logout{
        position: absolute;
        bottom: 1.5rem;
    }
    .navegador{
        font-size: 2rem;
        font-weight: bold;
        color: #fff;
        background-color: #232323;
        border-bottom: 1px solid #F16136;
    }
    .contenedor{
        width: 100%;
        background-color: #353535;
    }
    .contenedor-Contenido{
        margin: 1.5rem;
        width: auto;
        height: auto;
        max-width: 100%;
        height: 40.5rem;
        max-height: 40.5rem;
        min-height: 40.5rem;
    }
    .iconUsr{
        cursor: pointer;
        height: 100%;
    }
    .iconUsr img{
        height: 100%;
    }
  </style>