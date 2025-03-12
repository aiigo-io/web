import React from 'react';
import styles from './Network.module.css';

const Network = () => {
  const networkData = [
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Our user-friendly mobile application allows you to manage AI tasks, monitor computing resources, and control your AIIGo workloads from anywhere.',
      buttonText: 'Download App',
      buttonClass: 'btn-primary',
      platforms: []
    },
    {
      icon: '💻',
      title: 'Desktop Client',
      description: 'Run compute tasks on your computer to contribute processing power to the network and earn rewards for your contribution.',
      buttonText: 'Install Client',
      buttonClass: 'btn-secondary',
      platforms: [
        { letter: 'W', name: 'Windows' },
        { letter: 'M', name: 'macOS' },
        { letter: 'L', name: 'Linux' }
      ]
    },
    {
      icon: '🌐',
      title: 'Web Dashboard',
      description: 'Access your AIIGo computing resources from any device using our secure web interface.',
      buttonText: 'Access Dashboard',
      buttonClass: 'btn-primary',
      platforms: []
    }
  ];

  return (
    <section id="network" className={styles.network}>
      <div className="container">
        <div className="section-title">
          <h2>Join Our Network</h2>
        </div>
        <div className={styles.networkGrid}>
          {networkData.map((item, index) => (
            <div key={index} className={styles.networkCard}>
              <h3>
                <div className={styles.cardIcon}>{item.icon}</div>
                {item.title}
              </h3>
              <p>{item.description}</p>
              
              {item.platforms.length > 0 && (
                <div className={styles.platformIcons}>
                  {item.platforms.map((platform, idx) => (
                    <div 
                      key={idx} 
                      className={styles.platformIcon} 
                      title={platform.name}
                    >
                      {platform.letter}
                    </div>
                  ))}
                </div>
              )}
              
              <a 
                href="#" 
                className={`btn ${item.buttonClass} ${item.platforms.length > 0 ? styles.cardBtn : ''}`}
              >
                {item.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Network; 