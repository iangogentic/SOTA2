'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl">
      <div className="relative">
        {/* Rotating rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
          style={{ width: 120, height: 120 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          style={{ width: 100, height: 100, top: 10, left: 10 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/40"
          style={{ width: 80, height: 80, top: 20, left: 20 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Central brain icon */}
        <motion.div
          className="relative flex items-center justify-center w-[120px] h-[120px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain className="h-12 w-12 text-primary" />
        </motion.div>
        
        {/* Loading text */}
        <motion.p
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground whitespace-nowrap"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Processing AI Intelligence...
        </motion.p>
      </div>
    </div>
  );
}


