import request from '@/utils/request'
import type { SensorDataInfo, SystemStatusInfo, HealthDataItem, DeviceUsageItem, AbnormalItem } from '@/types/data'
import type { FilterParams } from '@/types/common'

export const dataAPI = {
  getSensorData: (
    deviceName: string, 
    params?: { start_time?: string; end_time?: string; limit?: number }
  ): Promise<SensorDataInfo[]> => 
    request.get(`/sensor-data/${deviceName}`, { params }),
  
  getLatestSensorData: (deviceName: string): Promise<SensorDataInfo> => 
    request.get(`/latest-sensor-data/${deviceName}`),
  
  getSystemStatus: (deviceName: string, limit?: number): Promise<SystemStatusInfo[]> => 
    request.get(`/system-status/${deviceName}`, { params: { limit } }),

  getHealthTrendData: (params: FilterParams): Promise<HealthDataItem[]> => 
    request.get('/analysis/health-trend', { params }),

  getDeviceUsageData: (params: FilterParams): Promise<DeviceUsageItem[]> => 
    request.get('/analysis/device-usage', { params }),

  getAbnormalData: (params: FilterParams): Promise<AbnormalItem[]> => 
    request.get('/analysis/abnormal', { params }),
}