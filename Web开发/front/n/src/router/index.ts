// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { isTokenExpired, parseJWT } from '@/utils/jwt';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    component: () => import('@/components/Layout/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/dashboard',
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: { title: '数据大屏' },
      },
      {
        path: 'devices',
        name: 'Devices',
        component: () => import('@/views/Devices/index.vue'),
        meta: { title: '设备管理' },
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/Users/index.vue'),
        meta: { title: '用户管理', requiresRole: 'doctor' },
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/Analysis/index.vue'),
        meta: { title: '数据分析' },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile/index.vue'),
        meta: { title: '个人中心' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    console.log(`访问页面: ${to.path}`)

    // 检查是否需要认证
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      next('/login')
      return
    }
    
    // 添加JWT token过期检查
    if (to.meta.requiresAuth && authStore.token) {
      if (isTokenExpired(authStore.token)) {
        // Token已过期，清除认证状态并跳转到登录页
        authStore.logout();
        next('/login');
        return;
      }
    }

    // 检查角色权限
    if (to.meta.requiresRole && authStore.user) {
      const requiredRole = to.meta.requiresRole as string
      const userRole = authStore.user.role

      const roleHierarchy = { family: 1, nurse: 2, doctor: 3 } as const
      type Role = keyof typeof roleHierarchy

      // 类型检查：确保角色在定义范围内
      if (
        requiredRole in roleHierarchy &&
        userRole in roleHierarchy &&
        roleHierarchy[userRole as Role] < roleHierarchy[requiredRole as Role]
      ) {
        next('/dashboard')
        return
      }
    }
    
    // 如果已登录且访问登录页，重定向到首页
    if (to.path === '/login' && authStore.isLoggedIn) {
      next('/dashboard')
      return
    }
    
    next()
  })
  
  router.afterEach((to) => {
    // 设置页面标题
    if (to.meta.title) {
      document.title = `${to.meta.title} - 医疗物联网平台`
    }
  })

export default router;