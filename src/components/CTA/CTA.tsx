import React from 'react';
import { GradientButton } from '../ui/gradient-button';

const CTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white text-center py-16 md:py-24 px-4 rounded-3xl mx-4 my-8 md:mx-0 md:my-0">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-5">Start Your AI Computing Journey Today</h2>
        <p className="text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10">
          Join thousands of users already leveraging AIIGo's computing power. 
          Our platform makes AI computing accessible to everyone.
        </p>
        <GradientButton className="min-w-[200px]">Get Started Now</GradientButton>
      </div>
    </section>
  );
};

export default CTA; 