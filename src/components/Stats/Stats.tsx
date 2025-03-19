import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

// Animated counter component
const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const formatted = useTransform(rounded, (val) => {
    return prefix + val.toLocaleString() + suffix;
  });
  
  useEffect(() => {
    const animation = animate(count, value, { duration: 2.5, ease: "easeOut" });
    return animation.stop;
  }, [count, value]);
  
  return (
    <motion.span className="text-2xl md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
      {formatted}
    </motion.span>
  );
};

const Stats: React.FC = () => {
  const statsData: StatItem[] = [
    { value: 250000, label: 'ACTIVE USERS', suffix: '+' },
    { value: 1500000, label: 'TRANSACTIONS', suffix: '+' },
    { value: 99.9, label: 'UPTIME', suffix: '%' },
    { value: 15000, label: 'NODES WORLDWIDE', suffix: '+' },
  ];

  return (
    <div className="container">
      <div className="glass-card p-6 md:p-8 lg:p-10 mx-auto max-w-6xl">
        <div className="section-title mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Network Stats</h2>
          <p className="text-white/60 mt-2 max-w-xl mx-auto">
            Explore the global reach of our network and user engagement across the platform.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 stats-container">
          {statsData.map((stat, index) => (
            <motion.div 
              key={index} 
              className="p-5 md:p-6 border border-white/5 bg-white/[0.03] rounded-2xl backdrop-blur-sm flex flex-col items-center transform-3d-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <span className="text-xs md:text-sm text-white/60 uppercase tracking-wider mt-2">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats; 