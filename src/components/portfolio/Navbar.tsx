import { useState, useEffect, memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const Navbar = memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  // Section links (#about, #services, ...) point at elements that only exist
  // on the homepage. From another route (e.g. /blog) a plain <a href="#services">
  // only changes the hash on the current page, so the click appears dead.
  // Route back to the homepage first — App's ScrollToHash scrolls to the
  // section once it mounts.
  const handleHashClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (location.pathname !== "/") {
        e.preventDefault();
        navigate(href === "#" ? "/" : `/${href}`);
      }
      closeMenu();
    },
    [location.pathname, navigate, closeMenu]
  );

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname !== "/") {
        e.preventDefault();
        navigate("/");
      }
    },
    [location.pathname, navigate]
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-2 sm:py-3" : "py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 font-heading font-bold text-lg sm:text-xl text-foreground tracking-normal">
          <img src="/logo-emblem.png" alt="Hafiz Adil logo" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          Hafiz <span className="text-secondary">Adil</span>
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleHashClick(e, link.href)}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="text-xs font-heading font-semibold uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 relative group tracking-normal"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-emerald transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
          <LanguageSwitcher />
          <Button asChild size="sm" className="rounded-sm px-5 font-heading font-semibold">
            <a href="#contact" onClick={(e) => handleHashClick(e, "#contact")}>Hire Me</a>
          </Button>
        </div>


        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher compact />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-foreground -mr-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>


      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-card mt-2 mx-4 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className="text-sm font-body text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors active:bg-muted"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleHashClick(e, "#contact")}
                className="btn-neon text-sm text-center !px-5 !py-2.5 mt-2"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
