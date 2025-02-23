<template>
  <ion-page>
    <ion-header class="header">
      <button class="deconeciton" @click="disconnect">
        <img src="@/assets/img/decconection.webp" alt="deconnection image"/>
      </button>
      <SelectLang class="select-lang"/>
      <img v-if="utilisateur && utilisateur.profile_picture" :src="utilisateur.profile_picture" alt="profil picture" />
      <h1>{{ $t('hello') }}
        <span>{{ utilisateur.nom }}</span>
      </h1>
    </ion-header>
    <div class="content">
      <p class="under-line">{{ $t('your_cellar') }}</p>
      <div class="cellars">
        <p v-if="cellars && cellars.length === 0 && !creation" class="no-cave">
          {{ $t('no_cellar.msg_1') }} <strong class="add-link" @click="creation = true">{{ $t('no_cellar.msg_2') }}</strong> {{ $t('no_cellar.msg_3') }}.
        </p>
        <div class="cellar" v-for="cellar in cellars" @click="clickCellar(cellar)">
          <div>
            <img :src="`${API_URL}${cellar.profile_picture}`" />
          </div>
          <p>{{cellar.nom}}</p>
        </div>
        <div class="line-create">
          <button class="add-cellar" @click="creation = true">
            <img src="@/assets/img/ajouter.webp" alt="add cellar" />
          </button>
        </div>
      </div>
    </div>
    <EditCellar v-if="creation"  @close-modal="creation = false" />
    <Loader v-if="loading" />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import {Storage} from "@ionic/storage"
import store from '@/store'
import router from "@/router"
import config from "@/store/modules/config"
import Loader from "@/components/loader.vue"
import EditCellar from "@/components/editCellar.vue"
import SelectLang from "@/components/selectLang.vue"
import { logout } from "@/firebase-config";

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
      API_URL: config.API_URL,
    }
  },
  // async created() {
  //   this.storage = new Storage()
  //   await this.storage.create()
  //   const token = await this.storage.get('token')
  //   if(token && !this.connected) await store.dispatch('user/login')
  // },
  // updated() {
  //   store.dispatch('cellar/listCellars', this.utilisateur.uid)
  // },
  computed: {
    connected: () => { return store.getters['user/getConnected'] },
    utilisateur: () => {
      const user = store.getters["user/getUSer"]
      if(user && user.uid !== null) {
        store.dispatch('cellar/listCellars', user.uid);
      }
      return user
    },
    cellars: () => { return store.getters['cellar/getCellar'] },
    loading: () => { return store.getters['cellar/getLoading'] }
  },
  methods: {
    async disconnect() {
      await logout();
      await this.storage.clear()
      await store.dispatch('user/disconnect')
      router.push('/home')
    },
    async clickCellar(cellar: any) {
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
  width: 31px;
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
  display: block;
  margin: 0 auto;
}

.cellars {
  width: 95%;
  margin: 20px auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  align-content: start;
  flex-wrap: wrap;
  border-radius: 5px;
  gap: 15px;
}

.no-cave {
  width: 100%;
}

.cellar {
  cursor: pointer;
  border: solid 1px transparent;
  transition: .1s;
  border-radius: 5px 5px;
  padding: 10px 10px;
  background-color: var(--background-grey);
}

.cellar:hover,
.cellar:active,
.cellar:focus{
  border-color: var(--font-black);
}

.cellar p {
  margin: 5px 0 0 0;
}

.cellar div{
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
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
