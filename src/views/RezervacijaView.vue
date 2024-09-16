<template>
  <div class="rezervacije">
    <h1>Rezervacije</h1>
    <div class="reservation-card" v-for="reservation in reservations" :key="reservation._id">
      <div class="reservation-content">
        <div class="reservation-info">
          <h2>{{ reservation.firstName }} {{ reservation.lastName }}</h2>
          <p>Telefon: {{ reservation.phone }}</p>
          <p>Datum: {{ reservation.datum }}</p>
          <p>Odabrani Muzej: {{ reservation.selectedMuseum || 'N/A' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Service, Auth } from "@/services"; 
export default {
  name: 'Rezervacije',
  data() {
    return {
      reservations: [],
    }
  },
  async created() {

    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
        let user = Auth.getUser();

      try {
        if(user.isAdmin === true){
        const response = await Service.get("/sverezervacije");
        this.reservations = response.data; 
        }
      } catch (error) {
        console.error("Greška prilikom dohvatanja rezervacija:", error);
      }
    }
  }
}
</script>

<style scoped>
.rezervacije {
  padding: 20px;
  background-color: #f0f4f8;
  font-family: Arial, sans-serif;
}

h1 {
  color: #4276b9;
  text-align: center;
  margin-bottom: 20px;
}

.reservation-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 400px;
  max-width: 90%;
  padding: 15px;
  border: 2px dashed #4276b9;
}

.reservation-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reservation-info {
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
</style>
