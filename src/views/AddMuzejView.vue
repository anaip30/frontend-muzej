<template>
  <div class="add-museum">
    <h1>Dodaj Novi Muzej</h1>
    <form @submit.prevent="addMuseum">
      <div class="form-group">
        <label for="name">Naziv:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
  
      <div class="form-group">
        <label for="address">Adresa:</label>
        <input type="text" id="address" v-model="address" required />
      </div>
  
      <div class="form-group">
        <label for="hours">Radno Vrijeme:</label>
        <input type="text" id="hours" v-model="hours" required />
      </div>
  
      <div class="form-group">
        <label for="image">URL Slike:</label>
        <input type="text" id="image" v-model="image" required />
      </div>
  
      <button type="submit" class="submit-button">Dodaj Muzej</button>
    </form>
  </div>
</template>

<script>
import { Service,Auth } from "@/services"; // Uvozite Service iz vaše datoteke

export default {
  name: 'AddMuseum',
  data() {
    return {
      name: '',
      address: '',
      hours: '',
      image: '',
    };
  },
  methods: {
    async addMuseum() {
      try {
        let user = Auth.getUser();
        if(user.isAdmin == true){
        const museumData = {
          name: this.name,
          address: this.address,
          hours: this.hours,
          image: this.image,
        };
        
        await Service.post('/muzeji', museumData);
        alert('Muzej je uspješno dodan!');
        this.resetForm();
        }
      } catch (error) {
        console.error('Došlo je do greške:', error);
        alert('Greška prilikom dodavanja muzeja.');
      }
    },
    resetForm() {
      this.name = '';
      this.address = '';
      this.hours = '';
      this.image = '';
    },
  },
};
</script>

<style scoped>
.add-museum {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

input[type="text"] {
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
