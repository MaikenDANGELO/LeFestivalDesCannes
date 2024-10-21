<template>
  <div class="hello">
    <BanniereAccueil></BanniereAccueil> 
    <div class="liste-prestataires">
      <h2>Prestataires</h2>
      <div class="prestataires-row" v-for="row in getPrestaRows()" :key="row.id">
        <CartePrestatairePerso v-for="(prestataire) in row" :key="prestataire.id" :nom="prestataire['nom']" :description="prestataire['description']" :image="prestataire['image']" :pers-page-route="prestataire['page_route']"></CartePrestatairePerso>
      </div>
    </div>

  </div>
</template>



<script>
import {mapState} from "vuex";
import {prestataires} from "@/datasource/data";
import BanniereAccueil from "@/components/BanniereAccueil.vue"
import CartePrestatairePerso from "@/components/CartePrestatairePerso.vue";

export default {
  name: "PagePrincipale",
  date: () => ({
    prestatairesRows: [],
  }),
  methods: {
    prestataires() {
      return prestataires
    },
    getPrestaRows(){
      let prestataires = this.prestataires();
      var row = [];
      let rows = [];
      for(let i = 0; i < prestataires.length; i++){
        row.push(prestataires[i])
        if(row.length === 3){
          rows.push(row);
          row = [];
        }
        if(i === prestataires.length-1){
          rows.push(row)
        }
      }
      return rows;
    }
  },
  components: {
    BanniereAccueil,
    CartePrestatairePerso
  },
  computed:{
    ...mapState([prestataires])
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.liste-prestataires{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
.prestataires-row{
  display: flex;
  flex-direction: row;
  margin-bottom: 5%;
  gap: 5%;
}
</style>
