<template>
    <div class="card">
        <img class="prestataire-img" alt="prestimg" :src="require(`../assets/${image}`)"/>
        <div class="prestataire-desc">
            <h4>{{ nom }}</h4>
            <p>{{ description }} {{ image }}</p>
            <button class="prestataire-btn">Accéder</button> <!--créé un événement qui redirige vers la page prestataire appropriée-->
        </div>
    </div>
</template>

<script>
export default {
    name: "CartePrestatairePerso",
    props: {
        nom: String,
        description: String,
        image: String,
        persPageRoute: String
    },
    data: () => {
        return {

        }
    }
}
</script>

<style scoped>
.card{
    display: flex;
    flex-direction: row;
}
.prestataire-desc{
    display: flex;
    flex-direction: column;
}
.prestataire-img{
    max-width: 128px;
    max-height: 128px;
}
</style>