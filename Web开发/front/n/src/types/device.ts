export interface DeviceInfo {
  device_name: string;
  owner_id?: number | null;
  is_online: boolean;
  created_at: string;
  updated_at: string;
}

export interface DeviceCreate {
  device_name: string;
  owner_id?: number | null;
}

