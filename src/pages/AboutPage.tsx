import React from 'react';
import { Heart, Shield, Clock, Users, Award, Globe, Target, Lightbulb, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Live hospital data updated every 15 minutes through direct API integrations with hospital management systems.',
      details: ['Direct HMS integration', 'IoT sensor networks', 'Automated data validation', 'Real-time notifications']
    },
    {
      icon: Shield,
      title: 'Verified Information',
      description: 'All hospital data is verified through multiple sources including government health authorities and direct hospital partnerships.',
      details: ['Government verification', 'Hospital partnerships', 'Data accuracy checks', 'Continuous monitoring']
    },
    {
      icon: Heart,
      title: 'Emergency Ready',
      description: 'Optimized for emergency situations with instant access to nearest available medical facilities and resources.',
      details: ['Emergency protocols', 'Instant notifications', 'Priority routing', 'Crisis management']
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with input from healthcare professionals, patients, families, and emergency responders across India.',
      details: ['Healthcare professionals', 'Patient feedback', 'Emergency responders', 'Community input']
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Recognized by health ministries and trusted by over 100,000+ families nationwide with 99.9% uptime.',
      details: ['Ministry recognition', 'Industry awards', 'High reliability', 'Proven track record']
    },
    {
      icon: Globe,
      title: 'Nationwide Coverage',
      description: 'Currently covering 500+ cities across India with plans for international expansion to Southeast Asia.',
      details: ['500+ cities covered', 'Multi-language support', 'Regional partnerships', 'International expansion']
    }
  ];

  const milestones = [
    { year: '2023', title: 'Project Inception', description: 'Founded during COVID-19 to address hospital bed shortage crisis' },
    { year: '2024', title: 'Prototype Development', description: 'Built MVP with real-time data integration and launched in Pune' },
    { year: '2025', title: 'Hackathon Success', description: 'Won multiple hackathons and secured initial funding for expansion' },
    { year: '2026', title: 'AI Integration', description: 'Implementing machine learning for predictive analytics and resource optimization' },
    { year: '2027', title: 'National Rollout', description: 'Expanding to 1000+ cities with government partnership' },
    { year: '2030', title: 'Global Platform', description: 'International expansion and blockchain integration for secure health records' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About Hospify</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Born from the COVID-19 crisis, Hospify is revolutionizing healthcare accessibility through 
              real-time data integration, AI-powered insights, and community-driven innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  To democratize access to critical healthcare information by providing real-time visibility 
                  into hospital resources, enabling faster decision-making during medical emergencies, and 
                  ultimately saving lives through technology innovation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-1" />
                    <p className="text-gray-700">Reduce emergency response time by up to 60%</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 mt-1" />
                    <p className="text-gray-700">Eliminate uncertainty during critical medical situations</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-blue-600 mt-1" />
                    <p className="text-gray-700">Support healthcare systems with data-driven insights</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Impact Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-blue-100">Cities Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">2,500+</div>
                    <div className="text-blue-100">Partner Hospitals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">100K+</div>
                    <div className="text-blue-100">Lives Impacted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">99.9%</div>
                    <div className="text-blue-100">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Hospify is Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're not just another hospital finder. We're building the future of healthcare accessibility 
              through cutting-edge technology and real-world impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a hackathon idea to a nationwide platform - here's how we're transforming healthcare accessibility
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of the healthcare revolution. Whether you're a hospital, developer, or healthcare professional, 
            there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
              Partner with Us
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};