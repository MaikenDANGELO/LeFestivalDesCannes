<template>
  <div class="don-container">
    <h1 class="title">Total des Dons:</h1>
    <p class="total" ref="donDisplay">{{ this.totalDons }}</p>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "TotalDons",
  computed: {
    ...mapState('don', ['totalDons']),
  },
  methods: {
    ...mapActions('don', ['getTotalDons']),

    animateNumber(from, to, duration) {
      const donDisplayElement = this.$refs.donDisplay;

      if (!donDisplayElement) {
        console.error('Element with ref "donDisplay" not found');
        return;
      }

      let start = null;

      const animate = (timestamp) => {
        start = start || timestamp;
        let progress = Math.min((timestamp - start) / duration, 1);

        donDisplayElement.textContent = Math.floor(progress * (to - from) + from);

        if (progress < 1) {
          window.requestAnimationFrame(animate);
        }
      };

      window.requestAnimationFrame(animate);
    }
  },
  watch: {
    totalDons(newVal, oldVal) {
      this.animateNumber(oldVal, newVal, 2000);
    }
  },
  created() {
    this.getTotalDons();
  },
};
</script>

<style scoped>

.don-container {
  text-align: center;
  background: linear-gradient(to bottom, #0b3d0b, #1e622e, #2a7d2a);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  max-width: 350px;
  margin: 20px auto;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 30px;
  margin: 0;
  color: #fff;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.total {
  font-size: 36px;
  margin: 10px 0;
  font-weight: bold;
  color: #fff;
  font-feature-settings: 'tnum';
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.total:hover {
  transform: scale(1.1);
}

strong {
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.4);
  display: inline-block;
  margin-top: 10px;
  font-feature-settings: 'tnum';
}

.total:after {
  content: ' €';
}
</style>
