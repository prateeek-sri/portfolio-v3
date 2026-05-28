"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    setKey(pathname);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Top Sweep Progress Indicator on Mount/Page Change */}
        <motion.div
          key={`progress-${key}`}
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            scaleX: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
            opacity: { delay: 0.6, duration: 0.2 }
          }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-highlight origin-left z-[300] pointer-events-none"
        />
      </AnimatePresence>

      <motion.div
        key={key}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.75, 
          ease: [0.16, 1, 0.3, 1] // Luxurious custom ease-out-expo curve
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
