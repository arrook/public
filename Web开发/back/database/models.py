from typing import Optional
import datetime

from sqlalchemy import ForeignKeyConstraint, Index, JSON, String, TIMESTAMP, Text, text
from sqlalchemy.dialects.mysql import BIGINT, ENUM, INTEGER, TINYINT
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class Users(Base):
    __tablename__ = 'users'
    __table_args__ = (
        Index('username', 'username', unique=True),
    )

    id: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    username: Mapped[str] = mapped_column(String(50, 'utf8mb4_unicode_ci'), nullable=False, comment='登录用户名')
    password_hash: Mapped[str] = mapped_column(String(255, 'utf8mb4_unicode_ci'), nullable=False, comment='密码哈希')
    role: Mapped[str] = mapped_column(ENUM('family', 'nurse', 'doctor'), nullable=False, comment='用户角色')
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    real_name: Mapped[Optional[str]] = mapped_column(String(50, 'utf8mb4_unicode_ci'), comment='真实姓名')
    phone: Mapped[Optional[str]] = mapped_column(String(20, 'utf8mb4_unicode_ci'), comment='联系电话')
    email: Mapped[Optional[str]] = mapped_column(String(100, 'utf8mb4_unicode_ci'), comment='邮箱（用于报警通知）')
    is_active: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'1'"), comment='账号状态')

    devices: Mapped[list['Devices']] = relationship('Devices', back_populates='owner')
    user_sessions: Mapped[list['UserSessions']] = relationship('UserSessions', back_populates='user')
    control_commands: Mapped[list['ControlCommands']] = relationship('ControlCommands', back_populates='users')
    system_logs: Mapped[list['SystemLogs']] = relationship('SystemLogs', back_populates='user')


class Devices(Base):
    __tablename__ = 'devices'
    __table_args__ = (
        ForeignKeyConstraint(['owner_id'], ['users.id'], name='devices_ibfk_1'),
        Index('owner_id', 'owner_id')
    )

    device_name: Mapped[str] = mapped_column(String(50, 'utf8mb4_unicode_ci'), primary_key=True, comment='设备唯一标识')
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    owner_id: Mapped[Optional[int]] = mapped_column(INTEGER(11), comment='设备归属用户ID')
    is_online: Mapped[Optional[int]] = mapped_column(TINYINT(1), server_default=text("'0'"), comment='在线状态')

    owner: Mapped[Optional['Users']] = relationship('Users', back_populates='devices')
    config_acks: Mapped[list['ConfigAcks']] = relationship('ConfigAcks', back_populates='devices')
    control_commands: Mapped[list['ControlCommands']] = relationship('ControlCommands', back_populates='devices')
    device_configs: Mapped[list['DeviceConfigs']] = relationship('DeviceConfigs', back_populates='devices')
    sensor_data: Mapped[list['SensorData']] = relationship('SensorData', back_populates='devices')
    system_logs: Mapped[list['SystemLogs']] = relationship('SystemLogs', back_populates='devices')
    system_status: Mapped[list['SystemStatus']] = relationship('SystemStatus', back_populates='devices')


class UserSessions(Base):
    __tablename__ = 'user_sessions'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE', name='user_sessions_ibfk_1'),
        Index('token', 'token', unique=True),
        Index('user_id', 'user_id')
    )

    id: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    user_id: Mapped[int] = mapped_column(INTEGER(11), nullable=False)
    token: Mapped[str] = mapped_column(String(255, 'utf8mb4_unicode_ci'), nullable=False, comment='JWT令牌')
    expires_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), comment='过期时间（2h自动续期）')
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))

    user: Mapped['Users'] = relationship('Users', back_populates='user_sessions')


class ConfigAcks(Base):
    __tablename__ = 'config_acks'
    __table_args__ = (
        ForeignKeyConstraint(['device_name'], ['devices.device_name'], ondelete='CASCADE', name='config_acks_ibfk_1'),
        Index('device_name', 'device_name')
    )

    id: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    trace_id: Mapped[int] = mapped_column(INTEGER(11), nullable=False, comment='根据操作类型，存储配置表或者控制表id值')
    type: Mapped[str] = mapped_column(ENUM('config', 'control'), nullable=False, comment='应答类型')
    status: Mapped[str] = mapped_column(ENUM('pending', 'ok', 'error'), nullable=False, server_default=text("'pending'"), comment='应答状态')
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    device_name: Mapped[Optional[str]] = mapped_column(String(50, 'utf8mb4_unicode_ci'))
    message: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_unicode_ci'), comment='应答消息')
    code: Mapped[Optional[int]] = mapped_column(INTEGER(11), comment='错误码（状态为error时）')
    crc: Mapped[Optional[int]] = mapped_column(INTEGER(11), comment='配置校验CRC')

    devices: Mapped[Optional['Devices']] = relationship('Devices', back_populates='config_acks')


class ControlCommands(Base):
    __tablename__ = 'control_commands'
    __table_args__ = (
        ForeignKeyConstraint(['created_by'], ['users.id'], name='control_commands_ibfk_2'),
        ForeignKeyConstraint(['device_name'], ['devices.device_name'], ondelete='CASCADE', name='control_commands_ibfk_1'),
        Index('created_by', 'created_by'),
        Index('idx_device_status', 'device_name', 'status')
    )

    id: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    command: Mapped[dict] = mapped_column(JSON, nullable=False, comment='控制内容（如{"relay":{"status":1},"rgb_led":{"color":{"red":255}}}）')
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    executed_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text("'0000-00-00 00:00:00'"), comment='设备执行时间')
    device_name: Mapped[Optional[str]] = mapped_column(String(50, 'utf8mb4_unicode_ci'))
    status: Mapped[Optional[str]] = mapped_column(ENUM('pending', 'executed', 'failed'), server_default=text("'pending'"), comment='执行状态')
    response: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_unicode_ci'), comment='设备响应结果')
    created_by: Mapped[Optional[int]] = mapped_column(INTEGER(11), comment='下发命令的用户')

    users: Mapped[Optional['Users']] = relationship('Users', back_populates='control_commands')
    devices: Mapped[Optional['Devices']] = relationship('Devices', back_populates='control_commands')


class DeviceConfigs(Base):
    __tablename__ = 'device_configs'
    __table_args__ = (
        ForeignKeyConstraint(['device_name'], ['devices.device_name'], ondelete='CASCADE', name='device_configs_ibfk_1'),
        Index('idx_device_version', 'device_name')
    )

    id: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    config_data: Mapped[dict] = mapped_column(JSON, nullable=False, comment='配置内容（与下行配置协议对应）')
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    updated_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    device_name: Mapped[Optional[str]] = mapped_column(String(50, 'utf8mb4_unicode_ci'))

    devices: Mapped[Optional['Devices']] = relationship('Devices', back_populates='device_configs')


class SensorData(Base):
    __tablename__ = 'sensor_data'
    __table_args__ = (
        ForeignKeyConstraint(['device_name'], ['devices.device_name'], ondelete='CASCADE', name='sensor_data_ibfk_1'),
        Index('idx_created_at', 'created_at'),
        Index('idx_device_ts', 'device_name')
    )

    id: Mapped[int] = mapped_column(BIGINT(20), primary_key=True)
    sensor_data: Mapped[dict] = mapped_column(JSON, nullable=False, comment='传感器数据（如{"max30102":{"hr":80,"spo2":96}}）')
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'), comment='云端接收时间')
    device_name: Mapped[Optional[str]] = mapped_column(String(50, 'utf8mb4_unicode_ci'))

    devices: Mapped[Optional['Devices']] = relationship('Devices', back_populates='sensor_data')


class SystemLogs(Base):
    __tablename__ = 'system_logs'
    __table_args__ = (
        ForeignKeyConstraint(['device_name'], ['devices.device_name'], name='system_logs_ibfk_2'),
        ForeignKeyConstraint(['user_id'], ['users.id'], name='system_logs_ibfk_1'),
        Index('idx_created_at', 'created_at'),
        Index('idx_device_time', 'device_name', 'created_at'),
        Index('idx_user_time', 'user_id', 'created_at')
    )

    id: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    action_type: Mapped[str] = mapped_column(String(50, 'utf8mb4_unicode_ci'), nullable=False, comment='操作类型（login/config_update等）')
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    user_id: Mapped[Optional[int]] = mapped_column(INTEGER(11), comment='操作用户（NULL表示系统操作）')
    device_name: Mapped[Optional[str]] = mapped_column(String(50, 'utf8mb4_unicode_ci'), comment='操作涉及的设备')
    ip_address: Mapped[Optional[str]] = mapped_column(String(45, 'utf8mb4_unicode_ci'), comment='操作IP地址')
    user_agent: Mapped[Optional[str]] = mapped_column(Text(collation='utf8mb4_unicode_ci'), comment='客户端信息')

    devices: Mapped[Optional['Devices']] = relationship('Devices', back_populates='system_logs')
    user: Mapped[Optional['Users']] = relationship('Users', back_populates='system_logs')


class SystemStatus(Base):
    __tablename__ = 'system_status'
    __table_args__ = (
        ForeignKeyConstraint(['device_name'], ['devices.device_name'], ondelete='CASCADE', name='system_status_ibfk_1'),
        Index('idx_device_time', 'device_name', 'created_at')
    )

    id: Mapped[int] = mapped_column(INTEGER(11), primary_key=True)
    created_at: Mapped[datetime.datetime] = mapped_column(TIMESTAMP, nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    device_name: Mapped[Optional[str]] = mapped_column(String(50, 'utf8mb4_unicode_ci'))
    sensors: Mapped[Optional[dict]] = mapped_column(JSON, comment='传感器状态（如{"max30102":{"status":"normal","since":1726000000}}）')
    actuators: Mapped[Optional[dict]] = mapped_column(JSON, comment='执行器状态（如{"relay":{"status":"normal"}}）')
    system: Mapped[Optional[dict]] = mapped_column(JSON, comment='系统状态（如{"uptime":86400,"battery_level":75}）')

    devices: Mapped[Optional['Devices']] = relationship('Devices', back_populates='system_status')
