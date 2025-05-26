import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import InspectionView from '../views/InspectionView.vue'
import UseView from '../views/UseView.vue'
import MoveView from '../views/MoveView.vue'
import AddView from '../views/AddView.vue'
import RemoveView from '../views/RemoveView.vue'
import UselessView from '../views/UselessListView.vue'

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
      path: '/move',
      name: 'move',
      component: MoveView,
    },
    {
      path: '/add',
      name: 'add',
      component: AddView,
    },
    {
      path: '/remove',
      name: 'remove',
      component: RemoveView,
    },
    {
      path: '/useless',
      name: 'useless',
      component: UselessView,
    },
  ],
})

export default router
