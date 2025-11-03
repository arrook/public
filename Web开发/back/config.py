import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # 数据库配置
    DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://user:pass@localhost/healthcare")

    # MQTT配置
    MQTT_BROKER = os.getenv("MQTT_BROKER")
    MQTT_PORT = int(os.getenv("MQTT_PORT"))
    MQTT_USERNAME = os.getenv("MQTT_USERNAME")
    MQTT_PASSWORD = os.getenv("MQTT_PASSWORD")

    # JWT配置
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 120

    # 应用配置
    API_V1_STR = "/api/v1"

settings = Settings()