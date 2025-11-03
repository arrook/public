import { defineStore } from 'pinia'
import type { adminUpdate, UserInfo, UserProfile, UserRegister } from '@/types/auth'
import { adminAPI } from '@/api/admin'
import { useNotificationStore } from './notification'

interface AdminState {
  users: UserInfo[]
  currentUser: UserInfo | null
  loading: boolean
}

export const useAdminStore = defineStore('admin', {
  state: (): AdminState => ({
    users: [],
    currentUser: null,
    loading: false,
  }),

  actions: {
    async fetchAllUsers() {
      this.loading = true
      try {
        this.users = await adminAPI.getUsers()
        return this.users
      } finally {
        this.loading = false
      }
    },

    async fetchTotalUsers() {
      this.loading = true
      try {
        this.users = await adminAPI.getTotal()
        return this.users
      } finally {
        this.loading = false
      }
    },

    async fetchUserDetail(userId: number) {
      this.loading = true
      try {
        this.currentUser = await adminAPI.getUser(userId)
        return this.currentUser
      } finally {
        this.loading = false
      }
    },

    async createNewUser(userData: UserRegister) {
      const notificationStore = useNotificationStore()
      this.loading = true
      try {
        await adminAPI.createUser(userData)
        notificationStore.addNotification({
          type: 'success',
          title: '用户创建成功',
          message: `已成功创建用户 ${userData.username}`
        })
        await this.fetchAllUsers()
      } catch (error) {
        notificationStore.addNotification({
          type: 'error',
          title: '用户创建失败',
          message: '无法创建新用户'
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async update(user: adminUpdate) {
      await adminAPI.updateUser(user.id, user)
      await this.fetchAllUsers()
    },
  },
  
  getters: {
    activeUsers: (state) => state.users.filter(user => user.is_active),
    deactiveUsers: (state) => state.users.filter(user => user.is_active),
  },
})