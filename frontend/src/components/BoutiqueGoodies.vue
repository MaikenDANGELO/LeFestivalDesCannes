<template>
    <div class="boutique-section">
      <div class="boutique-text">
        <h3>{{ $t('pagePrincipaleTexts.titreBoutique') }}</h3>
        <p>{{ $t('pagePrincipaleTexts.texteBoutique') }}</p>
        <router-link to="/boutique" class="boutique-button">
          {{ $t('pagePrincipaleTexts.accesBoutiqueLink') }}
        </router-link>
      </div>
      <img 
        src="@/assets/Boutique/Goodies.jpg" 
        alt="Image Boutique Goodies" 
        class="boutique-image"
      />
    </div>
</template>

<script>
export default {
  name: "BoutiqueGoodies",
  methods: {
    redirectToBoutique() {
      this.$router.push("/boutique");
    },
  },
};
</script>

<style scoped>
.boutique-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin: 40px auto;
  padding: 20px;
  max-width: 1200px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeIn 2s ease-in-out forwards;
}

/* Image */
.boutique-image {
  flex: 1;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 1s ease, box-shadow 0.3s ease;
}

.boutique-image:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* Texte */
.boutique-text {
  flex: 2;
  color: #2c3e50;
  line-height: 1.6;
  padding: 10px;
}

/* Titre */
.boutique-text h3 {
  font-size: 2rem;
  font-weight: 800;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 15px;
}

/* Description */
.boutique-text p {
  font-size: 1rem;
  color: #4f4f4f;
  margin-bottom: 15px;
  line-height: 1.8;
}

/* Bouton */
.boutique-button {
  display: inline-block;
  margin-top: 10px;
  font-size: 1.1rem;
  color: #27ae60;
  font-weight: bold;
  text-decoration: none;
  background-color: #ecf9f0;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.boutique-button:hover {
  background-color: #27ae60;
  color: #fff;
  transform: translateY(-3px);
}

/* Animation de fondu */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>