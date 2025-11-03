import { defineStore } from 'pinia'
import type { ControlCommandCreate, ControlCommandInfo } from '@/types/control'
import { controlAPI } from '@/api/control'
import { useNotificationStore } from './notification'

interface ControlState {
  commands: ControlCommandInfo[]
  currentCommand: ControlCommandInfo | null
  loading: boolean
}

export const useControlStore = defineStore('control', {
  state: (): ControlState => ({
    commands: [],
    currentCommand: null,
    loading: false,
  }),

  actions: {
    async sendCommand(deviceName: string, command: ControlCommandCreate) {
      const notificationStore = useNotificationStore()
      this.loading = true
      try {
        await controlAPI.sendControlCommand(deviceName, command)
        notificationStore.addNotification({
          type: 'success',
          title: '指令发送成功',
          message: `已向设备 ${deviceName} 发送控制指令`
        })
        // await this.getHistory(deviceName)
      } catch (error) {
        notificationStore.addNotification({
          type: 'error',
          title: '指令发送失败',
          message: '无法发送控制指令'
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async getHistory(deviceName: string, limit?: number) {
      this.loading = true
      try {
        this.commands = await controlAPI.getControlHistory(deviceName, limit)
        return this.commands
      } finally {
        this.loading = false
      }
    },

    async cancelCommand(commandId: number) {
      const notificationStore = useNotificationStore()
      this.loading = true
      try {
        await controlAPI.cancelControlCommand(commandId)
        notificationStore.addNotification({
          type: 'success',
          title: '指令已取消',
          message: `编号 ${commandId} 的指令已成功取消`
        })
        this.commands = this.commands.filter(cmd => cmd.id !== commandId)
      } catch (error) {
        notificationStore.addNotification({
          type: 'error',
          title: '取消指令失败',
          message: '无法取消指定指令'
        })
        throw error
      } finally {
        this.loading = false
      }
    }
  },
})