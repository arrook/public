from sqlalchemy.orm import Session
from typing import List

from database.models import DeviceConfigs, Devices, Users
from schemas import DeviceCreate, TokenData, Role, DeviceInfo, Response as ResponseSchema
from exceptions import LocalException

class DeviceService:
    @staticmethod
    def get_user_devices(db: Session, caller: TokenData) -> List[DeviceInfo]:
        if caller.role == Role.family:
            db_user = db.query(Users).filter(Users.username == caller.sub).first()
            devices = db.query(Devices).filter(Devices.owner_id == db_user.id).all()
        else:
            devices = db.query(Devices).all()

        return [DeviceInfo.model_validate(device) for device in devices]

    @staticmethod
    def get_device(db: Session, device_name: str, caller: TokenData) -> DeviceInfo:
        device = db.query(Devices).filter(Devices.device_name == device_name).first()
        if not device:
            raise LocalException(404, "设备未找到")

        DeviceService._check_device_permission(db, device, caller)
        return DeviceInfo.model_validate(device)

    @staticmethod
    def get_device_by_user(db: Session, user_id: int, caller: TokenData) -> DeviceInfo:
        db_user = db.query(Users).filter(Users.id == user_id).first()
        if not db_user:
            raise LocalException(404, "用户未绑定设备")

        db_device = db.query(Devices).filter(Devices.owner_id == db_user.id).first()
        if not db_device:
            raise LocalException(404, "设备未找到")

        DeviceService._check_device_permission(db, db_device, caller)
        return DeviceInfo.model_validate(db_device)

    @staticmethod
    def create_device(db: Session, device: DeviceCreate, caller: TokenData) -> DeviceInfo:
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")

        if db.query(Devices).filter(Devices.device_name == device.device_name).first():
            raise LocalException(400, "设备已存在")

        db_device = Devices(**device.dict())
        db.add(db_device)
        db.commit()
        db.refresh(db_device)

        return DeviceInfo.model_validate(db_device)

    @staticmethod
    def update_device(db: Session, device_name: str, device: DeviceCreate, caller: TokenData) -> ResponseSchema:
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")

        db_device = db.query(Devices).filter(Devices.device_name == device_name).first()
        if not db_device:
            raise LocalException(400, "设备未找到")

        # 更新字段
        for key, value in device.dict().items():
            if value is not None and hasattr(db_device, key):
                setattr(db_device, key, value)

        db.commit()
        return ResponseSchema(code=200, message="更新成功")

    @staticmethod
    def delete_device(db: Session, device_name: str, caller: TokenData) -> ResponseSchema:
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")

        db_device = db.query(Devices).filter(Devices.device_name == device_name).first()
        if not db_device:
            raise LocalException(400, "设备未找到")

        db.delete(db_device)
        db.commit()
        return ResponseSchema(code=200, message="删除成功")

    @staticmethod
    def _check_device_permission(db: Session, device: Devices, caller: TokenData):
        if caller.role == Role.family:
            db_user = db.query(Users).filter(Users.username == caller.sub).first()
            if not db_user or device.owner_id != db_user.id:
                raise LocalException(403, "拒绝访问")
            
    @staticmethod
    def _delete_device_config(db: Session, device_name: str, caller: TokenData) -> ResponseSchema:
        """删除设备配置"""
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")
            
        deleted_rows = db.query(DeviceConfigs).filter(
            DeviceConfigs.device_name == device_name
        ).delete(synchronize_session=False)

        db.commit()
        
        return True
