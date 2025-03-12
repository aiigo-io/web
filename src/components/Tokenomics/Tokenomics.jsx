import React from 'react';
import styles from './Tokenomics.module.css';

const Tokenomics = () => {
  const resourceAllocationData = [
    { label: 'Total Computing Power:', value: '1,000,000 TFLOPS' },
    { label: 'Public Compute Pool:', value: '50%' },
    { label: 'Research & Development:', value: '20%' },
    { label: 'Community Projects:', value: '15%' },
    { label: 'Partners & Collaborators:', value: '10%' },
    { label: 'Reserve Capacity:', value: '5%' }
  ];

  return (
    <section id="tokenomics" className={styles.tokenomics}>
      <div className="container">
        <div className="section-title">
          <h2>Resource Allocation</h2>
        </div>
        <div className={styles.tokenomicsContent}>
          <div className={styles.tokenomicsChart}>
            <div className={styles.chartPlaceholder}>
              [Resource Distribution Chart]
            </div>
          </div>
          
          <div className={styles.tokenomicsInfo}>
            <h3>AIIGo Computing Resource Distribution</h3>
            <p>
              Our computing resource allocation is designed to provide accessible AI computing power 
              while ensuring long-term sustainability and growth. The computing capacity is distributed 
              to maximize availability for all users.
            </p>
            
            <ul className={styles.tokenStats}>
              {resourceAllocationData.map((stat, index) => (
                <li key={index}>
                  <span>{stat.label}</span>
                  <span>{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics; 