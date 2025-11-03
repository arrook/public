from pydantic import BaseModel, EmailStr, field_validator
from enum import Enum
from typing import Optional, Dict, Any, List
from datetime import datetime

##################################
# 响应相关
class Response(BaseModel):
    code: int
    message: str
    data: Optional[Any] = None

##################################
class Role(str, Enum):
    family = "family"
    nurse = "nurse"
    doctor = "doctor"
##################################
# 用户相关
class UserRegister(BaseModel):
    username: str
    password: str
    role: Role
    real_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class UserProfile(BaseModel):
    id: int
    username: str
    real_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

class UserInfo(BaseModel):
    id: int
    username: str
    role: Role
    real_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    real_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None

class adminUpdate(BaseModel):
    id: int
    username: Optional[str] = None
    real_name: Optional[str] = None
    role: Optional[Role] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    is_active: Optional[bool] = None

##################################
# session相关
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    sub: str
    role: Role
    exp: datetime

##################################
# 设备相关
class DeviceBase(BaseModel):
    device_name: str
    owner_id: Optional[int] = None

    class Config:
        from_attributes = True

class DeviceCreate(DeviceBase): pass

class DeviceBind(DeviceBase):
    owner_id: int

class DeviceActivate(DeviceBind):
    is_online: bool

class DeviceInfo(DeviceBase):
    is_online: bool = False
    created_at: datetime
    updated_at: datetime

##################################
# 系统状态
class MessageBase(BaseModel):
    status: str = "normal"
    enabled: bool = True

class SensorsStatus(BaseModel):
    max30102: Optional[MessageBase] = None
    mpu6050: Optional[MessageBase] = None
    dht11: Optional[MessageBase] = None
    ds18b20: Optional[MessageBase] = None
    gps: Optional[MessageBase] = None

class ActuatorsStatus(BaseModel):
    relay: Optional[MessageBase] = None
    rgb_led: Optional[MessageBase] = None
    syn6288: Optional[MessageBase] = None
    ssd1306: Optional[MessageBase] = None

class SystemStatus(BaseModel):
    uptime: Optional[int] = None
    memory_free: Optional[int] = None
    network_strength: Optional[int] = None
    battery_level: Optional[int] = None

class SystemStatusBase(BaseModel):
    device_name: str
    sensors: SensorsStatus
    actuators: ActuatorsStatus
    system: SystemStatus

    class Config:
        from_attributes = True

class SystemStatusCreate(SystemStatusBase):
    timestamp: Optional[int] = None

class SystemStatusInfo(SystemStatusBase):
    id: int
    created_at: datetime

##################################
# 传感器数据
class Max30102Data(BaseModel):
    heart_rate: int
    spo2: float

class Mpu6050Data(BaseModel):
    ax: float
    ay: float
    az: float
    gx: float
    gy: float
    gz: float

class Dht11Data(BaseModel):
    temperature: int
    humidity: int

class Ds18b20Data(BaseModel):
    temperature: float

class GpsData(BaseModel):
    latitude: float
    lat_dir: str = "N"
    longitude: float
    lon_dir: str = "E"
    altitude: float

class SensorData(BaseModel):
    max30102: Optional[Max30102Data] = None
    mpu6050: Optional[Mpu6050Data] = None
    dht11: Optional[Dht11Data] = None
    ds18b20: Optional[Ds18b20Data] = None
    gps: Optional[GpsData] = None

class SensorDataBase(BaseModel):
    device_name: str
    sensor_data: SensorData

    class Config:
        from_attributes = True

class SensorDataCreate(SensorDataBase):
    pass

class SensorDataInfo(SensorDataBase):
    id: int
    created_at: datetime

##################################
# 设备配置
class SensorConfigBase(BaseModel):
    enabled: Optional[bool] = True

class HeartRateConfig(SensorConfigBase):
    min: int = 50
    max: int = 230
    voice_text: str = "心率异常，请及时休息"
    voice_music: int = 1

class Spo2Config(SensorConfigBase):
    min: float = 80
    voice_text: str = "血氧过低，请注意呼吸"
    voice_music: int = 2

class TemperatureConfig(SensorConfigBase):
    min: int = 16
    max: int = 26
    voice_text: str = "环境温度异常"
    voice_music: int = 3

class HumidityConfig(SensorConfigBase):
    min: int = 30
    max: int = 80
    voice_text: str = "环境湿度过高"
    voice_music: int = 3

class BodyTemperatureConfig(SensorConfigBase):
    min: float = 20
    max: float = 38
    voice_text: str = "身体温度异常"
    voice_music: int = 3

class FallDetectionConfig(SensorConfigBase):
    threshold: float = 1.9
    voice_text: str = "检测到跌倒，正在通知紧急联系人"
    voice_music: int = 1

class GeoFenceConfig(SensorConfigBase):
    center_lat: float = 39.9042
    center_lon: float = 116.4074
    radius: float = 100.0
    voice_text: str = "已超出安全区域"
    voice_music: int = 2

class PillboxConfig(SensorConfigBase):
    reminder_times: List[int] = [8, 12, 18]
    reminder_duration: int = 1800
    miss_threshold: int = 1800
    voice_text: str = "服药时间到了，请按时服药"
    voice_music: int = 1

class StartTextConfig(SensorConfigBase):
    voice_text: str = "系统启动完成，开始健康监测"
    voice_music: int = 1

# 完整的传感器配置
class Max30102Config(BaseModel):
    sample_period: int = 40
    heart_rate: HeartRateConfig = HeartRateConfig()
    spo2: Spo2Config = Spo2Config()

class Dht11Config(BaseModel):
    sample_period: int = 1000
    temperature: TemperatureConfig = TemperatureConfig()
    humidity: HumidityConfig = HumidityConfig()

class Ds18b20Config(BaseModel):
    sample_period: int = 1000
    temperature: BodyTemperatureConfig = BodyTemperatureConfig()

class Mpu6050Config(BaseModel):
    sample_period: int = 1000
    accel_range: int = 0
    gyro_range: int = 0
    dlpf: int = 3
    fall_detection: FallDetectionConfig = FallDetectionConfig()

class GpsConfig(BaseModel):
    sample_period: int = 1000
    fence: GeoFenceConfig = GeoFenceConfig()

class RelayConfig(BaseModel):
    pillbox: PillboxConfig = PillboxConfig()

class Syn6288Config(BaseModel):
    start_text: StartTextConfig = StartTextConfig()

class RgbLedConfig(BaseModel): pass

# 完整设备配置
class DeviceConfigData(BaseModel):
    max30102: Optional[Max30102Config] = None
    dht11: Optional[Dht11Config] = None
    ds18b20: Optional[Ds18b20Config] = None
    mpu6050: Optional[Mpu6050Config] = None
    gps: Optional[GpsConfig] = None
    rgb_led: Optional[RgbLedConfig] = None
    relay: Optional[RelayConfig] = None
    syn6288: Optional[Syn6288Config] = None

class DeviceConfigBase(BaseModel):
    device_name: str
    config_data: DeviceConfigData

    class Config:
        from_attributes = True

class DeviceConfigCreate(DeviceConfigBase): pass

class DeviceConfigInfo(DeviceConfigBase):
    id: int
    created_at: datetime
    updated_at: datetime


##################################
# 控制命令
class RelayCommand(BaseModel):
    status: bool = True

class RgbLedCommand(BaseModel):
    red: int = 255
    green: int = 255
    blue: int = 255

class Syn6288Command(BaseModel):
    voice_text: str = "测试语音"
    voice_music: int = 1

class DeviceControlData(BaseModel):
    relay: Optional[RelayCommand] = None
    rgb_led: Optional[RgbLedCommand] = None
    syn6288: Optional[Syn6288Command] = None

    class Config:
        from_attributes = True

class ControlCommandStatusEnum(str, Enum):
    pending = 'pending'
    executed = 'executed'
    failed = 'failed'

class ControlCommandBase(BaseModel):
    device_name: str
    command: DeviceControlData

    class Config:
        from_attributes = True

class ControlCommandCreate(ControlCommandBase): pass

class ControlCommandInfo(ControlCommandBase):
    id: int
    status: ControlCommandStatusEnum
    response: Optional[str] = None
    created_by: int
    created_at: datetime
    executed_at: Optional[datetime] = None

    @field_validator('executed_at', mode='before')
    def validate_executed_at(cls, v):
        if isinstance(v, str) and v == '0000-00-00 00:00:00':
            return None  # 或者返回一个默认时间，比如 datetime.min
        return v

##################################
# 配置应答
class ConfigAckTypeEnum(str, Enum):
    config = 'config'
    control = 'control'

class ConfigAckStatusEnum(str, Enum):
    pending = 'pending'
    ok = 'ok'
    error = 'error'

class ConfigAckBase(BaseModel):
    device_name: str
    trace_id: int
    type: ConfigAckTypeEnum
    status: ConfigAckStatusEnum
    message: Optional[str] = None
    code: Optional[int] = None
    crc: Optional[int] = None

    class Config:
        from_attributes = True

class ConfigAckCreate(ConfigAckBase): pass

class ConfigAckInfo(ConfigAckBase):
    id: int
    created_at: datetime

##################################
# 操作日志
class SystemLogBase(BaseModel):
    id: int
    user_id: int
    token: str
    expires_at: datetime
    created_at: datetime

    class Config:
        from_attributes = True

class SystemLogCreate(SystemLogBase):
    pass

class SystemLogInfo(SystemLogBase):
    pass

##################################
