import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/create-cellar',
    name: 'CreateCellar',
    component: () => import('@/views/CreateCellar.vue'),
    props: route => ({
      back: route.query.back === 'true',
      mode: route.query.mode || 'create',
    })
  },
  {
    path: '/cellarList',
    name: 'CellarList',
    component: () => import('@/views/CellarList.vue')
  },
  {
    path: '/cellar',
    name: 'Cellar',
    component: () => import('@/views/Cellar.vue')
  },
  {
    path: '/historique',
    name: 'Historique',
    component: () => import('@/views/History.vue')
  },
  {
    path: '/about-barique',
    name: 'AboutBarique',
    component: () => import('@/views/AboutBarique.vue')
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
