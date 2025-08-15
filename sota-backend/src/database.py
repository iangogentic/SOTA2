"""
Database configuration and models for SOTA.ai
"""
import asyncio
import logging
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, DateTime, Text, Float, Integer, Boolean, JSON
from datetime import datetime

from .config import settings

logger = logging.getLogger(__name__)

# Database engine
engine = create_async_engine(
    settings.database_url.replace("postgresql://", "postgresql+asyncpg://"),
    echo=settings.debug,
    pool_pre_ping=True,
    pool_recycle=300
)

# Session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class for models
Base = declarative_base()

class Article(Base):
    """Article model"""
    __tablename__ = "articles"
    
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    summary = Column(Text)
    content = Column(Text)
    url = Column(String, nullable=False)
    source = Column(String, nullable=False)
    published_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # AI-generated fields
    tags = Column(JSON)
    importance = Column(String)  # low, medium, high
    ai_score = Column(Float)
    sentiment = Column(String)
    category = Column(String)
    
    # Metadata
    word_count = Column(Integer)
    read_time = Column(Integer)  # in minutes
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)

class Newsletter(Base):
    """Newsletter model"""
    __tablename__ = "newsletters"
    
    id = Column(String, primary_key=True)
    date = Column(String, nullable=False, unique=True)  # YYYY-MM-DD
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    
    # Generation metadata
    generated_at = Column(DateTime, default=datetime.utcnow)
    generation_time = Column(Float)  # seconds
    ai_confidence = Column(Float)
    
    # Article references
    featured_articles = Column(JSON)  # List of article IDs
    total_articles_analyzed = Column(Integer)
    
    # Engagement metrics
    views = Column(Integer, default=0)
    shares = Column(Integer, default=0)
    click_through_rate = Column(Float, default=0.0)
    
    # Status
    is_published = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)

class Subscriber(Base):
    """Newsletter subscriber model"""
    __tablename__ = "subscribers"
    
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    subscribed_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    # Preferences
    frequency = Column(String, default="daily")  # daily, weekly
    topics = Column(JSON)  # Preferred AI topics
    
    # Engagement
    last_opened = Column(DateTime)
    open_rate = Column(Float, default=0.0)
    click_rate = Column(Float, default=0.0)

class AnalyticsEvent(Base):
    """Analytics events model"""
    __tablename__ = "analytics_events"
    
    id = Column(String, primary_key=True)
    event_type = Column(String, nullable=False)  # page_view, article_click, newsletter_open, etc.
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Event data
    user_id = Column(String)
    session_id = Column(String)
    article_id = Column(String)
    newsletter_id = Column(String)
    
    # Additional metadata
    metadata = Column(JSON)
    ip_address = Column(String)
    user_agent = Column(String)

async def init_db():
    """Initialize database tables"""
    try:
        logger.info("🗄️  Initializing database...")
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("✅ Database initialized successfully")
    except Exception as e:
        logger.error(f"❌ Database initialization failed: {e}")
        raise

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Get database session"""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception as e:
            logger.error(f"Database session error: {e}")
            await session.rollback()
            raise
        finally:
            await session.close()

async def close_db():
    """Close database connections"""
    await engine.dispose()


