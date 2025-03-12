import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>CryptoX</a>
          <ul className={styles.navLinks}>
            <li><a href="#features">Features</a></li>
            <li><a href="#technology">Technology</a></li>
            <li><a href="#network">Network</a></li>
            <li><a href="#tokenomics">Tokenomics</a></li>
            <li><a href="#" className="btn btn-primary">Get Started</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 