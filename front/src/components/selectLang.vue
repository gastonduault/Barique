<template>
  <div :class="{'open': open}">
    <img src="@/assets/img/dropdown.webp" class="dropdown" alt="dropdown"/>
    <img @click="changeLanguage(langSelected)"
         :src="'/img/'+langSelected+'.webp'"
         :alt="langSelected" />
    <img v-for="lang in langs.filter(l => l !== langSelected)"
         :key="lang"
         @click="changeLanguage(lang)"
         :src="'/img/'+lang+'.webp'"
         :alt="lang" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Storage } from '@ionic/storage'

export default {
  name: 'SelectLang',

  setup() {
    const langs = ref(['fr', 'en'])
    const langSelected = ref('fr')
    const open = ref(false)
    const { locale } = useI18n()
    let storage = null

    const initStorage = async () => {
      storage = new Storage()
      await storage.create()
    };

    const changeLanguage = async (lang) => {
      open.value = !open.value;
      locale.value = lang;
      langSelected.value = lang;

      if (storage) {
        await storage.set('lang', lang)
      }
    }

    onMounted(async () => {
      await initStorage()
      const lang_selected = await storage.get('lang');
      if (lang_selected) {
        open.value = true
        changeLanguage(lang_selected)
      }
    });

    return {
      langs,
      langSelected,
      open,
      changeLanguage
    };
  }
};
</script>



<style scoped>
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 4px 0;
    overflow-x: initial;
    overflow-y: clip;
    height: 33px;
    position: relative;
    transition: 0.2s;
    border-radius: 3px 3px;
    padding: 4px 4px;
  }

  div.open {
    height: 74px;
    background-color: var(--background-grey);
  }

  div.open img.dropdown{
    transform: rotateZ(180deg);
  }

  img.dropdown {
    transition: transform 0.2s;
    position: absolute;
    right: -10px;
    top: 3px;
    width: 11px;
    height: 11px;
  }

  div img {
    margin: 0 0;
    padding: 0 0;
    width: 39px;
    height: 30px;
    position: initial;
  }
</style>