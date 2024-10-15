import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    fr: {
      welcome: 'Bienvenue',
      sign: 'Inscris-toi/ Connecte-toi',
      google: 'avec Google',
      hello: 'Bonjour !',
      your_cellar: 'Vos caves',
      no_cellar: {
        msg_1: "vous n'avez pas de cave pour le moment, vous pouvez en",
        msg_2: "créer",
        msg_3: "une"
      },
      delete_cellar: {
        warn_1: 'Êtes-vous sûr de vouloir',
        warn_2: 'cette',
      },
      delete: 'supprimer',
      cellar: 'cellar',
      create: 'créer',
      update: 'modifier',
      cancel: 'annuler',
      name_cellar: 'Nom de votre cave',
      search: 'Recherche',
      no_bottle: {
        msg_1: 'votre cave est vide,',
        msg_2: 'vous pouvez ajouter des',
        msg_3: 'bouteilles',
      },
      new_bottle: 'Nouvelle bouteille',
      name: 'Nom',
      cepage: 'Cepage',
      region: 'Région',
      vintage_input: 'Millésime ex : 2016',
      vintage: 'Millésime',
      bottle_drunk: 'Bouteille bue',
      history: 'Historique',
      no_history: {
        msg_1: "Pour le moment votre historique de bouteille bue",
        msg_2: 'est vide'
      },
    },
    en: {
      welcome: 'welcome here',
      sign: 'Sign In/ Login',
      google: 'with Google',
      hello: 'Hi !',
      your_cellar: 'Your cellars',
      no_cellar: {
        msg_1: "you don't have a cellar at the moment, you can",
        msg_2: "create",
        msg_3: "one"
      },
      delete_cellar: {
        warn_1: 'Are you sure you want to',
        warn_2: 'this',
      },
      delete: 'delete',
      cellar: 'cellar',
      create: 'create',
      update: 'update',
      cancel: 'cancel',
      name_cellar: 'Name of your cellar',
      search: 'Search',
      no_bottle: {
        msg_1: 'For the moment your cellar is empty',
        msg_2: 'you can',
        msg_3: 'Add bottle',
      },
      new_bottle: 'New bottle',
      name: 'Name',
      cepage: 'Cepage',
      region: 'Region',
      vintage_input: 'Vintage ex: 2016',
      vintage: 'Vintage',
      bottle_drunk: 'bottle drunk',
      history: 'History',
      no_history: {
        msg_1: "For the moment your history of bottle drunk",
        msg_2: 'is empty'
      },
    }
  }
});

export default i18n;