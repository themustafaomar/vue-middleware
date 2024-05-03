import { type App } from 'vue'
import { type RouteMeta } from 'vue-router'

export abstract class Driver {
  _app: App

  constructor(app: App) {
    this._app = app
  }

  abstract can(): (value: string) => boolean

  abstract is(): (value: string) => boolean

  _hasntRole({ roles }: RouteMeta) {
    roles = this._normalize(roles as string | [])

    return !roles || this.is()(roles as string) ? false : true
  }

  _hasntPermissions({ permissions }: RouteMeta) {
    if (!permissions) {
      return false
    }

    permissions = this._normalize(permissions as string | [])

    return !permissions || this.can()(permissions as string) ? false : true
  }

  _normalize(value: string[] | string) {
    if (Array.isArray(value)) {
      return value.join('&')
    }

    if (typeof value === 'string') {
      return value
    }

    return ''
  }

  _lookup() {
    const globalProperties = this._app.config.globalProperties

    globalProperties.can = this.can()
    globalProperties.is = this.is()
  }
}
