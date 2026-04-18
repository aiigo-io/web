import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, PieChart, Rocket, TrendingUp, Users } from 'lucide-react';

interface ProjectCard {
  title: string;
  category: string;
  raised: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Tokenomics: React.FC = () => {
  const projects: ProjectCard[] = [
    {
      title: 'NeuralLink DAO',
      category: 'AI Infrastructure',
      raised: '2,400 ETH',
      description: 'Distributed neural network training layer with automated shard optimization.',
      icon: <PieChart className="h-6 w-6" />,
      color: 'from-indigo-500 to-violet-500'
    },
    {
      title: 'Sentient Protocol',
      category: 'Edge Computing',
      raised: '1,850 ETH',
      description: 'Localized AI inference nodes for privacy-preserving consumer applications.',
      icon: <Rocket className="h-6 w-6" />,
      color: 'from-rose-500 to-pink-500'
    },
    {
      title: 'Visionary AI',
      category: 'Computer Vision',
      raised: '920 ETH',
      description: 'Real-time object detection marketplace for autonomous drone fleets.',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Lumina LLM',
      category: 'Natural Language',
      raised: '3,100 ETH',
      description: 'Open-source large language model governed by compute-contribution weight.',
      icon: <Users className="h-6 w-6" />,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <div className="container py-20">
      <div className="section-title text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            VC Marketplace
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-white/60 mt-4 max-w-2xl mx-auto text-lg"
        >
          The gateway to high-trust Web3 ventures. Stake your idle compute power to gain exclusive early access and investment opportunities in cutting-edge AI projects.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="glass-card p-6 rounded-2xl border border-white/5 transform-3d-hover group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.02,
              borderColor: "rgba(255, 255, 255, 0.2)"
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} bg-opacity-10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                {project.icon}
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block">Total Raised</span>
                <span className="text-sm font-bold text-primary">{project.raised}</span>
              </div>
            </div>
            
            <div className="mb-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10 uppercase tracking-wider">
                {project.category}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex items-center text-white/50 group-hover:text-primary transition-colors duration-300 mt-auto">
              <span className="text-xs font-semibold">View Project Details</span>
              <ExternalLink className="ml-2 h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-16 md:mt-20 text-center"
      >
        <motion.div 
          className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm cursor-pointer"
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="mr-2 w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Explore all projects in the AIIGo VC portal
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tokenomics;
 