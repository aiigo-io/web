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
    <section className="bg-white py-10 border-t border-b border-gray-200">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="p-5">
              <span className="text-4xl font-extrabold text-primary block mb-1">{stat.number}</span>
              <span className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 