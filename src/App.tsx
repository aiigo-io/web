import React from 'react';
import './styles/global.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { HeroGeometric } from './components/ui/shape-landing-hero';
import Stats from './components/Stats/Stats';
import Features from './components/Features/Features';
import Partners from './components/Partners/Partners';
import Technology from './components/Technology/Technology';
import Tokenomics from './components/Tokenomics/Tokenomics';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import Whitepaper from './components/Whitepaper/Whitepaper';
import ScrollToTop from './components/ScrollToTop';

// Landing page component
const Home: React.FC = () => {
  return (
    <>
      {/* Main content */}
      <main>
        {/* Hero section with 3D globe */}
        <HeroGeometric
          badge="AIIGo Platform"
          title1="The Next Generation"
          title2="of AI Computing"
          description="AIIGo is a breakthrough AI computing platform that combines powerful processing, scalability, and ease of use, allowing anyone to participate in the future of artificial intelligence."
        />

        {/* Stats section with animated counters */}
        <section id="stats" className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.03] to-transparent"></div>
          <Stats />
        </section>

        {/* Features with glass cards */}
        <section id="features" className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/[0.03] to-transparent"></div>
          <Features />
        </section>


        {/* Technology section */}
        <section id="technology" className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.03] to-transparent"></div>
          <Technology />
        </section>



        {/* Tokenomics section */}
        <section id="tokenomics" className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.03] to-transparent"></div>
          <Tokenomics />
        </section>


        {/* Partners section */}
        <section id="partners" className="relative py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent"></div>
          <Partners />
        </section>


        {/* Call to action */}
        <section id="cta" className="relative py-16 md:py-24">
          <div className="absolute inset-0 animated-gradient opacity-30"></div>
          <CTA />
        </section>
      </main>
    </>
  );
};

// Whitepaper page component
const WhitepaperPage: React.FC = () => {
  return (
    <main className="pt-20">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent"></div>
        <Whitepaper />
      </section>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen pb-24 md:pb-0 bg-[#030303]">
        {/* Subtle noise texture overlay is added in global.css */}

        {/* Fixed elements */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App; 