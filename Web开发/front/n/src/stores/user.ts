import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/auth'
import { adminAPI } from '@/api/admin'

interface UserState {
  users: UserInfo[]
  currentUser: UserInfo | null
  loading: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    currentUser: null,
    loading: false,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        this.users = await adminAPI.getUsers()
      } finally {
        this.loading = false
      }
    },

    async fetchUser(userId: number) {
      this.currentUser = await adminAPI.getUser(userId)
    },

    async createUser(userData: any) {
      await adminAPI.createUser(userData)
      await this.fetchUsers()
    },

    async updateUser(userId: number, userData: any) {
      await adminAPI.updateUser(userId, userData)
      await this.fetchUsers()
    },

    async deleteUser(userId: number) {
      await adminAPI.deleteUser(userId)
      await this.fetchUsers()
    },
  },
})