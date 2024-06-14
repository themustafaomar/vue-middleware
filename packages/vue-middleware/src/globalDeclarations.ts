export {}

declare global {
  interface Window {
    Laravel: undefined | {
      permissions: string[]
      roles: string[]
    }
  }
}
