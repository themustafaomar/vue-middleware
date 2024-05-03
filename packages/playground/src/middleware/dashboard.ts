import { type MiddlewareContext } from 'vue-middleware'
import { useAuth } from '@/composables'

export default ({ app, router, from, to, redirect, abort, guard }: MiddlewareContext) => {
  const { loggedIn } = useAuth()

  console.log('> 🔥 The `dashboard` middleware..', guard)

  if (loggedIn.value && guard === 'guest') {
    return redirect({ name: 'dashboard' })
  }

  if (!loggedIn.value && !guard) {
    return redirect({ path: '/auth/login' })
  }

  // return abort()
}
