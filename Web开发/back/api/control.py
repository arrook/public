from typing import List
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from database.database import get_db
from schemas import ControlCommandInfo, Response as ResponseSchema, ControlCommandCreate
from services.control_service import ControlService

router = APIRouter()

@router.post("/device/{device_name}/control", response_model=ResponseSchema)
def send_control_command(
    device_name: str,
    command: ControlCommandCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    """发送控制命令"""
    return ControlService.send_control_command(db, device_name, command, request.state.user)

@router.get("/device/{device_name}/control", response_model=List[ControlCommandInfo])
def get_control_history(
    request: Request,
    device_name: str,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """获取设备控制命令历史"""
    return ControlService.get_control_history(db, device_name, request.state.user, limit)

@router.delete("/device/{command_id}/control", response_model=ResponseSchema)
def cancel_control_command(
    request: Request,
    command_id: int,
    db: Session = Depends(get_db)
):
    """取消待执行的控制命令"""
    return ControlService.cancel_control_command(db, command_id, request.state.user)