<template>
  <button @click="click">
    <img src="@/assets/img/info.webp" alt="info"/>
    Barique ?
  </button>
</template>

<script lang="ts">

import router from "@/router";
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    click() {
      router.push("/about-barique")
    }
  }
})
</script>

<style scoped>
img {
  width: 20px;
  opacity: 0.9;
}
button {
  font-size: 1vmin;
  color: var(--font-pink);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border: none;
  background-color: var(--background-grey);
  padding: 8px;
  border-radius: 5px;
  font-weight: bold;
}
</style>