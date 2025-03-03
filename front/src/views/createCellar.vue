<template>
  <ion-page>
    <main>
      <h3>{{ $t('create_cellar') }}</h3>
      <input :placeholder="$t('cellar_name')" v-model="name"/>
      <button :class="{'disable': name.length === 0}" @click="createCellar">
        {{ $t('create') }}
      </button>
    </main>
  </ion-page>
</template>

<script lang="ts">
import { IonPage } from "@ionic/vue";
import store from "@/store";

export default {
  components: {
    IonPage
  },
  data() {
    return {
      name: ""
    }
  },
  methods: {
    async createCellar () {
      if(this.name !== "" ){
        await store.dispatch('cellar/create', this.name)
      }
    }
  }
}
</script>

<style scoped>
main {
  background-color: var(--background-color);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

h3 {
  margin: 0 0;
}

input {
  background-color: var(--background-grey);
  border: none;
  border-radius: 25px 25px;
  padding: 15px 15px;
  width: 75%;
}

button {
  border-radius: 5px 5px;
  font-size: 1em;
  font-weight: bold;
  background-color: var(--font-pink);
  text-transform: uppercase;
  padding: 10px 10px;
  color: var(--background-color);
}

button.disable {
  opacity: 0.8;
  pointer-events: none;
}

button:focus {
  background-color: #ba5b5b;
}

</style>