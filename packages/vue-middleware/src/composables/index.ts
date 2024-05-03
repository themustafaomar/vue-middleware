import { getCurrentInstance } from 'vue'

export function usePermissions() {
  const globalprops = getCurrentInstance()?.appContext.config.globalProperties
  
  return {
    is: globalprops?.is,
    can: globalprops?.can,
  }
}
