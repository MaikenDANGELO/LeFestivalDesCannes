<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'InteractiveMap',
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Initialisation de la carte
      this.map = L.map('map').setView([47.6866, 6.8233], 15).setMinZoom(14); // Zoom niveau 13

      // Ajouter une couche de tuiles (tiles layer)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);

      // Ajouter un marqueur avec une infobulle
      const marker = L.marker([47.6866, 6.8233]).addTo(this.map);
      marker.bindPopup('<b>Lac de Malsaucy</b><br>Près de Belfort').openPopup();

      // Ajouter plusieurs marqueurs
      const locations = [
        { coords: [47.6868, 6.8250], text: 'Scène Principale' },
        { coords: [47.6880, 6.8245], text: 'Entrée Principale' },
        { coords: [47.6872, 6.8228], text: 'Zone de Restauration' },
        { coords: [47.6859, 6.8237], text: 'Scène Secondaire' },
        { coords: [47.6875, 6.8260], text: 'Zone Camping' }
      ];

      // Ajouter les marqueurs sur la carte
      locations.forEach(location => {
        const marker = L.marker(location.coords).addTo(this.map);
        marker.bindPopup(`<b>${location.text}</b>`);
      });

      // Coordonnées du polygone représentant la zone des Eurockéennes
      const polygonCoords = [
        [47.694, 6.8088],
        [47.69385, 6.808636],
        [47.6938, 6.80862],
        [47.69368, 6.8086],
        [47.6936, 6.80861],
        [47.6935, 6.80862],
        [47.6933, 6.8087],
        [47.69315, 6.80877],
        [47.69295, 6.808887],
        [47.6928, 6.8091],
        [47.6927, 6.80933],
        [47.69267, 6.8095],
        [47.69274, 6.80959],
        [47.6928, 6.80956],
        [47.69288, 6.80951],
        [47.69295, 6.80955],
        [47.69306, 6.8097],
        [47.69324, 6.8101],
        [47.69328, 6.81025],
        [47.6933, 6.81032],
        [47.6934, 6.81035],
        [47.6935, 6.81032],
        [47.6937, 6.8102],
        [47.6939, 6.81005],
        [47.694, 6.81005],
        [47.69406, 6.8101],
        [47.69409, 6.81015],
        [47.69415, 6.81025],
        [47.69422, 6.81025],
        [47.69427, 6.81018],
        [47.6944, 6.8099],
        [47.69431, 6.8095],
        [47.69427, 6.8093],
        [47.69418, 6.8091],
      ];

      // Ajouter le polygone à la carte
      const polygon = L.polygon(polygonCoords, {
        color: 'blue',          // Couleur de la bordure
        fillColor: '#3388ff',   // Couleur de remplissage
        fillOpacity: 0.4        // Opacité du remplissage
      }).addTo(this.map);

      // Ajouter une popup pour le polygone
      polygon.bindPopup('Zone de baignades des canards').openPopup();

    }
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px; /* Définit la hauteur du conteneur parent */
}
#map {
  width: 100%;
  height: 100%; /* Utilise toute la hauteur du conteneur parent */
}
</style>
