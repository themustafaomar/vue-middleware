import { ref, computed, Ref } from 'vue'

interface User {
  id: number
  name: string
}

export function useAuth() {
  const user: Ref<User | null> = ref(null)
  const permissions = ref([])
  const loggedIn = computed(() => {
    return !!user.value
  })

  if (localStorage.getItem('user')) {
    const data = JSON.parse(localStorage.getItem('user') as string)

    user.value = data.user
    permissions.value = data.permissions
  }

  const reset = () => {
    user.value = null
    permissions.value = []
  }

  return { loggedIn, user, permissions, reset }
}
