'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimateSlots({
  firstSlot,
  secondSlot,
  isFirstSlotVisible,
}: {
  firstSlot: React.ReactNode;
  secondSlot: React.ReactNode;
  isFirstSlotVisible: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {isFirstSlotVisible ? (
        <motion.div
          key="first-slot"
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {firstSlot}
        </motion.div>
      ) : (
        <motion.div
          key="second-slot"
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {secondSlot}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
