<template>
  <div class="content" :class="{'open': isOpen}">
    <button class="burger"  @click="isOpen = !isOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <nav>
      <SelectLang />
      <div class="account">
        <img v-if="user.profile_picture" :src="user.profile_picture"  alt=""/> <h4>{{ user.nom }}</h4>
      </div>
      <button @click="clickHistory">
        <img src="@/assets/img/historique.webp" alt/>
        {{ $t('history') }}
      </button>
      <button @click="editCellar">
        <img src="@/assets/img/edit.webp" alt/>
        {{ $t('editCellar') }}
      </button>
      <button @click="changeCellar">
        <img src="@/assets/img/change.webp" alt/>
        {{ $t('changeCellar') }}
      </button>
      <button @click="disconnection">
        <img src="@/assets/img/decconection.webp"  alt/>
        {{ $t('disconnect') }}
      </button>
      <div class="bottom">
        <div class="version">
          <p>Beta</p>
          v{{VERSION}} - © Copyright barique
        </div>
        <ButtonAboutBarique class="button-about"/>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import router from "@/router";
import SelectLang from "@/components/selectLang.vue";
import config from "@/store/modules/config"
import ButtonAboutBarique from "@/components/ButtonAboutBarique.vue";


export default {
  name: 'MenuComponent',
  data() {
    return {
      isOpen: false,
      VERSION: config.VERSION,
    }
  },
  components: {
    ButtonAboutBarique,
    SelectLang
  },
  computed: {
    user: () => store.getters['user/getUser'],
  },
  methods: {
    clickHistory() {
      store.dispatch('history/bottles')
      router.push("/Historique")
      this.isOpen = false
    },
    editCellar() {
      router.push({
        name: "CreateCellar",
        query: {
          back: true,
          mode: 'edit',
        }
      })
      this.isOpen = false
    },
    changeCellar() {
      store.dispatch("cellar/listCellars");
      router.push({
        path: "/cellarList"
      })
      this.isOpen = false
    },
    disconnection() {
      store.dispatch('user/disconnect')
      this.isOpen = false
    }
  }
}
</script>

<style scoped>
.burger {
  margin: 0 0;
  padding: 0 0;
  width: 30px;
  height: fit-content;
  position: absolute;
  left: 15px;
  top: 20px;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  z-index: 2;
}

.burger span {
  display: block;
  width: 100%;
  height: 4px;
  background-color: var(--font-black);
  border-radius: 25px;
  transition: transform .2s;
}

.content.open .burger span:nth-child(1) {
  transform: rotate(45deg) translateX(6px) translateY(6px);
}

.content.open .burger span:nth-child(2) {
  transform: translateX(50px);
  opacity: 0;
}

.content.open .burger span:nth-child(3) {
  transform: rotate(-45deg) translateX(7px) translateY(-6px);
}

.content {
  position: absolute;
  top: 0;
  left: 0;
}

.content.open {
  width: 100%;
  height: 100%;
}

.content nav{
  width: 0;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--white);
  z-index: 1;
  transition: 0.2s;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10%;
}

.content.open nav{
  width: 100vw;
}

.account  {
  display: flex;
  align-items: center;
  gap: 10px;
}

.account img {
  width: 40px;
  border-radius: 25px;
}

button {
  background-color: var(--background-grey);
  padding: 15px;
  width: 250px;
  text-align: center;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: bold;
  color: var(--font-black);
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
}

button img{
  width: 20px;
}

button:last-child{
  color: var(--font-pink);
}
.bottom {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  bottom: 5px;
  width: 100%;
}

.bottom button {
  width: fit-content;
  padding: 5px 5px;
  font-size: 0.9em;
  background-color: transparent;
}

.version {
  text-align: center;
  font-size: 0.7em;
  color: var(--font-black)
}
.version p {
  color: var(--font-pink);
  font-size: 1.2em;
  margin: 0 0;
  font-weight: bold;
}
</style>
