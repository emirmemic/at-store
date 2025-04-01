'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimateAppearanceProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
  className?: string;
}
export default function AnimateAppearance({
  children,
  isVisible,
  className,
  duration = 0.3,
}: AnimateAppearanceProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="animate-appearance"
          layout
          animate={{ opacity: 1, scale: 1, height: 'auto' }}
          className={className}
          exit={{ opacity: 0, scale: 0.95, height: 0 }}
          initial={{ opacity: 0, scale: 0.95, height: 0 }}
          style={{ overflow: 'hidden' }}
          transition={{ duration, ease: 'linear' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
