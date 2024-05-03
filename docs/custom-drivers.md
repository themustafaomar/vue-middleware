# Creating Custom Drivers

For some reasons you may want to write your own is and can, vue middleware makes it easy to create your custom driver.

## Getting Started

Let's create our custom driver that handles roles and permissions for us, feel free to add your can and is logic inside the can and is methods.

In the following example that's the default Laravel driver.

The can and is become our global utilties you're using everywhere.

```ts
import type { App } from 'vue'
import { Driver } from 'vue-middleware'

export class MyPermissionsDriver extends Driver {
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

```