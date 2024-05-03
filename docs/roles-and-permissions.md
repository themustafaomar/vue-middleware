# Roles And Permissions

In this section we're gonna be discussing how to add roles and permissions into your application.

## Getting Started

Roles and permissions as we've already mentioned is a route-based, in order to work we have to store the roles and permissions somehow when a user logged in.

Typically, when a user logged in we add the user, roles and permissions in the localStorage, vue-middleware requires the roles and permissions to be added to the window object as well, when using `LaravelPermissionsDriver` driver, the example below we'll assume we're using Laravel.

::: info
But refreshing the page would waste these values, right? that's why you need to populate the window each time a refresh is made.
:::

```ts
...

const login = () => {
  const { data } = axios.post('/login', ...)
  
  localStorage.set('user', JSON.stringify({
    // The user..
    user: data.user,

    // An array of permissions ['view posts', 'create posts', 'edit posts', ...]
    permissions: data.permissions,

    // An array of roles ['admin']
    roles: data.roles,
  }))

  window.Laravel = data // A copy for the window.
}
```

**Tip**: in order to populate the roles and permissions in the window, beforeCreate hook is a perfect place to do so, for complete use-case senario please visit the [playground](https://github.com/themustafaomar/vue-middleware/tree/main/packages/playground) project.

```ts
const app = createApp({
  ...
  beforeCreate: () => {
    const { roles, permissions } = JSON.parse(localStorage.get('user'))

    window.Laravel = {
      roles, // ['admin', ...]
      permissions, // ['view users', 'create users', 'edit users', 'delete users', ...]
    }
  },
  ...
})
```

## Registering A Driver

In this example we're gonna be using the `LaravelPermissionsDriver` driver.

```diff
+ import { LaravelPermissionsDriver } from 'vue-middleware'

app.use(vueMiddleware, {
  middlewares,
+   permissions: {
+     driver: LaravelPermissionsDriver,
+   },
})
```

## Attaching Permissions

Once the driver is installed now we we're ready to add roles and permissions per route.

```ts
{
  name: 'dashboard_users',
  path: 'users',
  component: () => import('@/pages/dashboard/users.vue'),
  meta: {
    // All permissions in the array must be granted in order to enter.
    permissions: ['view users'],

    // Using the string syntax.
    permissions: 'view users',

    // Any permissions
    permissions: 'view any | view users',

    // All permissions have to be granted,
    permissions: 'view dashboard & view users',
  },
},
```

## Attaching Roles

Attaching roles is is the same as attaching permissions.

```ts
{
  name: 'dashboard_users',
  path: 'users',
  component: () => import('@/pages/dashboard/users.vue'),
  meta: {
    // All permissions in the array must be granted in order to enter.
    roles: ['admin'],

    // Using the string syntax.
    roles: 'admin',

    // Any roles
    roles: 'admin | moderator',

    // All roles have to be granted,
    roles: 'moderator & editor',
  },
},
```