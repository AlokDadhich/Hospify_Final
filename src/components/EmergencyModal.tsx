import React from 'react';
import { X, Phone, AlertTriangle, Heart, Car, Shield } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      service: 'National Emergency',
      number: '112',
      icon: AlertTriangle,
      color: 'bg-red-600',
      description: 'All-in-one emergency service'
    },
    {
      service: 'Medical Emergency',
      number: '108',
      icon: Heart,
      color: 'bg-pink-600',
      description: 'Ambulance & medical emergency'
    },
    {
      service: 'Police',
      number: '100',
      icon: Shield,
      color: 'bg-blue-600',
      description: 'Police emergency services'
    },
    {
      service: 'Fire Emergency',
      number: '101',
      icon: AlertTriangle,
      color: 'bg-orange-600',
      description: 'Fire brigade services'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            Emergency Contacts
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6 text-sm">
            In case of emergency, call the appropriate helpline number immediately.
          </p>
          
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${contact.color} p-3 rounded-full`}>
                    <contact.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{contact.service}</h3>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-600" />
                        <span className="font-bold text-lg text-blue-600">{contact.number}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Important Note</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  For immediate life-threatening emergencies, call 112 or 108 directly. 
                  Use this platform to find the nearest hospital with available resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};