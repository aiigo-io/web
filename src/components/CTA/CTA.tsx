import React from 'react';
import { motion } from 'framer-motion';
import { GradientButton } from '../ui/gradient-button';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <div className="container">
      <motion.div 
        className="glass-card relative overflow-hidden p-8 md:p-12 lg:p-16 rounded-3xl border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        {/* Background blurred gradient */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-indigo-500/20 via-primary/10 to-transparent blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-500/20 via-secondary/10 to-transparent blur-3xl -z-10"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Start Your AI Computing Journey Today</h2>
            <p className="text-base md:text-lg text-white/70 mb-0">
              Join thousands of users already leveraging AIIGo's computing power. 
              Our platform makes AI computing accessible to everyone.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
            <GradientButton className="px-8 py-3 text-base">
              <div className="flex items-center justify-center">
                <span>Get Started</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </GradientButton>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border border-white/10 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/5 rounded-full opacity-10"></div>
      </motion.div>
    </div>
  );
};

export default CTA; 