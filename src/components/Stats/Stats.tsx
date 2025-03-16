import React from 'react';

interface StatItem {
  number: string;
  label: string;
}

const Stats: React.FC = () => {
  const statsData: StatItem[] = [
    { number: '250K+', label: 'Active Users' },
    { number: '1.5M+', label: 'Transactions' },
    { number: '99.9%', label: 'Uptime' },
    { number: '15K+', label: 'Nodes Worldwide' },
  ];

  return (
    <section className="bg-[#040404] py-8 border-t border-b border-[#111]">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center stats-container">
          {statsData.map((stat, index) => (
            <div key={index} className="p-3 md:p-5 bg-[#090909]/50 rounded-xl backdrop-blur-sm">
              <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent block mb-1">{stat.number}</span>
              <span className="text-xs md:text-sm text-white/60 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 