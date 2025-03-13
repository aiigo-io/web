import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface PerformanceMetric {
  name: string;
  AIIGo: number;
  Traditional: number;
}

const Technology: React.FC = () => {
  const benefitsData: Benefit[] = [
    {
      icon: '⚡',
      title: 'Energy Efficient',
      description: 'Optimized algorithms that use minimal resources compared to traditional AI systems'
    },
    {
      icon: '🔒',
      title: 'Highly Secure',
      description: 'Advanced encryption protects your models and data'
    },
    {
      icon: '⚙️',
      title: 'Scalable',
      description: 'Handles millions of operations per second across distributed systems'
    }
  ];

  // Performance comparison data
  const performanceData: PerformanceMetric[] = [
    { name: 'Processing Speed', AIIGo: 95, Traditional: 60 },
    { name: 'Cost Efficiency', AIIGo: 90, Traditional: 45 },
    { name: 'Energy Usage', AIIGo: 30, Traditional: 80 },
    { name: 'Scalability', AIIGo: 98, Traditional: 50 },
  ];

  return (
    <section id="technology" className="bg-[#030303] py-20">
      <div className="container">
        <div className="section-title">
          <h2>Our Technology</h2>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="flex-1 min-w-[300px] pr-0 lg:pr-10 mb-10 lg:mb-0">
            <h3 className="text-2xl font-bold mb-4">Next-Generation AI Infrastructure</h3>
            <p className="mb-4 text-white/70">
              AIIGo is built on a cutting-edge distributed computing architecture designed for optimal performance, 
              security, and energy efficiency. Our innovative resource allocation system maximizes computing power
              while minimizing energy consumption.
            </p>
            <p className="mb-8 text-white/70">
              The platform supports various AI and machine learning frameworks, distributed computing, and seamless integration 
              with existing cloud systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {benefitsData.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center text-xl mb-3 shadow-md shadow-black/20">
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-white">{benefit.title}</h4>
                  <p className="text-white/60 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-w-[300px]">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1365&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="AI Computing Technology" 
                className="max-w-full rounded-lg shadow-xl shadow-black/20 border border-[#111]"
              />
            </div>

            <div className="mt-8 bg-[#0a0a0a] p-5 rounded-2xl shadow-md shadow-black/30">
              <h4 className="text-xl font-bold mb-4 text-white text-center">Performance Comparison</h4>
              <div className="w-full h-[250px] bg-[#111] rounded-lg overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'white', fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ value: 'Performance Score', angle: -90, position: 'insideLeft', fill: 'white', fontSize: 12 }}
                      tick={{ fill: 'white', fontSize: 12 }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        borderColor: '#333',
                        borderRadius: '8px', 
                        color: 'white' 
                      }}
                    />
                    <Legend wrapperStyle={{ color: 'white', fontSize: '12px' }} />
                    <Bar dataKey="AIIGo" fill="#5468ff" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Traditional" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-white/60 text-xs mt-3 text-center">
                Lower score for Energy Usage indicates better efficiency (less energy consumed)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology; 