'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedAt: Date;
  tags: string[];
  importance: 'low' | 'medium' | 'high';
}

interface EditorialCardProps {
  article: NewsArticle;
  index?: number;
  featured?: boolean;
}

export function EditorialCard({ article, index = 0, featured = false }: EditorialCardProps) {
  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'medium':
        return <TrendingUp className="h-4 w-4 text-amber-600" />;
      default:
        return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group"
      >
        <Card className="border-0 shadow-none bg-transparent p-0 overflow-hidden">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                {getImportanceIcon(article.importance)}
                <span className="font-medium">{article.source}</span>
                <span>•</span>
                <time>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</time>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                onClick={() => window.open(article.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold leading-tight mb-4 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors cursor-pointer">
                {article.title}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                {article.summary}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Card className="border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200 p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              {getImportanceIcon(article.importance)}
              <span className="font-medium">{article.source}</span>
              <span>•</span>
              <time>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</time>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              onClick={() => window.open(article.url, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold leading-tight mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors cursor-pointer">
              {article.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
              {article.summary}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

