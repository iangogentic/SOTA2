'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, TrendingUp, AlertCircle, Sparkles, Zap, Brain } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { InteractiveCard } from './interactive-card';
import Tilt from 'react-parallax-tilt';

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

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
}

export function NewsCard({ article, index = 0 }: NewsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />;
      case 'medium':
        return <TrendingUp className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const getImportanceGradient = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'from-red-500/20 to-red-600/10';
      case 'medium':
        return 'from-yellow-500/20 to-yellow-600/10';
      default:
        return 'from-blue-500/20 to-blue-600/10';
    }
  };

  const getImportanceBorder = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.48, 0.15, 0.25, 0.96]
      }}
    >
      <Tilt
        tiltMaxAngleX={2}
        tiltMaxAngleY={2}
        glareEnable={false}
        scale={1.01}
        transitionSpeed={2000}
      >
        <InteractiveCard className="h-full">
          <div className={`border-l-4 ${getImportanceBorder(article.importance)} rounded-r-lg h-full`}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    >
                      {getImportanceIcon(article.importance)}
                    </motion.div>
                    <Badge 
                      variant="outline" 
                      className="text-xs glass-morphism border-primary/20"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {article.source}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
                    </span>
                  </div>
                  <CardTitle className="text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {article.title}
                    </motion.span>
                  </CardTitle>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 hover:bg-primary/10 rounded-full"
                    onClick={() => window.open(article.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className={`absolute inset-0 bg-gradient-to-br ${getImportanceGradient(article.importance)} opacity-20 rounded-lg pointer-events-none`} />
              
              <CardDescription className="text-base leading-relaxed mb-4 relative">
                {article.summary}
              </CardDescription>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {article.tags.map((tag, i) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="text-xs px-3 py-1 glass-morphism border-primary/10 hover:border-primary/30 transition-all cursor-pointer"
                        >
                          <Brain className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {article.importance === 'high' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
                      <Zap className="h-3 w-3 mr-1" />
                      Breaking
                    </Badge>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </div>
        </InteractiveCard>
      </Tilt>
    </motion.div>
  );
}
