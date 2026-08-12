import { useState, useMemo } from "react";
import Project from "../components/Project";
import ProjectDetails from "../components/ProjectDetails";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [preview, setPreview] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 80 });
  const springY = useSpring(y, { damping: 15, stiffness: 80 });

  const handleMouseMove = (e) => {
    x.set(e.clientX + 24);
    y.set(e.clientY + 24);
  };

  const filteredProjects = useMemo(() => {
    return myProjects.filter((project) => {
      // Category filter
      const tagNames = project.tags.map((t) => t.name.toLowerCase());
      let matchesCategory = true;
      if (activeCategory === "flutter") {
        matchesCategory = tagNames.some((t) => t.includes("flutter") || t.includes("dart"));
      } else if (activeCategory === "web") {
        matchesCategory = tagNames.some((t) => t.includes("react") || t.includes("html") || t.includes("bootstrap"));
      } else if (activeCategory === "backend") {
        matchesCategory = tagNames.some((t) => t.includes("node") || t.includes("express") || t.includes("mongodb") || t.includes("jwt"));
      } else if (activeCategory === "android") {
        matchesCategory = tagNames.some((t) => t.includes("kotlin") || t.includes("android") || t.includes("java"));
      }

      if (!matchesCategory) return false;

      // Search query filter
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(query);
      const matchesDesc = project.description.toLowerCase().includes(query);
      const matchesTags = tagNames.some((t) => t.includes(query));

      return matchesTitle || matchesDesc || matchesTags;
    });
  }, [activeCategory, searchQuery]);

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

      {/* Controls Bar: Category Filter, Search Bar, View Switcher */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mt-8 mb-6">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
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

        {/* Search & View Mode Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Live Search Input */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search tech or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-lavender/50 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder:text-neutral-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center bg-white/5 p-0.5 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              title="Grid View"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "grid"
                  ? "bg-royal text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              title="List View"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "list"
                  ? "bg-royal text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Project Count Status */}
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-4 px-1">
        <span>
          Showing <span className="text-lavender font-semibold">{filteredProjects.length}</span> of {myProjects.length} projects
        </span>
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="text-lavender hover:underline">
            Clear search
          </button>
        )}
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent mb-6 h-[1px] w-full" />

      {/* Grid Mode View */}
      {viewMode === "grid" ? (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-lavender/40 transition-all duration-300 shadow-xl hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Project Image Header */}
                <div
                  className="relative h-48 w-full overflow-hidden bg-midnight cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold text-white bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                    {project.tags[0]?.name || "App"}
                  </span>
                </div>

                {/* Project Body */}
                <div className="flex flex-col flex-1 p-5">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg font-bold text-white group-hover:text-lavender transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-neutral-300 bg-white/5 border border-white/10"
                      >
                        {tag.path && <img src={tag.path} alt={tag.name} className="size-3" />}
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Action Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-lavender hover:text-white flex items-center gap-1 transition-colors"
                    >
                      Details &amp; Tech Specs →
                    </button>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-medium text-neutral-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-all"
                      >
                        Launch ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* List Mode View */
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
      )}

      {/* Floating Cursor Preview for List Mode */}
      {preview && viewMode === "list" && (
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

      {/* Modal Dialog for Grid Mode Clicks */}
      {selectedProject && (
        <ProjectDetails
          title={selectedProject.title}
          description={selectedProject.description}
          subDescription={selectedProject.subDescription}
          image={selectedProject.image}
          tags={selectedProject.tags}
          href={selectedProject.href}
          closeModal={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;

