import React from 'react';
import { GradientButton } from '../ui/gradient-button';

interface Platform {
  letter: string;
  name: string;
}

interface NetworkItem {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  variant?: "default" | "variant";
  platforms: Platform[];
}

const Network: React.FC = () => {
  const networkData: NetworkItem[] = [
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Our user-friendly mobile application allows you to manage AI tasks, monitor computing resources, and control your AIIGo workloads from anywhere.',
      buttonText: 'Download App',
      variant: "default",
      platforms: []
    },
    {
      icon: '💻',
      title: 'Desktop Client',
      description: 'Run compute tasks on your computer to contribute processing power to the network and earn rewards for your contribution.',
      buttonText: 'Install Client',
      variant: "variant",
      platforms: [
        { letter: 'W', name: 'Windows' },
        { letter: 'M', name: 'macOS' },
        { letter: 'L', name: 'Linux' }
      ]
    },
    {
      icon: '🌐',
      title: 'Web Dashboard',
      description: 'Access your AIIGo computing resources from any device using our secure web interface.',
      buttonText: 'Access Dashboard',
      variant: "default",
      platforms: []
    }
  ];

  return (
    <section id="network" className="bg-[#050505] py-20">
      <div className="container">
        <div className="section-title">
          <h2>Join Our Network</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {networkData.map((item, index) => (
            <div key={index} className="bg-[#0a0a0a] rounded-2xl p-8 shadow-md shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="flex items-center mb-4 text-white">
                <div className="w-8 h-8 mr-3 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white">
                  {item.icon}
                </div>
                {item.title}
              </h3>
              <p className="text-white/60 mb-5">{item.description}</p>
              
              {item.platforms.length > 0 && (
                <div className="flex gap-2 mb-6">
                  {item.platforms.map((platform, idx) => (
                    <div 
                      key={idx} 
                      className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      title={platform.name}
                    >
                      {platform.letter}
                    </div>
                  ))}
                </div>
              )}
              
              <div className={`${item.platforms.length > 0 ? 'mt-0' : 'mt-6'}`}>
                <GradientButton variant={item.variant}>
                  {item.buttonText}
                </GradientButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Network; 