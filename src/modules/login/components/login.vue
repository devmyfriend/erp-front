<template>
    <div class="login">
      <h1>Acceso</h1>
      <img src="@/assets/userIco.svg" alt="userIco" class="userIcon">
      <form @submit.prevent="login">
        <div class="form-group">
          <p class="msjFallo" v-if="failLogin"> El usuario y/o contraseña son incorrectos</p>  
        </div>
        <div class="form-group">
          <input type="email" id="email" v-model="email" class="form-control" required placeholder="Correo electrónico" >
        </div>
        <div class="form-group">
          <input type="password" id="password" v-model="password" class="form-control" required placeholder="Contraseña">
        </div>
        <button type="submit" class="btn btn-primary" @click="login()">Iniciar sesión</button>
      </form>
      <div class="recPassw">
          <a href="#" > ¿Olvidaste tu contraseña? Haz click aquí</a>
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
        failLogin: true
      };
    },
    methods: {
      login() {
          alert('Inicio de sesión exitoso');
      }
    }
  };
  </script>
  
  <style lang="scss">
  body {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-image: url('@/assets/bg-login.svg'); 
        background-size: cover; 
        background-position: center; 
        background-repeat: no-repeat; 
      }
  h1{
      color: #fff;
      font-size: 24px;
      padding-top: 24px;
  }
  .login {
      text-align: center;
      padding: 16px auto;
      background-color: rgba(255, 255, 255, 0.4); 
      margin: 0 auto;
      width: 486.6px; 
      height: 476.6px;
  }
  .userIcon{
      width: 20%;
      margin: 0 auto;
      display: block;
  }
  .form-group {
    margin-bottom: 16px;
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
    width: 80%;
    padding: 8px;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  .recPassw a {
      color: #000;
      font-size: 12px;
      margin-top: 16px;
      text-decoration: none;
  }
  </style>
  