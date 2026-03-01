"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollRevealTextProps {
    text: string;
    className?: string;
}

const Word = ({
    word,
    i,
    totalWords,
    scrollYProgress
}: {
    word: string;
    i: number;
    totalWords: number;
    scrollYProgress: MotionValue<number>;
}) => {
    const start = i / totalWords;
    const end = start + (1 / totalWords);

    const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
    const color = useTransform(scrollYProgress, [start, end], ["rgba(255,255,255,0.1)", "rgba(255,255,255,1)"]);

    return (
        <motion.span
            style={{ opacity, color }}
            className="mr-[0.25em] mb-[0.1em] text-white text-shadow-sm text-glow transition-colors duration-200"
        >
            {word}
        </motion.span>
    );
};

export default function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 50%"],
    });

    const words = useMemo(() => text.split(" "), [text]);

    return (
        <div ref={containerRef} className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => (
                <Word
                    key={`${word}-${i}`}
                    word={word}
                    i={i}
                    totalWords={words.length}
                    scrollYProgress={scrollYProgress}
                />
            ))}
        </div>
    );
}
