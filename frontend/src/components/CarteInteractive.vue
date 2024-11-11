<template>
    <div class="container">
        <h1>Carte intéractive</h1>
        <div id="img-container">
            <img id="carte" alt="carte intéractive" src="../assets/map.svg">
            <svg v-for="data in mapData" :key="data.id" class="carte-mask" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 1350 1350" version="1.2">
                <polygon :id="data.id" :points="getSVGPoints(data.points)" :style="getSVGStyle(data.fill_color, data.stroke_color, data.stroke_width)"/>
            </svg>
            <div class="legend">
                <p>Les emplacements sont fortement sujets à changement!</p>
                <h2>Légende : emplacements des prestataires</h2>
                <div v-for="data in mapData" :key="data.id" class="legend-line">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 1" version="1.2">
                        <rect width="1" height="1" x="0" y="0" rx="20" ry="20" :fill="data.fill_color" style="stroke:black;stroke-width: 0.05;"></rect>
                    </svg>
                    <p>{{ getPrestataireOfEmplacement(data.id).nom }}</p>
                </div>
            </div>
        </div>
    </div>
    </template>
    

    <script>
    import mapDataService from '@/services/map_data.service';
    import { mapState, mapActions } from 'vuex';
    
    export default {
        data() {
            return {
                mapData: []
            };
        },
        async mounted() {
            this.mapData = await this.getMapData();
            this.mapData = this.mapData['data'];
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
            }
        }
    };
    </script>
    

<style scoped>
#carte {
    width: 100%;
    max-width: 40%;
    height: auto;
    position: absolute;
}
.carte-mask{
    width: 100%;
    max-width: 40%;
    height: auto;
    position: absolute;
}

#img-container{
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    margin-left: 2%;
    height: 800px;
}

.legend{
    margin-top: 830px;
    display: flex;
    flex-direction: column;
}
.legend-line{
    display: flex;
    flex-direction: row;
}
.legend-line p{
    position: relative;
    right: 86vw;
    width: 30vw;
}
</style>