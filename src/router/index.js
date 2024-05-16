import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AppLayout from '@/layout/AppLayout.vue';
import { getCurrentUser } from 'vuefire';

const router = createRouter({
  history: createWebHistory(),
  routes: [
      {
          path: '/',
          name: 'adminAuth',
          component: () => import('../views/Auth.vue')
      },
      {
          path: '/scanner',
          name: 'scanner',
          component: () => import('../views/QrScanner.vue')
      },
      {
          path: '/',
          name: 'home',
          component: AppLayout,
          meta: { requiresAuth: true },
          children: [
              {
                  path: 'home/overview',
                  name: 'dashboard',
                  component: Dashboard
              },
              {
                  path: 'pages/students',
                  name: 'students',
                  component: () => import('../views/pages/Students.vue')
              },
              {
                  path: 'pages/attendance',
                  name: 'attendance',
                  component: () => import('../views/pages/Attendance.vue')
              },
          ]
      },
  ]
});

//Navigation guard
router.beforeEach(async (to) => {
    // routes with `meta: { requiresAuth: true }` will check for
    // the users, others won't
    if (to.meta.requiresAuth) {
      const currentUser = await getCurrentUser()
      // if the user is not logged in, redirect to the login page
      if (!currentUser) {
        return {
          path: '/',
          query: {
            // we keep the current path in the query so we can
            // redirect to it after login with
            // `router.push(route.query.redirect || '/')`
            redirect: to.fullPath,
          },
        }
      }
    }
  })

export default router
