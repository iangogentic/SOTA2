'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, Clock, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { WorldClassNavigation } from '@/components/world-class-navigation';
import { WorldClassHero } from '@/components/world-class-hero';
import { EditorialCard } from '@/components/editorial-card';
import { BentoGrid } from '@/components/bento-grid';
import { PremiumNewsletter } from '@/components/premium-newsletter';
import { MinimalFooter } from '@/components/minimal-footer';

// Mock data for demonstration
const mockNews = [
  {
    id: '1',
    title: 'OpenAI Announces GPT-5 with Revolutionary Multimodal Capabilities',
    summary: 'The latest iteration promises unprecedented understanding across text, image, audio, and video modalities, setting new benchmarks in AI reasoning.',
    url: 'https://example.com/gpt5-announcement',
    source: 'OpenAI Blog',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    tags: ['OpenAI', 'GPT-5', 'Multimodal', 'LLM'],
    importance: 'high' as const,
  },
  {
    id: '2',
    title: 'Google DeepMind Achieves Breakthrough in Protein Folding Prediction',
    summary: 'AlphaFold 3 demonstrates 99.9% accuracy in predicting protein structures, potentially revolutionizing drug discovery and biological research.',
    url: 'https://example.com/alphafold3',
    source: 'Nature',
    publishedAt: new Date('2024-01-14T14:30:00Z'),
    tags: ['Google', 'DeepMind', 'AlphaFold', 'Protein Folding', 'Biology'],
    importance: 'high' as const,
  },
  {
    id: '3',
    title: 'Meta Releases Llama 3: Open Source Model Rivals GPT-4',
    summary: 'The new open-source language model shows competitive performance with proprietary models while maintaining full transparency.',
    url: 'https://example.com/llama3-release',
    source: 'Meta AI',
    publishedAt: new Date('2024-01-13T16:45:00Z'),
    tags: ['Meta', 'Llama 3', 'Open Source', 'LLM'],
    importance: 'medium' as const,
  },
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Navigation */}
      <WorldClassNavigation />

      {/* Hero Section */}
      <WorldClassHero />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Featured Story */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Today's Lead</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-12">
            <EditorialCard article={mockNews[0]} featured />
          </div>
        </section>

        {/* Latest Stories Grid */}
        <section>
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Latest Intelligence</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockNews.slice(1).map((article, index) => (
              <EditorialCard key={article.id} article={article} index={index + 1} />
            ))}
          </div>
        </section>

      </main>

      {/* Bento Grid Section */}
      <BentoGrid />

      {/* Newsletter Section */}
      <PremiumNewsletter />

      {/* Footer */}
      <MinimalFooter />
    </div>
  );
}
