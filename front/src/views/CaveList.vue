<template>
  <ion-page>
    <img src="@/assets/img/back.webp"
         v-if="cellarSelected !== {} && cellarSelected.nom"
         alt="arrow back"
         class="back"
         @click="clickBack"/>
    <div class="content">
      <h3>{{ $t('your_cellar') }} </h3>
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
          <button class="add-cellar" @click="createCellar">
            {{ $t('newCellar') }}
          </button>
        </div>
      </div>
    </div>
    <Loader v-if="loading" />
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import store from '@/store'
import router from "@/router"
import config from "@/store/modules/config"
import Loader from "@/components/loader.vue"
import EditCellar from "@/components/editCellar.vue"

export default {
  name: "CaveList",
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, Loader, EditCellar
  },
  data() {
    return {
      API_URL: config.API_URL,
    }
  },
  mounted() {
    store.dispatch('cellar/listCellars');
  },
  computed: {
    cellarSelected: () => { return store.getters['cellar/getCellarSelected'] },
    cellars: () => { return store.getters['cellar/getCellar'] },
    loading: () => { return store.getters['cellar/getLoading'] }
  },
  methods: {
    async clickCellar(cellar: any) {
      await store.dispatch('cellar/updateCellarSelected', cellar)
      await store.dispatch('bottles/bottles', cellar.id)
      router.push('/cellar')
    },
    createCellar() {
      router.push({
        name: "CreateCellar",
        query: {
          back: true,
          mode: 'create'
        }
      })
    },
    clickBack () {
      router.push('/cellar')
    }
  }
}

</script>

<style scoped>
img.back {
  width: 30px;
  position: absolute;
  left: 15px;
  top: 15px;
  border-radius: 50%;
  padding: 3px 3px;
  cursor: pointer;
  transition: .3s;
}

img.back:focus,
img.back:active,
img.back:hover{
  background-color: #fce5e5;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.content {
  height: 100vh;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.cellars {
  width: 95%;
  margin: 20px auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
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
  border-radius: 5px 5px;
  font-size: 1em;
  font-weight: bold;
  background-color: var(--font-pink);
  text-transform: uppercase;
  padding: 10px 10px;
  color: var(--background-color);
}

.add-cellar:focus {
  background-color: #ba5b5b;
}



</style>
