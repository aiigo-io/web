import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>AIIGo</a>
          
          <div className={styles.hamburger} onClick={toggleMobileMenu}>
            <span className={mobileMenuOpen ? styles.open : ''}></span>
            <span className={mobileMenuOpen ? styles.open : ''}></span>
            <span className={mobileMenuOpen ? styles.open : ''}></span>
          </div>
          
          <div className={`${styles.menuWrapper} ${mobileMenuOpen ? styles.menuActive : ''}`}>
            <ul className={styles.navLinks}>
              <li><a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a></li>
              <li><a href="#technology" onClick={() => setMobileMenuOpen(false)}>Technology</a></li>
              <li><a href="#network" onClick={() => setMobileMenuOpen(false)}>Network</a></li>
              <li><a href="#tokenomics" onClick={() => setMobileMenuOpen(false)}>Resource Allocation</a></li>
            </ul>
          </div>
          
          <div className={styles.ctaWrapper}>
            <a href="#" className="btn btn-primary">Get Started</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 