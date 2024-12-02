<template>
    <div>
        <div class="slide-container">
            <div class="custom-slider fade" style="display: block;">
                <div class="slide-index">1 / 3</div>
                <img class="slide-img" src="../assets/banniere.jpg">
            </div>
            <div class="custom-slider fade">
                <div class="slide-index">2 / 3</div>
                <img class="slide-img" src="../assets/canardCine.jpg">
            </div>
            <div class="custom-slider fade">
                <div class="slide-index">3 / 3</div>
                <img class="slide-img" src="../assets/lacMalsaucy.jpg">
            </div>
            <a class="prev" @click="plusSlides(-1)">❮</a>
            <a class="next" @click="plusSlides(1)">❯</a>
        </div>
        <div class="slide-dot" @load="currentSlide(1)">
            <span class="dot active" @click="currentSlide(1)"></span>
            <span class="dot" @click="currentSlide(2)"></span>
            <span class="dot" @click="currentSlide(3)"></span>
        </div>
        <div style="margin: 1% 10% 1% 10%;">
            <h1 style="text-align: center;">Le Festival Des Canes</h1>
            <h2 style="text-align: center;">Célébrons les canes sans se voler dans les plumes !</h2>
            <div style="display: flex; flex-direction: row;">
                <div>
                    <p style="text-align: justify;">Le Festival Des Canes est un événement unique qui se déroule chaque année le 1er septembre 
                    au lac du Malsaucy, site du festival des Eurockéennes, pour célébrer la Fête du Canard. Des sorties en famille 
                    aux passionnés d'ornithologie, ce festival rend hommage aux canes sous toutes leurs formes. Au programme : 
                    parade, ateliers pour petits et grands, et des rencontres avec des spécialistes pour découvrir l'univers
                    des palmipèdes. Venez partager un moment convivial en pleine nature et plonger dans le monde des 
                    volatiles sauvages !</p>
                </div>
                <div style="width: 250rem; padding-left: 3%;">
                    <TempsRestant></TempsRestant>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
import TempsRestant from "@/components/TempsRestant.vue";
export default {
    name: "BanniereAccueil",
    data: () => ({
        slideIndex: 1
    }),
    methods: {
        plusSlides(n) {
            this.showSlides(this.slideIndex += n);
        },
        currentSlide(n) {
            this.showSlides(this.slideIndex = n);
        },
        showSlides(n) {
            var i;
            var slides = document.getElementsByClassName("custom-slider");
            var dots = document.getElementsByClassName("dot");
            if (n > slides.length) { this.slideIndex = 1 }
            if (n < 1) { this.slideIndex = slides.length }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[this.slideIndex - 1].style.display = "block";
            dots[this.slideIndex - 1].className += " active";
        }
    },
  components: {
    TempsRestant,
  },
}
</script>

<style scoped>
.custom-slider {
    display: none;
}

.slide-container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
}

.prev,
.next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    font-size: 30px;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.6s ease;
}

.prev {
    left: 15px;
}

.next {
    right: 15px;
}

.prev:hover,
.next:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

.slide-text {
    position: relative;
    color: #ffffff;
    font-size: 15px;
    padding: 15px;
    bottom: 70px;
    width: 96%;
    text-align: center;
    background-color: rgba(1,1,1,0.7);
    margin-left: auto;
    margin-right: auto;
}

.slide-index {
    color: #ffffff;
    font-size: 13px;
    padding: 15px;
    position: absolute;
    top: 0;
}

.slide-img {
    width: 100%;
    max-width: 100%;
    height: 15%;
    max-height: 15%;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
    aspect-ratio: 16/9;
}

.slide-dot {
    text-align: center;
}

.dot {
    cursor: pointer;
    height: 10px;
    width: 10px;
    margin: 0 2px;
    background-color: #999999;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
}

.active,
.dot:hover {
    background-color: #111111;
}

.fade {
    animation-name: fade;
    animation-duration: 1s;
}

@keyframes fade {
    from {
        opacity: 0
    }

    to {
        opacity: 1
    }
}
</style>