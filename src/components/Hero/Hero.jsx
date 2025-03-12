import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1>The Next Generation of AI Computing</h1>
          <p className={styles.heroSubtitle}>
            AIIGo is a breakthrough AI computing platform that combines powerful processing, scalability, and ease of use, 
            allowing anyone to participate in the future of artificial intelligence.
          </p>
          <div className={styles.heroButtons}>
            <a href="#" className="btn btn-primary">Start Computing Today</a>
            <a href="#" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
        <img 
          src="https://via.placeholder.com/600x500" 
          alt="AIIGo Platform" 
          className={styles.heroImg}
        />
      </div>
    </section>
  );
};

export default Hero; 