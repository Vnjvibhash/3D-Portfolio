import { twMerge } from "tailwind-merge";
import Marquee from "../components/Marquee";
import { reviews } from "../constants";
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={twMerge(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-2xl border p-5 border-white/10 bg-gradient-to-br from-indigo/80 to-storm/80 hover:from-royal/80 hover:to-lavender/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-lavender/10 backdrop-blur-sm group"
      )}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex flex-row items-center gap-3">
          <img
            className="rounded-full size-9 bg-white/10 ring-2 ring-lavender/30 group-hover:ring-lavender transition-all"
            width="36"
            height="36"
            alt={name}
            src={img}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm font-semibold text-white group-hover:text-lavender transition-colors">
              {name}
            </figcaption>
            <p className="text-xs font-medium text-neutral-400">{username}</p>
          </div>
        </div>
        <div className="flex text-amber-400 text-xs">
          {"★".repeat(5)}
        </div>
      </div>
      <blockquote className="text-sm text-neutral-300 group-hover:text-white transition-colors leading-relaxed">
        &ldquo;{body}&rdquo;
      </blockquote>
    </figure>
  );
};

export default function Testimonial() {
  return (
    <div className="flex flex-col items-start mt-24 md:mt-36 c-space">
      <div className="flex flex-col items-start gap-2">
        <span className="text-xs uppercase tracking-widest text-lavender font-semibold">Testimonials</span>
        <h2 className="text-heading">Hear From My Clients</h2>
      </div>
      <div className="relative flex flex-col items-center justify-center w-full mt-10 overflow-hidden">
        <Marquee pauseOnHover className="[--duration:28s] py-2">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:28s] py-2">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none bg-gradient-to-r from-primary"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 pointer-events-none bg-gradient-to-l from-primary"></div>
      </div>
    </div>
  );
}
