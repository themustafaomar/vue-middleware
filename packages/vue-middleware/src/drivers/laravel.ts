import { type App } from 'vue'
import { Driver } from './driver'

export class LaravelPermissionsDriver extends Driver {
  constructor(app: App) {
    super(app)
  }

  can(): (value: string) => boolean {
    return (value: string) => {
      const permissions = window.Laravel?.permissions

      if (!permissions || !Array.isArray(permissions)) {
        return false
      }

      if (value.includes('|')) {
        return value
          .split('|')
          .some((permission) => permissions.includes(permission.trim()))
      } else if (value.includes('&')) {
        return value
          .split('&')
          .every((permission) => !permissions.includes(permission.trim()))
      } else {
        return permissions.includes(value.trim())
      }
    }
  }

  is(): (value: string) => boolean {
    return (value: string) => {
      const roles = window.Laravel?.roles

      if (!roles || !Array.isArray(roles)) {
        return false
      }

      if (value.includes('|')) {
        return value.split('|').some((item) => roles.includes(item.trim()))
      } else if (value.includes('&')) {
        return value.split('&').every((role) => !roles.includes(role.trim()))
      } else {
        return roles.includes(value.trim())
      }
    }
  }
}
