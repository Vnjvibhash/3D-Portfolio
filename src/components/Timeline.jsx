import { useScroll, useTransform, motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

const experienceSkills = {
  0: ["React Native", "Flutter", "Node.js", "Firebase", "MongoDB", "Express.js", "Figma"],
  1: ["Axis Bank Compliance", "RCA Analysis", "Quality Auditing", "Team Leadership", "NPS Growth"],
  2: ["Android (Java)", "RESTful APIs", "XML Layouts", "Code Refactoring", "Debugging"],
  3: ["Java", "Payment Gateways (Razorpay, Paytm)", "JavaScript", "HTML/CSS", "Git"],
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, activeFilter, expandedIndex]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 65%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const filteredData = useMemo(() => {
    return data.map((item, originalIndex) => ({ ...item, originalIndex })).filter((item) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "dev") {
        return item.title.toLowerCase().includes("developer") || item.job.toLowerCase().includes("developer");
      }
      if (activeFilter === "banking") {
        return item.title.toLowerCase().includes("bank") || item.job.toLowerCase().includes("services");
      }
      return true;
    });
  }, [data, activeFilter]);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="c-space section-spacing" ref={containerRef} id="experiences">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs uppercase tracking-widest text-lavender font-semibold">Career Journey</span>
          <h2 className="text-heading">My Work Experience</h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-md">
          A proven track record in software engineering, mobile app delivery, and enterprise banking operations.
        </p>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {[
          { id: "all", label: "All Career Roles" },
          { id: "dev", label: "Software & Mobile Development" },
          { id: "banking", label: "Banking & Operations" },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`relative px-4 py-2 text-xs md:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? "text-white shadow-lg shadow-lavender/25 glow-pill"
                  : "text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeTimelinePill"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-royal to-lavender border border-white/20"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div ref={ref} className="relative pb-20">
        <AnimatePresence mode="popLayout">
          {filteredData.map((item, index) => {
            const skills = experienceSkills[item.originalIndex] || [];
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start pt-8 md:pt-16 md:gap-10"
              >
                {/* Milestone Node */}
                <div className="sticky z-30 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
                  <div className="absolute flex items-center justify-center size-9 rounded-full -left-[14px] bg-midnight border border-lavender/40 shadow-[0_0_12px_rgba(122,87,219,0.6)]">
                    <div className="size-3 rounded-full bg-lavender animate-pulse" />
                  </div>
                  <div className="flex-col hidden gap-1.5 md:flex md:pl-16 text-neutral-300">
                    <span className="text-xs font-semibold uppercase tracking-wider text-lavender px-3 py-1 rounded-full bg-royal/20 border border-lavender/20 w-fit">
                      {item.date}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">{item.title}</h3>
                    <h4 className="text-sm font-medium text-neutral-400">{item.job}</h4>
                  </div>
                </div>

                {/* Experience Card */}
                <div className="relative w-full pl-16 pr-4 md:pl-4">
                  <div className="block mb-4 text-left md:hidden">
                    <span className="text-xs font-semibold uppercase tracking-wider text-lavender px-2.5 py-0.5 rounded-full bg-royal/20 border border-lavender/20">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                    <h4 className="text-sm font-medium text-neutral-400">{item.job}</h4>
                  </div>

                  <div className="group p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-lavender/40 transition-all duration-300 backdrop-blur-sm shadow-xl hover:-translate-y-1">
                    {/* Key Skill Badges */}
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4 pb-3 border-b border-white/10">
                        {skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 text-[11px] font-semibold text-lavender bg-royal/15 border border-lavender/25 rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Accomplishments */}
                    <div className="space-y-2.5">
                      {(isExpanded ? item.contents : item.contents.slice(0, 3)).map((content, idx) => (
                        <p
                          className="font-normal text-sm sm:text-base text-neutral-300 leading-relaxed flex items-start gap-2"
                          key={idx}
                        >
                          <span className="text-emerald-400 mt-1 shrink-0">▸</span>
                          <span>{content.replace(/^✅\s*/, "")}</span>
                        </p>
                      ))}
                    </div>

                    {/* Expand/Collapse Toggle if more than 3 items */}
                    {item.contents.length > 3 && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-lavender hover:text-white transition-colors cursor-pointer"
                      >
                        {isExpanded ? "Show Less ↑" : `Show All Accomplishments (${item.contents.length}) ↓`}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Laser Progress Beam */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-[3px] top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-700 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-royal via-lavender to-aqua rounded-full shadow-[0_0_12px_rgba(122,87,219,0.8)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;

