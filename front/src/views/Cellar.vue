<template>
  <ion-page>
    <HeaderComponent :title="cellar.nom"/>
    <div class="content">
      <div class="search-bottle">
        <input v-model="search" :placeholder="$t('search')"/>
        <button v-if="search !== ''" @click="search = ''"></button>
      </div>
      <p v-if="bottles && bottles.length === 0" class="no-bottle">
        {{ $t('no_bottle.msg_1')}} <br /> {{ $t('no_bottle.msg_2')}}
        <span class="add-link" @click="addBottle">{{ $t('no_bottle.msg_3')}}</span>.
      </p>
      <div class="bottles">
        <div v-for="bottle in bottles"
             @click="bottleSelected = bottle"
             :key="bottle.id"
             class="bottle">
          <img class="category"
               :src="'/img/grape_'+bottle.categorie+'.webp'"
               alt="bunch of grapes"/>
          <img class="bottle-img"
               v-if="bottle.imaga && bottle.image.id"
               :src="bottle.image.url"
               alt=" image of bottle"/>
          <img class="bottle-img"
               :class="{'rose': bottle.categorie === 'rose'}"
               v-else :src="'/img/bouteille_'+bottle.categorie+'.webp'"
               alt="image of bottle"/>
          <p>{{ bottle.nom }}</p>
        </div>
      <button class="add-bottle" @click="addBottle">
        <img src="@/assets/img/ajouter.webp" alt="add bottle" />
      </button>
      </div>
    </div>
    <Loader v-if="loading" />
    <AddBottle v-if="addBottleOpen" @close-add-bottle="addBottleOpen = false" />
    <Bottle v-if="bottleSelected !== null"
            @close-modale="bottleSelected = null"
            :bottle="bottleSelected"/>
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from '@ionic/vue';
import AddBottle from "@/components/AddBottle.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import Loader from "@/components/loader.vue";
import config from '@/store/modules/config';
import Bottle from "@/components/Bottle.vue";
import {Storage} from "@ionic/storage";
import store from '@/store';

export default {
  name: "CaveList",
  components: {
    IonPage,
    Loader, AddBottle, Bottle,
    HeaderComponent
  },
  data() {
    return {
      storage: new Storage,
      addBottleOpen: false,
      bottleSelected: null,
      search: "",
      editCellar: false,
      showComponent: true,
      API_URL: config.API_URL,
    }
  },
  computed: {
    connected: () => store.getters['user/getConnected'],
    utilisateur: () => store.getters["user/getUser"],
    cellar: () => store.getters['cellar/getCellarSelected'],
    bottles () {
      const allBottles = store.getters['bottles/getBottles']
      if(this.search === "") {
        return allBottles
      }else {
        return allBottles.filter(bottle =>
            bottle.nom.toLowerCase().includes(this.search.toLowerCase())
        )
      }
    },
    loading: () => store.getters['bottles/getLoading']
  },
  methods: {
    addBottle() { this.addBottleOpen = true },
  }
}

</script>

<style scoped>
.content {
  width: 100%;
  height: calc(100% - 30px);
  overflow-y: auto;
  text-align: center;
  padding: 10px 10px;
}

.bottles {
  display: flex;
  justify-content: center;
  align-items: start;
  align-content: start;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 50px;
}

div.search-bottle {
  margin: 5px auto 25px auto;
  position: relative;
  width: 90%;
}

div.search-bottle input{
  background-color: var(--background-grey);
  border: solid 1px var(--background-grey);
  border-radius: 25px 25px;
  padding: 13px 15px;
  width: 100%;
}

div.search-bottle button {
  width: 34px;
  height: 34px;
  padding: 5px 5px;
  background-image: url("@/assets/img/close.webp");
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--background-dark);
  border-radius: 25px 25px;
  position: absolute;
  top: 6px;
  right: 6px;
  transition: 0.2s;
  animation: btn-search 0.2s;
}

@keyframes btn-search {
  0% {
    transform: translateX(-20px);
  } 100% {
    transform: translateX(0px);
  }
}

.no-bottle {
  margin-top: 35vh;
  line-height: 70px;
}

.bottle {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  background-color: var(--background-grey);
  border-radius: 5px;
  width: 130px;
  height: 150px;
  border: solid 1px transparent;
  transition: .1s;
}

.bottle:hover,
.bottle:active,
.bottle:focus{
  border-color: var(--font-black);
}

.bottle .category {
  width: 20px;
  position: absolute;
  left: 5px;
}

.bottle .bottle-img {
  margin-top: 20px;
  width: 20%;
}

.bottle .bottle-img.rose {
  width: 15%;
}

.bottle p {
  margin: 10px 0 0 0;
}

.add-bottle {
  padding: 8px 8px;
  border-radius: 50%;
  background-color: var(--font-pink);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 4vh;
}

.add-bottle img {
  width: 23px;
}

</style>
