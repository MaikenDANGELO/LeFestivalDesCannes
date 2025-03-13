<template>
    <div class="container">
        <div class="carte">
            <InteractiveMap @new-location="onNewLocation"></InteractiveMap>
            <button v-if="isEditingLocation" @click="confirmNewLocation">Enregistrer un nouvel emplacement</button>
            <select v-if="isEditingLocation" id="browsers" v-model="chosenIcon">
                <option value="">Choisir l'icone d'emplacement</option>
                <option value="evenement">Evenement</option>
                <option value="pedalo">Pedalo</option>
                <option value="restaurant">Restaurant</option>
                <option value="peinture">Peinture</option>
                <option value="stand">Stand</option>
            </select>
        </div>
        <div class="texte-container">
            <h2 class="title">{{ $t('pageAccesTexts.titreMigrez') }}</h2>
            <p class="text">
              {{ $t('pageAccesTexts.texteMigrez1') }}<br><br>
              {{ $t('pageAccesTexts.texteMigrez2') }}<br><br>
              {{ $t('pageAccesTexts.texteMigrez3') }}<br><br>
              {{ $t('pageAccesTexts.texteMigrez4') }}<br><br>
            </p>
            <h2 class="title">{{ $t('pageAccesTexts.informationsAcces') }}</h2>

                <ul style="position: relative;bottom: 20px;">
                  <li><strong>{{ $t('pageAccesTexts.adresse') }} </strong> : Presqu'île du Malsaucy, Rue du Malsaucy, 90300 Sermamagny</li><br>
                  <li><strong>{{ $t('pageAccesTexts.depuisGareTGV1') }}</strong><br> {{ $t('pageAccesTexts.depuisGareTGV2') }}</li><br>
                  <li><strong>{{ $t('pageAccesTexts.depuisGareBelfort1') }}</strong><br>{{ $t('pageAccesTexts.depuisGareBelfort2') }}<br>{{ $t('pageAccesTexts.depuisGareBelfort3') }}</li><br>
                  <li>{{ $t('pageAccesTexts.vousEtesArrives') }}</li>
                </ul>

        </div>
    </div>
</template>

<script>
import InteractiveMap from "@/components/CarteInteractive2.vue";
import mapDataService from "@/services/map_data.service";
import { mapState } from "vuex";
export default {
    name: "PageAcces",
    components: {
      InteractiveMap,
    },
    data() {
        return {
            isEditingLocation: false,
            newCoords : null,
            chosenIcon: null,
        }
    },
    computed: {
      ...mapState('utilisateurs', ['utilisateur'])
    },
    methods: {
        onNewLocation(coords) {
            if (this.utilisateur.role === 'admin') {
                this.isEditingLocation = true; // Active l'affichage du bouton
                this.newCoords = coords; // Stocke les nouvelles coordonnées
            }
        },
        async confirmNewLocation() {
            if (this.newCoords) {
                await mapDataService.createEmplacement([this.newCoords.lat, this.newCoords.lng], this.chosenIcon);

                window.confirm("Emplacement enregistré avec succès")
                this.isEditingLocation = false; // Cache le bouton après la mise à jour
            }
        },
    }
}
</script>

<style scoped>

.texte-container{
    display: flex;
    flex-direction: column;
    position: relative;
    left: 30%;
    width: 45vw;
    margin-top: 100px;
    text-align: justify;
}

@media screen and (max-width: 1000px) {
    .container{
        display: flex;
        flex-direction: column;
    }
}
</style>