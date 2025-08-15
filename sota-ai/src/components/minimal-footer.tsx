'use client';

import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

export function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'About', href: '#' },
    { name: 'Archive', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <span className="text-white dark:text-black font-bold">S</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">SOTA.ai</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">State of the Art AI News</p>
                </div>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
                The definitive source for artificial intelligence developments. 
                Intelligence you can trust, delivered daily.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-neutral-500">
            <p>© {currentYear} SOTA.ai. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">
              Built with precision and care for the AI community
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

