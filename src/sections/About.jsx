import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from '../components/Frameworks';
import SpotlightCard from "../components/SpotlightCard";

const stats = [
  { value: "2+", label: "Years Experience", icon: "⚡" },
  { value: "12+", label: "Production Projects", icon: "🚀" },
  { value: "100%", label: "Remote Collaboration", icon: "🌍" },
  { value: "5.0 ★", label: "Client Satisfaction", icon: "✨" },
];

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <span className="text-xs uppercase tracking-widest text-lavender font-semibold">Get To Know Me</span>
          <h2 className="text-heading">About Me</h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-md">
          Designing and engineering next-generation mobile applications, web platforms, and scalable backends.
        </p>
      </div>

      {/* Interactive Achievement Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 mb-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-lavender/40 transition-all duration-300 shadow-md hover:-translate-y-1"
          >
            <span className="text-xl mb-1 group-hover:scale-125 transition-transform duration-300">
              {stat.icon}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-lavender">
              {stat.value}
            </span>
            <span className="text-xs text-neutral-400 font-medium text-center mt-0.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-6">
        {/* Grid 1: Bio */}
        <SpotlightCard
          className="flex items-end grid-default-color grid-1 glow-card"
          spotlightColor="rgba(122, 87, 219, 0.25)"
        >
          <img
            src="assets/coding-pov.png"
            alt="coding pov"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] opacity-90 transition-transform duration-500 hover:scale-[2.6]"
          />
          <div className="z-10">
            <p className="headtext font-semibold text-white">Hi, I&apos;m Viveka Jee</p>
            <p className="subtext">
              I&apos;m a passionate Software Developer with over 2 years of
              hands-on experience building dynamic, scalable, and user-friendly
              applications. From crafting elegant frontends with Flutter and
              React to developing robust backends using Node.js, Express, and
              Firebase, I specialize in creating end-to-end mobile and web
              solutions that deliver real impact.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo to-transparent" />
        </SpotlightCard>

        {/* Grid 2: Interactive Draggable Cards */}
        <SpotlightCard
          className="grid-default-color grid-2 glow-card"
          spotlightColor="rgba(51, 194, 204, 0.2)"
        >
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full select-none"
          >
            <p className="flex items-end text-5xl font-black text-white/10 tracking-wider">
              CODE IS CRAFT
            </p>

            {/* Backend Skills */}
            <Card
              style={{ rotate: '75deg', top: '30%', left: '20%' }}
              text="Node.js + Express"
              containerRef={grid2Container}
            />

            {/* Development Philosophy */}
            <Card
              style={{ rotate: '-30deg', top: '60%', left: '45%' }}
              text="Agile"
              containerRef={grid2Container}
            />

            {/* Design Concepts */}
            <Card
              style={{ rotate: '90deg', bottom: '30%', left: '70%' }}
              text="Design Patterns"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: '-45deg', top: '55%', left: '0%' }}
              text="Clean Code"
              containerRef={grid2Container}
            />

            {/* Mobile App Dev */}
            <Card
              style={{ rotate: '20deg', top: '10%', left: '38%' }}
              text="Flutter + Firebase"
              containerRef={grid2Container}
            />

            {/* Logos – Technologies You Use */}
            <Card
              style={{ rotate: '30deg', top: '70%', left: '70%' }}
              image="assets/logos/javascript.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: '30deg', top: '5%', left: '70%' }}
              image="assets/logos/android-studio.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: '-45deg', top: '70%', left: '25%' }}
              image="assets/logos/react.svg"
              containerRef={grid2Container}
            />
            <Card
              style={{ rotate: '-45deg', top: '5%', left: '10%' }}
              image="assets/logos/firebase.svg"
              containerRef={grid2Container}
            />
          </div>
        </SpotlightCard>

        {/* Grid 3: Interactive Globe */}
        <SpotlightCard
          className="grid-black-color grid-3 glow-card"
          spotlightColor="rgba(87, 219, 150, 0.2)"
        >
          <div className="z-10 w-[50%]">
            <p className="headtext font-semibold text-white">Time Zone &amp; Remote</p>
            <p className="subtext">
              Based in India, available for flexible time zones. Thanks to remote collaboration, I work seamlessly with clients and engineering teams worldwide 🌍.
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%] cursor-grab active:cursor-grabbing">
            <Globe />
          </figure>
        </SpotlightCard>

        {/* Grid 4: Call to Action */}
        <SpotlightCard
          className="grid-special-color grid-4 glow-card"
          spotlightColor="rgba(255, 255, 255, 0.25)"
        >
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext font-bold text-white px-2">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </SpotlightCard>

        {/* Grid 5: Orbiting Tech Stack */}
        <SpotlightCard
          className="grid-default-color grid-5 glow-card"
          spotlightColor="rgba(202, 47, 140, 0.2)"
        >
          <div className="z-10 w-[50%]">
            <p className="headtext font-semibold text-white">Tech Stack</p>
            <p className="subtext">
              I work with a versatile set of programming languages, frameworks,
              and tools that enable me to craft robust, scalable, and
              high-performance applications for both web and mobile platforms.
              My expertise spans the full development lifecycle — from designing
              intuitive user interfaces to building secure and efficient
              back-end systems.
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default About;
