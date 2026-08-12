import { mySocials } from "../constants";

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
              className="flex items-center justify-center size-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-lavender/40 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              <img src={social.icon} className="size-4 opacity-80 hover:opacity-100 transition-opacity" alt={social.name} />
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
