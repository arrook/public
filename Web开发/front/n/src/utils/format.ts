// src/utils/format.ts
export const formatTime = (timeString: string): string => {
  return new Date(timeString).toLocaleString('zh-CN');
};

export const formatDeviceStatus = (isOnline: boolean): { text: string; status: 'success' | 'error' } => {
  return isOnline 
    ? { text: '在线', status: 'success' }
    : { text: '离线', status: 'error' };
};

export const formatSensorValue = (value: number, unit: string): string => {
  return `${value} ${unit}`;
};