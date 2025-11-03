import { defineStore } from 'pinia'
import type { PersistenceOptions } from 'pinia-plugin-persistedstate'

interface AppState {
  loading: boolean
  theme: 'light' | 'dark'
  language: 'zh-CN' | 'en-US'
  collapsed: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    loading: false,
    theme: 'light',
    language: 'zh-CN',
    collapsed: false,
  }),

  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
    setLanguage(language: 'zh-CN' | 'en-US') {
      this.language = language
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
  },
  persist: {
    paths: ['theme', 'language', 'collapsed'],
  } as PersistenceOptions<AppState>,
})