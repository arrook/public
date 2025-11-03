import request from '@/utils/request'
import type { DeviceInfo, DeviceCreate } from '@/types/device'
import type { Response } from '@/types/common'

export const deviceAPI = {
  getDevices: (): Promise<DeviceInfo[]> => 
    request.get('/devices'),

  getDeviceByUser: (userId: number): Promise<DeviceInfo> => 
    request.get(`/device/user/${userId}`),

  getDevice: (deviceName: string): Promise<DeviceInfo> => 
    request.get(`/device/${deviceName}`),
  
  createDevice: (data: DeviceCreate): Promise<DeviceInfo> => 
    request.post('/device', data),
  
  updateDevice: (deviceName: string, data: DeviceCreate): Promise<Response> => 
    request.put(`/device/${deviceName}`, data),
  
  deleteDevice: (deviceName: string): Promise<Response> => 
    request.delete(`/device/${deviceName}`),
}