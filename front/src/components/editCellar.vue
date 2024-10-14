<template>
  <div class="background" @click.self="close">
    <div class="content" :class="{'close': closeModal}">
      <img src="@/assets/img/cancel.png"
           class="cancel-creation"
           alt="cancel creation"
           @click="close"/>
      <input type="text" placeholder="Name of your cellar"
             v-if="!remove"
             v-on:keydown="keydownCellarName($event)"
             v-model="nameCellar"/>
      <img src="@/assets/img/delete.png"
           v-if="cellar"
           class="remove-cellar"
           alt="cancel creation"
           @click="remove=true"/>
      <p class="warning" v-if="remove">
        Are you sure you want to <strong>delete</strong> this <br/>cellar ?
      </p>
      <button v-if="!cellar && !remove" @click="createCellar" :class="{'disable': nameCellar === ''}">
        Create
      </button>
      <button v-else-if="cellar && !remove" @click="updateCellar" :class="{'disable': nameCellar === ''}">
        Update
      </button>
      <nav v-else>
        <button @click="remove = false">
          cancel
        </button>
        <button @click="deleteCellar">
          delete
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
      remove: false
    }
  },
  computed: {
    utilisateur: () => store.getters['user/getUSer'],
  },
  props: {
    cellar: Object,
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if(this.cellar) {
        this.nameCellar = this.cellar.nom
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
          nom: this.nameCellar
        }
        await store.dispatch('cellar/create', cellar)
        this.close()
      }
    },
    async updateCellar() {
      if(this.nameCellar !== "" ){
        this.cellar['nom'] = this.nameCellar
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
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: 80%;
  height: 50%;
  background-color: var(--white);
  border-radius: 10px 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  animation: modal-appear .5s ease-out forwards;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
    height: 50%;
  }
}

@keyframes modal-disappear {
  0% {
    transform: translateY(0%);
    width: 80%;
    height: 50%;
  }
  100% {
    transform: translateY(+100%);
    width: 0;
    height: 0;
  }
}

.cancel-creation {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

p.warning {
  text-align: center;
}

.remove-cellar {
  width: 20px;
  height: 20px;
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
}

button {
  position: absolute;
  bottom: 20px;
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