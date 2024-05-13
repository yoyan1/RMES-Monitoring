import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
      {
          path: '/',
          name: 'adminAuth',
          component: () => import('../views/Auth.vue')
      },
      {
          path: '/dashboard',
          component: AppLayout,
          children: [
              {
                  path: '/overview',
                  name: 'dashboard',
                  component: Dashboard
              },
              {
                  path: '/pages/students',
                  name: 'students',
                  component: () => import('../views/pages/Students.vue')
              },
          ]
      },
  ]
});

export default router
