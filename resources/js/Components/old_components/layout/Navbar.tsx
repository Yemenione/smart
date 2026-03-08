"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import Magnetic from "@/Components/old_components/ui/Magnetic";
import { Menu, X } from "lucide-react";
import LangSwitcher from "@/Components/old_components/ui/LangSwitcher";
import { Search as SearchIcon } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import SearchOverlay from "./SearchOverlay";

const getLinks = (t: any) => [
  { name: t.nav.home, path: "/" },
  { name: t.nav.store || "Store", path: "/store" },
  { name: t.nav.services, path: "/services" },
  { name: t.nav.work, path: "/work" },
  { name: t.nav.insights, path: "/insights" },
  { name: t.nav.agency, path: "/agency" },
];

export default function Navbar() {
  const { url: pathname } = usePage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { t } = useLanguage();
  const links = getLinks(t);
  const { siteName, logoUrl } = usePage().props as any;

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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#020202]/80 backdrop-blur-xl border-b border-white/5 py-3 md:py-4" : "bg-transparent py-5 md:py-8"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="z-[60] relative hoverable min-w-fit flex items-center"
          onClick={() => setMenuOpen(false)}
        >
          <ApplicationLogo className="h-8 md:h-10 text-white" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-0 gap-x-4 lg:gap-x-8 flex-nowrap whitespace-nowrap">
          {links.map((link, index) => {
            const isActive = pathname.startsWith(link.path);
            const isFr = t.nav.services === "Services" && t.nav.work === "Réalisations"; // Quick check
            return (
              <Link
                key={link.path}
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
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white/50 hover:text-white transition-colors hoverable"
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>
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
                  <motion.div key={link.path} variants={linkVariants}>
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
              <motion.div variants={linkVariants}>
                <Magnetic maxDistance={40} magneticForce={0.2}>
                  <Link
                    href="/contact" // Changed to /contact to match original CTA
                    onClick={() => setMenuOpen(false)} // Changed to match original CTA
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white/5 px-8 py-4 text-sm font-body tracking-wider uppercase text-white border border-white/20 transition-transform hover:scale-105" // Adjusted classes to match original CTA style
                  >
                    {t.nav.startProject} {/* Changed to match original CTA text */}
                  </Link>
                </Magnetic>
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
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
