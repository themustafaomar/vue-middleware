<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-medium mb-5">Posts</h1>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="n in 8" class="shadow bg-white rounded-lg p-4">
        <h1 class="text-xl mb-3">Post title {{ n }}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aut maxime natus impedit libero quo veritatis.</p>
        <button class="bg-blue-500 text-white leading-normal py-1 px-2 rounded-lg mt-3">View</button>
        <button v-if="can('delete posts')" class="bg-red-500 text-white leading-normal py-1 px-2 rounded-lg mt-3 ms-2">Delete</button>
      </div>
    </div>
  </div>
</template>
