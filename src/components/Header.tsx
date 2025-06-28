import React from 'react';
import { Activity, Phone, MapPin } from 'lucide-react';

interface HeaderProps {
  onEmergencyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onEmergencyClick }) => {
  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hospify</h1>
              <p className="text-xs text-gray-600">Real-time Hospital Resources</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onEmergencyClick}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>Emergency</span>
            </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Hospital Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};