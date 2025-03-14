<template>
    <div class="card" @commentForm="sendCommentForm()">
      <div class="card-img-container">
        <img class="prestataire-img" alt="prestimg" :src="require(`../assets/ImagesPrestataires/${image}`)" />
      </div>
      <div class="prestataire-desc">
        <h4>{{ nom }}</h4>
        <p>{{ descriptionAccueil }}</p>
      </div>
      <router-link :to="persPageRoute">
          <button class="prestataire-btn">{{$t('appTexts.acceder')}}</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "CartePrestatairePerso",
    props: {
      nom: String,
      descriptionAccueil: String,
      image: String,
      persPageRoute: String
    }
  };
  </script>
  
  <style scoped>
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    height: 350px;
    width: 250px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  
  .card-img-container{
    height: 100px;
  }

  .prestataire-img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .prestataire-desc {
    padding: 16px;
    height: 150px;
    text-align: center;
    overflow-y: scroll;
  }
  
  button {
    position: relative;
    padding: 12px 24px;
    background-color: #708871;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  