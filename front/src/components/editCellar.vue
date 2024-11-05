<template>
  <div class="background" @click.self="close">
    <div class="content" :class="{'close': closeModal}">
      <img src="@/assets/img/cancel.png"
           class="cancel-creation"
           alt="cancel creation"
           @click="close"/>
      <input type="text" :placeholder="$t('name_cellar')"
             v-if="!remove"
             v-on:keydown="keydownCellarName($event)"
             v-model="nameCellar"/>
      <div class="images" v-if="!remove">
        <p>{{ $t('image_cellar') }}</p>
        <div>
          <img v-for="img in images"
               key="img"
               @click="imgSelected = img"
               :class="{'selected': imgSelected === img}"
               :src="`${API_URL}${img}`"
               alt="image cellar" />
        </div>
      </div>
      <img src="@/assets/img/delete.png"
           v-if="cellar"
           class="remove-cellar"
           alt="cancel creation"
           @click="remove=true"/>
      <p class="warning" v-if="remove">
        {{$t('delete_cellar.warn_1') }} <strong>{{$t('delete') }}</strong> {{$t('delete_cellar.warn_2') }} <br/>{{$t('cellar') }} ?
      </p>
      <button v-if="!cellar && !remove" @click="createCellar" :class="{'disable': nameCellar === ''}">
        {{$t('create') }}
      </button>
      <button v-else-if="cellar && !remove" @click="updateCellar" :class="{'disable': nameCellar === ''}">
        {{$t('update') }}
      </button>
      <nav v-else>
        <button @click="remove = false">
          {{$t('cancel') }}
        </button>
        <button @click="deleteCellar">
          {{$t('delete') }}
        </button>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import router from "@/router";

export default {
  name: "EditCellar",
  data() {
    return {
      closeModal: false,
      nameCellar: "",
      remove: false,
      API_URL: '/api',
      imgSelected: '',
    }
  },
  computed: {
    utilisateur: () => store.getters['user/getUSer'],
    images: () => store.getters['cellar/getImages']
  },
  props: {
    cellar: Object,
  },
  async mounted() {
    await store.dispatch('cellar/listImage')
    this.init()
  },
  methods: {
    init() {
      if(this.cellar) {
        this.nameCellar = this.cellar.nom
      }
      if(this.images) {
        this.imgSelected = this.images[0]
        console.log(this.imgSelected)
      }
    },
    async close() {
      this.closeModal = true
      setTimeout(async () => {
        await this.$emit('closeModal')
      }, 500)
    },
    keydownCellarName(event: any) {
      if(event.code === "Enter" || event.key === "Enter") this.createCellar()
    },
    async createCellar() {
      if(this.nameCellar !== "" ){
        const cellar = {
          proprietaire_uid: this.utilisateur.uid,
          nom: this.nameCellar,
          profile_picture: this.imgSelected,
        }
        await store.dispatch('cellar/create', cellar)
        this.close()
      }
    },
    async updateCellar() {
      if(this.nameCellar !== "" ){
        this.cellar['nom'] = this.nameCellar
        this.cellar['profile_picture'] = this.imgSelected
        await store.dispatch("cellar/update", this.cellar)
        this.close()
      }
    },
    async deleteCellar() {
      this.closeModal = true
      await this.$emit('closeModal')
      await router.push('/cavelist')
      await store.dispatch("cellar/delete", this.cellar)
    }
  }
}
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  box-sizing: content-box;
  backdrop-filter: blur(6px);
  background-color: rgba(210, 210, 210, 0.04);
  border-radius: 10px 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  animation: modal-appear .5s ease-out forwards;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 10%;
}

.content.close {
  animation: modal-disappear .5s ease-out forwards;
}

.content img,
.content input,
.content button{
  opacity: 1;
  transition: opacity 0.4s;
}


.content.close img,
.content.close input,
.content.close button{
  opacity: 0;
}

@keyframes modal-appear {
  0% {
    transform: translateY(+100%);
    border-radius: 0 0 0 0;
    width: 0;
    height: 0;
  }
  100% {
    transform: translateY(0%);
    width: 80%;
    height: 55%;
  }
}

@keyframes modal-disappear {
  0% {
    transform: translateY(0%);
    width: 80%;
    height: 55%;
  }
  100% {
    transform: translateY(+100%);
    width: 0;
    height: 0;
  }
}

.cancel-creation {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

p.warning {
  text-align: center;
}

.remove-cellar {
  width: 17px;
  height: 17px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

input {
  background-color: var(--background-color);
  border: solid 1px var(--background-grey);
  border-radius: 25px 25px;
  padding: 10px 10px;
  width: 75%;
  margin-bottom: 5%;
}

.images {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.images p{
  margin: 0 0;
  padding: 0 0;
}

.images div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
  padding: 4px 2px 2px 2px;
  border-radius: 10px 10px;
  flex-wrap: wrap;
  gap: 4px 10px;
  max-height: 37vh;
  overflow-y: auto;
}

.images img {
  width: 40%;
  min-width: 110px;
  border-radius: 3px 3px;
}

.images img.selected {
  border: solid 2.5px var(--font-pink);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

button {
  position: absolute;
  bottom: 10px;
  border-radius: 5px 5px;
  font-size: 1em;
  font-weight: bold;
  background-color: var(--font-pink);
  text-transform: uppercase;
  margin-top: 20px;
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

nav{
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav button {
  position: relative;
}

nav button:nth-child(1) {
  background-color: var(--blue);
}
</style>