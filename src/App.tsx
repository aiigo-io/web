import React from 'react';
import './styles/global.css';
import Header from './components/Header/Header';
import { HeroGeometric } from './components/ui/shape-landing-hero';
import Stats from './components/Stats/Stats';
import Features from './components/Features/Features';
import Technology from './components/Technology/Technology';
import Network from './components/Network/Network';
import Tokenomics from './components/Tokenomics/Tokenomics';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import SocialLinks from './components/ui/SocialLinks';

const App: React.FC = () => {
  return (
<div className="min-h-screen pb-24 md:pb-0">
      <Header />
      <SocialLinks />
      <HeroGeometric 
        badge="AIIGo Platform"
        title1="The Next Generation"
        title2="of AI Computing"
        description="AIIGo is a breakthrough AI computing platform that combines powerful processing, scalability, and ease of use, allowing anyone to participate in the future of artificial intelligence."
      />
      <Stats />
      <Features />
      <Technology />
      <Network />    
      <Tokenomics />
      <CTA />
      <Footer />
    </div>
  );
}

export default App; 