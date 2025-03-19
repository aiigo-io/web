import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  Linkedin,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { GradientButton } from '../ui/gradient-button';

interface FooterLink {
  name: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialIcon {
  icon: React.ReactNode;
  name: string;
  url: string;
}

const Footer: React.FC = () => {
  const footerLinks: FooterColumn[] = [
    {
      title: 'Use',
      links: [
        { name: 'Global AI Computing', url: '#' },
        { name: 'Use & Earn', url: '#' }
      ]
    },
    {
      title: 'Build',
      links: [
        { name: 'AI Nodes', url: '#' },
        { name: 'AIIGo Growth', url: '#' },
        { name: 'Developer API', url: '#' },
        { name: 'AIIGo Ambassador', url: '#' },
        { name: 'AIIGo Explorer', url: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Learn', url: '#' },
        { name: 'Whitepaper', url: '#' },
        { name: 'FAQ', url: '#' },
        { name: 'News', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Media Kit', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', url: '#' },
        { name: 'Contact Us', url: '#' },
        { name: 'Support', url: '#' }
      ]
    }
  ];

  const socialIcons: SocialIcon[] = [
    { icon: <Twitter className="h-5 w-5" />, name: 'Twitter', url: '#' },
    { icon: <MessageSquare className="h-5 w-5" />, name: 'Discord', url: '#' },
    { icon: <Github className="h-5 w-5" />, name: 'Github', url: '#' },
    { icon: <Linkedin className="h-5 w-5" />, name: 'LinkedIn', url: '#' }
  ];

  return (
    <footer className="pt-24 pb-12 border-t border-white/5">
      <div className="container">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 mb-12 lg:mb-0 pr-0 lg:pr-20">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-1">AIIGo</h3>
              <p className="text-sm text-white/50">The next generation of AI computing</p>
            </div>
            
            <p className="text-white/70 mb-8 text-sm">
              A breakthrough AI computing platform that combines powerful processing, scalability, and ease of use, 
              allowing anyone to participate in the future of artificial intelligence.
            </p>
            
            <div className="flex flex-col space-y-4 max-w-xs">
              <div className="group relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full py-3 px-5 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary pr-10"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-primary rounded-full text-white transition-transform group-hover:scale-95">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-white/40">Subscribe to our newsletter</p>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {footerLinks.map((column, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-5 text-white">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, idx) => (
                    <li key={idx} className="text-sm">
                      <a 
                        href={link.url} 
                        className="text-white/60 hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AIIGo. All rights reserved.
          </p>
          
          <div className="flex space-x-2">
            {socialIcons.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-colors" 
                title={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a href="#" className="text-xs text-white/40 hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-xs text-white/40 hover:text-primary">Terms & Conditions</a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a href="#" className="inline-flex items-center text-xs text-white/30 hover:text-primary">
            <img src="https://via.placeholder.com/20" alt="Logo" className="w-5 h-5 mr-1 opacity-50" />
            Powered by AIIGo Protocol
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 