import React from 'react';
import styles from './Technology.module.css';

const Technology = () => {
  const benefitsData = [
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
    <section id="technology" className={styles.technology}>
      <div className="container">
        <div className="section-title">
          <h2>Our Technology</h2>
        </div>
        <div className={styles.techContainer}>
          <div className={styles.techContent}>
            <h3>Next-Generation AI Infrastructure</h3>
            <p>
              AIIGo is built on a cutting-edge distributed computing architecture designed for optimal performance, 
              security, and energy efficiency. Our innovative resource allocation system maximizes computing power
              while minimizing energy consumption.
            </p>
            <p>
              The platform supports various AI and machine learning frameworks, distributed computing, and seamless integration 
              with existing cloud systems.
            </p>
            
            <div className={styles.techBenefits}>
              {benefitsData.map((benefit, index) => (
                <div key={index} className={styles.techBenefit}>
                  <div className={styles.techBenefitIcon}>{benefit.icon}</div>
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.techImage}>
            <img src="https://via.placeholder.com/500x400" alt="AI Computing Technology" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology; 