import { defineStore } from 'pinia'
import type { UserInfo, TokenData, UserRegister, UserProfile } from '@/types/auth'
import { authAPI } from '@/api/auth'

interface AuthState {
  user: UserInfo | null
  token: string | null
  isLoggedIn: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('access_token'),
    isLoggedIn: !!localStorage.getItem('access_token'),
  }),

  actions: {
    async login(username: string, password: string) {
      const response = await authAPI.login({ username, password })
      this.token = response.access_token
      this.isLoggedIn = true
      localStorage.setItem('access_token', response.access_token)
      await this.getProfile()
    },
    
    async register(user: UserRegister) {
      const response = await authAPI.register(user)
      this.token = response.access_token
      this.isLoggedIn = true
      localStorage.setItem('access_token', response.access_token)
      await this.getProfile()
    },
    
    async update(user: UserProfile) {
      const response = await authAPI.update(user)
      this.token = response.access_token
      this.isLoggedIn = true
      localStorage.setItem('access_token', response.access_token)
      await this.getProfile()
    },

    async getProfile() {
      this.user = await authAPI.getProfile()
    },

    async getLog() {
      return await authAPI.getLog()
    },

    logout() {
      this.user = null
      this.token = null
      this.isLoggedIn = false
      localStorage.removeItem('access_token')
    },
  },
})