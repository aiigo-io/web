import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white text-center py-24">
      <div className="container">
        <h2 className="text-4xl font-bold mb-5">Start Your AI Computing Journey Today</h2>
        <p className="text-xl max-w-2xl mx-auto mb-10">
          Join thousands of users already leveraging AIIGo's computing power. 
          Our platform makes AI computing accessible to everyone.
        </p>
        <a href="#" className="btn bg-white text-primary hover:bg-opacity-90 px-10 py-4 text-lg">Get Started Now</a>
      </div>
    </section>
  );
};

export default CTA; 