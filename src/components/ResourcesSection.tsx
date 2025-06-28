import React from 'react';
import { FileText, Download, ExternalLink, BookOpen, Video, Users } from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  const resources = [
    {
      category: 'For Hospitals',
      icon: FileText,
      color: 'bg-blue-600',
      items: [
        {
          title: 'Hospital Registration Guide',
          description: 'Step-by-step guide to register your hospital and start updating bed availability.',
          type: 'PDF Guide',
          link: '#'
        },
        {
          title: 'API Documentation',
          description: 'Technical documentation for integrating your hospital management system.',
          type: 'Technical Docs',
          link: '#'
        },
        {
          title: 'Data Update Training',
          description: 'Video tutorial on how to keep your hospital data accurate and up-to-date.',
          type: 'Video Tutorial',
          link: '#'
        }
      ]
    },
    {
      category: 'For Patients & Families',
      icon: Users,
      color: 'bg-green-600',
      items: [
        {
          title: 'Emergency Preparedness Guide',
          description: 'Essential information on what to do during medical emergencies.',
          type: 'PDF Guide',
          link: '#'
        },
        {
          title: 'How to Use Hospify',
          description: 'Complete user guide with tips and tricks for finding the right hospital.',
          type: 'User Manual',
          link: '#'
        },
        {
          title: 'Emergency Contact List',
          description: 'Comprehensive list of emergency numbers for all major Indian cities.',
          type: 'Reference Sheet',
          link: '#'
        }
      ]
    },
    {
      category: 'For Healthcare Workers',
      icon: BookOpen,
      color: 'bg-purple-600',
      items: [
        {
          title: 'Best Practices Guide',
          description: 'Guidelines for efficient patient management during high-demand periods.',
          type: 'Clinical Guide',
          link: '#'
        },
        {
          title: 'Resource Optimization',
          description: 'Strategies for maximizing hospital resource utilization and patient flow.',
          type: 'White Paper',
          link: '#'
        },
        {
          title: 'Emergency Protocols',
          description: 'Standardized protocols for handling mass casualty and pandemic situations.',
          type: 'Protocol Manual',
          link: '#'
        }
      ]
    }
  ];

  const quickLinks = [
    { title: 'Emergency Helplines', icon: ExternalLink, link: '#' },
    { title: 'Government Health Portal', icon: ExternalLink, link: '#' },
    { title: 'WHO Guidelines', icon: ExternalLink, link: '#' },
    { title: 'Medical Insurance Info', icon: ExternalLink, link: '#' },
    { title: 'Ambulance Services', icon: ExternalLink, link: '#' },
    { title: 'Blood Bank Directory', icon: ExternalLink, link: '#' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Resources & Support</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access comprehensive guides, documentation, and support materials to make the most 
            of Hospify and improve healthcare outcomes in your community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {resources.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <div className={`${category.color} p-3 rounded-lg mr-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                    <a
                      href={item.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Quick Links</h3>
              <p className="text-gray-600 mb-8">
                Essential healthcare resources and emergency information at your fingertips.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <link.icon className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-900 font-medium">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Need Help?</h3>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">24/7 Support Helpline</h4>
                  <p className="text-gray-600 mb-3">Get immediate assistance with platform usage or emergency guidance.</p>
                  <a href="tel:+91-800-HOSPIFY" className="text-blue-600 font-bold text-lg">
                    +91-800-HOSPIFY
                  </a>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                  <p className="text-gray-600 mb-3">For technical issues, feedback, or partnership inquiries.</p>
                  <a href="mailto:support@hospify.in" className="text-blue-600 font-medium">
                    support@hospify.in
                  </a>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                  <p className="text-gray-600 mb-3">Chat with our support team for quick answers.</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};