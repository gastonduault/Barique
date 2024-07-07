<template>
  <div class="page">
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
  </div>
</template>


<script lang="ts">
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import axios from "axios";

export default {
  name: "HomePage",
  mounted() {
    GoogleAuth.initialize();
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
      try {
        const responseRequest = await axios.post('http://localhost:5001/utilisateurs', utilisateur);
        console.log(responseRequest);
      } catch(error) {
        console.error(error);
      }
      //TODO: add loader
      // finally {}
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