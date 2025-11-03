from typing import List
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException

from database.models import Users, UserSessions
from schemas import SystemLogInfo, UserProfile, UserRegister, UserLogin, Token, TokenData, UserInfo
from config import settings
from utils.security import get_password_hash, verify_password
from exceptions import LocalException

class AuthService:
    @staticmethod
    def register_user(db: Session, user: UserRegister) -> Token:
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

        return AuthService._create_token(db, db_user)

    @staticmethod
    def login_user(db: Session, form_data: UserLogin) -> Token:
        user = db.query(Users).filter(Users.username == form_data.username).first()
        if not user or not verify_password(form_data.password, user.password_hash):
            raise LocalException(401, "用户名或密码错误")

        if not user.is_active:
            raise LocalException(400, "账户未激活")

        return AuthService._create_token(db, user)

    @staticmethod
    def update_user(db: Session, user: UserProfile, caller: TokenData) -> Token:
        # 检查用户名是否存在
        db_user = db.query(Users).filter(Users.username == caller.sub).first()
        if not db_user:
            raise LocalException(400, "用户不存在")

        db_user.username = user.username
        db_user.real_name = user.real_name
        db_user.phone = user.phone
        db_user.email = user.email
        db.commit()

        return AuthService._create_token(db, db_user)

    @staticmethod
    def get_user_profile(db: Session, caller: TokenData) -> UserInfo:
        user = db.query(Users).filter(Users.username == caller.sub).first()
        if not user:
            raise LocalException(404, "用户不存在")
        return UserInfo.model_validate(user)
    
    @staticmethod
    def get_user_log(db: Session, caller: TokenData) -> List[SystemLogInfo]:
        if caller.role == "nurse" or caller.role == "doctor":
            db_log = db.query(UserSessions).all()
            return [SystemLogInfo.model_validate(log) for log in db_log]

        if caller.role == "family":
            db_user = db.query(Users).filter(Users.username == caller.sub).first()
            db_log = db.query(UserSessions).filter(UserSessions.user_id == db_user.id).all()
            return [SystemLogInfo.model_validate(log) for log in db_log]

    @staticmethod
    def _create_token(db: Session, user: Users) -> Token:
        expires = datetime.now() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        token_data = TokenData(sub=user.username, role=user.role, exp=expires)

        token = jwt.encode(
            token_data.dict(),
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )

        # 存储会话
        session = UserSessions(
            user_id=user.id,
            token=token,
            expires_at=expires
        )
        db.add(session)
        db.commit()

        return Token(access_token=token, token_type="bearer")

    @staticmethod
    def verify_token(token: str) -> TokenData:
        try:
            if not token or not token.startswith("Bearer "):
                raise LocalException(401, "无效的token格式")

            token = token.replace("Bearer ", "")
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

            username = payload.get("sub")
            role = payload.get("role")
            exp = payload.get("exp")

            if not username:
                raise LocalException(401, "无效的token")

            # 检查过期时间
            if datetime.now() > datetime.fromtimestamp(exp):
                raise LocalException(401, "token已过期")

            return TokenData(sub=username, role=role, exp=datetime.fromtimestamp(exp))

        except JWTError:
            raise LocalException(401, "无效的token")