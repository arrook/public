from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from typing import List

from database.database import get_db
from schemas import UserInfo, Token, UserRegister, Response as ResponseSchema, UserUpdate, adminUpdate
from services.admin_service import AdminService

router = APIRouter()

@router.get("/users", response_model=List[UserInfo])
def get_users(request: Request, db: Session = Depends(get_db)):
    """获取所有用户（仅医生、护士权限）"""
    return AdminService.get_all_users(db, request.state.user)

@router.get("/total", response_model=List[UserInfo])
def get_total(request: Request, db: Session = Depends(get_db)):
    """获取所有用户"""
    return AdminService.get_total(db, request.state.user)

@router.get("/user/{user_id}", response_model=UserInfo)
def get_user(request: Request, user_id: int, db: Session = Depends(get_db)):
    """获取特定用户信息（仅医生权限）"""
    return AdminService.get_user(db, request.state.user, user_id)

@router.post("/user", response_model=ResponseSchema)
def register_user(request: Request, user: UserRegister, db: Session = Depends(get_db)):
    """用户注册"""
    return AdminService.register_user(db, request.state.user, user)

@router.put("/user/{user_id}", response_model=ResponseSchema)
def update_user(request: Request, user: adminUpdate, db: Session = Depends(get_db)):
    """用户更新"""
    return AdminService.update_user(db, request.state.user, user)

@router.delete("/user/{user_id}", response_model=ResponseSchema)
def delete_user(request: Request, user_id: int, db: Session = Depends(get_db)):
    """用户删除"""
    return AdminService.delete_user(db, request.state.user, user_id)
