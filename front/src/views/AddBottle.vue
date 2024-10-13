<template>
    <div class="top"></div>
    <div class="addbottle" :class="{'close': closeModal}">
      <h1>
        <img src="@/assets/img/close-red.png" alt="close add bottle" @click="close">
        New bottle
      </h1>
      <div class="fields">
        <div class="field">
          <input type="text" placeholder="Name" v-model="name"/>
          <span v-if="name.length == 0" class="required">*</span>
        </div>
        <input type="text" placeholder="Cepage" v-model="cepage" />
        <input type="text" placeholder="Region" v-model="region" />
        <input type="number" placeholder="Vintage ex: 2016" v-model="vintage"
               min="1900" max="2099" step="1" />
        <div class="input category">
          <img v-for="category in categories"
               :class="{'selected': categorySelected===category}"
               @click="categorySelected = category"
               :src="'/src/assets/img/grape_'+category+'.png'"/>
        </div>
      </div>
      <button class="create" :class="{'disable': name.length===0}" @click="create" type="submit">create</button>
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
      name: "",
      vintage: "",
      region: "",
      cepage: "",
      categorySelected: "rouge",
      categories: ["rouge", "blanc", "rose"],
      loading: true,
      closeModal: false,
    }
  },
  computed: {
    bottleAdded: () => store.getters['bottles/getBottleAdded']
  },
  mounted() {
    this.loading = false
  },
  methods: {
    async create() {
      if(this.name.length === 0) return

      const bottle = {
        nom: this.name,
        categorie: this.categorySelected,
        cave_id: store.getters['cellar/getCellarSelected'].id
      }
      if(this.region.length > 0) bottle["region"] = this.region
      if(this.cepage.length > 0) bottle["cepage"] = this.cepage
      if(this.vintage !== "") bottle["millesime"] = this.vintage

      await store.dispatch('bottles/create', bottle)
      this.close()
    },
    close() {
      this.closeModal=true
      setTimeout(() => {
        this.$emit('closeAddBottle')
      }, 500)
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

h1 img {
  position: absolute;
  left: 10%;
  width: 25px;
  cursor: pointer;
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
  border-bottom: 0;
}

.addbottle.close {
  animation: form-disappear .5s ease-out forwards;
}

.addbottle .fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10%;
  height: 50%;
}


.addbottle input {
  width: 290px;
  padding: 10px 10px;
  border-radius: 25px 25px;
  background-color: var(--background-color);
  border: solid 1px var(--font-pink);
  font-size: .9em;
}

.field {
  position: relative;
}

.required {
  font-weight: bold;
  color: var(--font-pink);
  position: absolute;
  left: 55px;
  top: 6px;
}

.addbottle input:focus,
.addbottle input:active {
  border: solid 2px var(--font-pink);
}

.category {
  display: flex;
  //background-color: var(--background-color);
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

.create {
  border-radius: 5px 5px;
  font-size: 1em;
  font-weight: bold;
  background-color: var(--font-pink);
  text-transform: uppercase;
  margin-top: 20px;
  padding: 10px 10px;
  color: var(--background-color);
}

.create:active {
  opacity: .8;
}
.create.disable {
  pointer-events: none;
  opacity: 0.8;
}

</style>