import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "../../lib/utils";
import { GradientButton } from './gradient-button';
import React, { useEffect, useRef } from "react";

// Create a 3D globe effect component inspired by weroam.xyz
function Globe3D() {
    const globeRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!globeRef.current) return;
        
        const handleMouseMove = (e: MouseEvent) => {
            if (!globeRef.current) return;
            const { left, top, width, height } = globeRef.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            
            const moveX = (e.clientX - centerX) / 25;
            const moveY = (e.clientY - centerY) / 25;
            
            globeRef.current.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        };
        
        document.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    
    return (
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none mt-12 md:mt-0">
            <div 
                ref={globeRef}
                className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full transform-style-3d transition-transform duration-200 ease-out"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-rose-500/20 opacity-80 blur-xl"></div>
                <div className="absolute inset-0 rounded-full border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0)_60%)]"></div>
                    
                    {/* Grid lines similar to a globe */}
                    <div className="absolute inset-0">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="absolute inset-0 border border-white/5 rounded-full"
                                style={{ 
                                    transform: `rotateX(${i * 15}deg)`, 
                                    transformStyle: "preserve-3d"
                                }}
                            ></div>
                        ))}
                        
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="absolute inset-0 border border-white/5 rounded-full"
                                style={{ 
                                    transform: `rotateY(${i * 15}deg)`, 
                                    transformStyle: "preserve-3d"
                                }}
                            ></div>
                        ))}
                    </div>
                    
                    {/* Animated dots resembling network nodes */}
                    {Array.from({ length: 25 }).map((_, i) => {
                        const size = Math.random() * 4 + 2;
                        const x = Math.random() * 100;
                        const y = Math.random() * 100;
                        const delay = Math.random() * 5;
                        
                        return (
                            <motion.div 
                                key={i}
                                className="absolute rounded-full bg-white/80"
                                style={{ 
                                    width: size, 
                                    height: size,
                                    left: `${x}%`,
                                    top: `${y}%`,
                                }}
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [1, 1.5, 1]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: delay
                                }}
                            ></motion.div>
                        );
                    })}
                </div>
            </div>
            
            {/* Animated connection lines */}
            <div className="absolute inset-0 opacity-30">
                {Array.from({ length: 5 }).map((_, i) => {
                    const startX = Math.random() * 100;
                    const startY = Math.random() * 100;
                    const endX = Math.random() * 100;
                    const endY = Math.random() * 100;
                    
                    return (
                        <motion.div
                            key={i}
                            className="absolute bg-gradient-to-r from-indigo-500/50 to-transparent h-[1px]"
                            style={{
                                left: `${startX}%`,
                                top: `${startY}%`,
                                width: '0%',
                                transform: `rotate(${Math.random() * 360}deg)`,
                                transformOrigin: 'left center',
                            }}
                            animate={{
                                width: ['0%', '30%', '0%'],
                                opacity: [0, 0.8, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        ></motion.div>
                    );
                })}
            </div>
        </div>
    );
}

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute hidden sm:block", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

// Add stats counter component
function StatCounter({ value, label }: { value: number; label: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    const displayValue = useTransform(rounded, val => val.toLocaleString());
    
    useEffect(() => {
        const animation = animate(count, value, { duration: 2.5, ease: "easeOut" });
        return animation.stop;
    }, [count, value]);
    
    return (
        <div className="flex flex-col items-center">
            <motion.div 
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
            >
                {displayValue}
            </motion.div>
            <div className="text-xs sm:text-sm md:text-base uppercase tracking-wider text-white/50 mt-2">
                {label}
            </div>
        </div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology."
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    description?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] pt-16 sm:pt-0">
            {/* Dynamic animated background */}
            <div className="absolute inset-0 animated-gradient opacity-80" />
            
            {/* Radial gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#030303_80%)]" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left column with text */}
                    <div className="max-w-xl">
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mt-8 md:mt-12 mb-6 md:mb-8"
                        >
                            <Circle className="h-2 w-2 fill-rose-500/80" />
                            <span className="text-sm text-white/60 tracking-wide">
                                {badge}
                            </span>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight hero-section">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                    {title1}
                                </span>
                                <br className="sm:block hidden" />
                                <span className="sm:hidden"> </span>
                                <span
                                    className={cn(
                                        "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300"
                                    )}
                                >
                                    {title2}
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-sm sm:text-base md:text-lg text-white/60 mb-8 leading-relaxed font-light tracking-wide">
                                {description}
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
                            <GradientButton className="w-full sm:w-auto text-base py-3" onClick={() => window.location.href = 'https://dex.aiigo.org'}>Get Started</GradientButton>
                            <GradientButton variant="outline" className="w-full sm:w-auto text-base py-3">Learn More</GradientButton>
                        </motion.div>
                        
                        {/* Stats section similar to weroam */}
                        <motion.div
                            custom={4}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="mt-12 glass-card p-6 hidden sm:block"
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <StatCounter value={2488107} label="REGISTERED USERS" />
                                <StatCounter value={2914771} label="GROWTH" />
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Right column with 3D globe */}
                    <motion.div 
                        variants={fadeUpVariants}
                        custom={2}
                        initial="hidden"
                        animate="visible"
                        className="hidden md:block"
                    >
                        <Globe3D />
                    </motion.div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric } 