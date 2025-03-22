'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function DesktopPopup({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 top-nav-height w-full blur-background"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
