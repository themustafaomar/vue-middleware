# Basic Middleware

As we mentioned earlier that we can create middlewares inlined so to say, each middleware function is receiving a context parameters you may need it.

```ts
app.use(vueMiddleware, {
  middleware: {
    dashboard({
      app,
      router,
      from,
      to,
      redirect,
      abort,
      guard
    }) {
      //
    },
  },
})
```

## Putting It Where It Belongs

It's prefered to create a middleware directory at the root of your project `@/middleware`, and create an index.ts file that exports all your middlewares, in `index.ts`.

```ts
import dashboard from './dashboard'

export {
  dashboard,
  // More middlewares..
}
```

### Creating Middleware File

In the middleware module file we will define our middleware, at the end it's probably will be something like that for protecting a dashboard.

```ts
import { type MiddlewareContext } from 'vue-middleware'

export default ({ redirect, guard }: MiddlewareContext) => {
  // Assuming this is a Pinia store..
 const { loggedIn } = storeToRefs(useAuthStore())

  // The user is logged in and trying to
  // access auth page e.g: login and register.
  if (loggedIn.value && guard) {
    redirect('/dashboard')
  }

  // The user is not logged in and it's not entering
  // an auth page such as login or register.
  if (!loggedIn.value && !guard) {
    redirect('/auth/login')
  }

  //
}
```

## Attaching Middleware

Now we've done registering our first middleware, it's time to attach this middleware somewehre on a bunch of routes or a particular route.

In routes file we can attach the middleware in the meta property with middleware property with string or array syntax, notice that we can run multiple middlewares together by order.

```ts
{
  name: 'dashboard',
  path: '/dashboard',
  component: () => import('@/layouts/dashboard.vue'),
  meta: {
    middleware: 'dashboard',
    // or using array syntax..
    middleware: ['dashboard', 'logger'], // use extra middleware in sub routes..
  },
}
```

## Guard

When you create your authentication system, likely you will need to check if the user is trying to access login, register pages.. when it's already logged in

In this senario the guard comes in to play, notice how we're going to use the same middleware but this time with guest guard to identity the guest pages, take a look the [earlier example](#creating-middleware-file) to get it into your mind.

Feel free to add new value as a guard and you will receive this value in the middleware, by default if you don't pass a guard value it's be undefined.

```ts
{
  name: 'login',
  path: 'login',
  component: () => import('@/pages/login.vue'),
  meta: {
    middleware: 'dashboard:guest',
  },
},
```

## Redirect

When a middleware runs you may use router.push function to redirect an unauthenticated user or for other reasons somewhere, or using the redirect utility to do the same.

Notice that you don't need to call the next navigation guard to move the next route, for aborting the navigation take a look at the next section.

```ts
export default ({ redirect }) => {
  const store = useAuthStore()

  if (!store.loggedIn) {
    redirect('/login')
  }

  // ...
}
```

## Aborting Navigation

There are two ways to abort a navigation by whether using the utility function abort or returning false explicitly.

```ts
export default ({ abort })) => {
  if (forSomeReasonWillAbort()) {
    return abort()
  }

  // Using `false` explicitly.
  if (forSomeReasonWillAbort()) {
    return false
  }
}
```

## Advanced

Sometimes you may want to apply multiple middlewares in the parent layout but some reasons you want to exclude this middleware from a child page, you may achieve this with excludeMiddleware property, actaully you can apply another middleware children.

```ts
{
  name: 'dashboard',
  path: '/dashboard',
  component: () => import('@/layouts/dashboard.vue'),
  meta: {
    middleware: ['dashboard', 'reporter'],
  },
  children: [
    {
      name: 'dashboard_home',
      path: '',
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      // Final middleware list of this route would be: ['dashboard']
      name: 'dashboard_users',
      path: 'users',
      component: () => import('@/pages/dashboard/users.vue'),
      meta: {
        excludeMiddleware: 'reporter',
      },
    },
    {
      // Final middleware list of this route would be: ['dashboard', 'reporter', 'logger']
      name: 'dashboard_posts',
      path: 'posts',
      component: () => import('@/pages/dashboard/posts.vue'),
      meta: {
        middleware: 'logger',
      },
    },
  ]
}
```

## Context

| Function  | Description | Type |
| ------------| ------------- | --------- |
| `app`       | The app instance | `App` |
| `router`    | The router instance | `Router` |
| `from`      | The current route location | `RouteLocationNormalized` |
| `to`        | The target route location | `RouteLocationNormalized` |
| `redirect`  | Redirect to location | `(to: RouteLocationRaw) => void` |
| `abort`     | Abort the navigation | `() => Symbol \| boolean` |
| `guard`     | The guard identifier | `boolean` |