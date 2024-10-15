<template>
    <div class="top" @click="close"></div>
    <div v-if="bottle" class="addbottle" :class="{'close': closeModal}">
      <h1>
        <img src="@/assets/img/close-red.png" class="close-modale" alt="close add bottle" @click="close">
        <input v-model="nom" type="text" :placeholder="$t('name')" :class="{'editable': editBottle}" />
        <img v-if="!editBottle" src="@/assets/img/edit.png" class="edit-bottle" alt="edit" @click="editBottle = true"/>
<!--        <img v-else src="@/assets/img/valid.png" class="edit-bottle valid" alt="edit" @click="updateBottle"/>-->
      </h1>
      <div class="fields">
        <div class="info-bottle">
          <div>
            <img class="bottle-img"
                 v-if="bottle.imaga && bottle.image.id"
                 :src="bottle.image.url"
                 alt=" image of bottle"/>
            <img class="bottle-img"
                 :class="{'rose': bottle.categorie === 'rose'}"
                 v-else :src="'/src/assets/img/bouteille_'+bottle.categorie+'.png'"
                 alt="image of bottle"/>
          </div>
          <ul>
            <li :class="{'editable': editBottle}">
              <strong>{{ $t('region') }} : </strong>
              <input v-model="region" type="text"/>
            </li>
            <li :class="{'editable': editBottle}">
              <strong>{{ $t('cepage') }} :</strong>
              <input v-model="cepage" type="text" />
            </li>
            <li :class="{'editable': editBottle}">
              <strong>{{ $t('vintage') }} :</strong>
              <input v-model="millesime" type="number" min="1900" max="2099" step="1" :class="{'editable': editBottle}"/>
            </li>
          </ul>
          <div v-if="editBottle" class="input category">
            <img v-for="category in categories"
                 :class="{'selected': categorySelected===category}"
                 @click="categorySelected = category"
                 :src="'/src/assets/img/grape_'+category+'.png'"/>
          </div>
        </div>
        <div class="bottom">
          <button v-if="!editBottle" class="remove-bottle" @click="bottleDrunk">
            <p>{{ $t('bottle_drunk') }}</p>
            <img src="@/assets/img/bottle_drunk.png" alt="remove bottle"/>
          </button>
          <nav v-else>
            <button @click="cancelEditBottle">{{ $t('cancel') }}</button>
            <button @click="updateBottle">{{ $t('update') }}</button>
          </nav>
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
      editBottle: false,
      nom: String,
      region: String,
      cepage: String,
      millesime: Number,
      categorySelected: "rouge",
      categories: ["rouge", "blanc", "rose"],
      currentDate: new Date()
    }
  },
  props: {
    bottle: Object
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
      }, 500)
    },
    initBottleInfo() {
      this.nom = this.bottle.nom
      this.region = this.bottle.region
      this.cepage = this.bottle.cepage
      this.millesime = this.bottle.millesime
      this.categorySelected = this.bottle.categorie
    },
    async bottleDrunk() {
      this.initBottleInfo();
      this.bottle['date_suppression'] = this.formatDateForMySQL(this.currentDate)
      await store.dispatch("bottles/delete", this.bottle)
      this.close()
    },
    cancelEditBottle() {
      this.initBottleInfo()
      this.editBottle = false
    },
    async updateBottle() {
      const bottle_updated = {
        "cepage": this.cepage,
        "millesime": this.millesime,
        "region": this.region,
        "nom": this.nom,
        "categorie": this.categorySelected,
        "id": this.bottle.id,
        "cave_id": this.bottle.cave_id
      }
      await store.dispatch("bottles/update", bottle_updated)
      this.editBottle = false
    },
    formatDateForMySQL(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
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
  backdrop-filter: blur(2px);
}

h1 {
  font-weight: bold;
  color: var(--font-black);
  font-size: 1.2em;
  position: relative;
  width: 100%;
  text-align: center;
}

h1 input {
  background-color: transparent;
  border: transparent solid 1px;
  pointer-events: none;
  padding: 2px 0;
  text-align: center;
}

h1 img.close-modale {
  position: absolute;
  left: 10%;
  width: 25px;
  cursor: pointer;
}

h1 img.edit-bottle {
  position: absolute;
  right: 10%;
  top: 25%;
  width: 15px;
  cursor: pointer;
}

h1 img.edit-bottle:focus{
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  transform: rotateZ(30deg);
}

h1 img.edit-bottle.valid {
  width: 20px;
}


.addbottle {
  position: absolute;
  top: 35vh;
  left: 0;
  width: 100%;
  height: 65vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: var(--white);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  animation: form-appear .5s ease-out forwards;
  //border: #c76060 solid 1px;
  //border: var(--background-dark) solid 1px;
}

.addbottle.close {
  animation: form-disappear .5s ease-out forwards;
}

.addbottle .fields {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  gap: 10%;
  height: 80%;
  position : relative;
}

.info-bottle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.info-bottle div:nth-child(1){
  width: 35%;
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

ul {
  padding-left: 0;
  width: 65%;
}

li {
  list-style: none;
  margin: 30px 0 0 0;
  color: var(--font-black);
  position: relative;
  width: 80%;
  padding: 3px 0 0 0 ;
}

li.editable{
  //background-color: #e7e7e7;
}

li input {
  position: absolute;
  width: 100%;
  top: -3px;
  left: 0;
  background-color: transparent;
  border: transparent solid 1px;
  pointer-events: none;
  padding: 5px 0;
}

li.editable input,
input.editable{
  border: solid 1px var(--font-pink);
  border-radius: 25px 25px;
  pointer-events: all;
  z-index: 0;
}


li:nth-child(1) input {
  padding-left: 69px;
}

li:nth-child(2) input {
  padding-left: 74px;
}

li:nth-child(3) input {
  padding-left: 89px;
}

li strong {
  padding-left: 10px;
  color: var(--background-dark);
}


.category {
  position: absolute;
  bottom: -50px;
  margin: 0 auto;
  display: flex;
  padding: 2px 2px;
  border-radius: 10px 10px;
  gap: 4px 10px;
  background-color: #e7e7e7;
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
  border: solid 1px #bdbdbd;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.bottom {
  height: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom nav {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0 10px;
  justify-content: center;
}

.bottom nav button {
  position: relative;
  border-radius: 5px 5px;
  color: var(--background-color);
  font-size: 1em;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px 10px;
}

.bottom nav button:nth-child(2) {
  background-color: var(--font-pink);
}

.bottom nav button:nth-child(1) {
  background-color: var(--blue);
}

.bottom nav button:nth-child(1):focus {
  background-color: #6889c2;
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



</style>