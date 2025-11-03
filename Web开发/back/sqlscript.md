# “**从 MySQL 已有结构 → Python 模型**”和“**用 Python 模型 → 创建 MySQL 数据库**”

---

## ✅ 方向 1：Python 模型 → 创建 MySQL 数据库

### 1. 安装依赖

```bash
pip install sqlalchemy pymysql  # 或 mysqlclient / aiomysql / asyncmy
```

### 2. 模型文件 `models.py`

```python
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id   = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    email= Column(String(120), unique=True, nullable=False)
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
```

### 3. 建库脚本 `create_db.py`

```python
from sqlalchemy import create_engine
from models import Base

# 1. 连上 MySQL（提前手动建好空库，或用 root 拥有建库权限）
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://user:pass@localhost:3306/newdb?charset=utf8mb4"
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# 2. 一键建表
Base.metadata.create_all(bind=engine)
```

运行后所有 `Base` 子类对应的表就出现在 `newdb` 里。

---

## ✅ 方向 2：MySQL 已有表 → 自动生成 Python 模型

SQLAlchemy 官方工具：`sqlacodegen`（支持 1.4/2.0）

### 1. 安装

```bash
pip install sqlacodegen pymysql
```

### 2. 一行命令生成模型文件

```bash
sqlacodegen mysql+pymysql://root:1234@localhost:3306/healthcare > models.py
```

### 3. 结果示例（自动带类型、索引、外键）

```python
# models_auto.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(120), unique=True)
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))
```
