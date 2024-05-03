<template>
  <nav class="bg-white border-b p-5 mb-8">
    <div class="container flex justify-between mx-auto">
      <ul v-if="loggedIn" class="flex items-center justify-center space-x-5">
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/dashboard/profile">Profile</router-link>
        </li>
        <li>
          <router-link to="/dashboard/users">Users</router-link>
        </li>
        <li>
          <router-link to="/dashboard/posts">Posts</router-link>
        </li>
      </ul>

      <div v-else class="flex items-center justify-center space-x-5">
        Login to view dashboard links...
      </div>

      <div v-if="!loggedIn">
        <router-link to="/auth/login">Login</router-link> |
        <router-link to="/auth/register">Register</router-link>
      </div>

      <div v-else>
        <router-link to="#">Hi, {{ user?.name }}</router-link> |
        <router-link @click.prevent="logout" to="#">&DownArrow; Logout</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables'

const router = useRouter()
const { loggedIn, user, reset } = useAuth()

const logout = () => {
  localStorage.clear()
  reset()
  window.Laravel = {}
  router.push('/')
}
</script>
