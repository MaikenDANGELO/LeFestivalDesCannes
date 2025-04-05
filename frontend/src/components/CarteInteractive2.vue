<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapDataService from '@/services/map_data.service';
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
      userMarkers: [],
      icons: {
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
          iconUrl: require('@/assets/MarqueursCarte/parking.png'),
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
        default: L.icon({
          iconUrl: require('@/assets/ImagesPrestataires/logo.png'),
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48],
        }),
      },
    };
  },
  computed: {
    ...mapState('utilisateurs', ['utilisateur', 'utilisateurs']),
    ...mapState('prestataire', ['prestataires']),
  },
  async mounted() {
    await this.initMap();
  },
  methods: {
    ...mapActions('prestataire', ['getAllPrestataires']),
    getPrestataireOfEmplacement(id) {
      return this.prestataires.find((p) => p.id_emplacement === id);
    },
    addMarker(lat, lng) {
      console.log(this.utilisateur)
      if((this.selectedPrestataireId !== null || this.$route.path === "/acces") && this.utilisateur.role === 'admin') {
        if (this.userMarker) {
          this.map.removeLayer(this.userMarker);
        }

        this.userMarker = L.marker([lat, lng], {icon: this.icons.default}).addTo(this.map);
        this.userMarker.bindPopup(`<b>Nouvel Emplacement :</b><br>[${lat.toFixed(4)}, ${lng.toFixed(4)}]`).openPopup();

        this.$emit('new-location', {lat, lng}); // Envoie les coordonnées à PrestataireDetail.vue
        }
    },


    async constructPrestataireEmplacement() {
      this.getAllPrestataires();
      const prestEmpl = [];
      const emplacements = await mapDataService.getAllEmplacements();

      for (const e of emplacements.data) {
        const prest = this.getPrestataireOfEmplacement(e.id);
        if(!prest) continue;
        const tmp = {
          id: prest?.id || null,
          coords: e.coordinates,
          text: prest?.nom || 'Unknown',
          description_accueil: prest.description_accueil,
          icon: this.icons[e.icon] || this.icons.default,
        };
        prestEmpl.push(tmp);
      }
      return prestEmpl;
    },
    async initMap() {
      this.map = L.map('map').setView([47.6856,6.8122], 16).setMinZoom(14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      const prestEmplacement = await this.constructPrestataireEmplacement();

      if (this.selectedPrestataireId) {
        const selectedPrestataire = prestEmplacement.find(
            (p) => p.id === this.prestataires.find((p) => p.id === this.selectedPrestataireId).id_emplacement
        );

        //console.log("Presta affichés : ")
        //console.log(selectedPrestataire)
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
          const marker = L.marker(prestataire.coords, {icon: prestataire.icon}).addTo(this.map);

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
        {coords: [47.6841, 6.8140], text: 'Parking Nord'},
        {coords: [47.6827, 6.8145], text: 'Parking Sud'},
        {coords: [47.6848, 6.8095], text: 'Parking Prestataire Sud'},
        {coords: [47.6880, 6.8072], text: 'Parking Prestataire Nord'},
      ];

      parkingLocations.forEach((parking) => {
        const marker = L.marker(parking.coords, {icon: this.icons.parking}).addTo(this.map);
        marker.bindPopup(`<b>${parking.text}</b>`);
      });

      this.map.on('click', (e) => {
        const {lat, lng} = e.latlng;
        const formattedLat = lat.toFixed(4);
        const formattedLng = lng.toFixed(4);
        this.addMarker(lat, lng);
        console.log(`[${formattedLat},${formattedLng}]`);
      });
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