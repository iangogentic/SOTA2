# SOTA.ai Backend

State of the Art AI News - FastAPI Backend with MCP Server Integration

## Features

🚀 **FastAPI Backend** - High-performance async API server
🤖 **MCP Server Integration** - Model Context Protocol for AI processing
📰 **News Aggregation** - Multi-source AI news monitoring
🧠 **AI Content Processing** - Intelligent article analysis and newsletter generation
📊 **Real-time Analytics** - WebSocket updates and performance metrics
🗄️ **PostgreSQL Database** - Robust data storage with async support

## Architecture

```
Frontend (Next.js) ↔ Backend (FastAPI) ↔ MCP Server ↔ AI Models
                            ↓
                     PostgreSQL Database
                            ↓
                      Redis Cache/Queue
```

## Quick Start

### Prerequisites

- Python 3.9+
- PostgreSQL
- Redis (optional, for caching)

### Installation

1. **Clone and setup**
   ```bash
   cd sota-backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database setup**
   ```bash
   # Create PostgreSQL database
   createdb sota_db
   
   # The app will auto-create tables on startup
   ```

4. **Run the server**
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Core Endpoints

- `GET /` - API status and information
- `GET /health` - Health check
- `GET /api/articles/latest` - Get latest AI articles
- `GET /api/newsletter/today` - Get today's newsletter
- `POST /api/newsletter/generate` - Generate new newsletter
- `GET /api/sources` - List news sources
- `GET /api/stats` - Platform statistics

### MCP Integration

- `GET /api/mcp/status` - MCP server status
- `POST /api/mcp/process` - Process content with MCP

### Real-time

- `WS /ws/updates` - WebSocket for real-time updates

## MCP Server Integration

The Model Context Protocol (MCP) server provides AI-powered content processing:

### Available Tools

1. **analyze_article** - Comprehensive article analysis
2. **summarize_content** - AI-powered summarization
3. **extract_keywords** - Keyword and tag extraction
4. **rate_importance** - Content importance scoring
5. **generate_newsletter** - Newsletter generation

### Usage Example

```python
# Process content with MCP
result = await mcp_server.process_content(
    content="Article content here...",
    tool="analyze_article"
)
```

## News Sources

The system monitors 247+ AI news sources including:

- **Research**: ArXiv, academic papers
- **Community**: HackerNews, Reddit r/MachineLearning
- **Official**: OpenAI Blog, Google AI Blog, Meta AI
- **Publications**: MIT Tech Review, AI News
- **Academic**: Nature AI, IEEE publications

## Development

### Project Structure

```
sota-backend/
├── main.py              # FastAPI application
├── requirements.txt     # Python dependencies
├── .env.example        # Environment template
├── src/
│   ├── __init__.py
│   ├── config.py       # Configuration settings
│   ├── database.py     # Database models and setup
│   ├── models.py       # Pydantic models
│   ├── mcp_server.py   # MCP server integration
│   ├── news_aggregator.py  # News collection
│   └── ai_processor.py # AI content processing
└── README.md
```

### Adding New Features

1. **New API endpoint**: Add to `main.py`
2. **New data model**: Add to `src/models.py` and `src/database.py`
3. **New MCP tool**: Add to `src/mcp_server.py`
4. **New news source**: Add to `src/news_aggregator.py`

## Deployment

### Production Setup

1. **Environment variables**
   ```bash
   export DATABASE_URL="postgresql://user:pass@host:5432/db"
   export OPENAI_API_KEY="your-api-key"
   export ANTHROPIC_API_KEY="your-api-key"
   export DEBUG=false
   ```

2. **Run with Gunicorn**
   ```bash
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

3. **Docker deployment**
   ```dockerfile
   FROM python:3.11-slim
   COPY . /app
   WORKDIR /app
   RUN pip install -r requirements.txt
   CMD ["python", "main.py"]
   ```

## Monitoring

- **Logs**: Structured logging with timestamps
- **Health checks**: `/health` endpoint
- **Metrics**: Platform statistics at `/api/stats`
- **WebSocket**: Real-time updates for monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

**SOTA.ai** - Bringing you the future of AI news, powered by AI itself.


