import { motion, useScroll, useSpring } from "motion/react";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-aqua via-lavender to-fuchsia origin-left z-50 shadow-[0_0_8px_rgba(122,87,219,0.6)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
