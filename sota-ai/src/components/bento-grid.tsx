'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap, Globe, Brain, Clock, Users } from 'lucide-react';

export function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Intelligence at Scale
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Our AI-powered platform processes thousands of sources to deliver the most relevant insights
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]"
        >
          {/* Large feature card */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-2">
            <Card className="h-full p-8 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border-neutral-200 dark:border-neutral-700">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <Brain className="h-12 w-12 text-neutral-900 dark:text-white mb-4" />
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    Neural Processing
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Advanced AI algorithms analyze and rank thousands of articles daily, 
                    ensuring you only see what truly matters in the AI landscape.
                  </p>
                </div>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm text-neutral-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Processing live data
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full p-6 border-neutral-200 dark:border-neutral-700">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-neutral-900 dark:text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">98.7%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Accuracy Rate</div>
              </div>
            </Card>
          </motion.div>

          {/* Sources card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full p-6 border-neutral-200 dark:border-neutral-700">
              <div className="text-center">
                <Globe className="h-8 w-8 text-neutral-900 dark:text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">247</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Sources</div>
              </div>
            </Card>
          </motion.div>

          {/* Real-time card */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Card className="h-full p-6 bg-black dark:bg-white border-neutral-800 dark:border-neutral-200">
              <div className="flex items-center justify-between h-full">
                <div>
                  <Clock className="h-8 w-8 text-white dark:text-black mb-3" />
                  <h3 className="text-xl font-bold text-white dark:text-black mb-2">
                    Real-time Intelligence
                  </h3>
                  <p className="text-neutral-300 dark:text-neutral-700 text-sm">
                    24/7 monitoring with instant alerts
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white dark:text-black">24/7</div>
                  <Badge variant="secondary" className="mt-2 bg-neutral-800 dark:bg-neutral-200">
                    <Zap className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

