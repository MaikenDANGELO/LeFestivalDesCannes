<!-- À ADAPTER POUR CORRESPONDRE AUX SPONSORS !!-->
<template>
    <div class="prestataire-detail" v-if="sponsor">
      <div class="image-container">
        <img class="animate-fade" :src="require(`@/assets/${sponsor.image}`)" alt="Logo du Prestataire">
      </div>
      <div class="info-container animate-slide">
        <h1>{{ sponsor.nom_sponsor }}</h1>
        <p>{{ sponsor.description }}</p>
        <ul>
          <li><strong>Emplacement:</strong> {{ sponsor.id_emplacement }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Chargement des données... (probleme à régler en rechargeant la page)</p>
    </div>
  </template>

  <script>
  import {mapActions, mapState} from 'vuex';
  export default {
    name: "SponsorDetail",
    data() {
      return {
        sponsor: null,
        user_note: 0,
        user_comment: "",
      };
    },
    methods:{
      ...mapActions('sponsors', ['getAllSponsors']),
    },
    computed: {
      ...mapState('sponsors', ["sponsors"])
    },
    async created() {
        await this.getAllSponsors();
        const id = this.$route.params.id;
        this.sponsor = this.sponsors.find(p => p.id_sponsor === id); // récupère le sponsor d'après l'id renseignée depuis la Page  principale
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 16px;
  }
  
  .image-container {
    flex: 1;
    padding: 10px;
  }
  
  .image-container img {
    max-width: 75%;
    /* Réduire la taille de l'image */
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: opacity 0.5s ease-in-out;
    /* Animation */
  }
  
  .info-container {
    flex: 2;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: slideIn 0.5s forwards;
    /* Animation */
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
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
    }
  }
  
  .animate-fade {
    animation: fadeIn 1s ease-in-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
  
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .animate-slide {
    animation: slideIn 1s ease-in-out;
  }
  
  
  .rating {
    display: flex;
    width: 100%;
    justify-content: left;
    overflow: hidden;
    flex-direction: row-reverse;
    position: relative;
  }
  
  .rating > input {
    display: none;
  }
  
  .rating > label {
    cursor: pointer;
    width: 40px;
    height: 40px;
    margin-top: auto;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 76%;
    transition: .3s;
  }
  
  .rating > input:checked ~ label,
  .rating > input:checked ~ label ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23fcd93a' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
  }
  
  
  .rating > input:not(:checked) ~ label:hover,
  .rating > input:not(:checked) ~ label:hover ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23d8b11e' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e");
  }
  
  
  
  </style>