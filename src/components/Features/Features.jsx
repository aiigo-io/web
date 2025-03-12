import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  const featuresData = [
    {
      title: 'Cloud Processing',
      description: 'Access AIIGo computing resources directly from your devices without requiring expensive hardware or excessive energy consumption.',
      image: 'https://via.placeholder.com/150',
      alt: 'Cloud Computing'
    },
    {
      title: 'Advanced Security',
      description: 'Our platform uses state-of-the-art encryption and security protocols to ensure your AI models and data remain private and secure.',
      image: 'https://via.placeholder.com/150',
      alt: 'Security'
    },
    {
      title: 'High Performance',
      description: 'Lightning-fast processing speeds with optimized resource allocation, making AIIGo perfect for demanding AI workloads.',
      image: 'https://via.placeholder.com/150',
      alt: 'Performance'
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