import React from 'react';
import { Target, Heart, Globe, Users, Zap, Shield, Award, TrendingUp } from 'lucide-react';

export const MissionPage: React.FC = () => {
  const coreValues = [
    {
      icon: Heart,
      title: 'Life First',
      description: 'Every decision we make is guided by our commitment to saving lives and improving health outcomes.',
      examples: ['Emergency response optimization', 'Critical care prioritization', 'Patient-centered design']
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We build trust through verified data, transparent processes, and reliable service delivery.',
      examples: ['Data verification protocols', 'Open source components', 'Regular audits and reporting']
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'We believe in the power of community and work to ensure healthcare accessibility for all.',
      examples: ['Rural hospital inclusion', 'Multi-language support', 'Community feedback integration']
    },
    {
      icon: Zap,
      title: 'Innovation Excellence',
      description: 'We leverage cutting-edge technology to solve real-world healthcare challenges.',
      examples: ['AI-powered predictions', 'Real-time data processing', 'Mobile-first design']
    }
  ];

  const goals = [
    {
      category: 'Immediate Goals (2025)',
      items: [
        'Connect 1,000+ hospitals across 10 states',
        'Achieve 99.9% platform uptime',
        'Reduce average emergency response time by 40%',
        'Launch mobile applications for iOS and Android'
      ]
    },
    {
      category: 'Short-term Goals (2025-2027)',
      items: [
        'Implement AI-powered predictive analytics',
        'Integrate with government health systems',
        'Expand to 5,000+ hospitals nationwide',
        'Launch telemedicine integration features'
      ]
    },
    {
      category: 'Long-term Vision (2027-2030)',
      items: [
        'Become the primary healthcare resource platform in India',
        'Expand to Southeast Asian markets',
        'Integrate blockchain for secure health records',
        'Achieve 1 million+ lives saved milestone'
      ]
    }
  ];

  const impact = [
    { metric: '60%', description: 'Reduction in emergency response time', icon: Zap },
    { metric: '100K+', description: 'Lives positively impacted', icon: Heart },
    { metric: '2,500+', description: 'Partner hospitals', icon: Globe },
    { metric: '99.9%', description: 'Platform reliability', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Target className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              To democratize healthcare accessibility through real-time data integration, 
              AI-powered insights, and community-driven innovation, ensuring that no one 
              dies due to lack of information about available medical resources.
            </p>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Problem We're Solving</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Healthcare Crisis During COVID-19</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  During the COVID-19 pandemic, countless lives were lost not due to lack of medical facilities, 
                  but due to lack of real-time information about bed availability, oxygen supplies, and other 
                  critical resources. Families spent precious hours calling hospitals, driving from one facility 
                  to another, while their loved ones' conditions deteriorated.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Patients died while searching for available ICU beds</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Hospitals had beds but no way to communicate availability</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Emergency services lacked real-time resource information</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Information asymmetry led to resource misallocation</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Solution</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hospify bridges this critical information gap by providing real-time visibility into hospital 
                  resources, enabling faster decision-making during medical emergencies, and creating a 
                  transparent ecosystem where healthcare resources can be optimally utilized.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Real-time bed availability across all hospitals</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Instant access to critical resource information</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">AI-powered predictions for resource planning</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">Seamless integration with existing hospital systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every feature we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{value.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{value.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Examples:</h4>
                  {value.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals & Roadmap */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Goals & Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our strategic roadmap for transforming healthcare accessibility across India and beyond
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {goals.map((goalCategory, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{goalCategory.category}</h3>
                <div className="space-y-4">
                  {goalCategory.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measuring success through real-world impact on healthcare accessibility and patient outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="h-10 w-10 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">{item.metric}</div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Together, we can build a future where healthcare accessibility is never a barrier to saving lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
              Become a Partner
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Support Our Cause
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};