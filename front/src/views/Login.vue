<template>
  <ion-page>
    <ion-header class="header">
      <SelectLang class="select-lang"/>
      <h1>{{ $t('welcome') }} 🤗</h1>
      <img src="@/assets/img/Logo_PolyWine.webp"  alt="logo polywine"/>
    </ion-header>

    <div class="form">
      <div class="google">
        <img class="google-logo" src="@/assets/img/Google_login.webp"  alt="logo google"/>
        <button class="google-login" @click="logIn"> {{ $t('sign')}} 🗝️{{ $t('google')}}</button>
      </div>
      <div class="version">
        <p>Beta</p>
        v{{VERSION}}
      </div>
    </div>
    <loader v-if="loading"/>
  </ion-page>
</template>

<script>
import { IonPage } from '@ionic/vue';
import { mapActions } from "vuex";
import store from '@/store'
import SelectLang from "@/components/selectLang.vue"
import loader from "@/components/loader.vue"
import config from "@/store/modules/config"

export default {
  data() {
    return {
      VERSION: config.VERSION,
    }
  },
  components: {
    SelectLang,
    IonPage,
    loader
  },
  computed: {
    connected: () => { return store.getters['user/getConnected'] },
    user: () => { return store.getters['user/getUser'] },
    loading: () => { return store.getters['user/getLoading'] }
  },
  methods: {
    ...mapActions("user", ["authentification", "disconnect"]),
    async logIn() {
      await store.dispatch('user/authentification')
    },
  }
};
</script>


<style scoped>
  .header {
    width: 100%;
    height: 65vh;
    position: relative;
    padding: 0 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: start;
    background-color: var(--background-color);
    box-shadow: none !important;
  }

  .select-lang {
    position: absolute;
    top: 5px;
    right: 20px;
  }

  h1 {
    font-weight: bold;
    margin: 30vh 0 0 0;
  }

  .header img {
    width: 200px;
    animation: img-appear .7s;
    transform: rotate(-35deg);
    position: absolute;
    bottom: -40px;
  }

  .form {
    overflow: hidden;
    width: 100%;
    background-color: var(--background-dark);
    animation: form-appear-login .5s ease forwards;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-around;
  }

  @keyframes form-appear-login {
    0% {
      height: 0;
      opacity: 0;
      border-radius: 0 0 0 0;
    }
    100% {
      height: 35vh;
      opacity: 1;
      border-radius: 10px 10px 0 0;
    }
  }

  .form .google-logo {
    width: 100px;
    margin: 0px auto;
  }

  button {
    width: 300px;
    background-color: var(--white);
    color: var(--black);
    padding: 10px 15px;
    border-radius: 25px 25px;
    transition: .3s;
  }

  button:hover {
    background-color: #ece9e9;
    transform: scale(1.05);
  }

  .google {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    padding: 5% 0;
    height: 100%;
  }

  .form p {
    font-weight: bold;
    color: var(--white);
  }

  .credentials {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 40%;
  }

  input {
    width: 270px;
    padding: 5px 5px;
    border-radius: 5px 5px;
    background-color: var(--background-color);
    border: none;
    font-size: .9em;
  }

  .version {
    position: absolute;
    bottom: 10px;
    color: var(--white);
    text-align: center;
    font-size: 0.7em;
  }
   .version p {
      font-size: 1.2em;
     margin: 0 0;
     font-weight: bold;
   }
</style>