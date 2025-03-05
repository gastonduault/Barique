<template>
  <ion-app>
    <ion-router-outlet />
    <Notification />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import  Notification  from "@/components/Notifications.vue";

GoogleAuth.initialize({
  clientId: "97526311048-tmiibfki5o5plfcjel513b0n4a5qan0e.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  grantOfflineAccess: true,
});
</script>
