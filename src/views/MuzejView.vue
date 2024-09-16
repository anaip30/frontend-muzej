<template>
  <div class="muzeji">
    <h1>Muzeji</h1>

    <!-- Polje za pretragu -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Pretraži muzeje..."
      />
    </div>

    <!-- Prikaz muzeja sa filtriranjem -->
    <div class="museum-card" v-for="museum in filteredMuseums" :key="museum._id">
      <img :src="museum.image" alt="Slika muzeja" class="museum-image">
      <h3>{{ museum.name }}</h3>
      <p>{{ museum.address }}</p>
      <p>Radno vrijeme: {{ museum.hours }}</p>

      <!-- Prikaz prosjecne ocjene -->
      <p>Proseječna ocjena: {{ museum.averageRating ? museum.averageRating.toFixed(1) : 'N/A' }} / 5</p>

      <!-- Sekcija za komentare i ocenjivanje -->
      <div class="comments-section">
        <h4>Komentari</h4>
        <div v-for="(comment, index) in museum.comments" :key="index" class="comment">
          <p><strong>{{ comment.user }}</strong>: {{ comment.text }}</p>
        </div>

        <div class="add-comment">
          <input
            type="text"
            v-model="newCommentText[museum._id]"
            placeholder="Dodaj komentar"
          />
          <select v-model="userRating[museum._id]" class="rating-select">
            <option value="" disabled>Izaberite ocjenu</option>
            <option v-for="rating in [1, 2, 3, 4, 5]" :key="rating" :value="rating">
              {{ rating }}
            </option>
          </select>
          <button @click="addComment(museum._id)">Pošalji</button>
        </div>
      </div>

      <!-- Gumb za brisanje muzeja -->
      <button @click="deleteMuseum(museum._id)" class="delete-button" v-if="isAdmin">
        Obriši muzej
      </button>
    </div>
  </div>
  <Footer/>
</template>


<script>
import Footer from '@/components/Footer.vue';
import { Service, Auth } from '@/services';

export default {
  name: 'Muzeji',
  components: {
    Footer
  },
  data() {
    return {
      museums: [],
      newCommentText: {},
      isAdmin: false,
      searchQuery: '',
      userRating: {}  
    };
  },
  computed: {
    filteredMuseums() {
      if (!this.searchQuery) {
        return this.museums;
      }
      const query = this.searchQuery.toLowerCase();
      return this.museums.filter(museum =>
        museum.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    isAdmiFun(){
      this.isAdmin = Auth.getUser().isAdmin;
    },
    async fetchMuseums() {
      try {
        const response = await Service.get('/muzeji');
        this.museums = response.data;
      } catch (error) {
        console.error('Error fetching museums:', error);
      }
    },
    async addComment(museumId) {
      let user = Auth.getUser();
      if (this.newCommentText[museumId]) {
        const newComment = {
          user: user.email,
          text: this.newCommentText[museumId]
        };

        try {
          const response = await Service.post(`/muzeji/${museumId}/comments`, newComment);
          const museum = this.museums.find(museum => museum._id === museumId);
          museum.comments.push(newComment);
          this.newCommentText[museumId] = '';
          this.userRating[museumId] = '';  // Reset user rating after comment is added
          Swal.fire({
            text: "Uspješno ste objavili komentar",
            icon: "success",
          });
        } catch (error) {
          console.error('Error adding comment:', error.response?.data || error.message);
        }
      }
    },
    async deleteMuseum(museumId) {
      try {
        if (this.isAdmin) {
          await Service.delete(`/muzeji/${museumId}`);
          this.museums = this.museums.filter(museum => museum._id !== museumId);
          Swal.fire({
            text: "Uspješno ste izbrisali muzej",
            icon: "success",
          });
        }
      } catch (error) {
        console.error('Error deleting museum:', error.response?.data || error.message);
      }
    },
    async submitRating(museumId) {
      const rating = this.userRating[museumId];
      if (rating) {
        const user = Auth.getUser();
        const ratingData = {
          user: user.email,
          rating
        };

        try {
          await Service.post(`/muzeji/${museumId}/ratings`, ratingData);
          Swal.fire({
            text: "Uspješno ste ocijenili muzej",
            icon: "success",
          });
          this.fetchMuseums();  // Ponovno učitavanje muzeja kako bi se ažurirali podaci
        } catch (error) {
          console.error('Error submitting rating:', error.response?.data || error.message);
        }
      }
    }
  },
  mounted() {
    this.fetchMuseums();
    this.isAdmiFun();
  }
};
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

.search-bar {
  margin-bottom: 20px;
  text-align: center;
}

.search-bar input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  font-size: 16px;
}

.museum-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: 20px auto;
  text-align: center;
  width: 450px;
}

.museum-image {
  width: 100%;
  height: auto;
  border-radius: 16px 16px 0 0;
}

p {
  color: #555;
  margin: 5px 0;
}

.comments-section {
  margin-top: 15px;
  text-align: left;
}

.comment {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.add-comment {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.rating-select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  background-color: #4276b9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #365f91;
}

/* Stil za gumb za brisanje muzeja */
.delete-button {
  margin-top: 15px;
  background-color: #e74c3c;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>

