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
  props: {
    selectedPrestataireId: {
      type: Number,          // L'ID du prestataire sélectionné
      required: false,       // Non obligatoire pour prendre en charge la carte générale
      default: null,         // Par défaut, aucun prestataire n'est sélectionné
    },
  },
  data() {
    return {
      map: null,             // Instance de la carte Leaflet
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Initialisation de la carte
      this.map = L.map('map').setView([47.6866, 6.8233], 15).setMinZoom(14);

      // Ajouter une couche de tuiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      // Définir les icônes personnalisées
      const icons = {
        evenement: L.icon({
          iconUrl: require('@/assets/MarqueursCarte/evenement.png'),
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
        pedalo: L.icon({
          iconUrl: require('@/assets/MarqueursCarte/pedalo.png'),
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
        peinture: L.icon({
          iconUrl: require('@/assets/MarqueursCarte/peinture.png'),
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
        restaurant: L.icon({
          iconUrl: require('@/assets/MarqueursCarte/restaurant.png'),
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
        stand: L.icon({
          iconUrl: require('@/assets/MarqueursCarte/stand.png'),
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
      };

      // Liste des prestataires avec leurs coordonnées et icônes
      const prestataires = [
        { id: 1, coords: [47.6868, 6.8250], text: 'Jeux et Divertissements', icon: icons.evenement },
        { id: 2, coords: [47.6880, 6.8245], text: 'Restaurant Le Gourmet', icon: icons.restaurant },
        { id: 3, coords: [47.6872, 6.8228], text: 'Mascotte Festival', icon: icons.evenement },
        { id: 4, coords: [47.6859, 6.8237], text: 'Stand Artisanat Local', icon: icons.stand },
        { id: 5, coords: [47.6875, 6.8260], text: 'Dégustation de Canard', icon: icons.restaurant },
        { id: 6, coords: [47.6862, 6.8225], text: 'Concours de Cuisine', icon: icons.restaurant },
        { id: 7, coords: [47.6855, 6.8230], text: 'Atelier Peinture', icon: icons.peinture },
        { id: 8, coords: [47.6879, 6.8248], text: 'Ped\'ailo!', icon: icons.pedalo },
      ];

      // Si un prestataire est sélectionné, afficher uniquement son marqueur
      if (this.selectedPrestataireId) {
        const selectedPrestataire = prestataires.find(
          (p) => p.id === this.selectedPrestataireId
        );
        if (selectedPrestataire) {
          const marker = L.marker(selectedPrestataire.coords, {
            icon: selectedPrestataire.icon,
          }).addTo(this.map);
          marker.bindPopup(`<b>${selectedPrestataire.text}</b>`).openPopup();
        }
      } else {
        // Si aucun prestataire sélectionné, afficher tous les marqueurs
        prestataires.forEach((prestataire) => {
          const marker = L.marker(prestataire.coords, { icon: prestataire.icon }).addTo(this.map);
          marker.bindPopup(`<b>${prestataire.text}</b>`);
        });
      }

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
        color: 'blue', // Couleur de la bordure
        fillColor: '#3388ff', // Couleur de remplissage
        fillOpacity: 0.4, // Opacité du remplissage
      }).addTo(this.map);

      // Ajouter une popup pour le polygone
      polygon.bindPopup('Zone de baignades des canards').openPopup();
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
#map {
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
