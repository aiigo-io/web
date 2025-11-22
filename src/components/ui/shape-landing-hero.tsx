import { motion, useMotionValue, useTransform, animate, useAnimationFrame } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "../../lib/utils";
import { GradientButton } from './gradient-button';
import React, { useEffect, useRef, useState } from "react";

// Create a 3D globe effect component inspired by weroam.xyz
function Globe3D() {
    // Generate random points on a sphere with dispersed arrangement
    const points = Array.from({ length: 50 }).map((_, i) => {
        // Random spherical coordinates for dispersed distribution
        const phi = Math.acos(Math.random() * 2 - 1); // Uniform distribution on sphere surface
        const theta = Math.random() * 2 * Math.PI;

        return {
            phi: (phi * 180) / Math.PI,
            theta: (theta * 180) / Math.PI,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 5,
            opacity: Math.random() * 0.5 + 0.5
        };
    });

    const [hovered, setHovered] = useState(false);
    const rotateY = useMotionValue(0);

    useAnimationFrame((t, delta) => {
        const current = rotateY.get();
        // Normal speed: 0.02 deg/ms (approx 20s per rotation)
        // Hover speed: 0.1 deg/ms (approx 4s per rotation)
        const speed = hovered ? 0.1 : 0.02;
        rotateY.set(current + speed * delta);
    });

    return (
        <div
            className="relative w-full h-full flex items-center justify-center mt-12 md:mt-0 cursor-pointer"
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                className="relative w-[300px] h-[300px] transform-style-3d md:scale-125"
                style={{
                    transformStyle: "preserve-3d",
                    rotateY: rotateY,
                    rotateZ: 10
                }}
            >
                {/* Core glow */}
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-3xl"></div>
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-3xl" style={{ transform: "rotate3d(1, 1, 1, 45deg)" }}></div>
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-3xl" style={{ transform: "rotate3d(1, 1, 1, 135deg)" }}></div>
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-3xl" style={{ transform: "rotate3d(1, 1, 1, 225deg)" }}></div>
                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-3xl" style={{ transform: "rotate3d(1, 1, 1, 315deg)" }}></div>

                {/* Inner sphere gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/10 to-rose-500/10 opacity-50"></div>

                {/* Meridians (Vertical lines) */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={`meridian-${i}`}
                        className="absolute inset-0 rounded-full border border-indigo-500/20"
                        style={{
                            transform: `rotateY(${i * 22.5}deg)`,
                            transformStyle: "preserve-3d"
                        }}
                    ></div>
                ))}

                {/* Parallels (Horizontal lines) - Proper latitude rings */}
                {Array.from({ length: 9 }).map((_, i) => {
                    // Calculate latitude rings
                    // i goes from 0 to 8. Center is 4.
                    // Angle from -80 to +80 degrees approx
                    const angle = -80 + (i * 20);
                    const rad = (angle * Math.PI) / 180;
                    const radius = 150 * Math.cos(rad); // 150 is half of 300px width
                    const y = 150 * Math.sin(rad);

                    return (
                        <div
                            key={`parallel-${i}`}
                            className="absolute rounded-full border border-indigo-500/20"
                            style={{
                                width: radius * 2,
                                height: radius * 2,
                                left: "50%",
                                top: "50%",
                                marginLeft: -radius,
                                marginTop: -radius,
                                transform: `translateY(${y}px) rotateX(90deg)`,
                                transformStyle: "preserve-3d"
                            }}
                        ></div>
                    );
                })}

                {/* Dots (Compute Clusters) */}
                {points.map((point, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: point.size,
                            height: point.size,
                            left: "50%",
                            top: "50%",
                            marginLeft: -point.size / 2,
                            marginTop: -point.size / 2,
                            transform: `rotateY(${point.theta}deg) rotateX(${point.phi}deg) translateZ(150px)`,
                            transformStyle: "preserve-3d", // Enable 3D for children
                        }}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: point.delay
                        }}
                    >
                        {/* Plane 1 (XY) */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                backgroundColor: i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#ec4899" : "#ffffff",
                                boxShadow: `0 0 ${point.size * 2}px ${i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#ec4899" : "#ffffff"}`,
                            }}
                        />
                        {/* Plane 2 (YZ) - Rotated 90deg Y */}
                        <div
                            className="absolute inset-0 rounded-full"
                            style={{
                                transform: "rotateY(90deg)",
                                backgroundColor: i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#ec4899" : "#ffffff",
                                boxShadow: `0 0 ${point.size * 2}px ${i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#ec4899" : "#ffffff"}`,
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>
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
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
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
        <div className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] pt-32 md:pt-40">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/web3-hero.png"
                    alt="Web3 Background"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/60 to-[#030303]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] opacity-70" />
            </div>

            {/* Dynamic animated background overlay */}
            <div className="absolute inset-0 animated-gradient opacity-30 mix-blend-overlay" />

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