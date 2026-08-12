import { useScroll, useTransform, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 65%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef} id="experiences">
      <div className="flex flex-col items-start gap-2 mb-8">
        <span className="text-xs uppercase tracking-widest text-lavender font-semibold">Career Journey</span>
        <h2 className="text-heading">My Work Experience</h2>
      </div>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-24 md:gap-10"
          >
            <div className="sticky z-30 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute flex items-center justify-center size-9 rounded-full -left-[14px] bg-midnight border border-lavender/40 shadow-[0_0_10px_rgba(122,87,219,0.5)]">
                <div className="size-3 rounded-full bg-lavender animate-pulse" />
              </div>
              <div className="flex-col hidden gap-1.5 md:flex md:pl-16 text-neutral-300">
                <span className="text-xs font-semibold uppercase tracking-wider text-lavender px-3 py-1 rounded-full bg-royal/20 border border-lavender/20 w-fit">
                  {item.date}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{item.title}</h3>
                <h4 className="text-base font-medium text-neutral-400">{item.job}</h4>
              </div>
            </div>

            <div className="relative w-full pl-16 pr-4 md:pl-4">
              <div className="block mb-4 text-left md:hidden">
                <span className="text-xs font-semibold uppercase tracking-wider text-lavender px-2.5 py-0.5 rounded-full bg-royal/20 border border-lavender/20">
                  {item.date}
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                <h4 className="text-sm font-medium text-neutral-400">{item.job}</h4>
              </div>
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors backdrop-blur-sm shadow-xl">
                {item.contents.map((content, idx) => (
                  <p className="mb-2.5 last:mb-0 font-normal text-sm sm:text-base text-neutral-300 leading-relaxed" key={idx}>
                    {content}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
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

