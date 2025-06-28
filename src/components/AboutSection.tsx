import React from 'react';
import { Heart, Shield, Clock, Users, Award, Globe } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Live hospital data updated every 15 minutes to ensure accuracy when you need it most.'
    },
    {
      icon: Shield,
      title: 'Verified Information',
      description: 'All hospital data is verified by our medical partners and government health authorities.'
    },
    {
      icon: Heart,
      title: 'Emergency Ready',
      description: 'Quick access to emergency contacts and nearest available medical facilities.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with input from healthcare professionals, patients, and emergency responders.'
    },
    {
      icon: Award,
      title: 'Trusted Platform',
      description: 'Recognized by health ministries and used by over 10,000+ families nationwide.'
    },
    {
      icon: Globe,
      title: 'Nationwide Coverage',
      description: 'Covering 500+ cities across India with plans for international expansion.'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Saving Lives Through Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            During the COVID-19 pandemic, countless lives were lost due to lack of real-time information 
            about hospital bed availability. Hospify was born from this crisis to ensure no family ever 
            faces the uncertainty of finding medical care when every second counts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                To democratize access to critical healthcare information by providing real-time visibility 
                into hospital resources, enabling faster decision-making during medical emergencies, and 
                ultimately saving lives through technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Reduce emergency response time by up to 60%</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Eliminate uncertainty during critical medical situations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Support healthcare systems with data-driven insights</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-6">Impact Statistics</h4>
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
                  <div className="text-3xl font-bold mb-2">50K+</div>
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
    </section>
  );
};