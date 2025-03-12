import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Resources',
      links: [
        { name: 'Whitepaper', url: '#' },
        { name: 'Documentation', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'FAQ', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#' },
        { name: 'Team', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Contact', url: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', url: '#' },
        { name: 'Privacy Policy', url: '#' },
        { name: 'Cookie Policy', url: '#' },
        { name: 'Compliance', url: '#' }
      ]
    }
  ];

  const socialIcons = [
    { icon: 'F', name: 'Facebook' },
    { icon: 'T', name: 'Twitter' },
    { icon: 'I', name: 'Instagram' },
    { icon: 'D', name: 'Discord' }
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h3>AIIGo</h3>
            <p>The next generation of AI computing accessible to everyone.</p>
            <div className={styles.socialLinks}>
              {socialIcons.map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className={styles.socialIcon} 
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index} className={styles.footerColumn}>
              <h3>{column.title}</h3>
              <ul className={styles.footerLinks}>
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} AIIGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 