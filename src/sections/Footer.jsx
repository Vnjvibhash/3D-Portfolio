import { mySocials } from "../constants";

const socialStyles = {
  WhatsApp: "hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_14px_rgba(16,185,129,0.45)]",
  LinkedIn: "hover:bg-sky-500/20 hover:border-sky-500/50 hover:shadow-[0_0_14px_rgba(14,165,233,0.45)]",
  Github: "hover:bg-white/20 hover:border-white/50 hover:shadow-[0_0_14px_rgba(255,255,255,0.35)]",
  Instagram: "hover:bg-fuchsia-500/20 hover:border-fuchsia-500/50 hover:shadow-[0_0_14px_rgba(217,70,239,0.45)]",
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative flex flex-col gap-6 pt-10 pb-8 text-sm text-neutral-400 c-space">
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <span className="hover:text-white transition-colors cursor-pointer">Terms &amp; Conditions</span>
          <span className="text-neutral-600">•</span>
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
        </div>
        <div className="flex items-center gap-3">
          {mySocials.map((social, index) => (
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              aria-label={social.name}
              title={social.name}
              className={`group flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 hover:-translate-y-1.5 transition-all duration-300 shadow-md ${
                socialStyles[social.name] || "hover:bg-white/15 hover:border-lavender/40 hover:shadow-[0_0_12px_rgba(122,87,219,0.4)]"
              }`}
            >
              <img
                src={social.icon}
                className="size-5 opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                alt={social.name}
              />
            </a>
          ))}
        </div>
        <p className="text-xs sm:text-sm text-neutral-500">
          © {currentYear} Viveka Jee. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
