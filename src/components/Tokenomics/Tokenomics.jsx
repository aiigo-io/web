import React from 'react';
import styles from './Tokenomics.module.css';

const Tokenomics = () => {
  const tokenStatsData = [
    { label: 'Total Supply:', value: '1,000,000,000 CRX' },
    { label: 'Mining Allocation:', value: '50%' },
    { label: 'Development Fund:', value: '20%' },
    { label: 'Community Rewards:', value: '15%' },
    { label: 'Team & Advisors:', value: '10%' },
    { label: 'Reserve:', value: '5%' }
  ];

  return (
    <section id="tokenomics" className={styles.tokenomics}>
      <div className="container">
        <div className="section-title">
          <h2>Tokenomics</h2>
        </div>
        <div className={styles.tokenomicsContent}>
          <div className={styles.tokenomicsChart}>
            <div className={styles.chartPlaceholder}>
              [Token Distribution Chart]
            </div>
          </div>
          
          <div className={styles.tokenomicsInfo}>
            <h3>CryptoX Token Distribution</h3>
            <p>
              Our token economy is designed to reward early adopters while ensuring long-term 
              stability and growth. The total supply is limited to create scarcity and value over time.
            </p>
            
            <ul className={styles.tokenStats}>
              {tokenStatsData.map((stat, index) => (
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