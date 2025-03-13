import React from 'react';
import { ResourcePieChart, ResourceData } from '../../components/ui/resource-pie-chart';
import { Server, HardDrive, Database, PieChart, Users } from 'lucide-react';

interface ResourceAllocation {
  label: string;
  value: string;
  percentage?: number;
  color?: string;
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
      icon: <Users className="h-4 w-4 text-[#8b5cf6]" />, 
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

  return (
    <section id="tokenomics" className="bg-[#030303] py-20">
      <div className="container">
        <div className="section-title">
          <h2>Resource Allocation</h2>
        </div>
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex-1 min-w-[300px]">
            <ResourcePieChart 
              data={pieChartData} 
              title="AIIGo Computing Resource Distribution"
              description="Optimized capacity allocation for all users"
            />
          </div>
          
          <div className="flex-1 min-w-[300px]">
            <h3 className="text-2xl font-bold mb-4">Sustainable AI Computing</h3>
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