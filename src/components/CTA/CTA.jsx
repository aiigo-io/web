import React from 'react';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className="container">
        <h2>Start Your AI Computing Journey Today</h2>
        <p>
          Join thousands of users already leveraging AIIGo's computing power. 
          Our platform makes AI computing accessible to everyone.
        </p>
        <a href="#" className={`btn ${styles.ctaBtn}`}>Get Started Now</a>
      </div>
    </section>
  );
};

export default CTA; 