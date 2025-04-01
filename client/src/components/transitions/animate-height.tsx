'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimateHeightProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
  className?: string;
}
export default function AnimateHeight({
  children,
  isVisible,
  className,
  duration = 0.3,
}: AnimateHeightProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ height: 'auto' }}
          className={className}
          exit={{ height: 0, overflow: 'hidden' }}
          initial={{ height: 0, overflow: 'hidden' }}
          transition={{ duration, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
