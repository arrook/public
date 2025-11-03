# status_service.py
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from typing import List, Optional

from database.models import Users, Devices, SystemStatus, SystemLogs
from schemas import SystemStatusCreate, SystemStatusInfo, Response as ResponseSchema
from exceptions import LocalException

class StatusService:
    """系统状态与统计服务"""

    @staticmethod
    def get_login_stats(db: Session, start: Optional[datetime], end: Optional[datetime]) -> ResponseSchema:
        """登录统计"""
        if not start:
            start = datetime.today().replace(hour=0, minute=0, second=0, microsecond=0)
        if not end:
            end = start + timedelta(days=1)

        total = (db.query(func.count(SystemLogs.id))
                 .filter(SystemLogs.action_type == "login",
                         SystemLogs.created_at >= start,
                         SystemLogs.created_at < end)
                 .scalar())

        distinct = (db.query(func.count(func.distinct(SystemLogs.user_id)))
                    .filter(SystemLogs.action_type == "login",
                            SystemLogs.created_at >= start,
                            SystemLogs.created_at < end)
                    .scalar())

        return ResponseSchema(code=200, message="success", data={
            "period": {"start": start, "end": end},
            "total_login_count": total,
            "distinct_user_count": distinct
        })

    @staticmethod
    def get_active_users(db: Session, within_minutes: int) -> ResponseSchema:
        """活跃在线用户"""
        since = datetime.now() - timedelta(minutes=within_minutes)
        count = (db.query(func.count(func.distinct(SystemLogs.user_id)))
                 .filter(SystemLogs.action_type == "heartbeat",
                         SystemLogs.created_at >= since)
                 .scalar())
        return ResponseSchema(code=200, message="success", data={
            "within_minutes": within_minutes,
            "active_user_count": count
        })

    @staticmethod
    def get_device_online_ratio(db: Session) -> ResponseSchema:
        """设备在线率"""
        total = db.query(func.count(Devices.device_name)).scalar()
        online = db.query(func.count(Devices.device_name)).filter(Devices.is_online == 1).scalar()
        ratio = online / total if total else 0
        return ResponseSchema(code=200, message="success", data={
            "total_device_count": total,
            "online_device_count": online,
            "offline_device_count": total - online,
            "online_ratio": round(ratio, 4)
        })

    @staticmethod
    def get_alarm_stats(db: Session, days: int) -> ResponseSchema:
        """告警统计（模拟）"""
        # 此处可扩展为读取真实告警日志
        since = datetime.now() - timedelta(days=days)
        return ResponseSchema(code=200, message="success", data={
            "days": days,
            "total_alarms": 0,
            "level_breakdown": {"low": 0, "medium": 0, "high": 0},
            "type_breakdown": {}
        })

    @staticmethod
    def get_system_status_history(db: Session, device_name: str, limit: int) -> List[SystemStatusInfo]:
        """查询系统状态历史"""
        return (db.query(SystemStatus)
                .filter(SystemStatus.device_name == device_name)
                .order_by(SystemStatus.created_at.desc())
                .limit(limit)
                .all())

    @staticmethod
    def get_dashboard_brief(db: Session) -> ResponseSchema:
        """首页综合简报"""
        user_total = db.query(func.count(Users.id)).scalar()
        device_total = db.query(func.count(Devices.device_name)).scalar()
        device_online = db.query(func.count(Devices.device_name)).filter(Devices.is_online == 1).scalar()

        # 最近24h登录
        day_ago = datetime.now() - timedelta(days=1)
        recent_login = (db.query(func.count(func.distinct(SystemLogs.user_id)))
                        .filter(SystemLogs.action_type == "login",
                                SystemLogs.created_at >= day_ago)
                        .scalar())

        return ResponseSchema(code=200, message="success", data={
            "user": {"total": user_total},
            "device": {
                "total": device_total,
                "online": device_online,
                "offline": device_total - device_online
            },
            "recent_login_count": recent_login,
            "server_time": datetime.now()
        })