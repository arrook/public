from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from typing import List

from services.config_service import ConfigService
from database.database import get_db
from schemas import DeviceInfo, DeviceCreate, Response as ResponseSchema
from services.device_service import DeviceService

router = APIRouter()

@router.get("/devices", response_model=List[DeviceInfo])
def get_devices(request: Request, db: Session = Depends(get_db)):
    """获取设备列表"""
    return DeviceService.get_user_devices(db, request.state.user)

@router.get("/device/{device_name}", response_model=DeviceInfo)
def get_device(request: Request, device_name: str, db: Session = Depends(get_db)):
    """获取设备详情"""
    return DeviceService.get_device(db, device_name, request.state.user)

@router.get("/device/user/{user_id}", response_model=DeviceInfo)
def get_device_by_user(request: Request, user_id: int, db: Session = Depends(get_db)):
    """获取设备详情"""
    return DeviceService.get_device_by_user(db, user_id, request.state.user)

@router.post("/device", response_model=DeviceInfo)
def create_device(request: Request, device: DeviceCreate, db: Session = Depends(get_db)):
    """创建设备"""
    device = DeviceService.create_device(db, device, request.state.user)
    ConfigService.set_device_config(db, device.device_name, request.state.user)
    return device

@router.put("/device/{device_name}", response_model=ResponseSchema)
def update_device(request: Request, device_name: str, device: DeviceCreate, db: Session = Depends(get_db)):
    """更新设备"""
    return DeviceService.update_device(db, device_name, device, request.state.user)

@router.delete("/device/{device_name}", response_model=ResponseSchema)
def delete_device(request: Request, device_name: str, db: Session = Depends(get_db)):
    """删除设备"""
    DeviceService._delete_device_config(db, device_name, request.state.user)
    return DeviceService.delete_device(db, device_name, request.state.user)