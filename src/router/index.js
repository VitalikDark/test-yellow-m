import { createRouter, createWebHistory } from 'vue-router'
import Films from '../views/Films'
import FilmById from '@/views/FilmById.vue'
import FilmBookTicket from '@/views/FilmBookTicket.vue'

const routes = [
  {
    path: '/',
    name: 'films',
    component: Films
  },
  {
    path: '/films/:id',
    name: 'FilmById',
    component: FilmById
  },
  {
    path: '/films/book/ticket/:id',
    name: 'FilmTicket',
    component: FilmBookTicket
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
