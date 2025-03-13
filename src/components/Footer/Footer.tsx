import React from 'react';

interface FooterLink {
  name: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialIcon {
  icon: string;
  name: string;
}

const Footer: React.FC = () => {
  const footerLinks: FooterColumn[] = [
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

  const socialIcons: SocialIcon[] = [
    { icon: 'F', name: 'Facebook' },
    { icon: 'T', name: 'Twitter' },
    { icon: 'I', name: 'Instagram' },
    { icon: 'D', name: 'Discord' }
  ];

  return (
    <footer className="bg-dark text-white py-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">AIIGo</h3>
            <p className="text-gray-300 mb-6">The next generation of AI computing accessible to everyone.</p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:bg-primary hover:border-primary hover:text-white transition-colors" 
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-primary">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.url} className="text-gray-400 hover:text-white transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center text-gray-400 pt-8 border-t border-gray-800">
          &copy; {new Date().getFullYear()} AIIGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 