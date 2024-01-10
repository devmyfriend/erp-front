<template>
  <div class="logContainer w-100 h-100">
    <h1 class="mx-auto"> POSHEXAGON </h1>
    <div class="login mx-auto">
      <h2>Acceso</h2>
      <img src="@/assets/img/userIco.svg" alt="userIco" class="userIcon">
      <form @submit.prevent="login">
        <div class="form-group">
          <p class="msjFallo" v-if="falloIniciarSesion"> El usuario y/o contraseña son incorrectos</p>  
        </div>
        <div class="form-group">
          <input type="email" id="email" v-model="email" class="form-control" required placeholder="Correo electrónico" >
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="password" class="form-control" required placeholder="Contraseña">
        </div>
        <router-link to="/empresas">
          <button type="submit" class="btn btn-primary">Iniciar sesión</button>
        </router-link>
      </form>
      <div class="recPassw">
          <a href="#" > ¿Olvidaste tu contraseña? Haz click aquí</a>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        falloIniciarSesion: false
      };
    },
    methods: {
      login() {
          alert('Inicio de sesión exitoso');
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .logContainer{
    background-image: url('@/assets/img/bg-login.svg'); 
    background-size: cover; 
    background-position: center; 
    background-repeat: no-repeat;
    min-height: 100vh;
  }
  body {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  h1{
    padding: 4rem 0;
    font-size: 50px;
    color: #458D78;
    font-family:'Times New Roman', Times, serif;
  }
  h2{
      color: #fff;
      font-size: 24px;
      padding-top: 24px;
  }
  .login {
      text-align: center;
      padding: 16px auto;
      background-color: rgba(255, 255, 255, 0.4); 
      width: 486.6px; 
      height: 476.6px;
  }
  .userIcon{
      width: 20%;
      margin: 0 auto;
      display: block;
  }
  .form-group {
    margin-bottom: 8px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .msjFallo{
      color: red;
      font-size: 12px;
      margin: 8px auto;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 75%;
    padding: 8px;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #1D6042;
    font-size: 0.875rem;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #175539;
  }
  .recPassw a {
      color: #000;
      font-size: 12px;
      margin-top: 16px;
      text-decoration: none;
  }
  </style>
  