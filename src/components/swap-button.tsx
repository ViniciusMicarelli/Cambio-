'use client';
import { motion } from 'framer-motion';
import { ArrowDownUp } from 'lucide-react';
import { Button } from './ui/button';

interface SwapButtonProps {
  onClick: () => void;
}

export function SwapButton({ onClick }: SwapButtonProps) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          className="rounded-full w-10 h-10 bg-card border-2 border-border/80 shadow-md group"
          aria-label="Inverter moedas"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              type: 'spring',
              stiffness: 180,
              damping: 20,
              repeat: Infinity,
              repeatDelay: 5,
              duration: 2
            }}
          >
            <ArrowDownUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}
