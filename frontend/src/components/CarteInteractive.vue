<template>
  <div class="carte-container">
    <h1 style="margin-left: 5%;">{{ $t('carteInterractiveTexts.title') }}</h1>
    <hr style="width: 60vw; position: relative; right: 0px; border-radius: 50%;">
    <div id="img-container">
      <img id="carte" alt="interactive map" src="../assets/map.svg">
      <div v-for="data in mapData" :key="data.id" class="carte-mask" :style="getCarteMaskStyle(data.points)">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1350 1350" version="1.2">
          <polygon @mouseenter="toggleInfobulle(data.id)" @mouseleave="toggleInfobulle(data.id)" :id="data.id" :points="getSVGPoints(data.points)" :style="getSVGStyle(data.fill_color, data.stroke_color, data.stroke_width)"/>
        </svg>
        <CartePrestatairePerso v-if="infobulles[data.id-1]" style="z-index: 3;" :nom="getPrestataireOfEmplacement(data.id).nom" :descriptionAccueil="getPrestataireOfEmplacement(data.id).description_accueil"
                               :image="getPrestataireOfEmplacement(data.id).image" :pers-page-route="`/prestataire/${getPrestataireOfEmplacement(data.id).id}`"></CartePrestatairePerso>
      </div>
    </div>
    <div class="legend">
      <p>{{ $t('carteInterractiveTexts.warning') }}</p>
      <h2>{{ $t('carteInterractiveTexts.legendTitle') }}</h2>
      <div v-for="data in mapData" :key="data.id" class="legend-line">
        <div style="display: flex; flex-direction: column;">
          <div :style="`background:${data.fill_color}; width: 20px; height:20px; margin: 15px; border: 1px solid black;`"></div>
        </div>
        <div style="display: flex; flex-direction: column;"><p>{{ getPrestataireOfEmplacement(data.id).nom }}</p></div>
      </div>
    </div>
  </div>
</template>



<script>
    import mapDataService from '@/services/map_data.service';
    import { mapState, mapActions } from 'vuex';
    import CartePrestatairePerso from './CartePrestatairePerso.vue';
    
    export default {
        name: "CarteInteractive",
        components: {
            CartePrestatairePerso,
        },
        data() {
            return {
                mapData: [],
                infobulles: [],
            };
        },
        async mounted() {
            this.mapData = await this.getMapData();
            this.mapData = this.mapData['data'];
            this.infobulles = Array.from({ length: this.mapData.length }, () => false);
        },
        computed: {
            ...mapState('prestataire', ['prestataires']),
        },
        methods: {
            ...mapActions('prestataire', ['getAllPrestataires']),
            async getMapData() {
                this.getAllPrestataires();
                return await mapDataService.getAllMapData();
            },
            getSVGPoints(points) {
                return points.map(point => `${point[0]},${point[1]}`).join(' ');
            },
            getSVGStyle(fill_color, stroke_color, stroke_width) {
                return `fill:${fill_color};stroke:${stroke_color};stroke-width:${stroke_width};`;
            },
            getPrestataireOfEmplacement(id){
                return this.prestataires.find((p) => p.id_emplacement == id);
            },
            toggleInfobulle(id){
                console.log("clic clic, t'as cliqué sur "+id)
                this.infobulles[id-1] = !this.infobulles[id-1];
                console.log(this.infobulles)
            },
            getCarteMaskStyle(points){
                let ypoints = []
                let xpoints = []
                points.map(point => ypoints.push(parseInt(point[1])));
                points.map(point => xpoints.push(parseInt(point[0])));
                let height = (Math.max(ypoints) - Math.min(ypoints));
                let width = (Math.max(xpoints) - Math.min(xpoints));
                let xpos = Math.min(xpoints);
                let ypos = Math.min(ypoints);

                let style = `position: absolute; width: ${width}; height: ${height}; top: ${ypos}; bottom:${750-ypos}; left: ${xpos}; right: ${750-xpos}`
                return style
            }
        }
    };
    </script>
    

<style scoped>
.container{
    display: flex;
    flex-direction: column;
}
#carte {
    max-width: 750px;
    height: auto;
    position: absolute;
}
.carte-mask{
    pointer-events: none;
    display: flex;
    width: 750px;
    height: auto;
    position: absolute;
}

#img-container{
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    height: 800px;
}

.legend{
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    width: 50vw;
}
.legend-line{
    display: flex;
    flex-direction: row;
}
.legend-line p{
    position: relative;
}
</style>