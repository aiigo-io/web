import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Partners.css'; // We'll create this file next

// Using the exact same partner logos from weroam
const partnerLogos = [
  { name: 'Airbeam', logo: 'https://framerusercontent.com/images/8Jz3rAWYTKWvyMuWK7egQ0wgs.png' },
  { name: 'Airswift', logo: 'https://framerusercontent.com/images/53Bdzvr0gfxgzxHLKFaoyP2TY.png' },
  { name: 'Arkreen', logo: 'https://framerusercontent.com/images/A1TtJ61cH6A2dFxC5dbFtvAjRDI.png' },
  { name: 'Comma3 Ventures', logo: 'https://framerusercontent.com/images/56ASxVJ8ibmgOZSgPX6DmA09jQ.png' },
  { name: 'ECMC Group', logo: 'https://framerusercontent.com/images/HSse86N4RLUa8aMungS8VyNYQ4.png' },
  { name: 'Future3 Campus', logo: 'https://framerusercontent.com/images/aVqdav4pLnGvimCbR0ijvBSdiM.png' },
  { name: 'Harmony', logo: 'https://framerusercontent.com/images/7w2Fat8Q5cZsNamYnFVWYOYRE.png' },
  { name: 'Huma', logo: 'https://framerusercontent.com/images/My4iEsnHYQcIIo4zn6s1zR0dqEk.png' },
  { name: 'Acurast', logo: 'https://framerusercontent.com/images/1INvxE3SOb1NHoljgEo0MLwRRg.png' },
  { name: 'Anagram', logo: 'https://framerusercontent.com/images/FDiKwchOsM0tkqXkHyGdzqyN9l8.png' },
  { name: 'aZen', logo: 'https://framerusercontent.com/images/laz9gmdVylkqnLECdLUQPOtRs.png' },
  { name: 'collab currency', logo: 'https://framerusercontent.com/images/SBxAO2N0jb0To91xipveOlQ0Y.png' },
  { name: 'Crowdcreate', logo: 'https://framerusercontent.com/images/VXUSemtDmnKVrTD3dH8qCwgvNg.png' },
  { name: 'DePHY', logo: 'https://framerusercontent.com/images/G6WAjM0GwcOs6lQEHrzj1CXmV8.png' },
  { name: 'Depin Labs', logo: 'https://framerusercontent.com/images/5zNTYghv9Rj0GIfWQtt5ddg.png' },
  { name: 'EdgeX', logo: 'https://framerusercontent.com/images/vsIjogynLn2HpxO6E0Fqj1nnR5U.png' },
];

// Second set of logos for the second carousel
const partnerLogos2 = [
  { name: 'Hooked', logo: 'https://framerusercontent.com/images/1m48XSH5epyy80C4JbJmCTgSV8.png' },
  { name: 'iotex', logo: 'https://framerusercontent.com/images/E9uU0ELNGVD1CBG7dlwJuGMM.png' },
  { name: 'JDI', logo: 'https://framerusercontent.com/images/2LDuYNRGQOUHOrOPABDgUn1JAwQ.png' },
  { name: 'Linux Foundation', logo: 'https://framerusercontent.com/images/XirLkBFFMuQIHJ5Y0IIHVgL98.png' },
  { name: 'MeshSmart', logo: 'https://framerusercontent.com/images/YMAtvHJukXDHR7SbUgHvdrmK4ms.png' },
  { name: 'Mind Network', logo: 'https://framerusercontent.com/images/9HAQhLiOYdlgsbeHNBJnmsnYn2M.png' },
  { name: 'Mojo Gogo', logo: 'https://framerusercontent.com/images/cAtBxskFTJIW9slRwwVhDsX9fYA.png' },
  { name: 'Network3', logo: 'https://framerusercontent.com/images/qrVasll3T71XeA7VLxnZxOqXbc.png' },
  { name: 'NFT Tech', logo: 'https://framerusercontent.com/images/acHTw2ksx6mwwoOMdOOuXL9FxmA.png' },
  { name: 'nubila', logo: 'https://framerusercontent.com/images/qwh3YBkDnJFZehwlMmwZnwuxjJQ.png' },
  { name: 'Pelago', logo: 'https://framerusercontent.com/images/sGjuvr9Vlimwdfu8H0YbZPABFwc.png' },
  { name: 'PinGo', logo: 'https://framerusercontent.com/images/V5Wq384rqV5NUo032O1ciwx9M.png' },
  { name: 'PolyFlow', logo: 'https://framerusercontent.com/images/IjqHo1nuEmQscaJfJK3FLQyhyM.png' },
  { name: 'Powerpod', logo: 'https://framerusercontent.com/images/LYdEm5ycL03Z3Pd0DJpqp9Zwgk.png' },
  { name: 'RedteaGO', logo: 'https://framerusercontent.com/images/qZ1BhKQsw717KGtJfkVqtyOl4.png' },
  { name: 'Samsung Next', logo: 'https://framerusercontent.com/images/pYifg8EZHMOWN1tWAEaHL4ChNRQ.png' },
];

const LogoMarquee: React.FC<{ logos: typeof partnerLogos; direction?: 'left' | 'right' }> = ({ 
  logos, 
  direction = 'left' 
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains('marquee-content')) {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).style.animationPlayState = 'running';
            } else {
              (entry.target as HTMLElement).style.animationPlayState = 'paused';
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (marqueeRef.current) {
      const content = marqueeRef.current.querySelector('.marquee-content');
      if (content) {
        observer.observe(content);
      }
    }

    return () => observer.disconnect();
  }, []);

  const renderLogos = (isClone = false) => {
    return (
      <section className="marquee-section">
        <div className="marquee-grid">
          {logos.map((logo, index) => (
            <motion.div
              key={`${isClone ? 'clone-' : ''}${logo.name}-${index}`}
              className="logo-item"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="logo-container">
                <div className="logo-wrapper">
                  <img 
                    src={logo.logo} 
                    alt={logo.name} 
                    className="logo-image"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };
  
  return (
    <div className="marquee-container" ref={marqueeRef}>
      <div className={`marquee ${direction === 'right' ? 'marquee-reverse' : ''}`}>
        <div className="marquee-content">
          {renderLogos()}
          {renderLogos(true)}
        </div>
      </div>
    </div>
  );
};

const Partners: React.FC = () => {
  return (
    <div className="container py-20">
      <div className="section-title text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Our Partners
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-white/60 mt-4 max-w-2xl mx-auto text-lg"
        >
          AIIGo collaborates with industry leaders to revolutionize AI computing infrastructure
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mt-14 space-y-12"
      >
        <LogoMarquee logos={partnerLogos} direction="left" />
        <LogoMarquee logos={partnerLogos2} direction="right" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-16 md:mt-20 text-center"
      >
        <motion.div 
          className="inline-flex items-center justify-center px-6 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm"
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="mr-2 w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Looking for new strategic partnerships
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Partners; 