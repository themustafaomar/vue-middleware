import { createApp, h, toRaw, unref } from 'vue'
import vueMiddleware, { LaravelPermissionsDriver } from 'vue-middleware'
import { useAuth } from './composables'
import middleware from './middleware'
import './style.css'
import router from './router'
import App from './App.vue'
import { RouteLocationNormalized, RouteMeta } from 'vue-router'

const app = createApp({
  render: () => h(App),
  beforeCreate: () => {
    window.Laravel = toRaw(unref(useAuth().permissions))
  },
})

app.use(router)
app.use(vueMiddleware, {
  middleware,
  permissions: {
    driver: LaravelPermissionsDriver,
  },
  hooks: {
    onBeforeEach: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized
    ): void => {
      //
    },
    onAfterEach: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized
    ): void => {
      //
    },
  },
  pageTitle: {
    template: (name: string, meta: RouteMeta) => {
      // Transform you name, you're also have access to
      // meta property if you need to define your own title from route meta.
      // console.log(name, meta)

      let title: string[] | string = name.replace(/_|-/g, ' ').split(' ')

      title = title[title.length - 1]

      // dashboard_users -> Users, dashboard-posts -> Posts etc..

      return `${title.charAt(0).toUpperCase()}${title.slice(1)}`
    }
  },
})
app.mount('#app')
