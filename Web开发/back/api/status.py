# status.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta

from database.database import get_db
from schemas import Response as ResponseSchema, SystemStatusInfo, SystemStatusCreate
from services.status_service import StatusService

router = APIRouter()

@router.get("/today/login", response_model=ResponseSchema)
def get_today_login_stats(
    db: Session = Depends(get_db),
    start: Optional[datetime] = Query(None, description="开始时间（默认今日0点）"),
    end: Optional[datetime] = Query(None, description="结束时间（默认明日0点）")
):
    """今日登录用户统计（支持自定义时间段）"""
    return StatusService.get_login_stats(db, start, end)

@router.get("/today/active", response_model=ResponseSchema)
def get_today_active_users(
    db: Session = Depends(get_db),
    within_minutes: int = Query(30, ge=5, le=1440, description="活跃判定分钟数")
):
    """最近N分钟活跃在线用户数"""
    return StatusService.get_active_users(db, within_minutes)

@router.get("/device/online/ratio", response_model=ResponseSchema)
def get_device_online_ratio(db: Session = Depends(get_db)):
    """设备在线率（在线/总数）"""
    return StatusService.get_device_online_ratio(db)

@router.get("/system/alarm/stats", response_model=ResponseSchema)
def get_alarm_stats(
    db: Session = Depends(get_db),
    days: int = Query(7, ge=1, le=30, description="统计最近N天")
):
    """系统告警统计（最近N天）"""
    return StatusService.get_alarm_stats(db, days)

@router.get("/system/status/{device_name}", response_model=List[SystemStatusInfo])
def get_system_status_history(
    device_name: str,
    limit: int = Query(50, ge=1, le=200, description="返回条数"),
    db: Session = Depends(get_db)
):
    """查询设备系统状态历史"""
    return StatusService.get_system_status_history(db, device_name, limit)

@router.get("/dashboard/brief", response_model=ResponseSchema)
def get_dashboard_brief(db: Session = Depends(get_db)):
    """控制台首页综合简报"""
    return StatusService.get_dashboard_brief(db)