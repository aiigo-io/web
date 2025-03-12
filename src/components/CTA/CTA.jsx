import React from 'react';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className="container">
        <h2>Start Your Crypto Journey Today</h2>
        <p>
          Join thousands of users already mining and trading CryptoX. 
          Our platform makes cryptocurrency accessible to everyone.
        </p>
        <a href="#" className={`btn ${styles.ctaBtn}`}>Download Now</a>
      </div>
    </section>
  );
};

export default CTA; 