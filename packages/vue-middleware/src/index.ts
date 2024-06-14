import type { App } from 'vue'
import type { Router } from 'vue-router'
import { type Options, handler } from './handler'
import './globalDeclarations'

export type { Options, MiddlewareContext } from './handler'

export { Driver } from './drivers/driver'
export * from './drivers'
export * from './composables'

declare module 'vue' {
  interface ComponentCustomProperties {
    is: (value: string) => boolean
    can: (value: string) => boolean
  }
}

const plugin = {
  install(app: App, options: Partial<Options> = {}) {
    const router: Router = app.config.globalProperties.$router

    if (!app.config.globalProperties.$router) {
      throw new Error(
        'The vue-router is required in order to work with vue-middleware.'
      )
    }

    handler(app, router, options)
  },
}

export default plugin
