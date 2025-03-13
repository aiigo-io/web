import React from 'react';

interface FeatureItem {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const Features: React.FC = () => {
  const featuresData: FeatureItem[] = [
    {
      title: 'Cloud Processing',
      description: 'Access AIIGo computing resources directly from your devices without requiring expensive hardware or excessive energy consumption.',
      image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      alt: 'Cloud Computing'
    },
    {
      title: 'Advanced Security',
      description: 'Our platform uses state-of-the-art encryption and security protocols to ensure your AI models and data remain private and secure.',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      alt: 'Security'
    },
    {
      title: 'High Performance',
      description: 'Lightning-fast processing speeds with optimized resource allocation, making AIIGo perfect for demanding AI workloads.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1834&auto=format&fit=crop&ixlib=rb-4.0.3',
      alt: 'Performance'
    }
  ];

  return (
    <section id="features" className="bg-[#050505] py-12 sm:py-16 md:py-20">
      <div className="container">
        <div className="section-title">
          <h2>Key Features</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-md shadow-black/40 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl"
              style={{ touchAction: 'manipulation' }}
            >
              <div className="w-full h-36 sm:h-48 bg-[#111] flex items-center justify-center overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-white/60 mb-3 sm:mb-4">{feature.description}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-primary font-medium hover:underline group py-1"
                  role="button"
                >
                  <span>Learn More</span> <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 