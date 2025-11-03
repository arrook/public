from sqlalchemy.orm import Session
from typing import List

from database.models import Users, UserSessions
from schemas import TokenData, Role, UserInfo, UserRegister, Response as ResponseSchema, UserUpdate, adminUpdate
from utils.security import get_password_hash
from exceptions import LocalException

class AdminService:
    """管理员服务类，处理用户管理相关业务逻辑"""
    
    @staticmethod
    def get_all_users(db: Session, caller: TokenData) -> List[UserInfo]:
        """获取所有用户信息"""
        if caller.role == Role.family:
            raise LocalException(403, "权限不足")
            
        users = db.query(Users).all()
        return [UserInfo.model_validate(u) for u in users]

    @staticmethod
    def get_total(db: Session, caller: TokenData) -> List[UserInfo]:
        """获取所有用户信息"""  
        users = db.query(Users).all()
        return [UserInfo.model_validate(u) for u in users]

    @staticmethod
    def get_user(db: Session, caller: TokenData, user_id: int) -> UserInfo:
        """获取特定用户信息"""
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")
            
        user = db.query(Users).filter(Users.id == user_id).first()
        if not user:
            raise LocalException(404, "用户不存在")
            
        return UserInfo.model_validate(user)

    @staticmethod
    def register_user(db: Session, caller: TokenData, user: UserRegister) -> ResponseSchema:
        """注册新用户"""
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")

        # 检查用户名是否存在
        if db.query(Users).filter(Users.username == user.username).first():
            raise LocalException(400, "用户名已存在")

        # 创建用户
        hashed_password = get_password_hash(user.password)
        db_user = Users(
            username=user.username,
            password_hash=hashed_password,
            role=user.role,
            real_name=user.real_name,
            phone=user.phone,
            email=user.email
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return ResponseSchema(code=200, message="用户注册成功")

    @staticmethod
    def update_user(db: Session, caller: TokenData, user: adminUpdate) -> ResponseSchema:
        """更新用户信息"""
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")

        # 检查用户是否存在
        db_user = db.query(Users).filter(Users.id == user.id).first()
        if not db_user:
            raise LocalException(400, "用户不存在")

        # 更新用户信息
        db_user.username = user.username
        db_user.role = user.role
        db_user.real_name = user.real_name
        db_user.phone = user.phone
        db_user.email = user.email
        db_user.is_active = user.is_active

        db.commit()

        return ResponseSchema(code=200, message="用户更新成功")

    @staticmethod
    def delete_user(db: Session, caller: TokenData, user_id: int) -> ResponseSchema:
        """删除用户"""
        if caller.role != Role.doctor:
            raise LocalException(403, "权限不足")

        # 检查用户是否存在
        db_user = db.query(Users).filter(Users.id == user_id).first()
        if not db_user:
            raise LocalException(400, "用户不存在")

        db.query(UserSessions).filter(UserSessions.user_id == user_id).delete()

        # 删除用户
        db.delete(db_user)
        db.commit()

        return ResponseSchema(code=200, message="用户删除成功")