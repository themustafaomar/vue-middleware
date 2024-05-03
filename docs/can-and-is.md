# can() And is()

In this section we're gonna be discussing how to use can and is utilities in your application.

## is()

The is() utility used to check for the roles of the current authenticated user.

```vue
<template>
  <section v-if="is('admin')">

  <!-- Check if the user is admin or moderator -->
  <section v-if="is('admin | moderator')">

  <!-- Check if the user granted the directory and editor roles -->
  <section v-if="is('director & editor')">
    <!-- ... -->
  </section>
</template>
```

## can()

The can() utility used to check for the current authenticated user's permissions.

```vue
<template>
  <section v-if="can('view users')">

  <!-- Check if the user has `view users` or `full access` permissions -->
  <section v-if="can('view users | full access')">

  <!-- Check if the user has `view users` and `edit users` permissions -->
  <section v-if="can('view users & edit users')">
    <!-- ... -->
  </section>
</template>
```

## Using In Script Setup

The is() and can() utilities are available in script setup as well using usePermissions() composable.

```vue
<script setup lang="ts">
import { usePermissions } from 'vue-middleware'

const { is, can } = usePermissions()

if (is('admin')) {
  // ..
}

if (can('view users')) {
  // ..
}
</script>
```
