import React from 'react';
import './App.css';
import './styles/global.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import Features from './components/Features/Features';
import Technology from './components/Technology/Technology';
import Network from './components/Network/Network';
import Tokenomics from './components/Tokenomics/Tokenomics';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
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