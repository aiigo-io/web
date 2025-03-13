import React, { useState } from 'react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 shadow-md z-50 py-4">
      <div className="container">
        <nav className="flex justify-between items-center">
          <a href="/web" className="text-2xl font-extrabold text-primary no-underline">AIIGo</a>
          
          <div 
            className="md:hidden relative w-6 h-5 cursor-pointer z-50" 
            onClick={toggleMobileMenu}
          >
            <span className={`absolute h-0.5 w-full bg-dark transition-all duration-300 ${mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
            <span className={`absolute h-0.5 w-full bg-dark top-2 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute h-0.5 w-full bg-dark transition-all duration-300 ${mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
          </div>
          
          <div className={`flex-1 flex justify-center transition-all duration-300 md:block ${mobileMenuOpen ? 'fixed inset-0 bg-white pt-20 px-5' : 'hidden'}`}>
            <ul className={`flex flex-col md:flex-row p-0 m-0 list-none md:justify-center ${mobileMenuOpen ? 'items-center' : ''}`}>
              <li className="md:mx-0"><a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-dark font-medium transition-all duration-300 py-2 px-4 block hover:text-primary">Features</a></li>
              <li className="md:mx-0"><a href="#technology" onClick={() => setMobileMenuOpen(false)} className="text-dark font-medium transition-all duration-300 py-2 px-4 block hover:text-primary">Technology</a></li>
              <li className="md:mx-0"><a href="#network" onClick={() => setMobileMenuOpen(false)} className="text-dark font-medium transition-all duration-300 py-2 px-4 block hover:text-primary">Network</a></li>
              <li className="md:mx-0"><a href="#tokenomics" onClick={() => setMobileMenuOpen(false)} className="text-dark font-medium transition-all duration-300 py-2 px-4 block hover:text-primary">Resource Allocation</a></li>
              
              {/* Mobile-only button */}
              <li className="md:hidden mt-4">
                <a href="#" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary inline-block py-3 px-6 rounded-lg font-semibold">Get Started</a>
              </li>
            </ul>
          </div>
          
          <div className="hidden md:block">
            <a href="#" className="btn btn-primary">Get Started</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 