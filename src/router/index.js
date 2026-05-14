import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import TiendaView from '../views/TiendaView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('usuarioLogueado')) {
        const rol = localStorage.getItem('rolUsuario')
        next(rol === 'admin' ? '/dashboard' : '/tienda')
      } else {
        next()
      }
    }
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, rol: 'admin' },
    children: [
      { path: '', redirect: '/dashboard/productos' },
      { path: 'productos', component: ProductView }
    ]
  },
  {
    path: '/tienda',
    component: TiendaView,
    meta: { requiresAuth: true, rol: 'cliente' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const logueado = localStorage.getItem('usuarioLogueado')
  const rol = localStorage.getItem('rolUsuario')
  if (to.meta.requiresAuth && !logueado) {
    next('/login')
  } else if (to.meta.rol && to.meta.rol !== rol) {
    next(rol === 'admin' ? '/dashboard' : '/tienda')
  } else {
    next()
  }
})

export default router