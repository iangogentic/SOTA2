"""
News aggregation system for SOTA.ai
Monitors multiple sources for AI-related content
"""
import asyncio
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
import httpx
import feedparser
from bs4 import BeautifulSoup

logger = logging.getLogger(__name__)

class NewsAggregator:
    """Aggregates AI news from multiple sources"""
    
    def __init__(self):
        self.sources = {
            "hackernews": {
                "url": "https://hacker-news.firebaseio.com/v0",
                "type": "api",
                "keywords": ["AI", "artificial intelligence", "machine learning", "deep learning"]
            },
            "reddit_ml": {
                "url": "https://www.reddit.com/r/MachineLearning/.json",
                "type": "api",
                "keywords": []
            },
            "arxiv": {
                "url": "http://export.arxiv.org/api/query",
                "type": "api", 
                "keywords": ["artificial intelligence", "machine learning"]
            },
            "openai_blog": {
                "url": "https://openai.com/blog/rss.xml",
                "type": "rss",
                "keywords": []
            },
            "google_ai": {
                "url": "https://ai.googleblog.com/feeds/posts/default",
                "type": "rss",
                "keywords": []
            },
            "mit_tech_review": {
                "url": "https://www.technologyreview.com/topic/artificial-intelligence/",
                "type": "web_scraping",
                "keywords": ["AI", "artificial intelligence"]
            }
        }
        self.client = httpx.AsyncClient(timeout=30.0)
    
    async def get_latest_articles(
        self, 
        limit: int = 20, 
        importance_filter: Optional[str] = None,
        db=None
    ) -> List[Dict[str, Any]]:
        """Get latest AI articles from all sources"""
        try:
            # Mock articles for demonstration
            mock_articles = [
                {
                    "id": "1",
                    "title": "OpenAI Announces GPT-5 with Revolutionary Multimodal Capabilities",
                    "summary": "The latest iteration promises unprecedented understanding across text, image, audio, and video modalities.",
                    "url": "https://openai.com/blog/gpt-5-announcement",
                    "source": "OpenAI Blog",
                    "published_at": (datetime.now() - timedelta(hours=2)).isoformat(),
                    "tags": ["OpenAI", "GPT-5", "Multimodal", "LLM"],
                    "importance": "high",
                    "ai_score": 0.95
                },
                {
                    "id": "2", 
                    "title": "Google DeepMind Achieves Breakthrough in Protein Folding Prediction",
                    "summary": "AlphaFold 3 demonstrates 99.9% accuracy in predicting protein structures.",
                    "url": "https://deepmind.com/blog/alphafold-3",
                    "source": "DeepMind",
                    "published_at": (datetime.now() - timedelta(hours=5)).isoformat(),
                    "tags": ["Google", "DeepMind", "AlphaFold", "Protein Folding"],
                    "importance": "high",
                    "ai_score": 0.92
                },
                {
                    "id": "3",
                    "title": "Meta Releases Llama 3: Open Source Model Rivals GPT-4",
                    "summary": "The new open-source language model shows competitive performance with proprietary models.",
                    "url": "https://ai.meta.com/blog/llama-3-release",
                    "source": "Meta AI",
                    "published_at": (datetime.now() - timedelta(hours=8)).isoformat(),
                    "tags": ["Meta", "Llama 3", "Open Source", "LLM"],
                    "importance": "medium",
                    "ai_score": 0.88
                }
            ]
            
            # Filter by importance if specified
            if importance_filter:
                mock_articles = [a for a in mock_articles if a["importance"] == importance_filter]
            
            return mock_articles[:limit]
            
        except Exception as e:
            logger.error(f"Error fetching articles: {e}")
            return []
    
    async def fetch_hackernews_ai(self) -> List[Dict[str, Any]]:
        """Fetch AI-related stories from HackerNews"""
        try:
            # Get top stories
            response = await self.client.get(f"{self.sources['hackernews']['url']}/topstories.json")
            story_ids = response.json()[:100]  # Top 100 stories
            
            articles = []
            for story_id in story_ids[:20]:  # Process first 20
                story_response = await self.client.get(f"{self.sources['hackernews']['url']}/item/{story_id}.json")
                story = story_response.json()
                
                if story and self._is_ai_related(story.get('title', '')):
                    articles.append({
                        "id": f"hn_{story_id}",
                        "title": story.get('title'),
                        "url": story.get('url'),
                        "source": "HackerNews",
                        "published_at": datetime.fromtimestamp(story.get('time', 0)).isoformat(),
                        "score": story.get('score', 0)
                    })
            
            return articles
            
        except Exception as e:
            logger.error(f"Error fetching HackerNews: {e}")
            return []
    
    async def fetch_reddit_ml(self) -> List[Dict[str, Any]]:
        """Fetch posts from Reddit r/MachineLearning"""
        try:
            headers = {"User-Agent": "SOTA.ai/1.0"}
            response = await self.client.get(self.sources['reddit_ml']['url'], headers=headers)
            data = response.json()
            
            articles = []
            for post in data.get('data', {}).get('children', []):
                post_data = post.get('data', {})
                articles.append({
                    "id": f"reddit_{post_data.get('id')}",
                    "title": post_data.get('title'),
                    "url": post_data.get('url'),
                    "source": "Reddit r/MachineLearning",
                    "published_at": datetime.fromtimestamp(post_data.get('created_utc', 0)).isoformat(),
                    "score": post_data.get('score', 0),
                    "summary": post_data.get('selftext', '')[:200] + "..." if post_data.get('selftext') else ""
                })
            
            return articles[:20]
            
        except Exception as e:
            logger.error(f"Error fetching Reddit: {e}")
            return []
    
    async def fetch_arxiv_papers(self) -> List[Dict[str, Any]]:
        """Fetch recent AI papers from ArXiv"""
        try:
            query = "cat:cs.AI OR cat:cs.LG OR cat:cs.CL"
            url = f"{self.sources['arxiv']['url']}?search_query={query}&start=0&max_results=20&sortBy=submittedDate&sortOrder=descending"
            
            response = await self.client.get(url)
            feed = feedparser.parse(response.text)
            
            articles = []
            for entry in feed.entries:
                articles.append({
                    "id": f"arxiv_{entry.id.split('/')[-1]}",
                    "title": entry.title,
                    "url": entry.id,
                    "source": "ArXiv",
                    "published_at": entry.published,
                    "summary": entry.summary[:300] + "...",
                    "authors": [author.name for author in entry.authors]
                })
            
            return articles
            
        except Exception as e:
            logger.error(f"Error fetching ArXiv: {e}")
            return []
    
    async def fetch_rss_feed(self, source_name: str) -> List[Dict[str, Any]]:
        """Fetch articles from RSS feed"""
        try:
            source = self.sources.get(source_name)
            if not source or source['type'] != 'rss':
                return []
            
            response = await self.client.get(source['url'])
            feed = feedparser.parse(response.text)
            
            articles = []
            for entry in feed.entries:
                articles.append({
                    "id": f"{source_name}_{hash(entry.link)}",
                    "title": entry.title,
                    "url": entry.link,
                    "source": source_name.replace('_', ' ').title(),
                    "published_at": entry.published,
                    "summary": getattr(entry, 'summary', '')[:300] + "..."
                })
            
            return articles[:10]
            
        except Exception as e:
            logger.error(f"Error fetching RSS feed {source_name}: {e}")
            return []
    
    async def get_latest_update(self) -> Dict[str, Any]:
        """Get latest update for WebSocket streaming"""
        # Mock real-time update
        return {
            "type": "article_update",
            "timestamp": datetime.now().isoformat(),
            "data": {
                "new_articles": 3,
                "trending_topics": ["GPT-5", "AlphaFold 3", "Llama 3"],
                "breaking_news": "OpenAI announces major breakthrough in multimodal AI"
            }
        }
    
    def _is_ai_related(self, text: str) -> bool:
        """Check if text is AI-related"""
        ai_keywords = [
            'ai', 'artificial intelligence', 'machine learning', 'ml',
            'deep learning', 'neural network', 'gpt', 'llm', 'nlp',
            'computer vision', 'robotics', 'chatbot', 'openai',
            'google ai', 'deepmind', 'anthropic', 'claude'
        ]
        
        text_lower = text.lower()
        return any(keyword in text_lower for keyword in ai_keywords)
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()


