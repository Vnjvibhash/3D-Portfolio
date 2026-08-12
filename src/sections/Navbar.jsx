import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experiences", href: "#experiences" },
  { name: "Contact", href: "#contact" },
];

function Navigation({ activeSection, onLinkClick }) {
  return (
    <ul className="nav-ul">
      {navLinks.map((link) => {
        const id = link.href.replace("#", "") || "home";
        const isActive = activeSection === id;
        return (
          <li key={link.name} className="relative nav-li">
            <a
              className={`nav-link relative z-10 transition-colors duration-200 ${
                isActive ? "text-white font-medium" : "text-neutral-400 hover:text-white"
              }`}
              href={link.href}
              onClick={() => onLinkClick && onLinkClick(id)}
            >
              {link.name}
            </a>
            {isActive && (
              <motion.span
                layoutId="activeNavPill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 z-0 rounded-full bg-white/10 border border-white/15 shadow-[0_0_12px_rgba(122,87,219,0.25)]"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["about", "projects", "experiences", "contact"];
      let current = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/75 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40 py-1"
          : "bg-transparent py-2"
      }`}
    >
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-1">
          <a
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white group"
          >
            <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="transition-colors group-hover:text-lavender">
              Viveka Jee
            </span>
            <span className="hidden md:inline-block text-[11px] font-normal uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full ml-1">
              Available for hire
            </span>
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="flex p-1.5 rounded-lg cursor-pointer text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation activeSection={activeSection} />
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="block overflow-hidden text-center sm:hidden bg-primary/95 backdrop-blur-2xl border-b border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="py-4">
              <Navigation
                activeSection={activeSection}
                onLinkClick={() => setIsOpen(false)}
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

