from typing import List
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from database.database import get_db
from schemas import SystemLogInfo, Token, UserProfile, UserRegister, UserLogin, UserInfo
from services.auth_service import AuthService

router = APIRouter()

@router.post("/register", response_model=Token)
def register(user: UserRegister, db: Session = Depends(get_db)):
    """用户注册"""
    return AuthService.register_user(db, user)

@router.post("/login", response_model=Token)
def login(form_data: UserLogin, db: Session = Depends(get_db)):
    """用户登录"""
    return AuthService.login_user(db, form_data)

@router.put("/update", response_model=Token)
def update(request: Request, user: UserProfile, db: Session = Depends(get_db)):
    """用户更新"""
    return AuthService.update_user(db, user, request.state.user)

@router.get("/profile", response_model=UserInfo)
def profile(request: Request, db: Session = Depends(get_db)):
    """获取用户信息"""
    return AuthService.get_user_profile(db, request.state.user)

@router.get("/log", response_model=List[SystemLogInfo])
def log(request: Request, db: Session = Depends(get_db)):
    """获取登录日志"""
    return AuthService.get_user_log(db, request.state.user)