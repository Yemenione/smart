"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
    {
        id: 1,
        question: "What is your anticipated budget?",
        options: ["$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k+"]
    },
    {
        id: 2,
        question: "What is your desired timeline?",
        options: ["1-2 Months", "3-4 Months", "6+ Months", "Ongoing Partner"]
    },
    {
        id: 3,
        question: "What is the primary tech stack?",
        options: ["Next.js / React", "Laravel", "Shopify Headless", "Undecided"]
    }
];

export default function Estimator() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isComplete, setIsComplete] = useState(false);

    const handleSelect = (option: string) => {
        setAnswers({ ...answers, [currentStep]: option });

        // Auto-advance after short delay for premium feel
        setTimeout(() => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(curr => curr + 1);
            } else {
                setIsComplete(true);
            }
        }, 400);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

            <AnimatePresence mode="wait">
                {!isComplete ? (
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col relative z-10"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-heading text-xs tracking-widest uppercase text-white/50">
                                Step 0{currentStep + 1} / 0{steps.length}
                            </span>
                            <div className="flex gap-2">
                                {steps.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-[2px] w-8 transition-colors duration-500 ${idx <= currentStep ? 'bg-white' : 'bg-white/10'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <h3 className="font-body text-3xl md:text-4xl text-white mb-12">
                            {steps[currentStep].question}
                        </h3>

                        <div className="flex flex-col gap-4">
                            {steps[currentStep].options.map((option, idx) => {
                                const isSelected = answers[currentStep] === option;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(option)}
                                        className={`group relative w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${isSelected
                                                ? 'border-white bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                                : 'border-white/10 hover:border-white/40 hover:bg-white/[0.02]'
                                            }`}
                                    >
                                        <span className={`font-body text-lg transition-colors duration-300 ${isSelected ? 'text-white text-glow' : 'text-white/70 group-hover:text-white'}`}>
                                            {option}
                                        </span>
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300 ${isSelected ? 'border-white' : 'border-white/20 group-hover:border-white/50'}`}>
                                            <AnimatePresence>
                                                {isSelected && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        exit={{ scale: 0 }}
                                                        className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center justify-center text-center py-12 relative z-10"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="font-heading text-4xl text-white mb-4 text-glow">
                            SCOPE CAPTURED.
                        </h3>
                        <p className="font-body text-white/50 mb-10 max-w-sm mx-auto">
                            Based on your incredibly ambitious parameters, we are ready to architect the future. Our partners will be in touch.
                        </p>
                        <button className="group relative px-8 py-4 bg-white text-black font-medium text-sm rounded-full overflow-hidden">
                            <span className="relative z-10">PROCEED TO CONTACT</span>
                            <div className="absolute inset-0 bg-neutral-200 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
