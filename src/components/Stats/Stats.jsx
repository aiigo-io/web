import React from 'react';
import styles from './Stats.module.css';

const Stats = () => {
  const statsData = [
    { number: '250K+', label: 'Active Users' },
    { number: '1.5M+', label: 'Transactions' },
    { number: '99.9%', label: 'Uptime' },
    { number: '15K+', label: 'Nodes Worldwide' },
  ];

  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 