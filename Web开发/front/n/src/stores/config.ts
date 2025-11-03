import { defineStore } from 'pinia'
import type { DeviceConfigData, DeviceConfigInfo, DeviceConfigCreate } from '@/types/config'
import { configAPI } from '@/api/config'
import { useNotificationStore } from './notification'

interface DeviceConfigState {
  devices: DeviceConfigInfo[]
  currentDevice: DeviceConfigInfo | null
  loading: boolean
}

export const useConfigStore = defineStore('config', {
  state: (): DeviceConfigState => ({
    devices: [],
    currentDevice: null,
    loading: false,
  }),

  actions: {
    async fetchDeviceConfig(deviceName: string) {
      const notificationStore = useNotificationStore()
      this.loading = true
      try {
        const data = await configAPI.getDeviceConfig(deviceName)
        this.currentDevice = data
        notificationStore.addNotification({
          type: 'success',
          title: '获取配置成功',
          message: `设备 ${deviceName} 配置已加载`
        })
        return data
      } catch (error) {
        notificationStore.addNotification({
          type: 'error',
          title: '获取配置失败',
          message: '无法加载设备配置信息'
        })
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async setDeviceConfig(deviceName: string) {
      const notificationStore = useNotificationStore()
      this.loading = true
      try {
        const data = await configAPI.setDeviceConfig(deviceName)
        await this.fetchDeviceConfig(deviceName)
        notificationStore.addNotification({
          type: 'success',
          title: '获取配置成功',
          message: `设备 ${deviceName} 配置已加载`
        })
        return data
      } catch (error) {
        notificationStore.addNotification({
          type: 'error',
          title: '获取配置失败',
          message: '无法加载设备配置信息'
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateDeviceConfig(deviceName: string, configData: DeviceConfigCreate) {
      const notificationStore = useNotificationStore()
      this.loading = true
      try {
        const data = await configAPI.updateDeviceConfig(deviceName, configData)
        await this.fetchDeviceConfig(deviceName)
        notificationStore.addNotification({
          type: 'success',
          title: '获取配置成功',
          message: `设备 ${deviceName} 配置已加载`
        })
        return data
      } catch (error) {
        notificationStore.addNotification({
          type: 'error',
          title: '获取配置失败',
          message: '无法加载设备配置信息'
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async deaultDeviceConfig(deviceName: string) {
      const notificationStore = useNotificationStore()
      this.loading = true
      try {
        const data = await configAPI.restoreDefaultConfig(deviceName)
        await this.fetchDeviceConfig(deviceName)
        notificationStore.addNotification({
          type: 'success',
          title: '配置默认成功',
          message: `设备 ${deviceName} 默认配置已加载`
        })
        return data
      } catch (error) {
        notificationStore.addNotification({
          type: 'error',
          title: '配置默认失败',
          message: '无法加载设备配置信息'
        })
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})