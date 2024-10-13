<template>
  <ion-page>
    <ion-header class="header">
      <img src="@/assets/img/back.png" alt="arrow back" class="back" @click="back"/>
      <img :src="utilisateur.profile_picture" alt="profil picture" class="pp"/>
      <h3> {{ cellar.nom }} </h3>
    </ion-header>
    <div class="content">
      <button class="historique-btn" @click="historique"></button>
      <p v-if="bottles && bottles.length === 0" class="no-bottle">
        For the moment your cellar is empty <br /> you can
        <span class="add-link" @click="addBottle">add bottle</span>
      </p>
      <div v-for="bottle in bottles"
           @click="bottleSelected = bottle"
           :key="bottle.id"
           class="bottle">
        <img class="category"
             :src="'/src/assets/img/grape_'+bottle.categorie+'.png'"
             alt="bunch of grapes"/>
        <img class="bottle-img"
             v-if="bottle.imaga && bottle.image.id"
             :src="bottle.image.url"
             alt=" image of bottle"/>
        <img class="bottle-img"
             :class="{'rose': bottle.categorie === 'rose'}"
             v-else :src="'/src/assets/img/bouteille_'+bottle.categorie+'.png'"
             alt="image of bottle"/>
        <p>{{ bottle.nom }}</p>
      </div>
      <button class="add-bottle" @click="addBottle">
        <img src="@/assets/img/ajouter.png" alt="add bottle" />
      </button>
    </div>
    <Loader v-if="loading" />
    <AddBottle v-if="addBottleOpen" @close-add-bottle="addBottleOpen = false" />
    <Bottle v-if="bottleSelected !== null"
            @close-modale="bottleSelected = null"
            :bottle="bottleSelected"/>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import store from '@/store';
import {Storage} from "@ionic/storage";
import {useRouter} from "vue-router";
import Loader from "@/components/loader.vue";
import AddBottle from "@/views/AddBottle.vue";
import Bottle from "@/views/Bottle.vue"
import router from "@/router";

export default {
  name: "CaveList",
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, Loader, AddBottle, Bottle
  },
  data() {
    return {
      storage: new Storage,
      addBottleOpen: false,
      bottleSelected: null,
    }
  },
  async created() {
    this.storage = new Storage();
    await this.storage.create();
  },
  computed: {
    connected: () => store.getters['user/getConnected'],
    utilisateur: () => store.getters["user/getUSer"],
    cellar: () => store.getters['cellar/getCellarSelected'],
    bottles: () => store.getters['bottles/getBottles'],
    loading: () => store.getters['bottles/getLoading']
  },
  async mounted() {
    if( this.cellar ) {
      const cellar = {
        id: await this.storage.get('cellar_selected_id'),
        nom: await this.storage.get('cellar_selected_nom'),
      }
      await store.dispatch('cellar/updtaeCellarSelected', cellar)
    }
    store.dispatch('bottles/bottles', this.cellar.id)
    await this.storage.create();
    const account_id = await this.storage.get('uid');
    if(account_id && !this.connected) await store.dispatch('user/login', account_id)
  },
  methods: {
    async back() {
      router.push('/caveList')
      await this.storage.remove("cave_selected_id")
      await this.storage.remove("cave_selected_nom");
    },
    addBottle() { this.addBottleOpen = true },
    historique() {
      router.push("/Historique")
    }
  }
}

</script>

<style scoped>
.header {
  align-items: center;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  height: 30px !important;
}

.header img.pp {
  width: 25px;
  border-radius: 50%;
  margin-right: 10px;
}

.header img.back {
  width: 20px;
  position: absolute;
  left: 15px;
  border-radius: 50%;
  padding: 3px 3px;
  cursor: pointer;
  transition: .3s;
}

.header img.back:focus,
.header img.back:active,
.header img.back:hover{
  background-color: #fce5e5;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.header h3 {
  margin: 1px 0 0 0;
  font-size: 1em;
}

.content {
  width: 100%;
  height: calc(100% - 30px);
  overflow-y: auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: start;
  align-content: start;
  flex-wrap: wrap;
  gap: 20px;
  padding: 10px 10px;
  //margin-top: 20px;
}

.no-bottle {
  margin-top: 35vh;
  line-height: 70px;
}

.historique-btn {
  position: fixed;
  z-index: 2;
  width: 30px;
  height: 30px;
  right: 10px;
  top: 35px;
  background-color: var(--background-color);
  background-image: url("@/assets/img/historique.png");
  background-position: center;
  background-size: 20px;
  background-repeat: no-repeat;
  border-radius: 25px 25px;
  //box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.historique-btn:focus {
  background-color: #e5cdcd;
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
}

.bottle .category {
  width: 20px;
  position: absolute;
  left: 5px;
}

.bottle .bottle-img {
  margin-top: 20px;
  width: 20%;
  //height: 108.78px;
}

.bottle .bottle-img.rose {
  width: 15%;
}

.bottle p {
  margin: 10px 0 0 0;
}

.add-link {
  color: var(--font-pink);
  cursor: pointer;
  font-weight: bold;
}

.add-link:hover {
  border-bottom: solid 2px var(--font-pink);
}

.add-bottle {
  padding: 8px 8px;
  border-radius: 50%;
  background-color: var(--font-pink);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 15px;
}

.add-bottle img {
  width: 17px;
}

</style>
