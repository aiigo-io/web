import React from 'react';

interface ResourceAllocation {
  label: string;
  value: string;
}

const Tokenomics: React.FC = () => {
  const resourceAllocationData: ResourceAllocation[] = [
    { label: 'Total Computing Power:', value: '1,000,000 TFLOPS' },
    { label: 'Public Compute Pool:', value: '50%' },
    { label: 'Research & Development:', value: '20%' },
    { label: 'Community Projects:', value: '15%' },
    { label: 'Partners & Collaborators:', value: '10%' },
    { label: 'Reserve Capacity:', value: '5%' }
  ];

  return (
    <section id="tokenomics" className="bg-[#030303] py-20">
      <div className="container">
        <div className="section-title">
          <h2>Resource Allocation</h2>
        </div>
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex-1 min-w-[300px] bg-[#0a0a0a] p-5 rounded-2xl shadow-md shadow-black/30">
            <div className="w-full h-[300px] bg-[#111] rounded-lg flex items-center justify-center text-white/40">
              [Resource Distribution Chart]
            </div>
          </div>
          
          <div className="flex-1 min-w-[300px]">
            <h3 className="text-2xl font-bold mb-4">AIIGo Computing Resource Distribution</h3>
            <p className="text-white/70 mb-5">
              Our computing resource allocation is designed to provide accessible AI computing power 
              while ensuring long-term sustainability and growth. The computing capacity is distributed 
              to maximize availability for all users.
            </p>
            
            <ul className="space-y-3 border-t border-gray-700/50 pt-5">
              {resourceAllocationData.map((stat, index) => (
                <li key={index} className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span className="font-medium text-white/80">{stat.label}</span>
                  <span className="font-bold text-primary">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics; 