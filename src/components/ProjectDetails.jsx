import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-4 overflow-hidden bg-black/70 backdrop-blur-md"
        onClick={closeModal}
      >
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto border shadow-2xl rounded-2xl bg-gradient-to-b from-navy to-midnight border-white/20"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute z-10 p-2 rounded-full top-4 right-4 bg-midnight/80 hover:bg-white/20 border border-white/15 text-white transition-colors cursor-pointer shadow-lg"
          >
            <img src="assets/close.svg" className="w-5 h-5" alt="close" />
          </button>
          <div className="relative overflow-hidden rounded-t-2xl">
            <img
              src={image}
              alt={title}
              className="w-full object-cover max-h-72 transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="p-6 sm:p-8">
            <h3 className="mb-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {title}
            </h3>
            <p className="mb-4 text-base font-normal text-neutral-300 leading-relaxed">
              {description}
            </p>
            <div className="space-y-2 mb-6 bg-white/[0.03] p-4 rounded-xl border border-white/5">
              <p className="text-xs uppercase tracking-wider text-lavender font-semibold mb-2">
                Key Highlights
              </p>
              {subDescription.map((subDesc, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="text-lavender mt-0.5">•</span>
                  <span>{subDesc}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-neutral-300"
                  >
                    {tag.path && <img src={tag.path} alt={tag.name} className="size-3.5" />}
                    {tag.name}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <a
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-royal to-lavender hover:from-lavender hover:to-royal text-white shadow-lg shadow-lavender/25 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Project <img src="assets/arrow-up.svg" className="size-4" alt="arrow" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetails;

