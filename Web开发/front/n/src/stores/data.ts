import { defineStore } from 'pinia'
import type { SensorDataInfo, SystemStatusInfo, HealthDataItem } from '@/types/data'
import { dataAPI } from '@/api/data'

interface DataState {
  sensorData: SensorDataInfo[]
  latestSensorData: SensorDataInfo | null
  systemStatus: SystemStatusInfo[]
  healthTrend: HealthDataItem[]
  loading: boolean
}

export const useDataStore = defineStore('data', {
  state: (): DataState => ({
    sensorData: [],
    latestSensorData: null,
    systemStatus: [],
    healthTrend: [],
    loading: false,
  }),

  actions: {
    async fetchSensorData(deviceName: string, params?: { start_time?: string; end_time?: string; limit?: number }) {
      this.loading = true
      try {
        this.sensorData = await dataAPI.getSensorData(deviceName, params)
        return this.sensorData
      } finally {
        this.loading = false
      }
    },

    async fetchLatestSensorData(deviceName: string) {
      this.loading = true
      try {
        this.latestSensorData = await dataAPI.getLatestSensorData(deviceName)
        return this.latestSensorData
      } finally {
        this.loading = false
      }
    },

    async fetchSystemStatus(deviceName: string, limit?: number) {
      this.loading = true
      try {
        this.systemStatus = await dataAPI.getSystemStatus(deviceName, limit)
        return this.systemStatus
      } finally {
        this.loading = false
      }
    },

    async fetchHealthTrend(params: { start_time: string; end_time: string; type?: string }) {
      this.loading = true
      try {
        this.healthTrend = await dataAPI.getHealthTrendData(params)
        return this.healthTrend
      } finally {
        this.loading = false
      }
    }
  },
})