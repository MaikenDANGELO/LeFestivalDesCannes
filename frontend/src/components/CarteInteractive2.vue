<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapDataService from '@/services/map_data.service'
import { mapState, mapActions } from 'vuex';

export default {
  name: 'InteractiveMap',
  props: {
    selectedPrestataireId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      map: null,
      icons : {
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
        parking: L.icon({
          iconUrl: require('@/assets/MarqueursCarte/parking.png'), // Icône pour le parking
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
        default: L.icon({
          iconUrl: require('@/assets/ImagesPrestataires/logo.png'),
          iconSize: [48,48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
      }
    };
  },
  computed: {
    ...mapState('prestataire', ['prestataires']),
  },
  async mounted() {
    await this.initMap();
  },
  methods: {
    ...mapActions('prestataire', ['getAllPrestataires']),
    getPrestataireOfEmplacement(id){
      return this.prestataires.find((p) => p.id_emplacement == id);
    },
    async constructPrestataireEmplacement() {
      this.getAllPrestataires();
      const prestEmpl = [];
      const emplacements = await mapDataService.getAllEmplacements();

      for (const e of emplacements.data) {
        const prest = this.getPrestataireOfEmplacement(e.id);
        const tmp = {
          id: prest?.id || null,
          coords: e.coordinates,
          text: prest?.nom || 'Unknown',
          description_accueil: prest.description_accueil,
          icon: this.icons[e.icon] || this.icons.default, // Fallback to default icon
        };
        prestEmpl.push(tmp);
      }
      return prestEmpl;
    },
    async initMap() {
      this.map = L.map('map').setView([47.6866, 6.8233], 15).setMinZoom(14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      const prestEmplacement = await this.constructPrestataireEmplacement();

      if (this.selectedPrestataireId) {
        const selectedPrestataire = prestEmplacement.find(
          (p) => p.id === this.prestataires.find((p) => p.id == this.selectedPrestataireId).id_emplacement
        );
        if (selectedPrestataire) {
          const marker = L.marker(selectedPrestataire.coords, {
            icon: selectedPrestataire.icon,
          }).addTo(this.map);
          const popupContent = `
            <b>${selectedPrestataire.text}</b>
            <p>${selectedPrestataire.description_accueil}</p>
          `;
          const popup = marker.bindPopup(popupContent);

          marker.on('mouseover', () => {
            popup.openPopup();
          });
          marker.on('mouseout', () => {
            popup.closePopup();
          });
        }
      } else {
        prestEmplacement.forEach((prestataire) => {
          const marker = L.marker(prestataire.coords, { icon: prestataire.icon }).addTo(this.map);

          const popupContent = `
            <b>${prestataire.text}</b>
            <p>${prestataire.description_accueil}</p>
            <p>Cliquez pour accéder</p>
          `;
          const popup = marker.bindPopup(popupContent);

          marker.on('mouseover', () => {
            popup.openPopup();
          });
          marker.on('mouseout', () => {
            popup.closePopup();
          });
          marker.on('click', () => {
            this.$router.push(`prestataire/${prestataire.id}`);
          });
        });
      }

      const parkingLocations = [
        { coords: [47.6841,6.8140], text: 'Parking Nord' },
        { coords: [47.6827,6.8145], text: 'Parking Sud' },
        { coords: [47.6848,6.8095], text: 'Parking Prestataire Sud' },
        { coords: [47.6880,6.8072], text: 'Parking Prestataire Nord' },
      ];

      parkingLocations.forEach((parking) => {
        const marker = L.marker(parking.coords, { icon: this.icons.parking }).addTo(this.map);
        marker.bindPopup(`<b>${parking.text}</b>`);
      });

      this.map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        const formattedLat = lat.toFixed(4);
        const formattedLng = lng.toFixed(4);
        console.log(`[${formattedLat},${formattedLng}]`);
      });

      /*const polygonCoords = [
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

      const polygon = L.polygon(polygonCoords, {
        color: 'blue',
        fillColor: '#3388ff',
        fillOpacity: 0.4,
      }).addTo(this.map);

      polygon.bindPopup('Zone de baignades des canards').openPopup();*/
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
