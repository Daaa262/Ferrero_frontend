import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import InspectionView from '../views/InspectionView.vue'
import UseView from '../views/UseView.vue'
import ChangeView from '../views/ChangeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
    },
    {
      path: '/inspection',
      name: 'inspection',
      component: InspectionView,
    },
    {
      path: '/use',
      name: 'use',
      component: UseView,
    },
    {
      path: '/change',
      name: 'change',
      component: ChangeView,
    },
  ],
})

export default router
