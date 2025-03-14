<template>
  <body>
    <div id="chrono">
      <p>{{$t("appTexts.dateDebut")}}</p>
      <p>{{$t("appTexts.debut")}}</p>
      <div class="chrono">
        <strong>{{chrono}}</strong>
      </div>
    </div>
    <div class="buttons">
    </div>
  </body>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: "TempsRestant",
  data(){
    return{
      chrono: '',
      dateEvenement: new Date(2025, 10, 1)
    }
  },
  computed : {
    ...mapState('langue', ['currentLanguage']),
  },
  methods:{
    calculChrono(){
      let differenceMs = this.dateEvenement - new Date()
      let jours = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
      let heures = Math.floor((differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
      let secondes = Math.floor((differenceMs % (1000 * 60)) / 1000);

      if(this.currentLanguage === "en"){
        if (jours === 0) this.chrono = `${heures} hours, ${minutes} minutes, ${secondes} seconds`;
        else this.chrono = `${jours} days, ${heures} hours, ${minutes} minutes`;
      }else {
        if (jours === 0) this.chrono = `${heures} heures, ${minutes} minutes, ${secondes} secondes`;
        else this.chrono = `${jours} jours, ${heures} heures, ${minutes} minutes`;
      }
    }
  },
  created() {
    setInterval(this.calculChrono, 1000);
    this.calculChrono();
  }
}

</script>

<style scoped>
#chrono {
  font-family: 'Arial', sans-serif;
  text-align: center;
  margin: 10% auto;
  background: linear-gradient(to bottom, #0b3d0b, #1e622e, #2a7d2a);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  padding: 30px;
  max-width: 400px;
}

#chrono p {
  font-size: 1.8rem; /* Augmente la taille du texte descriptif */
  font-weight: 600; /* Renforce le poids pour mieux contraster */
  margin-bottom: 20px; /* Ajoute un espace sous le paragraphe */
}

.chrono {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.chrono-box {
  background-color: #ffffff;
  color: #2c3e50;
  font-size: 3rem; /* Augmente la taille des chiffres */
  font-weight: bold;
  width: 90px; /* Boîte agrandie pour s'adapter aux chiffres */
  height: 90px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.chrono-labels {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.chrono-label {
  font-size: 1.4rem; /* Augmente la taille des étiquettes */
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
}


</style>