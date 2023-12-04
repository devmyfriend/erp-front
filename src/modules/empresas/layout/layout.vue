<template>
    <div class="mainContainer main d-flex flex-row vh-100">

        <div class="barraLateral">
    <div class="imgEmpresa">
      <img src="@/assets/img/imgEmpresa.svg" alt="Empresa">
    </div>

    
    <div class="modulosBarraLateral">
      <router-link to="/empresas/listado">
        <img src="@/assets/img/orgIco.svg" alt="Empresa">
        <p>Organización</p>
      </router-link>
      
      <img src="@/assets/img/ventaIco.svg" alt="Empresa">
      <p>Ventas</p>
      
      <img src="@/assets/img/compraIco.svg" alt="Empresa">
      <p>Compras</p>
      
      <img src="@/assets/img/catIco.svg" alt="Empresa">
      <p>Catálogo</p>
    
      <img src="@/assets/img/cfgIco.svg" alt="Empresa">
      <p>Configuración</p>
      
    </div>
    <div class="salida">
      <img src="@/assets/img/logoutIco.svg" alt="Empresa">
      <p>Logout</p>
    </div>
  </div>

        <div class="w-100">
            <div class="navMain d-flex justify-content-between align-items-center px-2 py-1">
                <a class="navbar-brand ps-3" href="#">GRUPO COMERCIAL MYFRIEND</a>
                <a class="iconUsr pe-3" href="#"> <img src="@/assets/img/userIco.svg" alt="Usuario" ></a>
            </div>
            <router-view />
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

<style scoped>
.barraLateral{
  height: 100vh;
  background-color: #343A40;
  width: 4.0625rem;
  min-width: 4.0625rem;
  color: #CBCBCB;
}
.modulosBarraLateral {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.modulosBarraLateral a{
  text-decoration: none;
  color: #CBCBCB;
}
.modulosBarraLateral img {
  width: 1.5rem;
  margin-top: 3rem;
  @media screen and (max-height: 920px) {
    margin-top: 2rem;
  }
}
.modulosBarraLateral p{
  font-size: 0.5rem; 
  margin-top: 0.5rem;
}
.imgEmpresa img {
  width: 3.125rem;
  margin-top: 0.75rem;
}
.salida{
  margin-top: 35vh;
  font-size: 0.5rem;
  @media screen and (max-height: 820px) {
    margin-top: 13rem;
  }
  @media screen and (max-height: 620px) {
    margin-top: 2rem;
  }
}

.navMain{
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    background-color: #D9D9D9;
}
</style>