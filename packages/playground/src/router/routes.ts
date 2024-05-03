export default [
  // Public routes
  {
    name: 'home',
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('@/pages/index.vue'),
      },
      {
        name: 'about',
        path: 'about',
        component: () => import('@/pages/about.vue'),
      },
      {
        name: 'contact',
        path: 'contact',
        component: () => import('@/pages/contact.vue'),
      },
    ]
  },
  // Authentication routes
  {
    name: 'auth',
    path: '/auth',
    component: () => import('@/layouts/auth.vue'),
    redirect: '/auth/login',
    meta: {
      middleware: 'dashboard:guest',
    },
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        name: 'register',
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
    ],
  },
  // Dashboard routes
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/layouts/dashboard.vue'),
    meta: {
      middleware: ['dashboard'],
      fallbackTo: '/auth/login',
    },
    children: [
      {
        name: 'dashboard_home',
        path: '',
        component: () => import('@/pages/dashboard/index.vue'),
      },
      {
        name: 'dashboard_users',
        path: 'users',
        component: () => import('@/pages/dashboard/users.vue'),
        meta: {
          middleware: 'logger',
        },
      },
      {
        name: 'dashboard_posts',
        path: 'posts',
        component: () => import('@/pages/dashboard/posts.vue'),
      },
      {
        name: 'dashboard_profile',
        path: 'profile',
        component: () => import('@/pages/dashboard/profile.vue'),
      },
    ],
  },
]
