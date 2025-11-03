import { defineStore } from 'pinia'
import type { DeviceInfo, DeviceCreate } from '@/types/device'
import { deviceAPI } from '@/api/devices'

interface DeviceState {
  devices: DeviceInfo[]
  currentDevice: DeviceInfo | null
  loading: boolean
}

export const useDeviceStore = defineStore('device', {
  state: (): DeviceState => ({
    devices: [],
    currentDevice: null,
    loading: false,
  }),

  actions: {
    async fetchDevices() {
      this.loading = true
      try {
        this.devices = await deviceAPI.getDevices()
      } finally {
        this.loading = false
      }
    },

    async fetchDevice(deviceName: string) {
      this.currentDevice = await deviceAPI.getDevice(deviceName)
    },

    async fetchDeviceByUser(userId: number) {
      return await deviceAPI.getDeviceByUser(userId)
    },

    async createDevice(data: DeviceCreate) {
      await deviceAPI.createDevice(data)
      await this.fetchDevices()
    },

    async updateDevice(data: DeviceCreate) {
      await deviceAPI.updateDevice(data.device_name, data)
      await this.fetchDevices()
    },

    async deleteDevice(deviceName: string) {
      await deviceAPI.deleteDevice(deviceName)
      await this.fetchDevices()
    },

  },

  getters: {
    onlineDevices: (state) => state.devices.filter(device => device.is_online),
    offlineDevices: (state) => state.devices.filter(device => !device.is_online),
    deviceCount: (state) => state.devices.length,
  },
})