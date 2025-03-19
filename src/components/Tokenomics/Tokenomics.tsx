import React from 'react';
import { motion } from 'framer-motion';
import { ResourcePieChart, ResourceData } from '../../components/ui/resource-pie-chart';
import { Server, HardDrive, Database, PieChart, ExternalLink, Globe, Shield, Cpu, Layers } from 'lucide-react';

interface ResourceAllocation {
  label: string;
  value: string;
  percentage?: number;
  color?: string;
}

interface EcosystemCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link?: string;
}

const Tokenomics: React.FC = () => {
  const resourceAllocationData: ResourceAllocation[] = [
    { label: 'Total Computing Power:', value: '1,000,000 TFLOPS' },
    { label: 'Public Compute Pool:', value: '50%', percentage: 50, color: '#5468ff' },
    { label: 'Research & Development:', value: '20%', percentage: 20, color: '#6c63ff' },
    { label: 'Community Projects:', value: '15%', percentage: 15, color: '#8b5cf6' },
    { label: 'Partners & Collaborators:', value: '10%', percentage: 10, color: '#f43f5e' },
    { label: 'Reserve Capacity:', value: '5%', percentage: 5, color: '#06b6d4' },
  ];

  // Format data for the ResourcePieChart component
  const pieChartData: ResourceData[] = [
    { 
      name: 'Public Compute Pool', 
      value: 50, 
      icon: <Server className="h-4 w-4 text-[#5468ff]" />, 
      color: '#5468ff' 
    },
    { 
      name: 'Research & Development', 
      value: 20, 
      icon: <HardDrive className="h-4 w-4 text-[#6c63ff]" />, 
      color: '#6c63ff' 
    },
    { 
      name: 'Community Projects', 
      value: 15, 
      icon: <Database className="h-4 w-4 text-[#8b5cf6]" />, 
      color: '#8b5cf6' 
    },
    { 
      name: 'Partners & Collaborators', 
      value: 10, 
      icon: <Database className="h-4 w-4 text-[#f43f5e]" />, 
      color: '#f43f5e' 
    },
    { 
      name: 'Reserve Capacity', 
      value: 5, 
      icon: <PieChart className="h-4 w-4 text-[#06b6d4]" />, 
      color: '#06b6d4' 
    },
  ];

  const ecosystemCards: EcosystemCard[] = [
    {
      title: 'Global Computing',
      description: 'Access AI computing resources in 190+ countries with unified performance',
      icon: <Globe className="h-6 w-6" />,
      color: 'from-indigo-500 to-blue-500',
      link: '#'
    },
    {
      title: 'Developer Tools',
      description: 'Comprehensive SDKs and APIs for building on the AIIGo platform',
      icon: <Cpu className="h-6 w-6" />,
      color: 'from-rose-500 to-pink-500',
      link: '#'
    },
    {
      title: 'Growth Program',
      description: 'Turn your devices into powerful AI computing hubs with rewards',
      icon: <Layers className="h-6 w-6" />,
      color: 'from-amber-500 to-orange-500',
      link: '#'
    },
    {
      title: 'Enterprise Security',
      description: 'Military-grade encryption for all computing tasks in the network',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-emerald-500 to-green-500',
      link: '#'
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
            AIIGo Ecosystem
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-white/60 mt-4 max-w-2xl mx-auto text-lg"
        >
          A comprehensive network of AI computing resources, tools, and services built for sustainability
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {ecosystemCards.map((card, index) => (
          <motion.a
            key={index}
            href={card.link}
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
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-white/0 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
            
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} bg-opacity-10 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
              {card.icon}
            </div>
            
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors duration-300">
              {card.title}
            </h3>
            
            <p className="text-white/70 mb-4">
              {card.description}
            </p>
            
            <div className="flex items-center text-white/50 group-hover:text-primary transition-colors duration-300">
              <span className="text-sm">Learn more</span>
              <ExternalLink className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </motion.a>
        ))}
      </motion.div>

      <motion.div 
        className="mt-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 glass-card p-8 md:p-10 rounded-2xl border border-white/5">
          <div className="flex-1 min-w-[300px]">
            <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Resource Allocation</h3>
            <p className="text-white/70 mb-6">
              Our computing resource allocation is designed to provide accessible AI computing power 
              while ensuring long-term sustainability and growth. The computing capacity is distributed 
              to maximize availability for all users.
            </p>
            
            <ul className="space-y-3 border-t border-white/10 pt-5">
              {resourceAllocationData.map((stat, index) => (
                <motion.li 
                  key={index} 
                  className="flex justify-between items-center py-2 border-b border-white/10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="font-medium text-white/80">{stat.label}</span>
                  <span className="font-bold text-primary">{stat.value}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 min-w-[300px] mt-6 lg:mt-0">
            <ResourcePieChart 
              data={pieChartData} 
              title="Computing Resource Distribution"
              description="Optimized for sustainability and growth"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-16 md:mt-20 text-center"
      >
        <motion.div 
          className="inline-flex items-center justify-center px-6 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="mr-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Join the AIIGo ecosystem today
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tokenomics; 