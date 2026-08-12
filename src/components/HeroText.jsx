import { FlipWords } from './FlipWords';
import { motion } from 'motion/react';

const HeroText = () => {
  const words = [
    'Secure',
    'Next-Gen',
    'Enterprise-grade',
    'Future-ready',
    'Scalable',
    'Intelligent',
    'Optimized',
    'High-impact',
    'Cloud-powered',
    'Performance-driven',
    'User-centric',
    'AI-enabled',
    'Resilient',
    'Disruptive',
    'Seamless',
    'Transformative',
    'Innovation-driven',
    'Adaptive',
  ];
  const variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="z-10 mt-24 text-center md:mt-40 md:text-left rounded-3xl">
      {/* Desktop View */}
      <div className="flex-col hidden md:flex c-space">
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-lavender bg-royal/20 border border-lavender/30 rounded-full backdrop-blur-md glow-pill">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            Software Developer &amp; Architect
          </span>
        </motion.div>
        <motion.h1
          className="text-4xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I&apos;m Vivek
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p
            className="text-5xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            A Developer <br /> Dedicated to Creating
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-black text-white text-8xl"
            />
          </motion.div>
          <motion.p
            className="text-4xl font-medium text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Backend &amp; Mobile Applications
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 2.0 }}
            className="flex items-center gap-4 mt-8"
          >
            <a
              href="#projects"
              className="px-6 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-royal via-lavender to-royal bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-lg shadow-lavender/25 hover:shadow-lavender/40 hover:-translate-y-0.5 cursor-pointer shimmer-btn"
            >
              Explore My Work →
            </a>
            <a
              href="#contact"
              className="px-6 py-3 text-sm font-semibold text-neutral-300 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              Let&apos;s Connect
            </a>
          </motion.div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="flex flex-col space-y-6 md:hidden px-4">
        <motion.p
          className="text-3xl font-medium"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I&apos;m VivekaJee
        </motion.p>
        <div>
          <motion.p
            className="text-4xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.2 }}
          >
            Building
          </motion.p>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <FlipWords
              words={words}
              className="font-bold text-white text-6xl"
            />
          </motion.div>
          <motion.p
            className="text-3xl font-black text-neutral-300"
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.8 }}
          >
            Backend &amp; Mobile Applications
          </motion.p>
        </div>
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 2.0 }}
          className="flex justify-center gap-3 pt-2"
        >
          <a
            href="#projects"
            className="px-5 py-2.5 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-royal to-lavender shadow-md shadow-lavender/30"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 text-xs font-semibold text-neutral-300 rounded-full bg-white/10 border border-white/15"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroText;
