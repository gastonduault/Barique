<template>
  <ion-page>
    <ion-header class="header" @click="console.log(cellar)">
      <img src="@/assets/img/back.png" alt="arrow back" class="back" @click="back"/>
      <img :src="utilisateur.profile_picture" alt="profil picture" class="pp"/>
      <h3> {{ cellar.nom }} </h3>
    </ion-header>
    <div class="content">
      <p>For the moment your cellar is empty <br />
        you can
        <span class="add-link" @click="addBottle">add bottle</span>
      </p>
      <button class="add-bottle" @click="addBottle">
        <img src="@/assets/img/ajouter.png" alt="add bottle" />
      </button>
    </div>
    <Loader v-if="loading" />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import store from '@/store';
import {Storage} from "@ionic/storage";
import {useRouter} from "vue-router";
import router from "@/router";
import Loader from "@/components/loader.vue";

export default {
  name: "CaveList",
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, Loader
  },
  data() {
    return {
      storage: new Storage,
    }
  },
  computed: {
    connected: () => { return store.getters['user/getConnected'] },
    utilisateur: () => { return store.getters["user/getUSer"] },
    cellar: () => {
      const cellar = store.getters['cellar/getCellarSelected']
      if( cellar.id !== null ) store.dispatch('bottles/bottles', cellar.id)
      return cellar
    },
    bottles: () => { return store.getters['bottles/getBottles'] },
    loading: () => {return store.getters['bottles/getLoading'] }
  },
  methods: {
    back() { router.push('/caveList') },
    addBottle() { router.push('/newBottle') }
  }
}

</script>

<style scoped>
.header {
  align-items: center;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
}

.header img.pp {
  width: 25px;
  border-radius: 50%;
  margin-right: 20px;
}

.header img.back {
  width: 25px;
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
  margin: 0 0;
}

.content {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
