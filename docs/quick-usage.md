# Quick usage

Let's create a simple middleware for protecting our dashboard.

In `main.ts` we're goning to register our first `dashboard` middleware the function receives all the parameters you might think of in the authentication process.

::: warning
Notice that vue-middleware requires vue-router in order to work.
:::

```ts
import { createApp, type App } from 'vue'
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

In routes file we need to attach this middleware name in a route or most likely a route with its children, e.g dashboard.

```ts
export const routes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('@/layouts/dashboard.vue'),
    meta: {
      // This dashboard and its children are now protected using the dashboard middleware
      middleware: 'dashboard',
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

<!-- # Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown). -->
