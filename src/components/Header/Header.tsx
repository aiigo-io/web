import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Layers, Cpu, PieChart, Menu, X, Users, BookOpen } from 'lucide-react';
import { cn } from "../../lib/utils";
import { GradientButton } from '../ui/gradient-button';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRefs = useRef<IntersectionObserver[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Features', url: '/#features', hash: 'features', icon: Layers },
    { name: 'Technology', url: '/#technology', hash: 'technology', icon: Cpu },
    { name: 'Ecosystem', url: '/#tokenomics', hash: 'tokenomics', icon: PieChart },
    { name: 'Partners', url: '/#partners', hash: 'partners', icon: Users },
    { name: 'Whitepaper', url: '/whitepaper', icon: BookOpen }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Clean up previous observers
    observerRefs.current.forEach(observer => observer.disconnect());
    observerRefs.current = [];

    // Only set up intersection observers if we're on the home page
    if (location.pathname === '/' || location.pathname === '') {
      // Set up intersection observers for each section
      navItems.forEach(item => {
        if (item.hash) {
          const section = document.getElementById(item.hash);
  
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
        }
      });
    } else if (location.pathname === '/whitepaper') {
      setActiveTab('Whitepaper');
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);

      // Clean up observers
      observerRefs.current.forEach(observer => observer.disconnect());
    };
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    setActiveTab(item.name);
    setIsMobileMenuOpen(false);

    // For sections on the home page
    if (item.hash) {
      // If we're not on home page, navigate to home first
      if (location.pathname !== '/' && location.pathname !== '') {
        navigate('/');
        // Wait a bit for navigation to complete before trying to scroll
        setTimeout(() => {
          const section = document.getElementById(item.hash);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // If we're already on home page, just scroll to section
        const section = document.getElementById(item.hash);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Navigate to other pages (like whitepaper)
      navigate(item.url);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "py-3 backdrop-blur-md bg-black/60"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400"
        >
          AIIGo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10 p-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Connect Button */}
        <div className="hidden lg:block">
          <GradientButton>Connect</GradientButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-full bg-white/5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          scrolled ? "bg-black" : "bg-black/95",
          !isMobileMenuOpen && "pointer-events-none"
        )}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0 },
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="container mx-auto px-4 py-16 h-full flex flex-col relative"
          variants={{
            open: { y: 0, opacity: 1 },
            closed: { y: -20, opacity: 0 }
          }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AIIGo
            </Link>
            <button
              className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="py-4 mb-4">
            <h2 className="text-3xl font-bold text-white mb-4">AIIGo Ecosystem</h2>
          </div>

          <nav className="flex flex-col">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <motion.div
                  key={item.name}
                  variants={{
                    open: {
                      x: 0,
                      opacity: 1,
                      transition: { delay: 0.1 + index * 0.1 }
                    },
                    closed: {
                      x: -20,
                      opacity: 0,
                      transition: { delay: 0 }
                    }
                  }}
                >
                  <a
                    href={item.url}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "flex items-center py-5 text-xl font-medium transition-all duration-300 border-b border-white/10",
                      isActive
                        ? "text-white"
                        : "text-white hover:text-white"
                    )}
                  >
                    <Icon className="mr-3 h-6 w-6" />
                    {item.name}
                    {isActive && (
                      <div className="ml-2 h-1 w-16 bg-blue-500 rounded-full"></div>
                    )}
                  </a>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            className="mt-auto mb-8"
            variants={{
              open: {
                y: 0,
                opacity: 1,
                transition: { delay: 0.3 }
              },
              closed: {
                y: 20,
                opacity: 0,
                transition: { delay: 0 }
              }
            }}
          >
            <GradientButton className="w-full">Connect</GradientButton>
          </motion.div>
        </motion.div>
      </motion.div>
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