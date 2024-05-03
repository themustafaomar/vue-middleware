# Page Title

While navigating each route vue-middleware generates a page title depending on the route name if presented, with the ability to customize the title format perfectly.

## Enabling Page Title

Actually, the page title is enabled by default and you can disable it with the following:

```ts
app.use(vueMiddleware, {
  pageTitle: false,
}
```

## Customization

By default the page title is enabled and replacing each `-` or `_` with a space, that means if you have a route named `dashboard_users` it becomes Dashboard - users, to customize this behavior take a look at the following snippet.

```ts
import { type RouteMeta } from 'vue-router'

app.use(vueMiddleware, {
  pageTitle: {
    template: (name: string, meta: RouteMeta) => {
      // Transform you name, you're also have access to
      // meta property if you need to define your own title from route meta.

      let title: string[] | string = name.replace(/_|-/g, ' ').split(' ')

      title = title[title.length - 1]

      // dashboard_users -> Users
      // dashboard-posts -> Posts etc..

      return `${title.charAt(0).toUpperCase()}${title.slice(1)}`
    }
  },
})
```
