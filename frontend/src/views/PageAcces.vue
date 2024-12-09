<template>
    <div class="container">
        <div class="carte">
            <InteractiveMap></InteractiveMap>
        </div>
        <div class="texte-container">
            <h2 class="title">Migrez jusqu'à nous !</h2>
            <p class="text">
                Faites votre envol jusqu'à la presqu'île du Malsaucy, célèbre emplacement protégé des Eurockéennes à 7km au nord de Belfort !<br><br>
                Ces étangs sauront autant rafaîchir les canards que votre journée lors de votre séjour au Festival des Canes.<br><br>
                Rangez vos ailes et prenez un train, un bus ou une navette gratuits. À seulement 20 minutes de la gare de Belfort, et 45 minutes de la gare TGV, accédez au festival de manière écologique grâce à mise à disposition les jours de l'événement.<br><br>
                Si vous souhaitez venir en voiture, de nombreux parking sont à disposition à proximité, mais nous vous recommandons d'utiliser des modes de transports alternatifs à la voiture, même à pattes c'est mieux !<br><br>
            </p>
            <h2 class="title">Informations d'accès</h2>
            <p>
                <ul style="position: relative;bottom: 20px;">
                <li><strong>Adresse </strong> : Presqu'île du Malsaucy, Rue du Malsaucy, 90300 Sermamagny</li><br>
                <li><strong>Depuis la gare TGV Belfort-Montbéliard :</strong><br> Arrivée à la gare de Belfort en bus ou navette en 25 minutes !</li><br>
                <li><strong>Depuis la gare de Belfort: </strong><br> Arrivée au festival en 20min puis 10min de marche !<br> Sinon 10min en train jusqu'à la gare de Bas-Évette !</li><br>
                <li>Vous êtes arrivés !</li>
                </ul>
            </p>
        </div>
    </div>
</template>

<script>
import InteractiveMap from "@/components/CarteInteractive2.vue";
export default {
    name: "PageAcces",
    components: {
      InteractiveMap,
    }
}
</script>

<style scoped>

.texte-container{
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 30%;
    width: 45vw;
    margin-top: 100px;
    text-align: justify;
}

@media screen and (max-width: 1000px) {
    .container{
        display: flex;
        flex-direction: column;
    }
}
</style>