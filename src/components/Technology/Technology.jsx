import React from 'react';
import styles from './Technology.module.css';

const Technology = () => {
  const benefitsData = [
    {
      icon: '⚡',
      title: 'Energy Efficient',
      description: 'Uses minimal resources compared to traditional cryptocurrencies'
    },
    {
      icon: '🔒',
      title: 'Highly Secure',
      description: 'Advanced cryptography protects against attacks'
    },
    {
      icon: '⚙️',
      title: 'Scalable',
      description: 'Handles thousands of transactions per second'
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
            <h3>Next-Generation Blockchain Infrastructure</h3>
            <p>
              CryptoX is built on a completely new blockchain architecture designed for optimal performance, 
              security, and energy efficiency. Our innovative consensus mechanism eliminates the high energy 
              costs of traditional mining while maintaining decentralization.
            </p>
            <p>
              The platform supports smart contracts, decentralized applications, and seamless integration 
              with existing financial systems.
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
            <img src="https://via.placeholder.com/500x400" alt="Blockchain Technology" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology; 