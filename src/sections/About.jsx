import { useRef } from "react";
import Card from "../components/Card";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from '../components/Frameworks';

const About = () => {
  const grid2Container = useRef();
  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I&apos;m Viveka Jee</p>
            <p className="subtext">
              I&apos;m a passionate Software Developer with over 2 years of
              hands-on experience building dynamic, scalable, and user-friendly
              applications. From crafting elegant frontends with Flutter and
              React to developing robust backends using Node.js, Express, and
              Firebase, I specialize in creating end-to-end mobile and web
              solutions that deliver real impact.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full"
          >
            <p className="flex items-end text-5xl text-gray-500">
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
        </div>

        {/* Grid 3 */}
        <div className="grid-black-color grid-3">
          <div className="z-10 w-[50%]">
            <p className="headtext">Time Zone</p>
            <p className="subtext">
              Based on Mars Standard Time. But thanks to remote work, I&apos;m
              available to collaborate with clients and teams across the galaxy
              (Earth included 🌍).
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            <Globe />
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Tech Stack</p>
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
        </div>
      </div>
    </section>
  );
};

export default About;
