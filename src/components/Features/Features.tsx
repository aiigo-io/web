import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu, Shield, Zap } from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Features: React.FC = () => {
  const featuresData: FeatureItem[] = [
    {
      title: 'For Providers (Miners)',
      description: 'Turn your idle silicon into native ETH. One-click setup on Desktop for GPUs, CPUs, and high-speed network nodes with 92% direct payouts.',
      icon: <Cpu className="w-6 h-6 text-indigo-400" />
    },
    {
      title: 'For Buyers (startups)',
      description: 'Elite AI compute at 70% lower cost. Automated SLA matching and instant scalability for model training and scientific simulations.',
      icon: <Zap className="w-6 h-6 text-rose-400" />
    },
    {
      title: 'Security & PoW',
      description: 'Verified computational power through cryptographic PoW challenges and secure ETH-based escrow management for guaranteed results.',
      icon: <Shield className="w-6 h-6 text-amber-400" />
    }
  ];

  // Animation variants
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
    <div className="container">
      <div className="section-title text-center max-w-3xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          The Dual-Marketplace Engine
        </motion.h2>
        <motion.p 
          className="text-white/60 mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Connecting the world's idle computational power with the next generation of AI innovation through a transparent, decentralized marketplace.
        </motion.p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mt-12 md:mt-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {featuresData.map((feature, index) => (
          <motion.div 
            key={index} 
            className="glass-card p-6 md:p-8 border border-white/5 rounded-2xl transform-3d-hover"
            variants={itemVariants}
          >
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10">
              {feature.icon}
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">{feature.title}</h3>
            <p className="text-white/70 mb-6">{feature.description}</p>
            <a 
              href="#" 
              className="inline-flex items-center text-primary font-medium hover:underline group"
              role="button"
            >
              <span>Learn More</span> 
              <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features; 