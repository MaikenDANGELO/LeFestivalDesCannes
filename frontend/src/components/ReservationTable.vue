<template>
    <div class="reservation-section">
      <div class="reservation-text">
        <h3>Découvrez la spécialité du jour !</h3>
        <p>
          Le Gourmet vous invite à savourer une expérience unique avec notre spécialité du jour.
          Les places sont limitées, alors réservez dès maintenant pour ne pas manquer cette occasion !
        </p>
        <router-link :to="{ name: 'ReservationRestaurantList' }" class="reservation-button">
          -> Réserver une table
        </router-link>
      </div>
      <img
        src="@/assets/gourmet.jpg"
        alt="Image Gourmet"
        class="reservation-image"
      />
    </div>
  </template>
  
  
  <script>
  export default {
    name: "ReservationTable",
    methods: {
      redirectToReservation() {
        this.$router.push("/reservation-restaurant");
      },
    },
  };
  </script>
  <style scoped>
  .reservation-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    margin: 40px auto;
    padding: 20px;
    max-width: 1200px; /* Plus large pour être proportionnel à la section des canards */
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    animation: fadeIn 2s ease-in-out forwards; /* Animation de fondu */
  }
  
  /* Image */
  .reservation-image {
    flex: 1;
    max-width: 300px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: transform 1s ease, box-shadow 0.3s ease;
  }
  
  .reservation-image:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
  
  /* Texte */
  .reservation-text {
    flex: 2;
    color: #2c3e50;
    line-height: 1.6;
    padding: 10px;
  }
  
  /* Titre */
  .reservation-text h3 {
    font-size: 2rem;
    font-weight: 800;
    color: #2c3e50;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 15px;
  }
  
  /* Description */
  .reservation-text p {
    font-size: 1rem;
    color: #4f4f4f;
    margin-bottom: 15px;
    line-height: 1.8;
  }
  
  /* Bouton */
  .reservation-button {
    display: inline-block;
    margin-top: 10px;
    font-size: 1.1rem;
    color: #27ae60;
    font-weight: bold;
    text-decoration: none;
    background-color: #ecf9f0;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .reservation-button:hover {
    background-color: #27ae60;
    color: #fff;
    transform: translateY(-3px);
  }
  
  /* Animation de fondu */
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  </style>
  