import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query, Request
import json

from websocket.manager import manager

router = APIRouter()

@router.websocket("/ws/{device_name}")
async def websocket_endpoint(
    websocket: WebSocket, 
    device_name: str,
    ):
    try:
        await manager.connect(websocket, device_name)

        while True:
            # 保持连接，超时自动断开
            data = await asyncio.wait_for(websocket.receive_text(), timeout=120)  # 30秒超时
            message = json.loads(data)

    except WebSocketDisconnect: pass
    except asyncio.TimeoutError:pass
    except Exception as e: pass
    finally:
        manager.disconnect(websocket, device_name)