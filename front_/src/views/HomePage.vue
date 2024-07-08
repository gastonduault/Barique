<template>
  <ion-page>
    <ion-header class="header">
      <h1>WELCOME HERE 🤗</h1>
      <img src="../assets/img/Logo_PolyWine.png"  alt="logo polywine"/>
    </ion-header>

    <div class="form">
      <div class="google">
        <img class="google-logo" src="@/assets/img/Google_login.png"  alt="logo google"/>
        <button class="google-login" @click="logIn"> Sign In / Login 🗝️ with Google</button>
      </div>
      <p> - OR - </p>
      <div class="credentials">
        <input type="text" value="" placeholder="Name" />
        <input type="email" value="" placeholder="Email" />
        <input type="password" value="" placeholder="Password" />
        <button class="creds-login">Sign In / Login 🗝️</button>
      </div>
    </div>
  </ion-page>
</template>


<script lang="ts">
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import axios from "axios";
import { Storage } from '@ionic/storage';
import { useRouter } from 'vue-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import store from '@/store';

export default {
  name: "HomePage",
  data() {
    return {
      storage: new Storage,
    }
  },
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar
  },
  setup() {
    const router = useRouter();
    return { router }
  },
  async created() {
    this.storage = new Storage();
    await this.storage.create();
    const account_id = await this.storage.get('uid');
    if(account_id) await store.dispatch('user/login', account_id);
  },
  async mounted() {
    GoogleAuth.initialize();
  },
  computed: {
    connected: () => { return store.getters['user/getConnected'] }
  },
  methods: {
    async logIn() {
      const response = await GoogleAuth.signIn();
      const utilisateur = {
        email: response.email,
        account_id: response.id,
        nom: response.name,
        profile_picture: response.imageUrl
      }
      await store.dispatch('user/authentification', utilisateur);
      await this.saveUserData(store.getters['user/getUSer'].uid)
    },
    async saveUserData(uid: any) {
      console.log(uid)
      await this.storage.set('uid', uid);
    },
  }
}

</script>

<style scoped>
  .header {
    width: 100%;
    height: 33vh;
    position: relative;
    padding: 0 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    background-color: var(--background-color);
    box-shadow: none !important;
  }

  h1 {
    font-weight: bold;
    margin: 20px 0 0 0;
  }

  .header img {
    width: 200px;
    animation: img-appear .7s;
    transform: rotate(-35deg);
    position: absolute;
    bottom: -40px;
  }

  .form {
    width: 100%;
    background-color: var(--background-dark);
    height: 67vh;
    animation: form-appear .5s ease-out;
    border-radius: 25px 25px 0 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-around;
  }

  .form .google-logo {
    width: 60px;
    margin: 20px auto;
  }

  @keyframes form-appear {
    0% {
      transform: translateY(+100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  button {
    width: 300px;
    background-color: var(--white);
    color: var(--black);
    padding: 10px 5px;
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
    height: 25%;
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
</style>