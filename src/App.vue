<template>

  <nav>
  <ul>
    <li><strong>Moj muzej</strong></li>
  </ul>
  <ul>
    <li v-if="!authdata.authenticated"><router-link to="/">Home</router-link></li>
    <li><router-link to="/muzeji" v-if="authdata.authenticated">Muzeji</router-link></li>
    <li><router-link to="/karte" v-if="authdata.authenticated && isAdmin ===false">Karte</router-link></li>
     <li><router-link to="/sverezervacije" v-if="authdata.authenticated && isAdmin ===true">Rezervacije</router-link></li>
          <li><router-link to="/addmuzej" v-if="authdata.authenticated && isAdmin ===true">Dodaj Muzej</router-link></li>
    <li v-if="!authdata.authenticated"><router-link to="/login">Login</router-link></li>
          <li  @click="logout()" v-if="authdata.authenticated">
           Logout
          </li>
  </ul>
</nav>
  <router-view/>
</template>

<script>
import { Auth } from "@/services"

export default {
  data(){
    return{
      authdata:Auth.state,
      isAdmin: false
    }
  },
  methods:{
    logout(){
      Auth.logout();
      this.$router.push({path: "/"}).then(() => location.reload())
    },
    getPrevi() {
      try{
      let perv = Auth.getUser();
     this.isAdmin = perv.isAdmin
      }catch(e){
        console.log(e)
      }
    }
  },
  created(){
      this.getPrevi();
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    color: #2c3e50;

    &.router-link-exact-active {
      color: #4276b9;
    }
  }
}
</style>
