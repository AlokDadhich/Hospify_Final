import React from 'react';
import { Users, Heart, Award, MessageCircle, Star, UserPlus, Handshake, Globe } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const communityStats = [
    { icon: Users, count: '10,000+', label: 'Healthcare Workers' },
    { icon: Heart, count: '100K+', label: 'Families Served' },
    { icon: Award, count: '2,500+', label: 'Partner Hospitals' },
    { icon: Globe, count: '500+', label: 'Cities Covered' }
  ];

  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Emergency Medicine Physician',
      hospital: 'AIIMS New Delhi',
      content: 'Hospify has revolutionized how we communicate bed availability to the public. During the second wave of COVID-19, this platform helped us manage patient flow efficiently and saved countless lives.',
      rating: 5,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Patient Family Member',
      hospital: 'Mumbai',
      content: 'When my father had a heart attack at 2 AM, Hospify helped us find an available ICU bed within 10 minutes. The real-time updates gave us hope when we needed it most.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Ambulance Driver Suresh',
      role: 'Emergency Response Team',
      hospital: 'Delhi Emergency Services',
      content: 'As an ambulance driver, Hospify is my go-to app. I can quickly check which hospitals have available beds before starting the journey, saving precious time during emergencies.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Meera Patel',
      role: 'Healthcare Administrator',
      hospital: 'Fortis Healthcare',
      content: 'The platform has improved our hospital\'s visibility and helped us serve more patients efficiently. The verification system ensures data accuracy and builds public trust.',
      rating: 5,
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const communityPrograms = [
    {
      icon: UserPlus,
      title: 'Healthcare Heroes Program',
      description: 'Recognition and support for healthcare workers who go above and beyond in serving their communities.',
      benefits: ['Monthly recognition awards', 'Professional development opportunities', 'Exclusive networking events', 'Priority platform support']
    },
    {
      icon: Handshake,
      title: 'Hospital Partnership Network',
      description: 'Collaborative network of hospitals working together to improve healthcare accessibility and resource sharing.',
      benefits: ['Resource sharing protocols', 'Best practice sharing', 'Joint training programs', 'Emergency response coordination']
    },
    {
      icon: MessageCircle,
      title: 'Community Feedback Forum',
      description: 'Platform for patients, families, and healthcare workers to share feedback and suggestions for improvement.',
      benefits: ['Direct feedback channels', 'Feature request voting', 'Community-driven improvements', 'Regular feedback sessions']
    },
    {
      icon: Globe,
      title: 'Global Health Initiative',
      description: 'Expanding our mission globally to improve healthcare accessibility in developing countries.',
      benefits: ['International partnerships', 'Technology transfer', 'Capacity building programs', 'Global health advocacy']
    }
  ];

  const joinOptions = [
    {
      title: 'Healthcare Professionals',
      description: 'Join our network of healthcare heroes making a difference',
      features: ['Professional recognition', 'Networking opportunities', 'Training programs', 'Platform benefits'],
      action: 'Join as Healthcare Professional'
    },
    {
      title: 'Hospitals & Clinics',
      description: 'Partner with us to improve your community impact',
      features: ['Free platform access', 'Marketing support', 'Training & onboarding', 'Technical integration'],
      action: 'Become a Partner Hospital'
    },
    {
      title: 'Technology Contributors',
      description: 'Help us build the future of healthcare technology',
      features: ['Open source contributions', 'Technical mentorship', 'Innovation challenges', 'Career opportunities'],
      action: 'Contribute to Development'
    },
    {
      title: 'Community Advocates',
      description: 'Spread awareness and support our mission',
      features: ['Advocacy toolkit', 'Community events', 'Social media support', 'Volunteer opportunities'],
      action: 'Become an Advocate'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-5xl font-bold mb-6">Join Our Community</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Be part of a growing network of healthcare professionals, patients, families, and technology 
              enthusiasts working together to revolutionize healthcare accessibility across India and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Growing Community</h2>
            <p className="text-xl text-gray-600">Together, we're making healthcare more accessible for everyone</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl shadow-lg p-6">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="h-10 w-10 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.count}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Voices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from the healthcare heroes, patients, and families who are part of our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-blue-600">{testimonial.hospital}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Programs */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Community Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Special initiatives designed to support and empower our community members
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <program.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Program Benefits:</h4>
                  {program.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Options */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Join</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the way that best fits your role and interests in improving healthcare accessibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {joinOptions.map((option, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <div className="space-y-2 mb-6">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                  {option.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare heroes, patients, and advocates who are transforming healthcare accessibility together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
              Join Our Community
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