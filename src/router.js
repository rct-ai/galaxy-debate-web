import { createRouter, createWebHistory } from 'vue-router'
import Chatroom from '@/views/Chatroom.vue'
import Comic from '@/views/Comic.vue'

const routes = [
  {
    path: '/comic',
    component: Comic,
    name: 'comic'
  },
  {
    path: '/',
    component: Chatroom,
    name: 'chatroom'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
