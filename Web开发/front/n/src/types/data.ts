/* ---------- 传感器原始数据 ---------- */
export interface Max30102Data {
  heart_rate: number;
  spo2: number;
}

export interface Mpu6050Data {
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
}

export interface Dht11Data {
  temperature: number;
  humidity: number;
}

export interface Ds18b20Data {
  temperature: number;
}

export interface GpsData {
  latitude: number;
  longitude: number;
  altitude: number;
  lat_dir?: string; // 默认 N
  lon_dir?: string; // 默认 E
}
// 


export interface SensorData {
  max30102?: Max30102Data | null;
  mpu6050?: Mpu6050Data | null;
  dht11?: Dht11Data | null;
  ds18b20?: Ds18b20Data | null;
  gps?: GpsData | null;
}

export interface SensorDataInfo {
  id: number
  device_name: string
  sensor_data: SensorData
  created_at: string
}

export interface SystemStatusSensor {
  name: string;
  status: 'normal' | 'warning' | 'error';
  last_updated: string;
}

export interface SystemStatusActuator {
  name: string;
  status: 'on' | 'off' | 'error';
  last_command: string;
  last_updated: string;
}

export interface SystemStatusSystem {
  cpu_usage: number;
  memory_usage: number;
  battery_level: number;
  network_strength: number;
  last_heartbeat: string;
}

export interface SystemStatusInfo {
  id: number;
  device_name: string;
  sensors: SystemStatusSensor[];
  actuators: SystemStatusActuator[];
  system: SystemStatusSystem;
  created_at: string;
}

export interface HealthDataItem {
  timestamp: string;
  value: number;
  type: string;
}

export interface AbnormalItem {
  level: '高危' | '中危' | '低危';
  message: string;
  time: string;
  device: string;
}

export interface DeviceUsageItem {
  deviceName: string;
  hours: number;
}

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  services: {
    database: 'up' | 'down';
    cache: 'up' | 'down';
    message_queue: 'up' | 'down';
    websocket: 'up' | 'down';
  };
  timestamp: string;
}