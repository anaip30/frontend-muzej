<template>
  <div class="home">
    <header class="header">
      <img alt="Moj Muzej logo" src="../assets/logo.png" class="logo">
      <h1>Dobrodošli u Moj Muzej</h1>
    </header>
    <section class="intro">
      <p>Otkrijte bogatstvo kulturne baštine i istražite nebrojene muzejske zbirke diljem svijeta.</p>
      <p class="slogan">"Gdje prošlost susreće budućnost"</p>
    </section>
    <button class="view-all-button" @click="goreraute()">Pogledaj sve muzeje</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goreraute(){
      this.$router.push({ path: "/muzeji" })
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  color: #4276b9;
  font-family: Arial, sans-serif;
  background-color: #f0f4f8;
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 10px;
}

.intro {
  font-size: 18px;
  margin-bottom: 20px;
}

.slogan {
  font-style: italic;
  margin-top: 10px;
  color: #2c3e50;
}

h1 {
  font-size: 2.5em;
  margin: 0;
  color: #4276b9;
}

p {
  color: #333;
}

.view-all-button {
  background-color: #4276b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.view-all-button:hover {
  background-color: #365f91;
}
</style>
