'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

type AnimatedListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
  className?: string;
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export default function AnimatedList<T>({
  items,
  renderItem,
  getKey,
  className,
}: AnimatedListProps<T>) {
  return (
    <motion.ul className={className}>
      <AnimatePresence>
        {items.map((item) => (
          <motion.li
            key={getKey(item)}
            layout
            animate="visible"
            exit="exit"
            initial="hidden"
            style={{ marginBottom: '10px' }}
            transition={{ duration: 0.3 }}
            variants={scaleVariants}
          >
            {renderItem(item)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
