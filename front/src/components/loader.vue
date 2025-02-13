<template>
  <div>
    <img src="@/assets/img/load.webp" alt="loading gif">
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
  div {
    background-color: transparent;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    justify-content: center;
    z-index: 10;
    animation: blur-effect 1s forwards;
  }
  @keyframes blur-effect {
    0% {
      backdrop-filter: blur(0px);
      background-color: transparent;
    }
    100% {
      backdrop-filter: blur(2px);
      background-color: rgba(0, 0, 0, 0.08);
    }
  }

  img {
    width: 40px;
    padding: 6px;
    background-color: #FFFFFF;
    border-radius: 50%;
    opacity: 0;
    animation: appear 1s forwards;
    animation-delay: .5s;
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>