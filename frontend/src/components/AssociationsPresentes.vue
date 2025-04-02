<template>
  <div>

    <div class="list-prestataires">
      <h2>{{ $t('appTexts.associations') }} : </h2>
      <div class="prestataire" v-for="association in associations" :key="association.id_association">
        <div class="presta-top"><h3>{{ association.nom_association }}</h3></div>
        <div class="presta-sbody">
          <div class="presta-body">
            <div class="presta-icon">
              <img class="prestataire-img" alt="prestimg" :src="require(`../assets/${association.image}`)" />
            </div>
            <div class="presta-text">{{ association.description_accueil }}</div>
            <div class="presta-actions">
              <button @click="handleSponsorGoToPage(association.id_association)">{{ $t('appTexts.accederPage') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "PageAssociations",
  data() {
    return {};
  },
  computed: {
    ...mapState('associations', ['associations']),
  },
  methods: {
    ...mapActions('associations', ['getAllAssociations']),
    handleSponsorGoToPage(id) {
      this.$router.push("/sponsor/" + id);
    },
  },
  created() {
    this.getAllAssociations();
  },
};
</script>

<style>

/* Conteneur des associations */
.list-prestataires {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

/* Carte individuelle d'une association */
.prestataire {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px;
  transition: transform 0.3s ease-in-out;
}

/* Effet au survol de la carte */
.prestataire:hover {
  transform: translateY(-5px);
}

/* Partie haute de la carte (titre) */
.presta-top {
  background-color: #f4f4f4;
  padding: 10px;
  text-align: center;
}

/* Partie du corps de la carte */
.presta-sbody {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Icone de l'association (image) */
.presta-icon {
  margin-bottom: 10px;
}

.prestataire-img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

/* Description de l'association */
.presta-text {
  font-size: 14px;
  color: #555;
  text-align: center;
  margin: 10px 0;
}

/* Actions, le bouton pour accéder à la page */
.presta-actions {
  text-align: center;
}

button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

</style>
