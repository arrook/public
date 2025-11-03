/* ---------- 传感器配置（含阈值/语音） ---------- */
export interface TemperatureConfig {
  enabled?: boolean | null;
  min?: number;
  max?: number;
  voice_text?: string;
  voice_music?: number;
}

export interface HumidityConfig {
  enabled?: boolean | null;
  min?: number;
  max?: number;
  voice_text?: string;
  voice_music?: number;
}

export interface HeartRateConfig {
  enabled?: boolean | null;
  min?: number;
  max?: number;
  voice_text?: string;
  voice_music?: number;
}

export interface Spo2Config {
  enabled?: boolean | null;
  min?: number;
  voice_text?: string;
  voice_music?: number;
}

export interface FallDetectionConfig {
  enabled?: boolean | null;
  threshold?: number;
  voice_text?: string;
  voice_music?: number;
}

export interface GeoFenceConfig {
  enabled?: boolean | null;
  center_lat?: number;
  center_lon?: number;
  radius?: number;
  voice_text?: string;
  voice_music?: number;
}

export interface PillboxConfig {
  enabled?: boolean | null;
  reminder_times?: number[];
  reminder_duration?: number;
  miss_threshold?: number;
  voice_text?: string;
  voice_music?: number;
}

export interface StartTextConfig {
  enabled?: boolean | null;
  voice_text?: string;
  voice_music?: number;
}

/* ---------- 分设备配置 ---------- */
export interface Max30102Config {
  sample_period?: number;
  heart_rate?: HeartRateConfig;
  spo2?: Spo2Config;
}

export interface Dht11Config {
  sample_period?: number;
  temperature?: TemperatureConfig;
  humidity?: HumidityConfig;
}

export interface Ds18b20Config {
  sample_period?: number;
  temperature?: TemperatureConfig;
}

export interface Mpu6050Config {
  sample_period?: number;
  accel_range?: number;
  gyro_range?: number;
  dlpf?: number;
  fall_detection?: FallDetectionConfig;
}

export interface GpsConfig {
  sample_period?: number;
  fence?: GeoFenceConfig;
}

export interface RgbLedConfig {} 

export interface RelayConfig {
  pillbox?: PillboxConfig;
}

export interface Syn6288Config {
  start_text?: StartTextConfig;
}

/* ---------- 设备配置总入口 ---------- */
export interface DeviceConfigData {
  max30102?: Max30102Config | null;
  dht11?: Dht11Config | null;
  ds18b20?: Ds18b20Config | null;
  mpu6050?: Mpu6050Config | null;
  gps?: GpsConfig | null;
  rgb_led?: RgbLedConfig | null;
  relay?: RelayConfig | null;
  syn6288?: Syn6288Config | null;
}

export interface DeviceConfigCreate {
  device_name: string;
  config_data: DeviceConfigData;
}

export interface DeviceConfigInfo {
  id: number;
  device_name: string;
  config_data: DeviceConfigData;
  created_at: string;
  updated_at: string;
}