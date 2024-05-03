import type { App } from 'vue'
import type {
  Router,
  RouteLocationNormalized,
  RouteMeta,
  RouteLocationRaw,
} from 'vue-router'
import { Driver } from './drivers/driver'

export interface MiddlewareContext {
  app: App
  router: Router
  from: RouteLocationNormalized
  to: RouteLocationNormalized
  redirect: (to: RouteLocationRaw) => void
  abort: () => Symbol | boolean
  guard?: string | undefined
}

export interface Middleware {
  [key: string]: (ctx: MiddlewareContext) => void
}

type MiddlewareName = [string, string | undefined]

export interface Options {
  middleware: Middleware
  pageTitle: {
    template: (name: string, meta: RouteMeta) => string
  } | boolean
  permissions: {
    driver: new (app: App) => Driver
  }
  hooks: {
    onBeforeEach?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void
    onAfterEach?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void
  }
}

const ABORT_KEY = Symbol('VMAbort')
const abort = () => ABORT_KEY

export function handler(
  app: App,
  router: Router,
  options: Partial<Options>
) {
  const {
    pageTitle,
    middleware = {},
    permissions,
    hooks,
  } = options

  let permissionsDriver = null
  if (permissions?.driver) {
    permissionsDriver = new permissions.driver(app)
    if (!(permissionsDriver instanceof Driver)) {
      throw new Error(
        "The driver is not compatible with our base driver are you sure your're extending the base driver."
      )
    }
    permissionsDriver._lookup()
  }

  router.beforeEach((to, from, next) => {
    if (hooks?.onBeforeEach) {
      hooks.onBeforeEach(to, from)
    }

    const { name, matched, meta } = to

    // Add a title and id to the current page
    if (pageTitle !== false && name) {
      document.title = typeof pageTitle === 'object'
        ? pageTitle.template(String(name), meta)
        : createTitle(String(name))
    }

    // Handle the role and permissions if any
    if (permissionsDriver) {
      const fallbackTo = meta.fallbackTo as string | undefined || ''
      if (permissionsDriver._hasntRole(meta)) {
        return next({
          path: fallbackTo,
        })
      } else if (permissionsDriver._hasntPermissions(meta)) {
        return next({
          path: fallbackTo,
        })
      }
    }

    const redirect = (to: RouteLocationRaw) => {
      router.push(to)
    }

    const ctx: MiddlewareContext = {
      app,
      router,
      from,
      to,
      redirect,
      abort,
    }

    // Well, looks like we don't have any middleware to run, so we can call
    // next now, otherwise we will ensure that each middleware doesn't return
    // failure by returning explicit `false` or `ABORT_KEY`..
    const middlewaresToRun = getMiddlewares(
      matched.map(match => match.meta)
    )
    if (!middlewaresToRun.length) {
      next()
    } else {
      const result: boolean[] | Symbol[] | unknown[] = middlewaresToRun.map((middlewareName) => {
        return runMiddleware(middleware, middlewareName, ctx)
      })
      if (result.some(
        (value: unknown) => value === false || value == ABORT_KEY
      )) {
        return next(false)
      }
      next()
    }
  })

  router.afterEach((to, from) => {
    if (hooks?.onAfterEach) {
      hooks.onAfterEach(to, from)
    }
  })
}

// Create a title from a given name
function createTitle(name: string) {
  return (name.charAt(0).toUpperCase() + name.slice(1)).replace(/_|-/gi, ' - ')
}

// Let's run the middleware and give the
// middleware a bunch of parameters to play around with.
function runMiddleware(
  middlewares: Middleware,
  name: string,
  ctx: MiddlewareContext
) {
  const [middleware, guard]: MiddlewareName = name.split(':') as MiddlewareName

  if (!Array.prototype.hasOwnProperty.call(middlewares, middleware)) {
    throw new Error(
      `Unknown [${middleware}] middleware, did you register this middleware?`
    )
  }

  return middlewares[middleware]({
    ...ctx,
    guard,
  })
}

function getMiddlewares(middlewares: RouteMeta[]) {
  return middlewares.reduce((middlewares: string[], meta: RouteMeta) => {
    if (meta.excludeMiddleware) {
      const excludes = Array.isArray(meta.excludeMiddleware)
        ? meta.excludeMiddleware
        : [meta.excludeMiddleware]
      middlewares = middlewares.filter(name => !excludes.includes(name))
    }

    if (Array.isArray(meta.middleware)) {
      middlewares.push(...meta.middleware as [])
    } else if (typeof meta.middleware === 'string') {
      middlewares.push(meta.middleware)
    }

    return middlewares
  }, [])
}
