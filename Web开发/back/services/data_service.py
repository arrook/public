from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from database.models import SensorData, SystemStatus
from schemas import TokenData, SensorDataInfo, SystemStatusInfo
from services.device_service import DeviceService
from exceptions import LocalException

class DataService:
    @staticmethod
    def get_sensor_data(
        db: Session,
        device_name: str,
        caller: TokenData,
        start_time: Optional[datetime] = None,
        end_time: Optional[datetime] = None,
        limit: int = 10
    ) -> List[SensorDataInfo]:
        # 检查设备权限
        DeviceService.get_device(db, device_name, caller)

        query = db.query(SensorData).filter(SensorData.device_name == device_name)

        if start_time:
            query = query.filter(SensorData.created_at >= start_time)
        if end_time:
            query = query.filter(SensorData.created_at <= end_time)

        data = query.order_by(SensorData.created_at.desc()).limit(limit).all()
        return [SensorDataInfo.model_validate(item) for item in data[::-1]]

    @staticmethod
    def get_latest_sensor_data(db: Session, device_name: str, caller: TokenData) -> SensorDataInfo:
        # 检查设备权限
        DeviceService.get_device(db, device_name, caller)

        data = db.query(SensorData).filter(
            SensorData.device_name == device_name
        ).order_by(SensorData.created_at.desc()).first()

        if not data:
            raise LocalException(404, "数据未找到")

        return SensorDataInfo.model_validate(data)

    @staticmethod
    def get_system_status(
        db: Session,
        device_name: str,
        caller: TokenData,
        limit: int = 50
    ) -> List[SystemStatusInfo]:
        # 检查设备权限
        DeviceService.get_device(db, device_name, caller)

        data = db.query(SystemStatus).filter(
            SystemStatus.device_name == device_name
        ).order_by(SystemStatus.created_at.desc()).limit(limit).all()

        return [SystemStatusInfo.model_validate(item) for item in data[::-1]]