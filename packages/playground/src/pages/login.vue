<template>
  <div class="container mx-auto">
    <div class="border shadow rounded-lg max-w-96 mx-auto mt-16 p-6">
      <h1 class="text-3xl text-center mb-5">Login</h1>

      <button @click="login(true)" class="bg-blue-500 text-white rounded-lg shadow-sm block w-full p-3">
        Login with Admin (full permissions)
      </button>

      <div class="my-3"></div>

      <button @click="login()" class="bg-blue-500 text-white rounded-lg shadow-sm block w-full p-3">
        Login with moderator (less permissions)
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const login = (admin = false) => {
  const fakeUser = { id: 100, name: admin ? 'Mustafa Omar' : 'Muhammad Salah' }
  const fakePermissionsAndRoles = {
    roles: admin
      ? ['admin']
      : ['moderator'],
    permissions: admin
      ? ['view users', 'create users', 'edit users', 'delete users', 'view posts', 'create posts', 'edit posts', 'delete posts']
      : ['view users', 'create users', 'view posts', 'create posts'],
  }

  setTimeout(() => {
    localStorage.setItem('user', JSON.stringify({
      user: fakeUser,
      permissions: fakePermissionsAndRoles,
    }))

    window.Laravel = fakePermissionsAndRoles
    router.push('/dashboard')
  }, 500)
}
</script>
