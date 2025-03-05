<template>
  <div class="notification-container">
    <div v-for="notification in notifications"
         :key="notification.id"
         class="notification"
         :class="{ good: notification.good }">
      <p>{{ notification.message }}</p>
      <img v-if="!notification.good" src="@/assets/img/close.webp"
           @click="clickRemoveNotification(notification.id)" alt="close">
      <img v-else src="@/assets/img/cancel.webp"
           @click="clickRemoveNotification(notification.id)" alt="close">
    </div>
  </div>
</template>

<script lang="ts">
import store from '@/store'

export default {
  name: 'NotificationComponent',
  data() {
    return {
      closing: false,
    }
  },
  computed: {
    notifications: () => {
      return store.getters['notifications/getNotifications']
    },
  },
  methods: {
    clickRemoveNotification(id: string) {
      store.dispatch('notifications/removeNotification', id)
    }
  }
}
</script>
<style scoped>
.notification-container {
  position: fixed;
  bottom: 20px;
  height: auto;
  width: 65%;
  left: 17.5%;
  max-height: 60vh;
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
}

.notification {
  width: 100%;
  height: 50px;
  background: var(--light-pink);
  z-index: 2;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 3px;
  animation: notif-appear 0.5s ease-out; /* Ajout de l'animation ici */
}

.notification.good {
  background-color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

.notification.good p {
  color: var(--blue);
  font-weight: bold;
}

.notification p {
  color: white;

}

p {
  text-align: center;
  margin: 0 27px 0 0;
}

@keyframes notif-appear {
  0% {
    opacity: 0;
    transform: translateY(-30%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification img {
  cursor: pointer;
  width: 27px;
  height: 27px;
  position: absolute;
  right: 5px;
}

.notification.good img {
  width: 15px;
  height: 15px;
  right: 10px;
}

</style>
