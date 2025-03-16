import React, { useState, useEffect, useRef } from 'react';
import { GradientButton } from '../ui/gradient-button';
import { motion } from "framer-motion";
import { Layers, Cpu, Network, PieChart } from 'lucide-react';
import { cn } from "../../lib/utils";

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Resource Allocation');
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRefs = useRef<IntersectionObserver[]>([]);

  const navItems = [
    { name: 'Features', url: '#features', icon: Layers },
    { name: 'Technology', url: '#technology', icon: Cpu },
    { name: 'Network', url: '#network', icon: Network },
    { name: 'Tokenomics', url: '#tokenomics', icon: PieChart }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleResize();
    handleScroll();
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    // Clean up previous observers
    observerRefs.current.forEach(observer => observer.disconnect());
    observerRefs.current = [];

    // Set up intersection observers for each section
    navItems.forEach(item => {
      const sectionId = item.url.replace('#', '');
      const section = document.getElementById(sectionId);
      
      if (section) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            // When section is intersecting with 40% or more visibility
            if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
              setActiveTab(item.name);
            }
          },
          {
            root: null, // viewport
            rootMargin: "0px",
            threshold: [0.4, 0.8], // trigger at 40% and 80% visibility
          }
        );
        
        observer.observe(section);
        observerRefs.current.push(observer);
      }
    });
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      
      // Clean up observers
      observerRefs.current.forEach(observer => observer.disconnect());
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    setActiveTab(item.name);
    
    // Scroll to the section
    const sectionId = item.url.replace('#', '');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-background/90 backdrop-blur-md",
      scrolled ? "py-2" : "py-3"
    )}>
      <div className="container mx-auto flex flex-row justify-between items-center px-4">
        {/* Logo */}
        <a href="/web" className="text-2xl font-extrabold text-primary no-underline z-50">AIIGo</a>
        
        {/* Desktop Navigation */}
        <div className="flex-1 mx-4">
          <div className="bg-background/80 backdrop-blur-md border border-white/10 rounded-full py-1 px-1 shadow-lg max-w-fit mx-auto hidden md:block">
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;

                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "relative px-5 py-2 text-sm font-medium rounded-full transition-all",
                      isActive 
                        ? "bg-primary/80 text-white" 
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - Fixed at bottom with maximum z-index */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999]">
        <div className="bg-black border-t border-white/20 py-3 shadow-2xl backdrop-blur-md">
          <nav className="flex items-center justify-around max-w-md mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "relative p-2 transition-all",
                    isActive ? "text-primary" : "text-white/70 hover:text-white/100"
                  )}
                >
                  <Icon 
                    size={28} 
                    strokeWidth={isActive ? 2.5 : 1.5} 
                    className={cn(
                      "transition-all",
                      isActive && "drop-shadow-[0_0_8px_rgba(84,104,255,0.7)]"
                    )}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="mobileIndicator"
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

// Add this to global.css instead of using inline styles
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;
// }
// .scrollbar-hide {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }

export default Header; 