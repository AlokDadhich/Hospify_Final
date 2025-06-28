import React from 'react';
import { Activity, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Find Hospitals', href: '#' },
        { name: 'Emergency Services', href: '#' },
        { name: 'Hospital Login', href: '#' },
        { name: 'API Access', href: '#' },
        { name: 'Mobile App', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'User Guide', href: '#' },
        { name: 'Hospital Registration', href: '#' },
        { name: 'Emergency Protocols', href: '#' },
        { name: 'Data Standards', href: '#' },
        { name: 'Best Practices', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Contact Support', href: '#' },
        { name: 'Report Issue', href: '#' },
        { name: 'Feature Request', href: '#' },
        { name: 'System Status', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Our Mission', href: '#' },
        { name: 'Partnerships', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press Kit', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Hospify</h3>
                <p className="text-gray-400 text-sm">Real-time Hospital Resources</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Saving lives through technology by providing real-time visibility into hospital 
              resources and enabling faster decision-making during medical emergencies.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-blue-400" />
                <span>+91-800-HOSPIFY</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-blue-400" />
                <span>support@hospify.in</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-blue-400" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="mt-12 bg-red-600 rounded-lg p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h4 className="text-xl font-bold mb-2">Emergency? Need Immediate Help?</h4>
              <p className="text-red-100">Call these numbers for immediate medical assistance</p>
            </div>
            <div className="flex space-x-4">
              <a href="tel:112" className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors">
                Call 112
              </a>
              <a href="tel:108" className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors">
                Call 108
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400">
                © 2025 Hospify. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for a healthier India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};