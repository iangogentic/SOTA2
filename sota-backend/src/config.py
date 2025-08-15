"""
Configuration settings for SOTA.ai backend
"""
import os
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings"""
    
    # Database
    database_url: str = "postgresql://sota_user:sota_pass@localhost:5432/sota_db"
    
    # Redis
    redis_url: str = "redis://localhost:6379"
    
    # API Keys
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    
    # News Sources
    hackernews_api_url: str = "https://hacker-news.firebaseio.com/v0"
    reddit_api_url: str = "https://www.reddit.com/r/MachineLearning"
    arxiv_api_url: str = "http://export.arxiv.org/api/query"
    
    # MCP Server
    mcp_server_port: int = 8001
    mcp_server_host: str = "localhost"
    
    # Security
    secret_key: str = "sota-ai-super-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Application
    debug: bool = True
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()


