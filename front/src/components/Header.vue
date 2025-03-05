<template>
  <ion-header class="header">
    <img src="@/assets/img/back.webp"
         v-if="backBtn"
         alt="arrow back"
         class="back"
         @click="$emit('back')"/>
    <Menu v-else/>
    <img :src="`${API_URL}${cellar.profile_picture}`" alt="profil picture" class="pp"/>
    <h3>
      {{ title }}
    </h3>
  </ion-header>
</template>

<script lang="ts">
import {IonHeader} from "@ionic/vue";
import config from "@/store/modules/config";
import store from "@/store";
import Menu from "@/components/Menu.vue";
import {Storage} from "@ionic/storage";

export default {
  components: {Menu, IonHeader},
  data(){
    return {
      API_URL: config.API_URL,
      storage: new Storage,
    }
  },
  props: {
    title: String,
    backBtn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cellar: () => store.getters['cellar/getCellarSelected'],
  },
  async created() {
    this.storage = new Storage();
    await this.storage.create();
  },
  async mounted() {
    await this.init()
  },
  methods: {
    async init() {
      if (store.getters['cellar/getCellarSelected'].id === undefined) {
        const cellar = await this.storage.get('cellar');
        await store.dispatch('cellar/updateCellarSelected', cellar);
      }
      await store.dispatch('bottles/bottles', store.getters["cellar/getCellarSelected"].id);
    },
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
  height: 60px !important;
}

.header img.pp {
  width: 37px;
  border-radius: 5px 5px;
  margin-right: 10px;
}

.header img.back {
  width: 30px;
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
  font-size: 1.2em;
  position: relative;
}


button.update-cellar {
  width: 33px;
  height: 33px;
  position: absolute;
  top: 13px;
  right: 10px;
  background-color: transparent;
  background-image: url("@/assets/img/parameter.webp");
  background-size: 22px;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 25px 25px;
  transition: 0.2s;
}

button.update-cellar:focus {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  transform: rotateZ(30deg);
}


</style>
