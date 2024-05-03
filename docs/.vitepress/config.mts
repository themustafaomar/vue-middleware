import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Middleware",
  description: "Vue middleware is a powerful Vuejs plugin for creating custom middleware, similar to what you find in Nuxt apps but with extra features for roles and permissions.",
  themeConfig: {
    siteTitle: 'Vue Middleware',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Demo', link: 'https://vue-middleware-demo.vercel.app' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Quick usage', link: '/quick-usage' },
          { text: 'Installation', link: '/installation' },
        ]
      },
      {
        text: 'Middleware',
        items: [
          { text: 'Basic middleware', link: '/basics' },
          { text: 'Page title', link: '/page-title' },
        ]
      },
      {
        text: 'Roles & Permissions',
        items: [
          { text: 'Basics', link: '/roles-and-permissions' },
          { text: 'can() and is() Utilities', link: '/can-and-is' },
          { text: 'Creating Drivers', link: '/custom-drivers' },
        ]
      },
      {
        text: 'Links',
        items: [
          { text: 'Troubleshooting', link: 'https://github.com/themustafaomar/vue-middleware/issues/new', target: '_blank' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/themustafaomar/vue-middleware' }
    ]
  }
})
