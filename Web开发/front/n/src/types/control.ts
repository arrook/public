export interface RgbLedCommand {
  red?: number;
  green?: number;
  blue?: number;
}

export interface RelayCommand {
  status?: boolean;
}

export interface Syn6288Command {
  voice_text?: string;
  voice_music?: number;
}

export interface ControlCommandCreate {
  device_name: string
  command: DeviceControlData
}

export interface ControlCommandInfo {
  id: number
  device_name: string
  command: DeviceControlData
  status: 'pending' | 'executed' | 'failed'
  response?: string
  created_by: number
  created_at: string
  executed_at?: string
}

export interface DeviceControlData {
  rgb_led?: RgbLedCommand | null;
  relay?: RelayCommand | null;
  syn6288?: Syn6288Command | null;
}