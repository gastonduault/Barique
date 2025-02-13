<template>
  <ion-page>
    <ion-header class="header">
      <SelectLang class="select-lang"/>
      <h1>{{ $t('welcome') }} 🤗</h1>
      <img src="@/assets/img/Logo_PolyWine.png"  alt="logo polywine"/>
    </ion-header>

    <div class="form">
      <div class="google">
        <img class="google-logo" src="@/assets/img/Google_login.png"  alt="logo google"/>
        <button class="google-login" @click="logIn_"> {{ $t('sign')}} 🗝️{{ $t('google')}}</button>
      </div>
    </div>
    <loader v-if="loading"/>
  </ion-page>
</template>


<script lang="ts">
import { Storage } from '@ionic/storage'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import { auth, signInWithGoogle, logout, provider} from "@/firebase-config";
import SelectLang from "@/components/selectLang.vue"
import loader from "@/components/loader.vue"
import router from "@/router"
import store from '@/store'



export default {
  name: "HomePage",
  data() {
    return {
      storage: new Storage,
    }
  },
  components: {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar, loader, SelectLang
  },
  async created() {
    this.storage = new Storage();
    await this.storage.create();
    const account_id_storage = await this.storage.get('uid');
    if(account_id_storage) {
      store.dispatch('user/login', account_id_storage)
        .then(() => { if(this.connected) router.push('./caveList') });
    }
  },
  computed: {
    connected: () => { return store.getters['user/getConnected'] },
    loading: () => { return store.getters['user/getLoading'] },
  },
  methods: {
    async saveUserData(uid: any) {
      await this.storage.set('uid', uid);
    },
    async logIn_() {
      const user = await signInWithGoogle();
      console.log(user)
      await store.dispatch('user/authentification', user);
      await this.saveUserData(store.getters['user/getUSer'].uid)
      if(this.connected) await router.push('/caveList');
    }
  }
}

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
    margin: 30% 0 0 0;
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
    height: 35vh;
    animation: form-appear .5s ease-out;
    border-radius: 25px 25px 0 0;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-around;
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
</style>