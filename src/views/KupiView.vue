<template>
  <br><br><br>
  <div class="rezervacija">
    <h1>Rezerviraj Kartu</h1>
    <form @submit.prevent="submitReservation">
      <div class="form-group">
        <label for="firstName">Ime:</label>
        <input type="text" id="firstName" v-model="firstName" required />
      </div>

      <div class="form-group">
        <label for="lastName">Prezime:</label>
        <input type="text" id="lastName" v-model="lastName" required />
      </div>

      <div class="form-group">
        <label for="phone">Broj Telefona:</label>
        <input type="tel" id="phone" v-model="phone" required />
      </div>

      <div class="form-group">
        <label for="museum">Odaberi Muzej:</label>
        <select id="museum" v-model="selectedMuseum" required>
          <option v-for="museum in museums" :key="museum._id" :value="museum.name">
            {{ museum.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="phone">Broj Telefona:</label>
        <input type="date" v-model="datum" />
      </div>

      <button type="submit" class="submit-button">Rezerviraj</button>
    </form>
  </div>
  <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue'
import { Service } from "@/services";

export default {
  name: 'RezervacijaKarte',
  components: {
    Footer
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      selectedMuseum: '',
      datum: '',
      museums: [] 
    };
  },
methods: {
  async fetchMuseums() {
    try {
      const response = await Service.get("/muzeji");
      this.museums = response.data;
    } catch (error) {
      console.error("Greška prilikom dohvatanja muzeja:", error);
    }
  },
  async submitReservation() {
    try {
      const reservationData = {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        museum: this.selectedMuseum,
        datum: this.datum
      };

      const response = await Service.post("/rezervacija", reservationData);
      Swal.fire({
  text: "Uspjesno ste rezervisali kartu",
  icon: "success",
});
      
      // resetira formu
      this.firstName = '';
      this.lastName = '';
      this.phone = '';
      this.selectedMuseum = '';
      this.datum = '';
    } catch (error) {
      console.error("Greška prilikom slanja rezervacije:", error);
      alert("Došlo je do greške prilikom rezervacije. Molimo pokušajte ponovo.");
    }
  }
},
  created() {
    this.fetchMuseums(); // Pozivamo funkciju kada komponenta bude kreirana
  }
}
</script>

<style scoped>
.rezervacija {
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
input[type="tel"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #4276b9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #365f91;
}
</style>
