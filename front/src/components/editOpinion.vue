<template>
  <div class="background" @click.self="close">
    <div class="opinion" :class="{'close': closeModal}">
      <img src="@/assets/img/close-red.webp"
           class="cancel-creation"
           alt="cancel creation"
           @click="close"/>
      <div class="stars">
      <div v-for="i in 5" :key="i" @click="score = i">
        <img src="@/assets/img/empty_star.webp" alt="stars" v-if="score<i"/>
        <img src="@/assets/img/star.webp" alt="stars" v-else/>
      </div>
    </div>
    <textarea
        rows="5"
        cols="37"
        v-model="notice"
        :placeholder="$t('opinion')"></textarea>
    </div>
  </div>
</template>

<script lang="ts">
  import store from "@/store";

  export default {
    name: "EditOpinion",
    props: {
      bottle: {
        type: Object,
        required: true
      }
    },
    data() {
      return{
        closeModal: false,
        score: 0,
        notice: ""
      }
    },
    methods: {
      async close() {
        if(this.notice!==this.bottle.notice || this.score!==this.bottle.score){
          await this.update()
        }
        this.closeModal = true
        setTimeout(async () => {
          await this.$emit('closeModal')
        }, 500)
      },
      async update() {
        const bottle_updated = this.bottle
        bottle_updated['score'] = this.score
        bottle_updated['notice'] = this.notice
        await store.dispatch("history/update", bottle_updated)
      }
    },
    mounted() {
      this.notice = this.bottle.notice
      this.score = this.bottle.score
    }
  }
</script>

<style scoped>
.opinion .stars {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 7%;
}

.stars img {
  width: 30px;
}

.opinion textarea {
  margin-top: 3%;
  background-color: var(--background-grey);
  border: none;
  border-radius: 5px 5px;
  padding: 5px 5px;
  width: 95%;
}

.background {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.opinion {
  box-sizing: content-box;
  backdrop-filter: blur(6px);
  background-color: rgba(210, 210, 210, 0.04);
  border-radius: 10px 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  animation: modal-appear .2s ease-out forwards;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 10%;
}

.opinion.close {
  animation: modal-disappear .2s ease-out forwards;
}

@keyframes modal-appear {
  0% {
    transform: translateY(+100%);
    border-radius: 0 0 0 0;
    width: 0;
    height: 0;
  }
  100% {
    transform: translateY(0%);
    width: 85%;
    height: 30%;
  }
}

@keyframes modal-disappear {
  0% {
    transform: translateY(0%);
    width: 85%;
    height: 30%;
  }
  100% {
    transform: translateY(+100%);
    width: 0;
    height: 0;
  }
}

.cancel-creation {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}


</style>