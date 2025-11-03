from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from database.database import get_db
from schemas import DeviceConfigInfo, DeviceConfigCreate, Response as ResponseSchema
from services.config_service import ConfigService

router = APIRouter()

@router.post("/device/{device_name}/config", response_model=ResponseSchema)
def set_device_config(device_name: str, request: Request, db: Session = Depends(get_db)):
    """设置设备配置"""
    return ConfigService.set_device_config(db, device_name, request.state.user)

@router.put("/device/{device_name}/config", response_model=ResponseSchema)
def update_device_config(device_name: str, config: DeviceConfigCreate, request: Request, db: Session = Depends(get_db)):
    """修改设备配置"""
    return ConfigService.update_device_config(db, device_name, config, request.state.user)

@router.put("/device/{device_name}/config/default", response_model=ResponseSchema)
def default_device_config(device_name: str, request: Request, db: Session = Depends(get_db)):
    """修改设备配置"""
    return ConfigService.default_device_config(db, device_name, request.state.user)

@router.get("/device/{device_name}/config", response_model=DeviceConfigInfo)
def get_device_config(device_name: str, request: Request, db: Session = Depends(get_db)):
    """获取设备配置"""
    return ConfigService.get_device_config(db, device_name, request.state.user)

@router.delete("/device/{device_name}/config/{config_id}", response_model=ResponseSchema)
def delete_device_config(
    request: Request, 
    device_name: str, 
    config_id: int, 
    db: Session = Depends(get_db)
):
    """删除设备配置（仅医生权限）"""
    return ConfigService.delete_device_config(db, device_name, config_id, request.state.user)