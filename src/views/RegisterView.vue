<template>
    <br><br>
    <div class="registration-page">
      <h1>Registracija</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Korisničko ime:</label>
          <input type="text" id="username" v-model="email" required />
        </div>
  
  
        <div class="form-group">
          <label for="password">Lozinka:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
  
        <div class="form-group">
          <label for="confirmPassword">Potvrdi lozinku:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
  
        <button type="submit" class="register-button">Registriraj se</button>
      </form>
    </div>
  </template>
  
  <script>
  import { Auth } from "@/services";
  export default {
    name: 'RegistrationPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
    async register() {
      try {

        let success = await Auth.registeruser(this.email, this.password,);

        if (success) {
          this.$router.replace({ path: "/login" }).then(() => location.reload());
        }
      } catch (e) {
        console.log(e);

      }
    }
    }
  };
  </script>
  
  <style scoped>
  .registration-page {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
    background-color: #f0f4f8;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  h1 {
    color: #4276b9;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .register-button {
    width: 100%;
    padding: 10px;
    background-color: #4276b9;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .register-button:hover {
    background-color: #365f91;
  }
  </style>
  