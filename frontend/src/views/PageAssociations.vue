<template>
  <div>
    <div class="list-prestataires">
      <h2>Associations</h2>
      <div class="prestataire" v-for="association in associations" :key="association.id_association">
        <div class="presta-top"><h3>{{ association.nom_association }}</h3></div>
        <div class="presta-sbody">
          <div class="presta-body">
            <div class="presta-icon">
              <img class="prestataire-img" alt="prestimg" :src="association.image" />
            </div>
            <div class="presta-text">{{ association.description_accueil }}</div>
            <div class="presta-actions">
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
  },
  created() {
    this.getAllAssociations();
  },
};
</script>

<style>
</style>
