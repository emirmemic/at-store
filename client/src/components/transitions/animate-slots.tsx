'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimateSlotsProps {
  currentSlotKey: string;
  children: React.ReactNode;
  duration?: number;
  className?: string;
}
export default function AnimateSlots({
  currentSlotKey,
  children,
  duration = 0.3,
  className,
}: AnimateSlotsProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlotKey}
        animate={{ opacity: 1, x: 0 }}
        className={className}
        exit={{ opacity: 0, x: 10 }}
        initial={{ opacity: 0, x: 10 }}
        transition={{ duration, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
