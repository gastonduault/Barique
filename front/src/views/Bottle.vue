<template>
    <div class="top" @click="close"></div>
    <div v-if="bottle" class="addbottle" :class="{'close': closeModal}">
      <h1>
        <img src="@/assets/img/close-red.webp" class="close-modale" alt="close add bottle" @click="close">
        <input v-model="nom" type="text" :placeholder="$t('name')" class="editable" />
      </h1>
      <div class="fields">
        <div class="info-bottle">
          <div>
            <img class="bottle-img"
                 v-if="bottle.image && bottle.image.id"
                 :src="bottle.image.url"
                 alt=" image of bottle"/>
            <img class="bottle-img"
                 :class="{'rose': bottle.categorie === 'rose'}"
                 v-else :src="'/img/bouteille_'+bottle.categorie+'.webp'"
                 alt="image of bottle"/>
          </div>
          <div class="inputs">
            <input v-model="region" :placeholder="$t('region')" type="text"/>
            <input v-model="cepage" :placeholder="$t('cepage')" type="text" />
            <input v-model="millesime" :placeholder="$t('vintage')" type="number" min="1900" max="2099" step="1" class="editable"/>
          </div>
        </div>
        <div class="input category">
          <img v-for="category in categories"
               :class="{'selected': categorySelected===category}"
               @click="categorySelected = category"
               :src="'/img/grape_'+category+'.webp'"/>
        </div>
        <div class="opinion">
          <div class="stars">
            <div v-for="i in 5" :key="i" @click="score = i">
              <img src="@/assets/img/empty_star.webp" alt="stars" v-if="score<i"/>
              <img src="@/assets/img/star.webp" alt="stars" v-else/>
            </div>
          </div>
          <textarea
              rows="5"
              cols="37"
              v-model="notice"
              :placeholder="$t('opinion')"></textarea>
        </div>
        <div class="bottom">
          <button class="remove-bottle" @click="bottleDrunk">
            <p>{{ $t('bottle_drunk') }}</p>
            <img src="@/assets/img/bottle_drunk.webp" alt="remove bottle"/>
          </button>
        </div>
      </div>
    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {IonHeader, IonPage} from "@ionic/vue";
import loader from "@/components/loader.vue";
import store from "@/store";

export default{
  components: {loader, IonPage, IonHeader},
  data() {
    return {
      loading: true,
      closeModal: false,
      nom: String,
      region: String,
      cepage: String,
      millesime: Number,
      categorySelected: "rouge",
      categories: ["rouge", "blanc", "rose"],
      currentDate: new Date(),
      score: 0,
      notice: "",
    }
  },
  props: {
    bottle: Object
  },
  computed: {
    user: () => store.getters['user/getUSer']
  },
  mounted() {
    this.loading = false
    this.initBottleInfo()
  },
  methods: {
    close() {
      this.closeModal=true
      setTimeout(() => {
        this.$emit('closeModale')
      }, 200)
      this.updateBottle()
    },
    initBottleInfo() {
      this.nom = this.bottle.nom
      this.region = this.bottle.region
      this.cepage = this.bottle.cepage
      this.millesime = this.bottle.millesime
      this.categorySelected = this.bottle.categorie
      this.notice = this.bottle.notice
      this.score = this.bottle.score
    },
    async bottleDrunk() {
      const bottle_updated = {
        "id": this.bottle.id,
        "cepage": this.cepage,
        "millesime": this.millesime,
        "region": this.region,
        "nom": this.nom,
        "categorie": this.categorySelected,
        "id": this.bottle.id,
        "cave_id": this.bottle.cave_id,
        "score": this.score,
        "notice": this.notice,
        "date_suppression": this.formatDateForMySQL(this.currentDate)
      }
      await store.dispatch("bottles/delete", bottle_updated)
      this.closeModal=true
      setTimeout(() => {
        this.$emit('closeModale')
      }, 500)
    },
    async updateBottle() {
      const bottle_updated = {
        "cepage": this.cepage,
        "millesime": this.millesime,
        "region": this.region,
        "nom": this.nom,
        "categorie": this.categorySelected,
        "id": this.bottle.id,
        "cave_id": this.bottle.cave_id,
        "score": this.score,
        "notice": this.notice,
      }
      await store.dispatch("bottles/update", bottle_updated)
    },
    formatDateForMySQL(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // month de 0 à 11
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  }
}
</script>

<style scoped>
.top {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
}

h1 {
  font-weight: normal;
  color: var(--font-black);
  font-size: 1.2em;
  position: relative;
  width: 80%;
  text-align: center;
}

h1 input {
  border: transparent solid 1px;
  padding: 4px 0;
  text-align: center;
  background-color: var(--background-grey);
  border-radius: 25px 25px;
}

h1 img.close-modale {
  position: absolute;
  left: -5%;
  width: 30px;
  top: -2px;
  cursor: pointer;
}

.addbottle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  animation: form-appear .2s ease-out forwards;
  background-color: rgba(255, 255, 255);
}

.addbottle.close {
  animation: form-disappear .2s ease-out forwards;
}

.addbottle .fields {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  position : relative;
  justify-content: space-around;
  padding-bottom: 8%;
}

.info-bottle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.info-bottle div:nth-child(1){
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottle-img {
  margin-top: 20px;
  width: 40px;
}

.bottle-img.rose {
  width: 35px;
}

.inputs {
  padding-left: 0;
  width: 97%;
  margin: 0 0;
}

.inputs input {
  margin-top: 8%;
  color: var(--font-black);
  position: relative;
  width: 95%;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: start;
  height: 30px;
  border: transparent solid 1px;
  padding: 20px;
  background-color: var(--background-grey);
  border-radius: 25px 25px;
}

.inputs input:first-child{
  margin-top: 8%;
}

.category {
  margin: 8% auto;
  display: flex;
  padding: 2px 2px;
  border-radius: 10px 10px;
  gap: 4px 10px;
  background-color: var(--background-grey);
}

.category img{
  padding: 8px 8px;
  cursor: pointer;
  transition: .5s ease-out;
  border-radius: 0 0;
  border: solid 1px transparent;
}

.category img.selected{
  border-radius: 10px 10px;
  border: solid 1px var(--background-dark);
}

.bottom {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7% auto;
}

.remove-bottle {
  position: relative;
  border-radius: 5px 5px;
  font-size: 1em;
  font-weight: bold;
  background-color: var(--blue);
  text-transform: uppercase;
  padding: 5px 10px 20px 10px;
  color: var(--background-color);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.remove-bottle,
.bottom nav button:nth-child(2):focus {
  background-color: #6889c2;
}

.remove-bottle img {
  width: 30px;
  position: absolute;
  bottom: -13px;
  transform: rotateZ(10deg);
  transition: 1s ease-out;
}

.remove-bottle p {
  margin: 0 0;
}

.opinion .stars {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stars img {
  width: 30px;
}

.opinion textarea {
  margin: 3% auto 0 auto;
  display: block;
  background-color: var(--background-grey);
  border: none;
  border-radius: 5px 5px;
  padding: 5px 5px;
  width: 90%;
}

</style>