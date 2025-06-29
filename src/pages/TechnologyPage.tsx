import React from 'react';
import { Cpu, Database, Smartphone, Cloud, Shield, Zap, Globe, Bot, Wifi, Lock } from 'lucide-react';

export const TechnologyPage: React.FC = () => {
  const techStack = [
    {
      category: 'Frontend',
      icon: Smartphone,
      technologies: [
        { name: 'React 18', description: 'Modern UI framework with hooks and concurrent features' },
        { name: 'TypeScript', description: 'Type-safe development for better code quality' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid styling' },
        { name: 'Vite', description: 'Fast build tool and development server' }
      ]
    },
    {
      category: 'Backend & Database',
      icon: Database,
      technologies: [
        { name: 'Supabase', description: 'Real-time database with built-in authentication' },
        { name: 'PostgreSQL', description: 'Robust relational database for complex queries' },
        { name: 'Real-time APIs', description: 'Live data synchronization across all clients' },
        { name: 'Row Level Security', description: 'Database-level security for data protection' }
      ]
    },
    {
      category: 'Cloud & Infrastructure',
      icon: Cloud,
      technologies: [
        { name: 'Edge Functions', description: 'Serverless functions for API integrations' },
        { name: 'CDN Distribution', description: 'Global content delivery for fast loading' },
        { name: 'Auto-scaling', description: 'Automatic resource scaling based on demand' },
        { name: 'Monitoring & Analytics', description: 'Real-time performance monitoring' }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: Shield,
      technologies: [
        { name: 'HIPAA Compliance', description: 'Healthcare data protection standards' },
        { name: 'End-to-end Encryption', description: 'Data encryption in transit and at rest' },
        { name: 'OAuth 2.0', description: 'Secure authentication and authorization' },
        { name: 'Audit Logging', description: 'Comprehensive activity tracking' }
      ]
    }
  ];

  const integrations = [
    {
      title: 'Hospital Management Systems (HMS)',
      description: 'Direct API integration with existing hospital software',
      features: ['Real-time bed status updates', 'Patient admission/discharge tracking', 'Resource availability sync', 'Emergency alerts'],
      status: 'Active',
      icon: Database
    },
    {
      title: 'IoT Sensor Networks',
      description: 'Smart sensors for automated resource monitoring',
      features: ['Bed occupancy sensors', 'Equipment status monitoring', 'Environmental tracking', 'Predictive maintenance'],
      status: 'In Development',
      icon: Wifi
    },
    {
      title: 'Government Health APIs',
      description: 'Integration with national health information systems',
      features: ['Hospital verification', 'Compliance monitoring', 'Public health data', 'Emergency coordination'],
      status: 'Planned',
      icon: Globe
    },
    {
      title: 'AI & Machine Learning',
      description: 'Intelligent predictions and resource optimization',
      features: ['Demand forecasting', 'Resource allocation', 'Emergency response optimization', 'Predictive analytics'],
      status: 'Research Phase',
      icon: Bot
    }
  ];

  const architecture = [
    {
      layer: 'Presentation Layer',
      description: 'User interfaces for patients, hospitals, and administrators',
      components: ['Web Application', 'Mobile Apps', 'Hospital Dashboards', 'Admin Panels'],
      color: 'bg-blue-100 border-blue-300'
    },
    {
      layer: 'API Gateway',
      description: 'Secure API management and routing',
      components: ['Authentication', 'Rate Limiting', 'Request Routing', 'Response Caching'],
      color: 'bg-green-100 border-green-300'
    },
    {
      layer: 'Business Logic',
      description: 'Core application logic and processing',
      components: ['Hospital Management', 'Resource Tracking', 'Emergency Protocols', 'Notification System'],
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      layer: 'Data Layer',
      description: 'Data storage and management',
      components: ['PostgreSQL Database', 'Real-time Sync', 'Data Validation', 'Backup Systems'],
      color: 'bg-purple-100 border-purple-300'
    },
    {
      layer: 'Integration Layer',
      description: 'External system connections',
      components: ['HMS APIs', 'IoT Sensors', 'Government Systems', 'Third-party Services'],
      color: 'bg-red-100 border-red-300'
    }
  ];

  const futureRoadmap = [
    {
      phase: 'Phase 1: Foundation (2025)',
      items: ['Complete HMS integration', 'Mobile app launch', 'Real-time notifications', 'Basic analytics dashboard']
    },
    {
      phase: 'Phase 2: Intelligence (2026)',
      items: ['AI-powered predictions', 'IoT sensor integration', 'Advanced analytics', 'Automated resource allocation']
    },
    {
      phase: 'Phase 3: Expansion (2027)',
      items: ['Blockchain integration', 'International expansion', 'Telemedicine features', 'Advanced security protocols']
    },
    {
      phase: 'Phase 4: Innovation (2028+)',
      items: ['AR/VR interfaces', 'Quantum computing research', 'Global health network', 'Next-gen healthcare solutions']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Cpu className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl font-bold mb-6">Technology & Innovation</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Powered by cutting-edge technology, Hospify leverages real-time data processing, 
              AI-driven insights, and seamless integrations to revolutionize healthcare accessibility.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern, scalable technologies to ensure reliability, security, and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techStack.map((stack, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <stack.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{stack.category}</h3>
                </div>
                <div className="space-y-4">
                  {stack.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="border-l-4 border-blue-200 pl-4">
                      <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Architecture */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">System Architecture</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scalable, secure, and maintainable architecture designed for high availability and performance
            </p>
          </div>

          <div className="space-y-4">
            {architecture.map((layer, index) => (
              <div key={index} className={`${layer.color} border-2 rounded-xl p-6`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{layer.layer}</h3>
                    <p className="text-gray-700">{layer.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((component, componentIndex) => (
                      <span key={componentIndex} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">System Integrations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamless connections with existing healthcare infrastructure and emerging technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <integration.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{integration.title}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    integration.status === 'Active' ? 'bg-green-100 text-green-800' :
                    integration.status === 'In Development' ? 'bg-yellow-100 text-yellow-800' :
                    integration.status === 'Planned' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{integration.description}</p>
                <div className="space-y-2">
                  {integration.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Security & Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Healthcare-grade security measures to protect sensitive patient and hospital data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data Encryption</h3>
              <p className="text-gray-600 text-sm">End-to-end encryption for all data in transit and at rest</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">HIPAA Compliance</h3>
              <p className="text-gray-600 text-sm">Full compliance with healthcare data protection regulations</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600 text-sm">24/7 security monitoring and threat detection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Future Roadmap */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our vision for the future of healthcare technology and platform evolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureRoadmap.map((phase, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{phase.phase}</h3>
                <div className="space-y-3">
                  {phase.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in Our Technology?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Learn more about our technical implementation, contribute to our open-source components, 
            or explore partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
              View Documentation
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Technical Partnership
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};