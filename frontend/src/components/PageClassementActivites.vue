<template>
  <div class="classement">
    <h1>Classement des activités</h1>
    <div v-for="(presta,index) in presta_avis_average" :key="presta.id">
      <div v-if="index === 0">
        <h2>{{index+1}}. {{ presta.nom }} : {{ presta.note }}/5</h2>
      </div>
      <div v-else-if="index === 1">
        <h3>{{index+1}}. {{ presta.nom }} : {{ presta.note }}/5</h3>
      </div>
      <div v-else-if="index === 2">
        <h4>{{index+1}}. {{ presta.nom }} : {{ presta.note }}/5</h4>
      </div>
      <div v-else>
        <p>{{index+1}}. {{ presta.nom }} : {{ presta.note }}/5</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PageClassementActivites",
  data() {
    return {
      presta_avis_average: [],
    };
  },
  computed: {
    ...mapState("prestataire", ["prestataires","avis_prestataire_global"]),
  },
  methods: {
    ...mapActions("prestataire", [
      "getAllPrestataires",
      "getAllAvis",
    ]),

    async sortPrestaByRating() {
      await this.getPrestaAndRating(); // Calculer les moyennes des notes
      this.presta_avis_average.sort((a, b) => {
        return b.note - a.note;
      });
    },

    async getPrestaAndRating() {
      for (let prestataire of this.prestataires)
      {
        let i = 0;
        let noteCumul = 0;
        for (let avis of this.avis_prestataire_global){
         //console.log("Avis : " +avis.note + " Prestataire : " +avis.id_prestataire);
         if (String(avis.id_prestataire) === String(prestataire.id)){
           noteCumul += Number(avis.note);
           //console.log("Prestataire : " +prestataire.id + " Note : " +prestataire.note);
           i++;
         }
       }
        if(i === 0){
          this.presta_avis_average.push({id: prestataire.id, nom: prestataire.nom, note: 0});
        } else {
          let noteMoyenne = noteCumul / i;
          this.presta_avis_average.push({id: prestataire.id, nom: prestataire.nom, note: noteMoyenne});
        }

      }
    },
  },
  async created() {
    await this.getAllAvis(); // Charger les avis
    await this.getAllPrestataires(); // Charger les prestataires
    await this.sortPrestaByRating(); // Trier les prestataires par note
  },
};
</script>

<style scoped>

h2 {
  color: gold;
}

h3 {
  color: silver;
}
h4 {
  color: #cd7f32;
}

.classement {
  margin-left: 10%;
  margin-top: 3%;
}


</style>
