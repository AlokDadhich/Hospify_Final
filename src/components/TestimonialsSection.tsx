import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
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
    },
    {
      name: 'Dr. Amit Singh',
      role: 'ICU Specialist',
      hospital: 'Apollo Hospital',
      content: 'During peak COVID times, Hospify prevented unnecessary patient transfers and reduced overcrowding. It\'s an essential tool for modern healthcare management.',
      rating: 5,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Anita Desai',
      role: 'Senior Citizen',
      hospital: 'Bangalore',
      content: 'The simple interface made it easy for me to find a hospital for my husband\'s dialysis appointment. The contact information was accurate and up-to-date.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Heroes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From doctors and nurses to patients and families, see how Hospify is making a 
            difference in healthcare accessibility across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-blue-600 mr-3" />
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

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h3>
            <p className="text-xl text-gray-600 mb-8">
              Be part of a growing network of healthcare professionals, patients, and families 
              working together to improve medical care accessibility.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
                <div className="text-gray-600">Partner Hospitals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">Healthcare Workers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                <div className="text-gray-600">Families Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};