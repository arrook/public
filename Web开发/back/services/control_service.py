from typing import List
from sqlalchemy.orm import Session

from database.models import ControlCommands, Devices, Users
from schemas import ControlCommandCreate, ControlCommandInfo, TokenData, Role, Response as ResponseSchema
from services.device_service import DeviceService
from exceptions import LocalException
from mqtt.client import mqtt_client

class ControlService:
    @staticmethod
    def send_control_command(db: Session, device_name: str, command: ControlCommandCreate, caller: TokenData) -> ResponseSchema:
        # 检查设备权限
        DeviceService.get_device(db, device_name, caller)

        # 获取用户ID
        db_user = db.query(Users).filter(Users.username == caller.sub).first()

        # 创建控制命令记录
        db_command = ControlCommands(**command.dict(), created_by=db_user.id)
        db.add(db_command)
        db.commit()
        db.refresh(db_command)

        # 通过MQTT发送控制命令
        try:
            from mqtt.client import mqtt_client
            mqtt_client.publish_control(device_name, command.command.model_dump())
        except Exception as e:
            print(f"⚠️ MQTT control publish failed: {e}")

        return ResponseSchema(code=200, message="命令已发送")

    @staticmethod
    def get_control_history(db: Session, device_name: str, caller: TokenData, limit: int = 50) -> List[ControlCommandInfo]:
        """获取控制命令历史"""
        if caller.role not in [Role.nurse, Role.doctor]:
            raise LocalException(403, "权限不足")
            
        DeviceService.get_device(db, device_name, caller)
        
        commands = db.query(ControlCommands).filter(
            ControlCommands.device_name == device_name
        ).order_by(ControlCommands.created_at.desc()).limit(limit).all()
        
        return [ControlCommandInfo.model_validate(cmd) for cmd in commands]

    @staticmethod  
    def cancel_control_command(db: Session, command_id: int, caller: TokenData) -> ResponseSchema:
        """取消控制命令"""
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")
            
        command = db.query(ControlCommands).filter(
            ControlCommands.id == command_id,
            ControlCommands.status == 'pending'
        ).first()
        
        if not command:
            raise LocalException(404, "命令未找到或无法取消")
            
        command.status = 'failed'
        command.response = "命令被用户取消"
        db.commit()
        
        return ResponseSchema(code=200, message="命令已取消")