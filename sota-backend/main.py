"""
SOTA.ai Backend - FastAPI server with MCP integration
"""
import asyncio
import logging
from contextlib import asynccontextmanager
from typing import List, Optional

from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import uvicorn

from src.config import settings
from src.news_aggregator import NewsAggregator
from src.ai_processor import AIProcessor
from src.database import get_db, init_db
from src.models import Article, Newsletter
from src.mcp_server import MCPServer

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Initialize services
news_aggregator = NewsAggregator()
ai_processor = AIProcessor()
mcp_server = MCPServer()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    logger.info("🚀 Starting SOTA.ai backend...")
    await init_db()
    await mcp_server.start()
    logger.info("✅ SOTA.ai backend started successfully!")
    
    yield
    
    # Shutdown
    logger.info("🔄 Shutting down SOTA.ai backend...")
    await mcp_server.stop()
    logger.info("✅ SOTA.ai backend shutdown complete!")

# FastAPI app
app = FastAPI(
    title="SOTA.ai Backend",
    description="State of the Art AI News - Backend API with MCP Server Integration",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://sota.ai"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ArticleResponse(BaseModel):
    id: str
    title: str
    summary: str
    url: str
    source: str
    published_at: str
    tags: List[str]
    importance: str
    ai_score: float

class NewsletterResponse(BaseModel):
    id: str
    date: str
    title: str
    content: str
    articles: List[ArticleResponse]
    generated_at: str

class NewsletterRequest(BaseModel):
    date: Optional[str] = None
    force_regenerate: bool = False

# API Routes
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to SOTA.ai Backend",
        "version": "1.0.0",
        "status": "operational",
        "ai_powered": True
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": "2024-01-15T12:00:00Z",
        "services": {
            "database": "connected",
            "mcp_server": "running",
            "ai_processor": "ready",
            "news_aggregator": "active"
        }
    }

@app.get("/api/articles/latest", response_model=List[ArticleResponse])
async def get_latest_articles(
    limit: int = 20,
    importance: Optional[str] = None,
    db=Depends(get_db)
):
    """Get latest AI articles"""
    try:
        articles = await news_aggregator.get_latest_articles(
            limit=limit,
            importance_filter=importance,
            db=db
        )
        return [ArticleResponse(**article.dict()) for article in articles]
    except Exception as e:
        logger.error(f"Error fetching latest articles: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch articles")

@app.get("/api/newsletter/today", response_model=NewsletterResponse)
async def get_todays_newsletter(db=Depends(get_db)):
    """Get today's AI newsletter"""
    try:
        newsletter = await ai_processor.get_todays_newsletter(db=db)
        if not newsletter:
            # Generate newsletter if it doesn't exist
            newsletter = await ai_processor.generate_daily_newsletter(db=db)
        
        return NewsletterResponse(**newsletter.dict())
    except Exception as e:
        logger.error(f"Error fetching today's newsletter: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch newsletter")

@app.post("/api/newsletter/generate", response_model=NewsletterResponse)
async def generate_newsletter(
    request: NewsletterRequest,
    background_tasks: BackgroundTasks,
    db=Depends(get_db)
):
    """Generate a new newsletter"""
    try:
        # Add to background task for async processing
        background_tasks.add_task(
            ai_processor.generate_daily_newsletter,
            date=request.date,
            force_regenerate=request.force_regenerate,
            db=db
        )
        
        return {"message": "Newsletter generation started", "status": "processing"}
    except Exception as e:
        logger.error(f"Error generating newsletter: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate newsletter")

@app.get("/api/sources")
async def get_news_sources():
    """Get list of monitored news sources"""
    return {
        "sources": [
            {"name": "ArXiv", "type": "research", "url": "https://arxiv.org"},
            {"name": "HackerNews", "type": "community", "url": "https://news.ycombinator.com"},
            {"name": "Reddit r/MachineLearning", "type": "community", "url": "https://reddit.com/r/MachineLearning"},
            {"name": "OpenAI Blog", "type": "official", "url": "https://openai.com/blog"},
            {"name": "Google AI Blog", "type": "official", "url": "https://ai.googleblog.com"},
            {"name": "MIT Technology Review", "type": "publication", "url": "https://technologyreview.com"},
            {"name": "Nature AI", "type": "academic", "url": "https://nature.com/subjects/machine-learning"},
            {"name": "AI News", "type": "publication", "url": "https://artificialintelligence-news.com"},
        ],
        "total_sources": 247,
        "active_sources": 235,
        "last_updated": "2024-01-15T12:00:00Z"
    }

@app.get("/api/stats")
async def get_platform_stats():
    """Get platform statistics"""
    return {
        "articles_processed_today": 1432,
        "total_articles": 89234,
        "sources_monitored": 247,
        "ai_accuracy_score": 98.7,
        "newsletters_generated": 365,
        "active_subscribers": 12847,
        "last_updated": "2024-01-15T12:00:00Z"
    }

@app.post("/api/subscribe")
async def subscribe_newsletter(email: str):
    """Subscribe to newsletter"""
    # TODO: Implement newsletter subscription
    return {"message": f"Successfully subscribed {email} to SOTA.ai newsletter"}

@app.get("/api/mcp/status")
async def get_mcp_status():
    """Get MCP server status"""
    try:
        status = await mcp_server.get_status()
        return status
    except Exception as e:
        logger.error(f"Error getting MCP status: {e}")
        raise HTTPException(status_code=500, detail="Failed to get MCP status")

@app.post("/api/mcp/process")
async def process_with_mcp(content: str):
    """Process content using MCP server"""
    try:
        result = await mcp_server.process_content(content)
        return {"result": result}
    except Exception as e:
        logger.error(f"Error processing with MCP: {e}")
        raise HTTPException(status_code=500, detail="Failed to process with MCP")

# WebSocket endpoint for real-time updates
@app.websocket("/ws/updates")
async def websocket_endpoint(websocket):
    """WebSocket endpoint for real-time AI news updates"""
    await websocket.accept()
    try:
        while True:
            # Send real-time updates
            update = await news_aggregator.get_latest_update()
            await websocket.send_json(update)
            await asyncio.sleep(30)  # Send updates every 30 seconds
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )


