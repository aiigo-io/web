import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Gauge, ServerOff, Cpu, GitMerge, LucideIcon } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Technology: React.FC = () => {
  const benefitsData: Benefit[] = [
    {
      icon: <Zap className="h-6 w-6 text-amber-400" />,
      title: 'Energy Efficient',
      description: 'Optimized algorithms that use minimal resources compared to traditional AI systems'
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-400" />,
      title: 'Highly Secure',
      description: 'Advanced encryption protects your models and data'
    },
    {
      icon: <Gauge className="h-6 w-6 text-indigo-400" />,
      title: 'Scalable',
      description: 'Handles millions of operations per second across distributed systems'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container py-20">
      <div className="section-title text-center max-w-3xl mx-auto mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Technology
        </motion.h2>
        <motion.p
          className="text-white/60 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Next-generation AI infrastructure designed for performance and efficiency
        </motion.p>
      </div>

      {/* Main content section with image and description */}
      <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 mb-16 overflow-hidden relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-rose-500/10 rounded-2xl blur-3xl -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">AI Infrastructure Reimagined</h3>
            <p className="mb-6 text-white/70">
              AIIGo is built on a cutting-edge distributed computing architecture designed for optimal performance,
              security, and energy efficiency. Our innovative resource allocation system maximizes computing power
              while minimizing energy consumption.
            </p>

            <div className="relative mb-8 pl-4 border-l-2 border-primary">
              <p className="text-white/70">
                The platform supports various AI and machine learning frameworks, distributed computing, and seamless integration
                with existing cloud systems.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="glass-card px-5 py-3 rounded-lg border border-white/10 flex items-center gap-3 transform-3d-hover">
                <GitMerge className="h-5 w-5 text-indigo-400" />
                <span className="text-sm font-medium">Distributed Processing</span>
              </div>
              <div className="glass-card px-5 py-3 rounded-lg border border-white/10 flex items-center gap-3 transform-3d-hover">
                <ServerOff className="h-5 w-5 text-rose-400" />
                <span className="text-sm font-medium">Low Latency</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-full min-h-[300px]"
          >
            <div className="glass-card overflow-hidden rounded-2xl border border-white/10 shadow-xl h-full flex flex-col">
              <div className="relative flex-grow">
                <img
                  src="/assets/ai-infrastructure.png"
                  alt="AI Computing Server Infrastructure"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="p-5 bg-black/40 backdrop-blur-md border-t border-white/5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">AIIGo Technology Stack</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs text-white/60">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {benefitsData.map((benefit, index) => (
          <motion.div
            key={index}
            className="glass-card p-8 rounded-xl backdrop-blur-sm transform-3d-hover border border-white/10"
            variants={itemVariants}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-6">
              {benefit.icon}
            </div>
            <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
            <p className="text-white/70">{benefit.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Technology; 