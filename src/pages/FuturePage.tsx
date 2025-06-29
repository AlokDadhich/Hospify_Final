import React from 'react';
import { Rocket, Brain, Globe, Zap, Shield, Heart, Cpu, Smartphone, Database, Bot } from 'lucide-react';

export const FuturePage: React.FC = () => {
  const phases = [
    {
      phase: 'Phase 1: Real-time Integration',
      timeline: '2025',
      status: 'In Progress',
      description: 'Establishing direct connections with hospital management systems and IoT networks',
      goals: [
        'Connect 1,000+ hospitals via direct HMS APIs',
        'Deploy IoT sensor networks in 100+ hospitals',
        'Achieve 99.9% real-time data accuracy',
        'Launch mobile applications for iOS and Android'
      ],
      technologies: ['HMS API Integration', 'IoT Sensors', 'Real-time Database', 'Mobile Apps'],
      impact: 'Reduce emergency response time by 40%'
    },
    {
      phase: 'Phase 2: AI & Predictions',
      timeline: '2026-2027',
      status: 'Planned',
      description: 'Implementing machine learning for predictive analytics and intelligent resource allocation',
      goals: [
        'Deploy ML models for demand forecasting',
        'Implement predictive resource allocation',
        'Launch AI-powered emergency response optimization',
        'Integrate with national health information systems'
      ],
      technologies: ['Machine Learning', 'Predictive Analytics', 'AI Algorithms', 'Big Data Processing'],
      impact: 'Prevent 80% of resource shortages through prediction'
    },
    {
      phase: 'Phase 3: Smart Healthcare',
      timeline: '2028-2030',
      status: 'Vision',
      description: 'Creating an intelligent healthcare ecosystem with blockchain, telemedicine, and global connectivity',
      goals: [
        'Implement blockchain for secure health records',
        'Launch integrated telemedicine platform',
        'Expand to 10+ countries globally',
        'Achieve universal healthcare accessibility'
      ],
      technologies: ['Blockchain', 'Telemedicine', 'Global Networks', 'Quantum Computing'],
      impact: 'Save 1M+ lives annually through intelligent healthcare'
    }
  ];

  const innovations = [
    {
      icon: Brain,
      title: 'AI-Powered Healthcare Intelligence',
      description: 'Advanced machine learning algorithms that predict healthcare demands, optimize resource allocation, and provide intelligent insights for better patient outcomes.',
      features: [
        'Predictive demand forecasting',
        'Intelligent resource optimization',
        'Real-time decision support',
        'Automated emergency protocols'
      ],
      timeline: '2026-2027'
    },
    {
      icon: Shield,
      title: 'Blockchain Health Records',
      description: 'Secure, decentralized health record management that gives patients control over their data while enabling seamless healthcare provider access.',
      features: [
        'Patient-controlled data access',
        'Immutable health records',
        'Cross-provider interoperability',
        'Privacy-preserving analytics'
      ],
      timeline: '2028-2029'
    },
    {
      icon: Globe,
      title: 'Global Healthcare Network',
      description: 'A worldwide network connecting healthcare systems, enabling international medical collaboration and resource sharing during global health crises.',
      features: [
        'International hospital network',
        'Global emergency response',
        'Cross-border medical collaboration',
        'Universal health data standards'
      ],
      timeline: '2029-2030'
    },
    {
      icon: Smartphone,
      title: 'Next-Gen Mobile Health',
      description: 'Advanced mobile applications with AR/VR capabilities, voice assistants, and seamless integration with wearable health devices.',
      features: [
        'AR-guided hospital navigation',
        'Voice-activated emergency assistance',
        'Wearable device integration',
        'Personalized health insights'
      ],
      timeline: '2027-2028'
    }
  ];

  const impactGoals = [
    {
      metric: '1M+',
      description: 'Lives saved annually',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      metric: '60%',
      description: 'Reduction in emergency response time',
      icon: Zap,
      color: 'text-yellow-600'
    },
    {
      metric: '10,000+',
      description: 'Connected hospitals globally',
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      metric: '100%',
      description: 'Healthcare accessibility coverage',
      icon: Shield,
      color: 'text-green-600'
    }
  ];

  const technologies = [
    {
      name: 'Artificial Intelligence',
      description: 'Machine learning models for predictive healthcare analytics',
      applications: ['Demand forecasting', 'Resource optimization', 'Emergency prediction', 'Treatment recommendations'],
      maturity: 85
    },
    {
      name: 'Internet of Things (IoT)',
      description: 'Smart sensors and connected medical devices',
      applications: ['Bed monitoring', 'Equipment tracking', 'Environmental sensing', 'Patient monitoring'],
      maturity: 70
    },
    {
      name: 'Blockchain Technology',
      description: 'Secure, decentralized health record management',
      applications: ['Health records', 'Data security', 'Patient consent', 'Interoperability'],
      maturity: 40
    },
    {
      name: 'Quantum Computing',
      description: 'Advanced computing for complex healthcare problems',
      applications: ['Drug discovery', 'Genetic analysis', 'Complex modeling', 'Optimization'],
      maturity: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Rocket className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h1 className="text-5xl font-bold mb-6">The Future of Healthcare</h1>
            <p className="text-xl text-purple-100 max-w-4xl mx-auto leading-relaxed">
              Envisioning a world where technology eliminates barriers to healthcare access, 
              where AI predicts and prevents health crises, and where every person has 
              immediate access to life-saving medical resources.
            </p>
          </div>
        </div>
      </div>

      {/* Development Phases */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Development Roadmap</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our strategic approach to transforming healthcare accessibility through technology innovation
            </p>
          </div>

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mr-4">{phase.phase}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        phase.status === 'In Progress' ? 'bg-green-100 text-green-800' :
                        phase.status === 'Planned' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{phase.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Goals</h4>
                        <div className="space-y-2">
                          {phase.goals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-600">{goal}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-2">Timeline</h4>
                    <p className="text-2xl font-bold text-blue-600 mb-4">{phase.timeline}</p>
                    <h4 className="font-bold text-gray-900 mb-2">Expected Impact</h4>
                    <p className="text-gray-700 text-sm">{phase.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Innovations */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Future Innovations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Breakthrough technologies that will reshape how we access and deliver healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {innovations.map((innovation, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <innovation.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{innovation.title}</h3>
                    <p className="text-sm text-purple-600 font-medium">{innovation.timeline}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{innovation.description}</p>
                <div className="space-y-2">
                  {innovation.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Maturity */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Maturity</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current development status of key technologies in our roadmap
            </p>
          </div>

          <div className="space-y-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.name}</h3>
                    <p className="text-gray-600 text-sm">{tech.description}</p>
                  </div>
                  
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {tech.applications.map((app, appIndex) => (
                        <span key={appIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Maturity</span>
                      <span className="text-sm font-bold text-gray-900">{tech.maturity}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${tech.maturity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Impact Goals */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our 2030 Impact Goals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable outcomes we're working towards for a healthier, more accessible future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactGoals.map((goal, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <goal.icon className={`h-12 w-12 ${goal.color}`} />
                </div>
                <div className={`text-4xl font-bold mb-2 ${goal.color}`}>{goal.metric}</div>
                <p className="text-gray-600 font-medium">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Shape the Future with Us</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join us in building the future of healthcare technology. Whether you're a developer, 
            healthcare professional, or visionary, there's a place for you in our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200 shadow-lg">
              Join Our Innovation Team
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-200">
              Explore Partnerships
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};