<template>
    <div class="top"></div>
    <div v-if="bottle" class="addbottle" :class="{'close': closeModal}">
      <h1>
        <img src="@/assets/img/close-red.png" class="close-modale" alt="close add bottle" @click="close">
        {{ bottle.nom }}
      </h1>
      <div class="fields">
        <img class="bottle-img"
             v-if="bottle.imaga && bottle.image.id"
             :src="bottle.image.url"
             alt=" image of bottle"/>
        <img class="bottle-img"
             :class="{'rose': bottle.categorie === 'rose'}"
             v-else :src="'/src/assets/img/bouteille_'+bottle.categorie+'.png'"
             alt="image of bottle"/>
        <ul>
          <li><strong>Region :</strong> {{ bottle.region }}</li>
          <li><strong>Cepage :</strong> {{ bottle.cepage }}</li>
          <li><strong>Millesime :</strong> {{ bottle.millesime }}</li>
        </ul>
        <button class="remove-bottle" @click="bottleDrunk">
          bottle drunk
        </button>
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
    }
  },
  props: {
    bottle: Object
  },
  computed: {
    bottleDeleted: () => store.getters["bottles/getBottleDeleted"]
  },
  mounted() {
    this.loading = false
    console.log(this.bottle)
  },
  methods: {
    close() {
      this.closeModal=true
      setTimeout(() => {
        this.$emit('closeModale')
      }, 500)
    },
    async bottleDrunk() {
      await store.dispatch("bottles/delete", this.bottle)
      this.close()
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

h1 img.close-modale {
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
  animation: form-appear .5s ease-out forwards;
  //border: #c76060 solid 1px;
  border: var(--background-dark) solid 1px;
  border-bottom: 0;
}

.addbottle.close {
  animation: form-disappear .5s ease-out forwards;
}

.addbottle .fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  gap: 10%;
  height: 80%;
  position : relative;
}

.bottle-img {
  margin-top: 20px;
  width: 15%;
  position: absolute;
  top: 0;
  left: 30px;
}

.bottle-img.rose {
  width: 10%;
}

li {
  list-style: none;
  margin-top: 30px;
  color: var(--font-black);
}

li strong {
  color: var(--background-dark);
}

</style>