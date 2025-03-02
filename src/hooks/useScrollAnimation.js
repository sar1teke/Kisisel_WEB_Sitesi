// src/hooks/useScrollAnimation.js
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold: threshold,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls };
};

// Bu hook, kaydırma animasyonları için kullanılacak.
// Örnek kullanım:
// const { ref, controls } = useScrollAnimation();
// <motion.div ref={ref} animate={controls} variants={yourVariants}>