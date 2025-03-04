<template>
  <ion-page>
    <main>
      <img
          src="@/assets/img/back.webp"
          v-if="back"
          alt="arrow back"
          class="back"
          @click="clickBack"
      />

      <img
          src="@/assets/img/delete.webp"
          v-if="!creation"
          class="remove-cellar"
          alt="cancel creation"
          @click="remove = true"
      />
      <p class="warning" v-if="remove">
        {{ $t('delete_cellar.warn_1') }} <strong>{{ $t('delete') }}</strong> {{ $t('delete_cellar.warn_2') }} <br />{{ $t('cellar') }} ?
      </p>

      <h3 v-if="!remove && creation">{{ $t('create_cellar') }}</h3>
      <h3 v-if="!remove && !creation">{{ $t('editCellar') }}</h3>

      <input
          v-if="!remove"
          :placeholder="$t('cellar_name')"
          v-model="name"
      />

      <button
          v-if="!creation && !remove"
          :class="{ disable: name.length === 0 }"
          @click="editCellar"
      >
        {{ $t('editCellar') }}
      </button>

      <nav v-if="remove">
        <button @click="remove = false">
          {{ $t('cancel') }}
        </button>
        <button @click="deleteCellar">
          {{ $t('delete') }}
        </button>
      </nav>

      <button
          v-if="!remove && creation"
          :class="{ disable: name.length === 0 }"
          @click="createCellar"
      >
        {{ $t('create') }}
      </button>
    </main>
  </ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue';
import store from '@/store';
import router from '@/router';

export default {
  components: {
    IonPage,
  },
  data() {
    return {
      name: '',
      remove: false,
    };
  },
  props: {
    back: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cellar() {
      return store.getters['cellar/getCellarSelected'];
    },
    creation() {
      return this.$route.query.mode !== 'edit';
    },
  },
  watch: {
    '$route.query.mode': {
      immediate: true,
      handler(mode) {
        this.updateComponentBasedOnMode(mode);
      },
    },
  },
  methods: {
    updateComponentBasedOnMode(mode) {
      if (mode === 'edit') {
        this.name = this.cellar.nom;
      } else {
        this.name = '';
      }
    },
    async createCellar() {
      if (this.name !== '') {
        await store.dispatch('cellar/create', this.name);
      }
    },
    async editCellar() {
      if (this.name !== '') {
        const cellar_updated = {
          nom: this.name,
          id: this.cellar.id,
          profile_picture: this.cellar.profile_picture,
        };
        await store.dispatch('cellar/update', cellar_updated);
      }
    },
    clickBack() {
      this.name = '';
      router.push('/cellar');
    },
    async deleteCellar() {
      await store.dispatch("cellar/delete", this.cellar)
    }
  },
};
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
  transition: 0.3s;
}

img.back:focus,
img.back:active,
img.back:hover {
  background-color: #fce5e5;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

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

p.warning {
  text-align: center;
}

.remove-cellar {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}


nav{
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav button:nth-child(1) {
  background-color: var(--background-grey);
  color: var(--font-black);
}
</style>
