<template>
  <div class="classement">
    <h1>{{$t('appTexts.classementActivites')}}</h1>
    <div v-if="currentLanguage === 'fr'">
      <div v-for="(presta, index) in presta_avis_average" :key="presta.id" class="rank-item">
        <div v-if="index === 0" class="first-place">
          <h2>{{ index + 1 }}. {{ presta.nom }} : {{ presta.note }}/5</h2>
        </div>
        <div v-else-if="index === 1" class="second-place">
          <h3>{{ index + 1 }}. {{ presta.nom }} : {{ presta.note }}/5</h3>
        </div>
        <div v-else-if="index === 2" class="third-place">
          <h4>{{ index + 1 }}. {{ presta.nom }} : {{ presta.note }}/5</h4>
        </div>
        <div v-else class="other-place">
          <p>{{ index + 1 }}. {{ presta.nom }} : {{ presta.note }}/5</p>
        </div>
      </div>
    </div>
    <div v-else >
      <div v-for="(presta, index) in presta_avis_average" :key="presta.id" class="rank-item">
        <div v-if="index === 0" class="first-place">
          <h2>{{ index + 1 }}. {{ presta.nom_en }} : {{ presta.note }}/5</h2>
        </div>
        <div v-else-if="index === 1" class="second-place">
          <h3>{{ index + 1 }}. {{ presta.nom_en }} : {{ presta.note }}/5</h3>
        </div>
        <div v-else-if="index === 2" class="third-place">
          <h4>{{ index + 1 }}. {{ presta.nom_en }} : {{ presta.note }}/5</h4>
        </div>
        <div v-else class="other-place">
          <p>{{ index + 1 }}. {{ presta.nom_en }} : {{ presta.note }}/5</p>
        </div>
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
    ...mapState("langue", ["currentLanguage"]),
    ...mapState("prestataire", ["prestataires", "avis_prestataire_global"]),
  },
  methods: {
    ...mapActions("prestataire", [
      "getAllPrestataires",
      "getAllAvis",
    ]),

    async sortPrestaByRating() {
      await this.getPrestaAndRating(); // Calculate average ratings
      this.presta_avis_average.sort((a, b) => {
        return b.note - a.note;
      });
    },

    async getPrestaAndRating() {
      for (let prestataire of this.prestataires) {
        let i = 0;
        let noteCumul = 0;
        for (let avis of this.avis_prestataire_global) {
          if (String(avis.id_prestataire) === String(prestataire.id)) {
            noteCumul += Number(avis.note);
            i++;
          }
        }

        if (i === 0) {
          this.presta_avis_average.push({id: prestataire.id, nom: prestataire.nom, nom_en: prestataire.nom_en,note: 0});
        } else {
          let noteMoyenne = noteCumul / i;
          this.presta_avis_average.push({id: prestataire.id, nom: prestataire.nom,nom_en: prestataire.nom_en, note: noteMoyenne});
        }

      }
    },
  },
  async created() {
    await this.getAllAvis();
    await this.getAllPrestataires();
    await this.sortPrestaByRating();
  },
};
</script>

<style scoped>
/* Global styles */
.classement {
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 3%;
  font-family: Arial, sans-serif;

}

h1 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

/* Styling for ranking items */
.rank-item {
  margin-bottom: 15px;
}

/* First place (Gold) */
.first-place {
  background-color: #ffd700;
  padding: 15px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.first-place h2 {
  margin: 0;
  font-size: 24px;
}

/* Second place (Silver) */
.second-place {
  background-color: #c0c0c0;
  padding: 15px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.second-place h3 {
  margin: 0;
  font-size: 20px;
}

/* Third place (Bronze) */
.third-place {
  background-color: #cd7f32;
  padding: 15px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.third-place h4 {
  margin: 0;
  font-size: 18px;
}

/* Other places (Normal rankings) */
.other-place {
  padding: 10px;
  border-radius: 8px;
  background-color: #f4f4f4;
  font-size: 16px;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

/* Optional styling to add a bit of spacing and rounded corners */
.rank-item:not(:last-child) {
  margin-bottom: 10px;
}

.rank-item p, .rank-item h2, .rank-item h3, .rank-item h4 {
  margin: 0;
  padding: 0;
}
</style>
