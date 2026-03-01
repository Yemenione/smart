"use client";

import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Footer from "@/components/Footer";
import { motion, useSpring } from "framer-motion";
import AnimatedDivider from "@/components/AnimatedDivider";
import { useLanguage } from "@/context/LanguageContext";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useRef, useEffect, useState } from "react";
import ScrollRevealText from "@/components/ScrollRevealText";

// Internal Component for the moving colored blobs
const ChromaticBlob = ({ color, delay, scale, left, top }: { color: string, delay: number, scale: number, left: string, top: string }) => {
  return (
    <motion.div
      className="absolute rounded-full mix-blend-screen filter blur-[80px] opacity-40 will-change-transform"
      style={{
        backgroundColor: color,
        width: `${scale * 10}rem`,
        height: `${scale * 10}rem`,
        left,
        top,
        transform: 'translateZ(0)' // Hardware acceleration
      }}
      animate={{
        x: [0, 80, -40, 0],
        y: [0, -60, 40, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: 15 + delay * 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay
      }}
    />
  );
};

export default function Home() {
  const { t } = useLanguage();
  const gridRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Subtle spring physics for coordinates
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    // Only apply spring movement if mouse is moving
    springX.set((mousePosition.x - window.innerWidth / 2) * 0.03);
    springY.set((mousePosition.y - window.innerHeight / 2) * 0.03);
  }, [mousePosition, springX, springY]);

  // Update CSS variables for the mouse position in the grid
  useEffect(() => {
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      gridRef.current.style.setProperty("--x", `${x}px`);
      gridRef.current.style.setProperty("--y", `${y}px`);
    }
  }, [mousePosition]);

  const tileClasses = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 overflow-hidden relative group transition-colors duration-500 hover:border-white/50";

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 px-4 md:px-8 bg-[#020202]">

        {/* Deep background ambient glow */}
        <div className="absolute top-[-20%] w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)] md:auto-rows-[250px]"
        >
          {/* Global Mouse Glow Blob */}
          <div className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 md:opacity-100 group-hover:opacity-100 z-[1] bg-[radial-gradient(500px_circle_at_var(--x)_var(--y),_rgba(255,255,255,0.08),transparent_80%)]" />

          {/* 1. Top-Left: Our Core (1x2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`md:col-span-1 md:row-span-2 flex flex-col justify-between ${tileClasses}`}
          >
            {/* Chromatic Blobs */}
            {isMounted && (
              <>
                <ChromaticBlob color="#0047FF" delay={0} scale={1.5} left="-20%" top="-10%" />
                <ChromaticBlob color="#9400D3" delay={2} scale={1.2} left="30%" top="40%" />
              </>
            )}

            <div className="text-xs font-mono text-white/50 tracking-widest uppercase relative z-10">
              {t.hero.bentoCore}
            </div>
            <div className="mt-8 flex-grow flex items-center justify-center relative w-full px-2 z-10">
              <div className="text-[clamp(1.5rem,10vw,3.5rem)] sm:text-5xl md:text-5xl lg:text-5xl font-bold tracking-tighter text-white transition-all duration-500 group-hover:text-glow group-hover:scale-105 text-center leading-none">
                DEULEUX.
              </div>
            </div>
          </motion.div>

          {/* 2. Top-Center: The Mantra (2x1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`md:col-span-2 md:row-span-1 flex flex-col justify-center ${tileClasses}`}
          >
            {isMounted && (
              <>
                <ChromaticBlob color="#9400D3" delay={1} scale={2} left="10%" top="-20%" />
                <ChromaticBlob color="#00C957" delay={3} scale={1.8} left="40%" top="10%" />
              </>
            )}

            <div className="text-xs font-mono text-white/50 tracking-widest uppercase mb-4 relative z-10">
              {t.hero.bentoMantra}
            </div>
            <div className="font-heading text-3xl sm:text-4xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.1] tracking-tighter text-white relative z-10">
              <span className="text-glow drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {t.hero.titleLine1}
              </span>
              <br />
              <span className="mt-2 block">{t.hero.titleLine2}</span>
            </div>
          </motion.div>

          {/* 3. Center-Right: Global Hub (1x2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`md:col-span-1 md:row-span-2 md:col-start-4 md:row-start-1 flex flex-col justify-between ${tileClasses}`}
          >
            {isMounted && (
              <>
                <ChromaticBlob color="#0047FF" delay={2} scale={1.5} left="10%" top="40%" />
                <ChromaticBlob color="#00C957" delay={1} scale={1} left="-10%" top="-10%" />
              </>
            )}

            <div className="text-xs font-mono text-white/50 tracking-widest uppercase relative z-10">
              {t.hero.bentoHub}
            </div>
            <div className="flex-grow flex flex-col items-center justify-center font-mono text-neutral-300 relative h-full w-full z-10">
              {/* Coordinate Grid Background */}
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"
                style={{ x: springX, y: springY }}
              />
              <motion.div style={{ x: springX, y: springY }} className="z-10 text-center space-y-2 pointer-events-none">
                <div className="text-xl tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-pulse">{t.hero.bentoParis}</div>
                <div className="text-sm text-white/60">48.8566° N</div>
                <div className="text-sm text-white/60">2.3522° E</div>
              </motion.div>
            </div>
          </motion.div>

          {/* 4. Bottom-Center: The Philosophy (2x1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`md:col-span-2 md:row-span-1 md:col-start-2 md:row-start-2 flex flex-col justify-center ${tileClasses}`}
          >
            {isMounted && (
              <>
                <ChromaticBlob color="#00C957" delay={0} scale={2.5} left="-10%" top="20%" />
                <ChromaticBlob color="#0047FF" delay={4} scale={2} left="50%" top="-10%" />
              </>
            )}

            <div className="text-xs font-mono text-white/50 tracking-widest uppercase mb-4 relative z-10">
              {t.hero.bentoPhilosophy}
            </div>
            <div className="text-lg md:text-xl lg:text-2xl font-body leading-relaxed relative z-10">
              <ScrollRevealText text={t.hero.subtitle} />
            </div>
          </motion.div>

          {/* 5. Bottom-Left: CTA 2 (1x1 mapped to 2x1 for symmetry) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-3 flex items-center justify-center cursor-pointer ${tileClasses}`}
          >
            {isMounted && (
              <ChromaticBlob color="#9400D3" delay={1} scale={1.5} left="30%" top="0%" />
            )}
            <button className="relative z-10 font-mono tracking-widest uppercase text-sm text-white/80 group-hover:text-white group-hover:text-glow transition-all duration-300">
              {t.hero.ctaSecondary}
            </button>
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 rounded-[2rem] transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_30px_rgba(255,255,255,0.1)] z-10 pointer-events-none" />
          </motion.div>

          {/* 6. Bottom-Right: CTA 1 (1x1 mapped to 2x1 for symmetry) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-3 bg-white text-black rounded-[2rem] p-8 overflow-hidden relative group flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-500 shadow-[0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
            style={{ touchAction: 'none' }} // Ensure nice magnetic feel if we add framer motion drag
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="font-mono tracking-widest uppercase text-sm font-bold flex items-center gap-3 relative z-10"
            >
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              {t.hero.ctaPrimary}
            </motion.div>
          </motion.div>
        </div>
      </main>
      <AnimatedDivider />
      <Services />
      <AnimatedDivider />
      <Work />
      <AnimatedDivider />
      <Footer />
    </>
  );
}
