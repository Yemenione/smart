"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LangSwitcher from "./LangSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const getLinks = (t: any) => [
  { name: t.nav.services, path: "/services" },
  { name: t.nav.work, path: "/work" },
  { name: t.nav.agency, path: "/agency" },
  { name: t.nav.team, path: "/team" },
  { name: t.nav.insights, path: "/insights" },
  { name: t.nav.careers, path: "/careers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const links = getLinks(t);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-3 md:py-4" : "bg-transparent py-5 md:py-8"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-white z-[60] relative hoverable min-w-fit"
          onClick={() => setMenuOpen(false)}
        >
          DEULEUX<span className="text-white/40">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-0 gap-x-4 lg:gap-x-8 flex-nowrap whitespace-nowrap">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.path);
            const isFr = t.nav.services === "Services" && t.nav.work === "Réalisations"; // Quick check
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`font-body uppercase transition-colors duration-300 hoverable ${isFr ? "text-[13px] tracking-tight" : "text-sm tracking-widest"} ${isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA / Mobile Menu Toggle */}
        <div className="flex items-center space-x-6 z-[60] relative">
          <div className="hidden md:block">
            <LangSwitcher />
          </div>

          <Link
            href="/contact"
            className="hidden md:block px-6 py-2 rounded-full border border-white/20 text-white text-sm font-body tracking-wider uppercase hover:bg-white hover:text-black transition-colors duration-300 hoverable"
          >
            {t.nav.startProject}
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-white hoverable p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center p-4"
          >
            <nav className="flex flex-col items-center text-center space-y-8 mt-16">
              {links.map((link) => {
                const isActive = pathname.startsWith(link.path);
                return (
                  <motion.div key={link.name} variants={linkVariants}>
                    <Link
                      href={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-4 px-4 sm:px-8 font-heading text-3xl sm:text-4xl md:text-5xl uppercase tracking-widest transition-colors duration-300 break-words max-w-full ${isActive ? "text-white font-bold" : "text-white/50"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div variants={linkVariants} className="pt-8">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-4 rounded-full border border-white/20 text-white text-sm font-body tracking-wider uppercase bg-white/5"
                >
                  {t.nav.startProject}
                </Link>
              </motion.div>

              <motion.div variants={linkVariants} className="pt-4 pb-4">
                <LangSwitcher />
              </motion.div>
            </nav>

            {/* Mobile Menu Footer Info */}
            <motion.div
              variants={linkVariants}
              className="absolute bottom-12 text-center"
            >
              <p className="text-white/30 text-xs font-body tracking-widest uppercase">
                {t.footer.rights}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
