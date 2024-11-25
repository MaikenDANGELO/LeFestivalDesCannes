<template>
    <div class="container">
        <div class="carte">
            <CarteInteractive></CarteInteractive>
        </div>
        <div class="texte-container">
            <h2 class="title">Migrez jusqu'à nous !</h2>
            <p class="text">
                Faites votre envol jusqu'à la presqu'île du Malsaucy, célèbre emplacement protégé des Eurockéennes à 7km au nord de Belfort !<br><br>
                Ces étangs sauront autant rafaîchir les canards que votre journée lors de votre séjour au Festival des Canes, accessibles grâce aux nombreuses infrastructures disponibles.<br><br>
                Rangez vos ailes et prenez un train, un bus ou une navette gratuits mise à disposition les jours de l'événement pour un accès écologique.<br><br>
                Mais si vous souhaitez venir en voiture, de nombreux parking sont à disposition à proximité, or nous vous recommandons d'utiliser des modes de transports alternatifs à la voiture, même à pieds c'est mieux !<br><br>
            </p>
            <h2>Informations d'accès</h2>
            <p>
                <ul>
                <li>Adresse : Presqu'île du, Rue du Malsaucy, 90300 Sermamagny</li><br>
                <li>Depuis la gare TGV Belfort-Montbéliard :<br> Arrivée à la gare de Belfort en bus ou navette en 25 minutes !</li><br>
                <li>Depuis la gare de Belfort:<br> Arrivée au festival en 20min puis 10min de marche !<br> Sinon 10min en train jusqu'à la gare de Bas-Évette !</li><br>
                <li>Vous êtes arrivés !</li>
                </ul>
            </p>
        </div>
    </div>
</template>

<script>
import CarteInteractive from '@/components/CarteInteractive.vue';
export default {
    name: "PageAcces",
    components: {
        CarteInteractive
    }
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: row;
}
.texte-container{
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 950px;
    width: 550px;
    margin-top: 100px;
    text-align: justify;
}
</style>