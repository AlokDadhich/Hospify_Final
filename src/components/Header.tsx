import React from 'react';
import { Activity, Phone, User, LogOut, Settings } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  onEmergencyClick: () => void;
  user?: FirebaseUser | null;
  onAuthClick?: () => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onEmergencyClick, 
  user, 
  onAuthClick, 
  onSignOut 
}) => {
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
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 text-sm">
                  Welcome, {user.displayName || user.email}
                </span>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
                >
                  <Settings className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={onSignOut}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
              >
                <User className="h-4 w-4" />
                <span>Hospital Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};