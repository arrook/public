from sqlalchemy.orm import Session

from database.models import DeviceConfigs, Devices, Users
from schemas import DeviceConfigCreate, DeviceConfigData, Dht11Config, Ds18b20Config, GpsConfig, Max30102Config, Mpu6050Config, RelayConfig, RgbLedConfig, Syn6288Config, TokenData, Role, DeviceConfigInfo, Response as ResponseSchema
from services.device_service import DeviceService
from exceptions import LocalException
from mqtt.client import mqtt_client

class ConfigService:
    @staticmethod
    def default_device_config_create(device_name: str) -> DeviceConfigCreate:
        return DeviceConfigCreate(
            device_name=device_name,
            config_data=DeviceConfigData(
                max30102=Max30102Config(),
                dht11=Dht11Config(),
                ds18b20=Ds18b20Config(),
                mpu6050=Mpu6050Config(),
                gps=GpsConfig(),
                rgb_led=RgbLedConfig(),
                relay=RelayConfig(),
                syn6288=Syn6288Config(),
            )
        )

    @staticmethod
    def set_device_config(db: Session, device_name: str, caller: TokenData) -> ResponseSchema:
        if caller.role not in [Role.nurse, Role.doctor]:
            raise LocalException(403, "权限不足")

        # 检查设备权限
        DeviceService.get_device(db, device_name, caller)

        default_config = ConfigService.default_device_config_create(device_name)
        db_config = DeviceConfigs(**default_config.model_dump())
        db.add(db_config)
        db.commit()
        db.refresh(db_config)

        # 通过MQTT下发配置
        try:
            from mqtt.client import mqtt_client
            mqtt_client.publish_config(device_name, default_config.config_data.model_dump())
        except Exception as e:
            print(f"⚠️ MQTT config publish failed: {e}")

        return ResponseSchema(code=200, message="配置已创建")
    
    @staticmethod
    def update_device_config(db: Session, device_name: str, config: DeviceConfigCreate, caller: TokenData) -> ResponseSchema:
        if caller.role not in [Role.nurse, Role.doctor]:
            raise LocalException(403, "权限不足")

        # 检查设备权限
        DeviceService.get_device(db, device_name, caller)

        db_config = db.query(DeviceConfigs).filter(
            DeviceConfigs.device_name == device_name
        ).first()
        db_config.config_data = config.config_data.model_dump()
        db.commit()

        # 通过MQTT下发配置
        try:
            from mqtt.client import mqtt_client
            mqtt_client.publish_config(device_name, config.config_data.model_dump())
        except Exception as e:
            print(f"⚠️ MQTT config publish failed: {e}")

        return ResponseSchema(code=200, message="配置已修改")

    @staticmethod
    def default_device_config(db: Session, device_name: str, caller: TokenData) -> ResponseSchema:
        if caller.role not in [Role.nurse, Role.doctor]:
            raise LocalException(403, "权限不足")

        # 检查设备权限
        DeviceService.get_device(db, device_name, caller)

        default_config = ConfigService.default_device_config_create(device_name)

        db_config = db.query(DeviceConfigs).filter(
            DeviceConfigs.device_name == device_name
        ).first()
        db_config.config_data = default_config.config_data.model_dump()
        db.commit()

        # 通过MQTT下发配置
        try:
            from mqtt.client import mqtt_client
            mqtt_client.publish_config(device_name, default_config.config_data.model_dump())
        except Exception as e:
            print(f"⚠️ MQTT config publish failed: {e}")

        return ResponseSchema(code=200, message="配置已恢复默认")

    @staticmethod
    def get_device_config(db: Session, device_name: str, caller: TokenData) -> DeviceConfigInfo:
        if caller.role not in [Role.nurse, Role.doctor]:
            raise LocalException(403, "权限不足")

        # 检查设备权限
        DeviceService.get_device(db, device_name, caller)

        db_config = db.query(DeviceConfigs).filter(
            DeviceConfigs.device_name == device_name
        ).order_by(DeviceConfigs.created_at.desc()).first()

        if not db_config:
            raise LocalException(404, "配置未找到")

        return DeviceConfigInfo.model_validate(db_config)
    
    @staticmethod
    def delete_device_config(db: Session, device_name: str, config_id: int, caller: TokenData) -> ResponseSchema:
        """删除设备配置"""
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")
            
        config = db.query(DeviceConfigs).filter(
            DeviceConfigs.id == config_id,
            DeviceConfigs.device_name == device_name
        ).first()
        
        if not config:
            raise LocalException(404, "配置未找到")
            
        db.delete(config)
        db.commit()
        
        return ResponseSchema(code=200, message="配置删除成功")
