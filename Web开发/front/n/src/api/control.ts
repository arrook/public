import request from '@/utils/request'
import type { Response } from '@/types/common'
import type { ControlCommandCreate, ControlCommandInfo } from '@/types/control'

export const controlAPI = {
  sendControlCommand: (deviceName: string, command: ControlCommandCreate): Promise<Response> =>
    request.post(`/device/${deviceName}/control`, command),

  getControlHistory: (deviceName: string, limit?: number): Promise<ControlCommandInfo[]> =>
    request.get(`/device/${deviceName}/control`, { params: { limit } }),

  cancelControlCommand: (commandId: number): Promise<Response> =>
    request.delete(`/device/${commandId}/control`),

  getControlCommand: (commandId: number): Promise<ControlCommandInfo> =>
    request.get(`/device/control/${commandId}`),
  
  getBatchControlCommands: (commandIds: number[]): Promise<ControlCommandInfo[]> =>
    request.post('/device/control/batch', { command_ids: commandIds }),
}