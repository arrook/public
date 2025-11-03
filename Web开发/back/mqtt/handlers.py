import json
from datetime import datetime
from sqlalchemy.orm import Session

from database.models import SensorData, SystemStatus, ConfigAcks, Devices, ControlCommands
from schemas import SensorDataCreate, SystemStatusCreate, ConfigAckCreate
from websocket.manager import ConnectionManager

class MQTTHandler:
    def __init__(self, db: Session):
        self.db = db
        self.ws_manager = ConnectionManager()
        print("✅ MQTT Handler initialized")

    async def handle_health_data(self, message: SensorDataCreate):
        """处理健康数据上报"""
        try:
            # 存储传感器数据
            sensor_data = SensorData(
                device_name=message.device_name,
                sensor_data=message.sensor_data.model_dump(),
            )
            self.db.add(sensor_data)

            # 更新设备在线状态
            await self._update_device_online_status(message.device_name)

            # 推送到前端
            # processed_data = self._process_sensor_data(message)
            await self.ws_manager.broadcast_to_device({
                "type": "sensor_data",
                "device_name": message.device_name,
                "data": message.sensor_data.model_dump(),
                "timestamp": datetime.now().isoformat()
            }, message.device_name)

            self.db.commit()
            print(f"✅ Health data processed for device {message.device_name}")

        except Exception as e:
            self.db.rollback()
            print(f"❌ Error processing health data: {e}")
            raise

    async def handle_status_update(self, message: SystemStatusCreate):
        """处理设备状态更新"""
        try:
            # 更新设备在线状态
            await self._update_device_online_status(message.device_name)

            # 存储设备状态
            system_status = SystemStatus(
                device_name=message.device_name,
                sensors=message.sensors,
                actuators=message.actuators,
                system=message.system
            )
            self.db.add(system_status)

            # 推送到前端
            await self.ws_manager.broadcast_to_device({
                "type": "device_status",
                "device_name": message.device_name,
                "status": {
                    "sensors": message.sensors,
                    "actuators": message.actuators,
                    "system": message.system
                },
                "trace_id": message.trace_id,
                "timestamp": datetime.now().isoformat()
            }, message.device_name)

            self.db.commit()
            print(f"✅ Status updated for device {message.device_name}")

        except Exception as e:
            self.db.rollback()
            print(f"❌ Error processing status update: {e}")
            raise

    async def handle_config_ack(self, message: ConfigAckCreate):
        """处理配置应答"""
        try:
            config_ack = ConfigAcks(
                device_name=message.device_name,
                trace_id=message.trace_id,
                type=message.type,
                status=message.status,
                message=message.message,
                code=message.code,
                crc=message.crc
            )
            self.db.add(config_ack)

            # 更新对应的控制命令状态
            if message.type == "control":
                control_cmd = self.db.query(ControlCommands).filter(
                    ControlCommands.id == message.trace_id
                ).first()
                if control_cmd:
                    if message.status == "ok":
                        control_cmd.status = "executed"
                    else:
                        control_cmd.status = "failed"
                    control_cmd.response = message.message
                    control_cmd.executed_at = datetime.now()

            # 推送到前端
            await self.ws_manager.broadcast_to_device({
                "type": "config_ack",
                "device_name": message.device_name,
                "ack": message.dict(),
                "timestamp": datetime.now().isoformat()
            }, message.device_name)

            self.db.commit()
            print(f"✅ Config ACK processed for device {message.device_name}")

        except Exception as e:
            self.db.rollback()
            print(f"❌ Error processing config ACK: {e}")
            raise

    async def _update_device_online_status(self, device_name: str):
        """更新设备在线状态"""
        device = self.db.query(Devices).filter(Devices.device_name == device_name).first()
        if device:
            device.is_online = True
            # device.updated_at = datetime.now()

    def _process_sensor_data(self, message: SensorDataCreate) -> dict:
        """处理传感器数据，生成前端显示格式"""
        processed = {
            "ts": message.timestamp,
            "device_name": message.device_name,
            "trace_id": message.trace_id,
            "data": {}
        }

        # 处理MAX30102数据（心率血氧）
        if "max30102" in message.data:
            max_data = message.data["max30102"]
            processed["data"]["max30102"] = {
                "heart_rate": self._process_heart_rate_data(max_data.get("heart_rate")),
                "spo2": self._process_spo2_data(max_data.get("spo2"))
            }

        # 处理环境数据
        if "dht11" in message.data:
            dht_data = message.data["dht11"]
            processed["data"]["dht11"] = {
                "temperature": self._process_temperature_data(dht_data.get("temperature"), 18, 28),
                "humidity": self._process_humidity_data(dht_data.get("humidity"))
            }

        # 处理体温数据
        if "ds18b20" in message.data:
            temp_data = message.data["ds18b20"]
            processed["data"]["ds18b20"] = {
                "temperature": self._process_temperature_data(temp_data.get("temperature"), 10, 40)
            }

        return processed

    def _process_heart_rate_data(self, heart_rate: float) -> dict:
        return {
            "value": heart_rate,
            "level": "normal" if heart_rate and 50 <= heart_rate <= 100 else "warning",
            "message": "心率正常" if heart_rate and 50 <= heart_rate <= 100 else "心率异常",
            "threshold_min": 50,
            "threshold_max": 100
        }

    def _process_spo2_data(self, spo2: float) -> dict:
        return {
            "value": spo2,
            "level": "normal" if spo2 and spo2 >= 95 else "warning",
            "message": "血氧正常" if spo2 and spo2 >= 95 else "血氧过低",
            "threshold_min": 95
        }

    def _process_temperature_data(self, temperature: float, min_temp: float, max_temp: float) -> dict:
        return {
            "value": temperature,
            "level": "normal" if temperature and min_temp <= temperature <= max_temp else "warning",
            "message": "温度正常" if temperature and min_temp <= temperature <= max_temp else "温度异常",
            "threshold_min": min_temp,
            "threshold_max": max_temp
        }

    def _process_humidity_data(self, humidity: float) -> dict:
        return {
            "value": humidity,
            "level": "normal" if humidity and 40 <= humidity <= 70 else "warning",
            "message": "湿度正常" if humidity and 40 <= humidity <= 70 else "湿度过高",
            "threshold_min": 40,
            "threshold_max": 70
        }
