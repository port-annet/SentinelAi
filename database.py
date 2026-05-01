from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
import os

# SQLite database for local/Vercel development, easily swappable to PostgreSQL
# Use /tmp for serverless environments as it's the only writable directory
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:////tmp/sentinel.db")

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class PromptLog(Base):
    __tablename__ = "prompt_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    risk_type = Column(String, index=True)
    reason = Column(String)
    # Storing masked snippet only, never full prompt by default
    masked_snippet = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

class UserBehavior(Base):
    __tablename__ = "user_behaviors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True)
    violation_count = Column(Integer, default=0)
    last_violation = Column(DateTime, default=datetime.utcnow)
    escalated = Column(Boolean, default=False)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
