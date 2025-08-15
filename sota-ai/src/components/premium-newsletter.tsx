'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Sparkles, Mail, Users, Shield } from 'lucide-react';

export function PremiumNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const features = [
    { icon: Mail, text: "Daily AI intelligence digest" },
    { icon: Users, text: "Join 12,847+ professionals" },
    { icon: Shield, text: "Privacy-first, unsubscribe anytime" },
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            Premium Intelligence
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            Never miss what matters
          </h2>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Get the day's most important AI developments delivered to your inbox. 
            Curated by experts, powered by intelligence.
          </p>

          <Card className="p-8 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all"
                  />
                </div>
                <Button
                  onClick={handleSubscribe}
                  disabled={!email || isSubscribed}
                  className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium rounded-lg transition-all group disabled:opacity-50"
                >
                  {isSubscribed ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <feature.icon className="h-4 w-4 text-neutral-500" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <p className="mt-6 text-sm text-neutral-500">
            Free forever • No spam • Unsubscribe with one click
          </p>
        </motion.div>
      </div>
    </section>
  );
}

