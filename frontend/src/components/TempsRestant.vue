<template>
  <body>
    <div id="chrono">00:00:00</div>
    <div class="buttons">
    </div>
  </body>
</template>

<script>
export default {
  name: "TempsRestant",
  data(){
    return{
      chrono:0,
    }
  },
  created() {
    this.chrono =
  }
}

</script>

<style scoped>
#chrono {
  font-family: 'Arial', sans-serif;
  font-size: 48px;
  text-align: center;
  margin-top: 20%;
}
button {
  font-size: 20px;
  margin: 10px;
  padding: 10px 20px;
}
.buttons {
  text-align: center;
}
</style>