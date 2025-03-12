import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  const featuresData = [
    {
      title: 'Mobile Mining',
      description: 'Mine CryptoX tokens directly from your smartphone without draining your battery or using excessive resources.',
      image: 'https://via.placeholder.com/150',
      alt: 'Mining'
    },
    {
      title: 'Advanced Security',
      description: 'Our blockchain uses state-of-the-art cryptography and consensus mechanisms to ensure your assets remain secure.',
      image: 'https://via.placeholder.com/150',
      alt: 'Security'
    },
    {
      title: 'Fast Transactions',
      description: 'Lightning-fast transaction speeds with minimal fees, making CryptoX perfect for everyday payments.',
      image: 'https://via.placeholder.com/150',
      alt: 'Transactions'
    }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <div className="section-title">
          <h2>Key Features</h2>
        </div>
        <div className={styles.featuresGrid}>
          {featuresData.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureImg}>
                <img src={feature.image} alt={feature.alt} />
              </div>
              <div className={styles.featureContent}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="#" className={styles.featureBtn}>
                  Learn More <span>→</span>
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