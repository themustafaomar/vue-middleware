<template>
  <div class="container mx-auto">
    <section v-if="is('admin')">
      <div class="container mx-auto rounded-lg bg-gray-200 px-4 py-3 mb-6">
        Hi admin!
      </div>
    </section>

    <div class="grid grid-cols-4 gap-5">
      <div class="shadow bg-white rounded-lg p-4">
        <h1 class="text-xl mb-3">Anyone can see this</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aut maxime natus impedit libero quo veritatis.</p>
      </div>

      <div class="shadow bg-white rounded-lg p-4">
        <h1 class="text-xl mb-3">Anyone can see this</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aut maxime natus impedit libero quo veritatis.</p>
      </div>

      <div v-if="is('admin')" class="shadow bg-white rounded-lg p-4">
        <h1 class="text-xl mb-3">Admin only can see this.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aut maxime natus impedit libero quo veritatis.</p>
      </div>

      <div v-if="is('admin')" class="shadow bg-white rounded-lg p-4">
        <h1 class="text-xl mb-3">Admin only can see this.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus aut maxime natus impedit libero quo veritatis.</p>
      </div>
    </div>
  </div>
</template>
