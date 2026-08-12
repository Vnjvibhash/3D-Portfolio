import { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-7 px-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-white/[0.03] cursor-pointer"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-col gap-2">
          <p className="text-xl sm:text-2xl font-semibold text-white transition-colors duration-200 group-hover:text-lavender">
            {title}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium text-sand bg-sand/10 border border-sand/20"
              >
                {tag.path && <img src={tag.path} alt={tag.name} className="size-3" />}
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-full bg-white/5 group-hover:bg-royal/30 text-neutral-300 group-hover:text-white border border-white/10 group-hover:border-lavender/40 transition-all duration-300 shadow-sm"
          >
            Explore
            <img
              src="assets/arrow-right.svg"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              alt="arrow"
            />
          </button>
        </div>
      </div>
      {isOpen && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Project;

