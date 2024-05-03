---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vue Middleware"
  text: "Middleware has never been easier"
  tagline: Vue middleware is a powerful Vue.js plugin for creating middleware, similar to what you find in Nuxt apps, with extra features for roles and permissions.
  image:
    src: /vue-logo.svg
    alt: Vue Middleware Logo
  actions:
    - theme: brand
      text: Documenation
      link: /introduction
    - theme: alt
      text: Demo
      link: https://vue-middleware-demo.vercel.app

features:
  - icon: 🛠️
    title: Middleware functions
    details: Vue middleware provides a way to register middleware functions and can be attached to routes using its name.
  - icon: ✈️
    title: Route-based roles & permissions
    details: It also provides route-based roles and permissions functionality for protecting your application routes.
  - icon: 🚀
    title: Interoperability
    details: While it supports Laravel roles and permissions out of the box, it also provides a way to support other backend frameworks using custom driver.
---

