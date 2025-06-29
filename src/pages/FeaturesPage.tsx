import React from 'react';
import { MapPin, Smartphone, Globe, Bot, Shield, AlertCircle, Database, Wifi, Clock, Users, TrendingUp, Zap } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Map-Based Filtering',
      description: 'Intuitive visual map interface for easy navigation with comprehensive filtering options.',
      details: ['Interactive Google Maps integration', 'Filter by city, pincode, bed type', 'Ambulance availability filtering', 'Real-time location tracking'],
      color: 'bg-blue-100 text-blue-600',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Smartphone,
      title: 'Web-Based, Responsive Design',
      description: 'Runs on any device with minimal loading time, built for accessibility in low-resource areas.',
      details: ['Cross-platform compatibility', 'Mobile-first responsive design', 'Optimized for low bandwidth', 'Progressive Web App capabilities'],
      color: 'bg-green-100 text-green-600',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Globe,
      title: 'Multilingual & Inclusive',
      description: 'Future multilingual support for non-English speakers to enhance accessibility.',
      details: ['Hindi, English, and regional languages', 'Voice navigation support', 'Accessibility features for disabilities', 'Cultural sensitivity in design'],
      color: 'bg-purple-100 text-purple-600',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Bot,
      title: 'Predictive Analytics Potential',
      description: 'Future ML integration to forecast hospital demand surges and optimize resource allocation.',
      details: ['AI-powered demand forecasting', 'Resource optimization algorithms', 'Predictive emergency response', 'Historical trend analysis'],
      color: 'bg-orange-100 text-orange-600',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Shield,
      title: 'Scalable + Secure Architecture',
      description: 'Built with modern tech stack ensuring security, scalability, and real-time capability.',
      details: ['React + TypeScript frontend', 'Supabase real-time database', 'End-to-end encryption', 'HIPAA compliance ready'],
      color: 'bg-indigo-100 text-indigo-600',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: AlertCircle,
      title: 'Reduced Panic + Better Crisis Management',
      description: 'Displays verified, real-time resource availability to avert panic and build trust.',
      details: ['Verified hospital data', 'Real-time availability updates', 'Emergency protocol integration', 'Crisis communication tools'],
      color: 'bg-red-100 text-red-600',
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Database,
      title: 'Real-Time Data Integration',
      description: 'Direct API connections with Hospital Management Systems for instant data synchronization.',
      details: ['HMS API integration', 'Real-time database sync', 'Automated data validation', 'Live notification system'],
      color: 'bg-cyan-100 text-cyan-600',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Wifi,
      title: 'IoT Sensor Networks',
      description: 'Smart sensors for automated bed monitoring and equipment tracking.',
      details: ['Bed occupancy sensors', 'Equipment status monitoring', 'Environmental tracking', 'Automated alerts'],
      color: 'bg-yellow-100 text-yellow-600',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Clock,
      title: 'Emergency Response Optimization',
      description: 'AI-powered routing and resource allocation for faster emergency response.',
      details: ['Optimal hospital routing', 'Ambulance dispatch optimization', 'Emergency protocol automation', 'Response time tracking'],
      color: 'bg-pink-100 text-pink-600',
      image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Users,
      title: 'Community-Driven Platform',
      description: 'Built with input from healthcare professionals, patients, and emergency responders.',
      details: ['Healthcare professional feedback', 'Patient experience optimization', 'Emergency responder integration', 'Community health insights'],
      color: 'bg-teal-100 text-teal-600',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive analytics for hospitals and government health departments.',
      details: ['Resource utilization metrics', 'Demand forecasting reports', 'Performance benchmarking', 'Public health insights'],
      color: 'bg-emerald-100 text-emerald-600',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    },
    {
      icon: Zap,
      title: 'Instant Emergency Alerts',
      description: 'Real-time notifications and alerts for critical situations and resource changes.',
      details: ['Critical resource alerts', 'Emergency broadcast system', 'Hospital capacity warnings', 'Public health notifications'],
      color: 'bg-violet-100 text-violet-600',
      image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Medical Background */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop" 
            alt="Features background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Zap className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl font-bold mb-6">Platform Features</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Comprehensive features designed to revolutionize healthcare accessibility through 
              real-time data integration, AI-powered insights, and community-driven innovation.
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Data Integration Section with Background */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🔗 Real-time Data Integration</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamless integration with existing healthcare infrastructure for instant data synchronization
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <img 
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop" 
                alt="Data integration" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Current Implementation</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Hospital Management System APIs</h4>
                      <p className="text-gray-600">RESTful APIs for real-time bed availability updates and patient flow tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Supabase Real-time Database</h4>
                      <p className="text-gray-600">Live data synchronization across all connected devices with sub-second latency</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">GPS & Location Services</h4>
                      <p className="text-gray-600">Precise hospital location mapping and distance calculations for optimal routing</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Future Integrations</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">IoT Sensor Networks</h4>
                      <p className="text-gray-600">Smart beds with occupancy sensors for instant availability updates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">FHIR Standard Integration</h4>
                      <p className="text-gray-600">Healthcare interoperability for seamless data exchange between systems</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">AI-Powered Analytics</h4>
                      <p className="text-gray-600">Machine learning for predictive resource management and demand forecasting</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All 12 Features Grid with Images */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🚀 Key Features & Capabilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive platform capabilities designed to transform healthcare accessibility and emergency response
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`${feature.color} p-3 rounded-lg mr-4`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm mb-3">Key Capabilities:</h4>
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Specifications with Background */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies for maximum performance, security, and scalability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '99.9%', label: 'Platform Uptime', color: 'text-blue-600' },
              { metric: '<2s', label: 'Data Sync Speed', color: 'text-green-600' },
              { metric: '10K+', label: 'Concurrent Users', color: 'text-purple-600' },
              { metric: '24/7', label: 'Real-time Monitoring', color: 'text-orange-600' }
            ].map((spec, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <img 
                    src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
                    alt="Technical specs" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <div className={`text-3xl font-bold ${spec.color} mb-2`}>{spec.metric}</div>
                  <p className="text-gray-600">{spec.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action with Background */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop" 
            alt="Features call to action" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Experience the Future of Healthcare</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of hospitals and healthcare professionals already using Hospify to save lives 
            and improve patient outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};