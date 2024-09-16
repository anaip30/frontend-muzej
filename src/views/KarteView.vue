<template>
  <div class="muzeji">
    <h1>Rezervacija Karte</h1>
    <div class="ticket-card" v-for="museum in museums" :key="museum._id">
      <div class="ticket-content">
        <div class="ticket-info">
          <h2>{{ museum.name }}</h2>
          <p>{{ museum.address }}</p>
          <p>Radno vrijeme: {{ museum.hours }}</p>
        </div>
        <div class="ticket-actions">
          <button class="reserve-button" @click="kupikartu(museum._id)">Kupi Kartu</button>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import { Service } from "@/services"; // Uvozimo Service

export default {
  name: 'Muzeji',
  components: {
    Footer
  },
  data() {
    return {
      museums: [] // Početno stanje prazno
    }
  },
  async created() {
    // Dohvata muzeje kada se komponenta kreira
    await this.fetchMuseums();
  },
  methods: {
    async fetchMuseums() {
      try {
        const response = await Service.get("/muzeji");
        this.museums = response.data; // Postavljanje dobijenih muzeja u data
      } catch (error) {
        console.error("Greška prilikom dohvatanja muzeja:", error);
      }
    },
    kupikartu(){
      this.$router.push({ path: "/kupi" })
    }
  }
}
</script>

<style scoped>
.muzeji {
  padding: 20px;
  background-color: #f0f4f8;
  font-family: Arial, sans-serif;
}

h1 {
  color: #4276b9;
  text-align: center;
  margin-bottom: 20px;
}

.ticket-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 400px;
  max-width: 90%;
  position: relative;
  padding: 15px;
  border: 2px dashed #4276b9;
}

.ticket-card:before,
.ticket-card:after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  border: 2px dashed #4276b9;
}

.ticket-card:before {
  top: -11px;
  left: -11px;
}

.ticket-card:after {
  bottom: -11px;
  right: -11px;
}

.ticket-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-info {
  text-align: left;
}

h2 {
  color: #333;
  margin: 10px 0;
}

p {
  color: #555;
  margin: 5px 0;
}

.reserve-button {
  background-color: #4276b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reserve-button:hover {
  background-color: #365f91;
}
</style>
