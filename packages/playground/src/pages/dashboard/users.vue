<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-medium mb-5">Users</h1>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="n in 8" class="shadow bg-white rounded-lg p-4">
        <h2 class="text-xl mb-3">User {{ n }}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.libero quo veritatis.</p>
        <button class="bg-blue-500 text-white leading-normal py-1 px-2 rounded-lg mt-3">View</button>
        <button v-if="can('delete users')" class="bg-red-500 text-white leading-normal py-1 px-2 rounded-lg mt-3 ms-2">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePermissions } from 'vue-middleware'

const { is, can } = usePermissions()

console.log(is('admin'), can('view users'))
</script>
