import request from '@/utils/request'
import type { HealthCheckResult } from '@/types/data'

export const healthAPI = {
  checkHealth: (): Promise<HealthCheckResult> =>
    request.get('/health'),
  
  checkDeviceHealth: (deviceName: string): Promise<{
    status: 'online' | 'offline' | 'degraded';
    last_seen: string;
    metrics: Record<string, any>;
  }> => request.get(`/device/${deviceName}/health`),
}