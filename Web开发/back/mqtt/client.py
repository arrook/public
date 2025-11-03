import asyncio
import json
import threading
import paho.mqtt.client as mqtt
from sqlalchemy.orm import Session
from queue import Queue
from typing import Dict, Any

from config import settings
from database.database import get_db
from mqtt.handlers import MQTTHandler
from schemas import SensorDataCreate, SystemStatusCreate, ConfigAckCreate

class MQTTClient:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
                cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        self.client = mqtt.Client()
        self.handler = None
        self.message_queue = Queue()
        self._processing_task = None
        self._stop_processing = False
        self._setup_callbacks()
        self._connect()
        self._initialized = True

    def _setup_callbacks(self):
        self.client.on_connect = self._on_connect
        self.client.on_message = self._on_message_sync
        self.client.on_disconnect = self._on_disconnect

    def _on_connect(self, client, userdata, flags, rc):
        print(f"✅ MQTT Connected to {settings.MQTT_BROKER}:{settings.MQTT_PORT} with code {rc}")

        topics = [
            ("iot/health/#", 1),
            ("iot/status/#", 1),
            ("iot/ack/#", 1)
        ]
        client.subscribe(topics)
        print("📡 MQTT Subscribed to topics")

    def _on_disconnect(self, client, userdata, rc):
        if rc != 0:
            print(f"⚠️ MQTT Unexpected disconnection, code: {rc}")

    def _on_message_sync(self, client, userdata, msg):
        """同步消息处理，将消息放入队列"""
        try:
            message_data = {
                'topic': msg.topic,
                'payload': msg.payload.decode('utf-8'),
                'qos': msg.qos,
                'retain': msg.retain
            }
            self.message_queue.put(message_data)
            print(f"📥 Message queued for {msg.topic}, queue size: {self.message_queue.qsize()}")
            
        except Exception as e:
            print(f"❌ Error queuing message: {e}")

    async def start_processing(self):
        """启动异步消息处理"""
        self._stop_processing = False
        print("🔄 Starting MQTT message processor")
        
        while not self._stop_processing:
            try:
                # 非阻塞获取消息
                if not self.message_queue.empty():
                    message_data = self.message_queue.get_nowait()
                    await self._process_message_data(message_data)
                    self.message_queue.task_done()
                else:
                    # 队列为空时短暂休眠
                    await asyncio.sleep(0.1)
                    
            except Exception as e:
                print(f"❌ Error in message processing loop: {e}")
                await asyncio.sleep(1)  # 出错时休眠

    async def _process_message_data(self, message_data: Dict[str, Any]):
        """处理队列中的消息数据"""
        try:
            payload = json.loads(message_data['payload'])
            topic = message_data['topic']

            print(f"📨 Processing message from {topic}")

            # 获取数据库会话
            db = next(get_db())
            if not self.handler:
                self.handler = MQTTHandler(db)

            # 根据主题路由处理
            if topic.startswith("iot/health/"):
                message = SensorDataCreate(**payload)
                await self.handler.handle_health_data(message)

            elif topic.startswith("iot/status/"):
                message = SystemStatusCreate(**payload)
                await self.handler.handle_status_update(message)

            elif topic.startswith("iot/ack/"):
                message = ConfigAckCreate(**payload)
                await self.handler.handle_config_ack(message)

        except json.JSONDecodeError as e:
            print(f"❌ MQTT JSON decode error: {e}")
        except Exception as e:
            print(f"❌ MQTT message processing error: {e}")

    async def stop_processing(self):
        """停止消息处理"""
        self._stop_processing = True
        print("🛑 Stopping MQTT message processor")

    def _connect(self):
        """连接MQTT代理"""
        try:
            if settings.MQTT_USERNAME and settings.MQTT_PASSWORD:
                self.client.username_pw_set(settings.MQTT_USERNAME, settings.MQTT_PASSWORD)

            self.client.connect(settings.MQTT_BROKER, settings.MQTT_PORT, 60)
            self.client.loop_start()
            print("🚀 MQTT client started")

        except Exception as e:
            print(f"❌ MQTT connection failed: {e}")

    def del_keys(self, d: dict, ex: set=set()):
        """递归删除指定 key，原地修改"""
        for k in list(d.keys()):  # list() 防止迭代时修改
            if k == "voice_text" and isinstance(d[k], str):
                d[k] = list(d[k].encode('gb2312'))
            if k in ex or d[k] is None:
                d.pop(k)
            elif isinstance(d[k], dict):
                self.del_keys(d[k], ex)
                if not d[k]:
                    d.pop(k)
        return d

    def publish_config(self, device_name: str, config_data: dict):
        """发布配置到设备"""
        topic = f"iot/config/{device_name}"
        exclude = {"voice_text", "voice_music", "sample_period", "accel_range", "gyro_range", 
                   "dlpf", "start_text", "enabled"}
        payload_str = json.dumps(self.del_keys(config_data, exclude))
        payload_gb2312 = payload_str.encode('gb2312')
        print(f"📤 ==> MQTT Publishing config to {payload_gb2312}")
        self.client.publish(topic, payload_gb2312, qos=0, retain=True)
        print(f"📤 MQTT Published config to {topic}")

    def publish_control(self, device_name: str, command_data: dict):
        """发布控制命令到设备"""
        topic = f"iot/control/{device_name}"
        payload_str = json.dumps(self.del_keys(command_data))
        payload_gb2312 = payload_str.encode('gb2312')
        print(f"📤 ==> MQTT Publishing config to {payload_gb2312}")
        self.client.publish(topic, payload_gb2312, qos=0, retain=False)
        print(f"📤 MQTT Published control to {topic}")

    def disconnect(self):
        """断开MQTT连接"""
        if hasattr(self, 'client'):
            self.client.loop_stop()
            self.client.disconnect()
            print("🔴 MQTT client disconnected")

# 全局单例实例
mqtt_client = MQTTClient()