<template>
  <body>
    <div id="chrono">
      <p>Début de l'événement: </p>
      <div class="chrono">
        {{chrono}}
      </div>
    </div>
    <div class="buttons">
    </div>
  </body>
</template>

<script>
export default {
  name: "TempsRestant",
  data(){
    return{
      chrono: '',
    }
  },
  methods:{
    calculChrono(){
      let differenceMs = new Date(2025, 6, 15) - new Date()
      let jours = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
      let heures = Math.floor((differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
      let secondes = Math.floor((differenceMs % (1000 * 60)) / 1000);


      if (jours === 0) this.chrono = `${heures} heures, ${minutes} minutes, ${secondes} secondes`;
      else this.chrono = `${jours} jours, ${heures} heures, ${minutes} minutes`;
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
  font-size: 2rem;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
}
button {
  font-size: 20px;
  margin: 10px;
  padding: 10px 20px;
}
.buttons {
  text-align: center;
}
</style>