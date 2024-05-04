# vue-middleware

vue-middleware is a powerful Vuejs plugin for creating custom middleware, similar to what you find in Nuxt apps but with extra features for roles and permissions..

It helps you manage who can access which parts of your app especially when it comes to different route-based roles or permissions using a nice driver-approach making it great with integrating other backend frameworks, for more information please visit the offical [documentation](https://vue-middleware-docs.vercel.app).

Out of the box it makes it super easy to handle Laravel roles and permissions without needing to set up a bunch of stuff using zero-config driver.

## Installation

Follow these steps to quickly install `vue-middleware` into your project, in this example we're using npm.

```
npm i vue-middleware
```

## Quick Usage

Let's create a simple middleware for protecting our dashboard.

In `main.ts` we're goning to register our first `dashboard` middleware the function receives all the parameters you might think of in the authentication process.

```ts
import { createApp, App } from 'vue'
import vueMiddleware, { type MiddlewareContext } from 'vue-middleware'
import App from './App.vue'

const app: App = createApp(App)

app.use(vueMiddleware, {
  middleware: {
    dashboard: ({ app, router, from, to, redirect, abort, guest }: MiddlewareContext) => {
      //
    },
  },
})

app.mount('#app')
```

In vue-router routes we need to attach this middleware name in a route.

```ts
export const routes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/layouts/dashboard.vue'),
    meta: {
      middleware: 'dashboard', // This dashboard and its children are now guarded using the dashboard middleware
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
      },
    ]
  }
]
```
