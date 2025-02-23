<template>
  <ion-page>
    <loader/>
  </ion-page>
</template>

<script>
import store from '@/store'
import router from "@/router"
import {Storage} from "@ionic/storage";
import loader from "@/components/loader.vue"

export default {
  components: {
    loader,
  },
  computed: {
    user: () => { return store.getters['user/getUser'] },
    connected: () => { return store.getters['user/getConnected'] },
  },
  async mounted() {
    this.storage = new Storage()
    await this.storage.create()
    const token = await this.storage.get('token')
    console.log(token)
    if(token) {
      await store.dispatch('user/login')
      router.push("./caveList")
    } else {
      router.push('./Login')
    }
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