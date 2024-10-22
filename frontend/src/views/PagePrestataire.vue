<template>
    <div class="prestataire-detail" v-if="prestataire">
      <div class="image-container">
        <img class="animate-fade" :src="require(`@/assets/${prestataire.image}`)" alt="Logo du Prestataire">
      </div>
      <div class="info-container animate-slide">
        <h1>{{ prestataire.nom }}</h1>
        <p>{{ prestataire.description }}</p>
        <ul>
          <li><strong>Catégorie:</strong> {{ prestataire.categorie }}</li>
          <li><strong>Emplacement:</strong> {{ prestataire.id_emplacement }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Chargement des données...</p>
    </div>
  </template>
  
  <script>
  import { prestataires } from '@/datasource/data';
  
  export default {
    name: "PrestataireDetail",
    data() {
      return {
        prestataire: null,
      };
    },
    created() {
      const id = this.$route.params.id;
      this.prestataire = prestataires.find(p => p.id === id);
    },
  };
  </script>
  
  <style scoped>
  .prestataire-detail {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    overflow: hidden;
    padding: 16px;
  }
  
  .image-container {
    flex: 1;
    padding: 10px;
  }
  
  .image-container img {
    max-width: 75%;  /* Réduire la taille de l'image */
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: opacity 0.5s ease-in-out; /* Animation */
  }
  
  .info-container {
    flex: 2;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: slideIn 0.5s forwards; /* Animation */
  }
  
  h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    margin-bottom: 5px;
    color: #666;
  }
  
  ul li strong {
    color: #333;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade {
    animation: fadeIn 1s ease-in-out;
  }
  
  @keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  .animate-slide {
    animation: slideIn 1s ease-in-out;
  }
  </style>
  