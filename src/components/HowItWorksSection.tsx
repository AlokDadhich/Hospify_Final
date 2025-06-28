import React from 'react';
import { Search, MapPin, Phone, CheckCircle } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Search & Filter',
      description: 'Enter your location or use GPS to find nearby hospitals. Filter by bed type, ambulance availability, or specific medical services.',
      details: ['City or PIN code search', 'Resource-specific filtering', 'Distance-based results', 'Real-time availability']
    },
    {
      icon: MapPin,
      title: 'View Results',
      description: 'Browse hospitals on an interactive map or detailed list view. See real-time bed availability, contact information, and verified status.',
      details: ['Interactive map view', 'Detailed hospital cards', 'Live resource counts', 'Verified hospital badges']
    },
    {
      icon: Phone,
      title: 'Contact Hospital',
      description: 'Call hospitals directly or get directions. Access emergency contacts and ambulance services with one-click calling.',
      details: ['Direct hospital calling', 'GPS navigation', 'Emergency hotlines', 'Ambulance booking']
    },
    {
      icon: CheckCircle,
      title: 'Get Treatment',
      description: 'Arrive at the hospital with confidence knowing bed availability is confirmed. Our real-time updates ensure accuracy.',
      details: ['Confirmed availability', 'Reduced wait times', 'Better outcomes', 'Peace of mind']
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How Hospify Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding the right medical care shouldn't be complicated. Our streamlined process 
            gets you the information you need in just a few simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step number */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Key Features:</h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who trust Hospify for their medical emergency needs. 
            Start searching for hospitals in your area right now.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
            Find Hospitals Near Me
          </button>
        </div>
      </div>
    </section>
  );
};