import request from '@/utils/request'
import type { Response } from '@/types/common'
import type { DeviceConfigCreate, DeviceConfigInfo } from '@/types/config'

export const configAPI = {
  setDeviceConfig: (deviceName: string): Promise<Response> =>
    request.post(`/device/${deviceName}/config`),

  updateDeviceConfig: (deviceName: string, config: DeviceConfigCreate): Promise<Response> =>
    request.put(`/device/${deviceName}/config`, config),

  getDeviceConfig: (deviceName: string): Promise<any> =>
    request.get(`/device/${deviceName}/config`),

  deleteDeviceConfig: (deviceName: string, configId: number): Promise<Response> =>
    request.delete(`/device/${deviceName}/config/${configId}`),

  getDeviceConfigHistory: (deviceName: string, limit?: number): Promise<DeviceConfigInfo[]> =>
    request.get(`/device/${deviceName}/config/history`, { params: { limit } }),
  
  restoreDefaultConfig: (deviceName: string): Promise<Response> =>
    request.put(`/device/${deviceName}/config/default`),
}