<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-medium mb-5">Profile</h1>
    <div class="shadow bg-white rounded-lg max-w-sm mx-auto p-4">
      <h1 class="text-xl mb-3">Profile</h1>
      <p>Name: {{ user.name }}</p>
      <p v-if="is('admin')" class="bg-green-500 text-sm inline-block bg-opacity-10 text-green-600 mt-3 px-2 py-0.5">ADMIN</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables'

const { user } = useAuth()
</script>
