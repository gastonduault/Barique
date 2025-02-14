<template>
    <div class="top" @click="close"></div>
    <div class="addbottle" :class="{'close': closeModal}">
      <h1>
        <img src="@/assets/img/close-red.webp" alt="close add bottle" @click="close">
        {{ $t('new_bottle') }}
      </h1>
      <div class="fields">
        <div class="field">
          <input type="text" :placeholder="$t('name')" v-model="name"/>
          <span v-if="name.length == 0" class="required">*</span>
        </div>
        <input type="text" :placeholder="$t('cepage')" v-model="cepage" />
        <input type="text" :placeholder="$t('region')" v-model="region" />
        <input type="number" :placeholder="$t('vintage_input')" v-model="vintage"
               min="1900" max="2099" step="1" />
        <div class="input category">
          <img v-for="category in categories"
               :class="{'selected': categorySelected===category}"
               @click="categorySelected = category"
               :src="'/img/grape_'+category+'.webp'"/>
        </div>
      </div>
      <button class="create" :class="{'disable': name.length===0}" @click="create" type="submit">{{ $t('create') }}</button>
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
  background-color: rgba(0, 0, 0, 0.4);
}

h1 {
  font-weight: normal;
  color: var(--font-black);
  font-size: 1.2em;
  position: relative;
  width: 100%;
  text-align: center;
}

h1 img {
  position: absolute;
  left: 10%;
  width: 30px;
  cursor: pointer;
  top: -5px;
}

.addbottle {
  position: absolute;
  top: 25vh;
  left: 0;
  width: 100%;
  height: 75vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  backdrop-filter: blur(10px);
  background-color: var(--background-color);
  animation: form-appear .2s ease-out forwards;
  border-bottom: 0;
}

.addbottle.close {
  animation: form-disappear .2s ease-out forwards;
}

.addbottle .fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8%;
  height: 65%;
}


.addbottle input {
  width: 290px;
  padding: 10px 10px;
  border-radius: 25px 25px;
  background-color: var(--background-grey);
  font-size: 1em;
  border: solid 1px transparent;
}

.addbottle input:focus {
  border-color: var(--font-pink);
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

.category {
  margin: 10px auto;
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