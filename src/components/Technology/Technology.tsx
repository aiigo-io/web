import React from 'react';

interface Benefit {
  icon: string;
  title: string;
  description: string;
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
          
          <div className="flex-1 min-w-[300px] text-center">
            <img 
              src="https://via.placeholder.com/500x400" 
              alt="AI Computing Technology" 
              className="max-w-full rounded-lg shadow-xl shadow-black/20 border border-[#111]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology; 