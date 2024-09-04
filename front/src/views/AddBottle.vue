<template>
  <ion-page>
    <ion-header class="header">
<!--      <h3> New bottle </h3>-->
    </ion-header>
    <div class="content">
      <h1> New bottle </h1>
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
        <button class="create"  @click="create" type="submit">create</button>
      </div>
    </div>
    <loader v-if="loading"/>
  </ion-page>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import {IonHeader, IonPage} from "@ionic/vue";
import loader from "@/components/loader.vue";

export default defineComponent({
  components: {loader, IonPage, IonHeader},
  data() {
    return {
      selectingCategory: false,
      name: "",
      vintage: "",
      region: "",
      categorySelected: "rouge",
      categories: ["rouge", "blanc", "rose"],
      loading: true,
    }
  },
  mounted() {
    this.loading = false
  },
  methods: {
    create() {

    }
  }
})
</script>

<style scoped>
.header {
  text-align: center;
  height: 100vh;
  background-image: url("@/assets/img/add_wallpaper.jpg");
  background-size: cover;
  position: relative;
}

h1 {
  font-weight: bold;
  color: white ;
  font-size: 1.2em;
}

.content {
  position: absolute;
  top: 30vh;
  left: 0;
  width: 100%;
  height: 70vh;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #c76060;
  border-radius: 25px 25px 0 0;
  animation: form-appear .5s ease-out;
}

.content .fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10%;
  height: 70%;
}


.content input {
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

.content input:focus,
.content input:active {
  border: solid 2px var(--font-pink);
}

.category {
  display: flex;
  background-color: var(--background-color);
  padding: 2px 2px;
  border-radius: 10px 10px;
  gap: 4px 10px;
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
  color: var(--font-pink);
  text-transform: uppercase;
  margin-top: 5%;
  padding: 10px 10px;
  background-color: var(--background-color);
}

.create:active {
  opacity: .8;
}

</style>