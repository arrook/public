import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database.database import engine
from database import models
from api import auth, devices, data, config, admin, control, websocket, status
from middleware.auth import AuthMiddleware
from exceptions import register_exception_handlers
from mqtt.client import mqtt_client

# 创建数据库表
models.Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup - MQTT客户端会自动初始化
    print("🚀 Application starting up...")
    
    asyncio.create_task(mqtt_client.start_processing())
    
    yield

    # Shutdown - 清理资源
    print("🔴 Application shutting down...")
    await mqtt_client.stop_processing()
    mqtt_client.disconnect()

app = FastAPI(
    title="Healthcare IoT Backend",
    description="测试",
    version="1.0.0",
    lifespan=lifespan
)

# 注册中间件和异常处理器
app.add_middleware(AuthMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
register_exception_handlers(app)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(devices.router, prefix="/api/v1", tags=["devices"])
app.include_router(data.router, prefix="/api/v1", tags=["data"])
app.include_router(config.router, prefix="/api/v1", tags=["config"])
app.include_router(control.router, prefix="/api/v1", tags=["control"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])
app.include_router(status.router, prefix="/api/v1", tags=["status"])
app.include_router(websocket.router, tags=["websocket"])

@app.get("/")
def root():
    return {"message": "Healthcare IoT Backend API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)