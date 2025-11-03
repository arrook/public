import asyncio
import json
import logging
from typing import Dict, List, Set
from fastapi import WebSocket

logger = logging.getLogger(__name__)

class ConnectionManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        self.active_connections: Dict[str, Set[WebSocket]] = {}
        self._initialized = True
        print("✅ WebSocket ConnectionManager initialized")

    async def connect(self, websocket: WebSocket, device_name: str):
        """接受WebSocket连接并加入设备房间"""
        await websocket.accept()

        if device_name not in self.active_connections:
            self.active_connections[device_name] = set()

        self.active_connections[device_name].add(websocket)
        print(f"🔗 WebSocket connected for device {device_name}. Total: {len(self.active_connections[device_name])}")

    def disconnect(self, websocket: WebSocket, device_name: str):
        """断开WebSocket连接"""
        if device_name in self.active_connections:
            self.active_connections[device_name].discard(websocket)
            if not self.active_connections[device_name]:
                del self.active_connections[device_name]

        print(f"🔌 WebSocket disconnected for device {device_name}")

    async def send_personal_message(self, message: dict, websocket: WebSocket):
        """发送个人消息"""
        try:
            await websocket.send_text(json.dumps(message))
        except Exception as e:
            print(f"❌ Error sending personal message: {e}")
            raise

    async def broadcast_to_device(self, message: dict, device_name: str):
        """向特定设备的所有连接广播消息"""
        if device_name not in self.active_connections or not self.active_connections[device_name]:
            return

        message_text = json.dumps(message)
        connections = list(self.active_connections[device_name])
        dead_connections = []

        # 并发发送消息
        tasks = []
        for connection in connections:
            task = self._safe_send(connection, message_text)
            tasks.append(task)

        # 等待所有发送完成
        results = await asyncio.gather(*tasks, return_exceptions=True)

        # 检查失败的连接
        for connection, result in zip(connections, results):
            if isinstance(result, Exception):
                dead_connections.append(connection)
                print(f"⚠️ WebSocket send failed, marking as dead: {result}")

        # 清理死亡的连接
        for dead_connection in dead_connections:
            self.disconnect(dead_connection, device_name)

    async def _safe_send(self, websocket: WebSocket, message: str):
        """安全发送消息，捕获异常"""
        try:
            await websocket.send_text(message)
            return True
        except Exception as e:
            return e

    def get_connection_count(self, device_name: str) -> int:
        """获取设备的连接数"""
        return len(self.active_connections.get(device_name, []))

    def get_total_connections(self) -> int:
        """获取总连接数"""
        return sum(len(connections) for connections in self.active_connections.values())

# 全局单例实例
manager = ConnectionManager()