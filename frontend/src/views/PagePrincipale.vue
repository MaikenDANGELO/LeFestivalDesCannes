<template>
  <div class="hello">
    <CarteInteractive></CarteInteractive>

    <p>{{ prestataires() }}</p>

  </div>
</template>



<script>
import CarteInteractive from '@/components/CarteInteractive.vue';
import {mapState} from "vuex";
import {prestataires} from "@/datasource/data";

export default {
  name: "HelloWorld",
  methods: {
    prestataires() {
      return prestataires
    }
  },
  components: {
    CarteInteractive
  },
  computed:{
    ...mapState([prestataires])
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
