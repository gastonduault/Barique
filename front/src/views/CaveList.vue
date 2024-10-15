<template>
  <ion-page>
    <ion-header class="header">
      <button class="deconeciton" @click="disconnect">
        <img src="@/assets/img/decconection.png" alt="deconnection image"/>
      </button>
      <SelectLang class="select-lang"/>
<!--      <img :src="utilisateur.profile_picture" alt="profil picture"/>-->
      <img v-if="utilisateur && utilisateur.profile_picture" :src="utilisateur.profile_picture" alt="profil picture" />
      <h1>{{ $t('hello') }}
        <span>{{ utilisateur.nom }}</span>
      </h1>
    </ion-header>
    <div class="content">
      <p class="under-line">{{ $t('your_cellar') }}</p>
      <div class="cellars">
        <p v-if="cellars.length === 0 && !creation" class="no-cave">
          {{ $t('no_cellar.msg_1') }} <strong class="add-link" @click="creation = true">{{ $t('no_cellar.msg_2') }}</strong> {{ $t('no_cellar.msg_3') }}.
        </p>
        <div class="cellar" v-for="cellar in cellars" @click="clickCellar(cellar)">
          <img src="@/assets/img/cave.png" />
          <p>{{cellar.nom}}</p>
        </div>
        <div class="line-create">
          <button class="add-cellar" @click="creation = true">
            <img src="@/assets/img/ajouter.png" alt="add cellar" />
          </button>
        </div>
      </div>
    </div>
    <EditCellar v-if="creation"  @close-modal="creation = false" />
    <Loader v-if="loading" />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import {Storage} from "@ionic/storage";
import store from '@/store';
import router from "@/router";
import Loader from "@/components/loader.vue";
import EditCellar from "@/components/editCellar.vue";
import SelectLang from "@/components/selectLang.vue";

export default {
  name: "CaveList",
  components: {
    SelectLang,
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, Loader, EditCellar
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
  updated() {
    store.dispatch('cellar/listCellars', this.utilisateur.uid);
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
    async clickCellar(cellar: any) {
      console.log(cellar)
      await store.dispatch('cellar/updtaeCellarSelected', cellar)
      await store.dispatch('bottles/bottles', cellar.id)
      await this.storage.set('cellar_selected_id', cellar.id)
      await this.storage.set('cellar_selected_nom', cellar.nom)
      router.push('/Cave')
    },
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

.select-lang {
  position: absolute;
  top: 10px;
  right: 20px;
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
  background-color: var(--background-color);
  margin: 20px auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  align-content: start;
  flex-wrap: wrap;
  border-radius: 5px;
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
  position: absolute;
  bottom: 40px;
}

.add-cellar {
  margin: 0 auto;
  padding: 8px 8px;
  border-radius: 50%;
  background-color: var(--font-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 15px;
}

.add-cellar img{
  width: 17px;
}


</style>
