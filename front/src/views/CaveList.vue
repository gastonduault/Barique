<template>
  <ion-page>
    <ion-header class="header">
      <button class="deconeciton" @click="disconnect">
        <img src="@/assets/img/decconection.png" alt="deconnection image"/>
      </button>
<!--      <img :src="utilisateur.profile_picture" alt="profil picture"/>-->
      <img v-if="utilisateur && utilisateur.profile_picture" :src="utilisateur.profile_picture" alt="profil picture" />
      <h1>Hi!
        <span>{{ utilisateur.nom }}</span>
      </h1>
    </ion-header>
    <div class="content">
      <p class="under-line">Your cellars</p>
      <div class="cellars">
        <p v-if="cellars.length === 0 && !creation" class="no-cave">
          you don't have a cellar at the moment, you can <strong>create</strong> one.
        </p>
        <div class="cellar" v-for="cellar in cellars" @click="clickCellar(cellar)">
          <img src="@/assets/img/cave.png" />
          <p>{{cellar.nom}}</p>
        </div>
        <div class="line-create">
          <button v-if="!creation" class="create" @click="creation = true">
            Create <img src="@/assets/img/ajouter.png" alt="add cellar" width="15">
          </button>
        </div>
        <div v-if="creation" class="creation-cellar">
          <img src="@/assets/img/cancel.png" class="cancel-creation" alt="cancel creation" @click="creation = false"/>
          <input type="text" placeholder="Name of your cellar"
                 v-on:keydown="keydownCellarName($event)"
                 v-model="nameCellar"/>
          <button class="create-2" @click="createCellar">
            <img src="@/assets/img/ajouter.png" alt="add cellar" width="15">
          </button>
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

export default {
  name: "CaveList",
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, Loader
  },
  data() {
    return {
      storage: new Storage,
      creation: false,
      nameCellar: "",
    }
  },
  async created() {
    this.storage = new Storage();
    await this.storage.create();
    const account_id = await this.storage.get('uid');
    if(account_id && !this.connected) await store.dispatch('user/login', account_id);
  },
  computed: {
    connected: () => { return store.getters['user/getConnected'] },
    utilisateur: () => {
      const utilisateur = store.getters["user/getUSer"]
      if(utilisateur.uid !== null) {
        store.dispatch('cellar/listCellars', utilisateur.uid);
      }
      return utilisateur
    },
    cellars: () => { return store.getters['cellar/getCellar'] },
    loading: () => { return store.getters['cellar/getLoading'] }
  },
  methods: {
    async disconnect() {
      await this.storage.clear()
      await store.dispatch('user/disconnect')
      this.$router.push('/home')
    },
    keydownCellarName(event: any) {
      if(event.code === "Enter" || event.key === "Enter") this.createCellar()
    },
    async createCellar() {
      if(this.nameCellar !== "" ){
        const cellar = {
          proprietaire_uid: this.utilisateur.uid,
          nom: this.nameCellar
        }
        await store.dispatch('cellar/createCellar', cellar)
        this.nameCellar = "";
        this.creation = false
      }
    },
    async clickCellar(cellar: any) {
      await store.dispatch('cellar/updtaeCellarSelected', cellar)
      await this.storage.set('cellar_selected_id', cellar.id);
      await this.storage.set('cellar_selected_nom', cellar.nom);
      router.push('/Cave')
    }
  }
}

</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 30vh;
  justify-content: center;
}

.header img {
  width: 70px;
  border-radius: 50%;
}

.header h1 {
  color: var(--font-black);
}

.header h1 span {
  font-weight: bold;
  color: var(--font-pink);
}


.deconeciton {
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
}

.deconeciton img{
  border-radius: 0;
  width: 25px;
}

.content {
  height: 70vh;
  width: 100%;
  text-align: center;
  justify-content: space-around;
  align-content: space-around;
}

.under-line {
  width: 60%;
  border-bottom: var(--font-black) solid 1px;
  display: block;
  margin: 0 auto;
}

.cellars {
  width: 95%;
  background-color: #faf2f2;
  margin: 20px auto;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}


.no-cave {
  width: 100%;
}

.cellar {
  margin-right: 15px;
  cursor: pointer;
  border: solid 1px transparent;
  transition: .2s;
  border-radius: 5px 5px;
  padding: 10px 10px;
}

.cellar:hover,
.cellar:active,
.cellar:focus{
  border-color: var(--font-black);
}

.cellar p {
  margin: 5px 0 0 0;
}

.cellar img {
  width: 40px;
}

.line-create {
  width: 100%;
}

.create {
  padding: 5px 5px;
  background-color: var(--font-pink);
  font-weight: bold;
  display: flex;
  align-content: center;
  align-items: center;
  width: 90px;
  justify-content: space-between;
  margin: 0 auto;
}

.creation-cellar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.creation-cellar input{
  width: 270px;
  padding: 5px 5px;
  border-radius: 5px 5px;
  background-color: var(--background-color);
  font-size: .9em;
  border: var(--font-pink) solid 1px;
  margin: 0 10px;
}

.creation-cellar input:focus,
.creation-cellar input:active{
  border: var(--font-black) solid 2px;
}

.create-2{
  padding: 10px 10px;
  border-radius: 10px 10px;
  background-color: var(--font-pink);
  font-weight: bold;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
}

.cancel-creation {
  width: 20px;
  border-radius: 50%;
  padding: 3px 3px;
  cursor: pointer;
  transition: .3s;
}

.cancel-creation:focus,
.cancel-creation:active,
.cancel-creation:hover{
  background-color: #fce5e5;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

</style>
