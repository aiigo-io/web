import React from 'react';
import { GradientButton } from '../ui/gradient-button';

const Hero: React.FC = () => {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      <div className="container">
        <div className="max-w-xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            The Next Generation of AI Computing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AIIGo is a breakthrough AI computing platform that combines powerful processing, scalability, and ease of use, 
            allowing anyone to participate in the future of artificial intelligence.
          </p>
          <div className="flex flex-col md:flex-row gap-5">
            <GradientButton>Start Computing Today</GradientButton>
            <GradientButton variant="outline">Learn More</GradientButton>
          </div>
        </div>
        <img 
          src="https://via.placeholder.com/600x500" 
          alt="AIIGo Platform" 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[45%] z-0 
                     lg:opacity-100 md:opacity-40 md:w-[60%]
                     sm:relative sm:top-auto sm:transform-none sm:w-4/5 sm:mx-auto sm:mt-8 sm:block sm:opacity-100"
        />
      </div>
    </section>
  );
};

export default Hero; 