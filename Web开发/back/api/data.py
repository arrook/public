from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from database.database import get_db
from schemas import SensorDataInfo
from services.data_service import DataService

router = APIRouter()

@router.get("/sensor-data/{device_name}", response_model=List[SensorDataInfo])
def get_sensor_data(
    device_name: str,
    request: Request,
    start_time: Optional[datetime] = Query(None),
    end_time: Optional[datetime] = Query(None),
    limit: int = Query(10, le=100),
    db: Session = Depends(get_db)
):
    """获取传感器数据"""
    return DataService.get_sensor_data(db, device_name, request.state.user, start_time, end_time, limit)

@router.get("/latest-sensor-data/{device_name}", response_model=SensorDataInfo)
def get_latest_sensor_data(device_name: str, request: Request, db: Session = Depends(get_db)):
    """获取最新传感器数据"""
    return DataService.get_latest_sensor_data(db, device_name, request.state.user)

@router.get("/system-status/{device_name}", response_model=List[SensorDataInfo])
def get_system_status(
    device_name: str,
    request: Request,
    limit: int = Query(50, le=100),
    db: Session = Depends(get_db)
):
    """获取系统状态历史"""
    return DataService.get_system_status(db, device_name, request.state.user, limit)