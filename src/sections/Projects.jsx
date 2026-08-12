import { useState } from "react";
import Project from "../components/Project";
import { myProjects } from "../constants";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "flutter", label: "Flutter & Mobile" },
  { id: "web", label: "Web & Full Stack" },
  { id: "backend", label: "Backend & APIs" },
  { id: "android", label: "Android Native" },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [preview, setPreview] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 80 });
  const springY = useSpring(y, { damping: 15, stiffness: 80 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 24);
    y.set(e.clientY + 24);
  };

  const filteredProjects = myProjects.filter((project) => {
    if (activeCategory === "all") return true;
    const tagNames = project.tags.map((t) => t.name.toLowerCase());
    if (activeCategory === "flutter") {
      return tagNames.some((t) => t.includes("flutter") || t.includes("dart"));
    }
    if (activeCategory === "web") {
      return tagNames.some((t) => t.includes("react") || t.includes("html") || t.includes("bootstrap"));
    }
    if (activeCategory === "backend") {
      return tagNames.some((t) => t.includes("node") || t.includes("express") || t.includes("mongodb") || t.includes("jwt"));
    }
    if (activeCategory === "android") {
      return tagNames.some((t) => t.includes("kotlin") || t.includes("android") || t.includes("java"));
    }
    return true;
  });

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative c-space section-spacing"
      id="projects"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs uppercase tracking-widest text-lavender font-semibold">Featured Work</span>
          <h2 className="text-heading">My Selected Projects</h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-md">
          A showcase of cross-platform apps, full-stack systems, and robust backend architectures.
        </p>
      </div>

      {/* Interactive Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mt-8 mb-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "text-white shadow-lg shadow-lavender/25 glow-pill"
                  : "text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeProjectPill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-royal to-lavender border border-white/20"
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mt-4 h-[1px] w-full" />

      <motion.div layout className="divide-y divide-neutral-800">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <Project {...project} setPreview={setPreview} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {preview && (
        <motion.div
          className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="overflow-hidden rounded-xl border border-white/20 bg-midnight/90 p-1.5 shadow-2xl shadow-lavender/20 backdrop-blur-md">
            <img
              className="h-56 w-80 object-cover rounded-lg"
              src={preview}
              alt="Project preview"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;

