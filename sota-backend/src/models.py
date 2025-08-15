"""
Pydantic models for SOTA.ai API
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class ArticleBase(BaseModel):
    """Base article model"""
    title: str
    summary: Optional[str] = None
    content: Optional[str] = None
    url: str
    source: str
    published_at: datetime

class ArticleCreate(ArticleBase):
    """Article creation model"""
    tags: Optional[List[str]] = []
    importance: Optional[str] = "medium"
    ai_score: Optional[float] = 0.0

class Article(ArticleBase):
    """Article response model"""
    id: str
    tags: List[str] = []
    importance: str = "medium"
    ai_score: float = 0.0
    sentiment: Optional[str] = None
    category: Optional[str] = None
    word_count: Optional[int] = None
    read_time: Optional[int] = None
    is_featured: bool = False
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class NewsletterBase(BaseModel):
    """Base newsletter model"""
    date: str = Field(..., description="Date in YYYY-MM-DD format")
    title: str
    content: str

class NewsletterCreate(NewsletterBase):
    """Newsletter creation model"""
    featured_articles: Optional[List[str]] = []
    total_articles_analyzed: Optional[int] = 0

class Newsletter(NewsletterBase):
    """Newsletter response model"""
    id: str
    generated_at: datetime
    generation_time: Optional[float] = None
    ai_confidence: Optional[float] = None
    featured_articles: List[str] = []
    total_articles_analyzed: int = 0
    views: int = 0
    shares: int = 0
    click_through_rate: float = 0.0
    is_published: bool = True
    is_featured: bool = False

    class Config:
        from_attributes = True

class SubscriberBase(BaseModel):
    """Base subscriber model"""
    email: str

class SubscriberCreate(SubscriberBase):
    """Subscriber creation model"""
    frequency: Optional[str] = "daily"
    topics: Optional[List[str]] = []

class Subscriber(SubscriberBase):
    """Subscriber response model"""
    id: str
    subscribed_at: datetime
    is_active: bool = True
    frequency: str = "daily"
    topics: List[str] = []
    last_opened: Optional[datetime] = None
    open_rate: float = 0.0
    click_rate: float = 0.0

    class Config:
        from_attributes = True

class AnalyticsEventBase(BaseModel):
    """Base analytics event model"""
    event_type: str
    metadata: Optional[Dict[str, Any]] = {}

class AnalyticsEventCreate(AnalyticsEventBase):
    """Analytics event creation model"""
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    article_id: Optional[str] = None
    newsletter_id: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class AnalyticsEvent(AnalyticsEventBase):
    """Analytics event response model"""
    id: str
    timestamp: datetime
    user_id: Optional[str] = None
    session_id: Optional[str] = None
    article_id: Optional[str] = None
    newsletter_id: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

    class Config:
        from_attributes = True

class PlatformStats(BaseModel):
    """Platform statistics model"""
    articles_processed_today: int
    total_articles: int
    sources_monitored: int
    ai_accuracy_score: float
    newsletters_generated: int
    active_subscribers: int
    last_updated: datetime

class NewsSource(BaseModel):
    """News source model"""
    name: str
    type: str  # research, community, official, publication, academic
    url: str
    is_active: bool = True
    last_crawled: Optional[datetime] = None

class MCPStatus(BaseModel):
    """MCP server status model"""
    status: str
    connections: int
    tools_available: List[str]
    uptime: str
    last_updated: datetime

class MCPProcessResult(BaseModel):
    """MCP processing result model"""
    success: bool
    tool_used: str
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    processed_at: datetime


