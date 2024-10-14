<template>
  <ion-page>
    <ion-header class="header">
      <img src="@/assets/img/back.png" alt="arrow back" class="back" @click="back"/>
      <h3> History </h3>
    </ion-header>
    <div class="content">
      <p v-if="bottles && bottles.length === 0" class="no-bottle">
        For the moment your history of bottle drunk <br /> is empty
      </p>
      <div v-for="bottle in bottles" :key="bottle.id" class="bottle">
        <img class="category"
             :src="'/src/assets/img/grape_'+bottle.categorie+'.png'"
             alt="bunch of grapes"/>
        <div class="nom-millesime">
          <p>
            {{ bottle.nom }}
          </p>
          <p>
            {{ bottle.millesime }}
          </p>
        </div>
        <div class="date">
          <p>{{ getDay(bottle.date_suppression) }}</p>
          <p>{{ getHours(bottle.date_suppression) }}</p>
        </div>
      </div>
    </div>
    <Loader v-if="loading" />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import store from '@/store';
import {Storage} from "@ionic/storage";
import router from "@/router";
import Loader from "@/components/loader.vue";
import AddBottle from "@/views/AddBottle.vue";
import Bottle from "@/views/Bottle.vue"

export default {
  name: "Historique",
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
    bottles: () => store.getters['history/getBottles'],
    loading: () => store.getters['history/getLoading']
  },
  async mounted() {
    if( this.cellar ) {
      const cellar = {
        id: await this.storage.get('cellar_selected_id'),
        nom: await this.storage.get('cellar_selected_nom'),
      }
      await store.dispatch('cellar/updtaeCellarSelected', cellar)
    }
    store.dispatch('history/bottles', this.cellar.id)
    await this.storage.create();
    const account_id = await this.storage.get('uid');
    if(account_id && !this.connected) await store.dispatch('user/login', account_id)
  },
  methods: {
    async back() {
      router.push('/Cave')
    },
    getDay(dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day} ${month} ${year}`;
    },
    getHours(dateString) {
      const date = new Date(dateString);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours} : ${minutes}`;
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
  height: 100%;
  overflow-y: auto;
  text-align: center;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  align-content: center;
  gap: 5px;
  padding: 10px 10px;
  color: var(--font-black);
}

.bottle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: var(--background-grey);
  padding: 5px 5px;
  border-radius: 5px 5px;
}

.nom-millesime {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: center;
  justify-content: center;
  width: 200px;
  overflow-x: hidden;
  text-wrap: nowrap;
  height: 40px;
}

.bottle p{
  margin: 0 0;
}

.nom-millesime p:nth-child(2){
  font-size: 0.9em;
  color: #535353;
}

.date p:nth-child(1){
  font-size: 0.9em;
}


.date p:nth-child(2){
  font-size: 0.8em;
  color: #535353;
}

.no-bottle {
  margin-top: 35vh;
  line-height: 70px;
}

</style>
