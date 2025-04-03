<template>
  <ion-page>
    <Header :cellar-profile-picture="false"
            :back-btn="true"
            @back="clickBack"
            :title="$t('aboutTitle')"/>
    <main>
      <img src="@/assets/img/Logo_PolyWine.webp" alt="logo barique"/>
      <div class="links">
        <a href="https://github.com/gastonduault/barique">
          <img src="@/assets/img/github.webp" alt="code link"/>
          Code
        </a>
        <a href="">
          <img src="@/assets/img/playstore.webp" alt="app link"/>
          Android
        </a>
        <a href="">
          <img src="@/assets/img/internet.webp" alt="wel link"/>
          <em>barique.com</em>
        </a>
      </div>
      <p>{{ $t('About.firstTest') }}</p>
      <ul>
        <h5 class="next-features">{{ $t('About.next_features') }}</h5>
       <li>{{ $t('About.features.feature1') }}</li>
       <li>{{ $t('About.features.feature2') }}</li>
       <li>{{ $t('About.features.feature3') }}</li>
      </ul>
      <div class="version">
        <p>Beta</p>
        v{{VERSION}} - © Copyright barique
      </div>
    </main>
  </ion-page>
</template>

<script setup lang="ts">
import Header from "@/components/HeaderComponent.vue";
import { IonPage } from '@ionic/vue';
import config from "@/store/modules/config";
import router from "@/router";
const VERSION = config.VERSION;

const clickBack = () => {
    router.push('/')
}
</script>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 5% 5% 15% 5%;
    gap: 30px;
    height: 100%;
    overflow-y: auto;
  }

  main img {
    width: 30%;
    max-width: 230px;
  }

  main p {
    text-align: center;
    margin: 0;
  }

  .links {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 10%;
    flex-wrap: wrap;
  }

  .links img {
    width: 60%;
    max-width: 170px;
  }

  .links a {
    padding: 5px 5px;
    width: 20%;
    min-width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--font-black);
    border-radius: 5px 5px;
  }

  .links a:hover {
    background-color: var(--background-grey);
  }

  .links a:active {
    color: var(--font-pink);
  }

  .version {
    position: absolute;
    bottom: 10px;
    text-align: center;
    font-size: 0.7em;
    color: var(--font-black)
  }
  .version p {
    color: var(--font-pink);
    font-size: 1.2em;
    margin: 0 0;
    font-weight: bold;
  }
</style>