import React from 'react';
import { Activity, Phone, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onEmergencyClick: () => void;
  user?: SupabaseUser | null;
  onAuthClick?: () => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onEmergencyClick, 
  user, 
  onAuthClick, 
  onSignOut 
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Mission', path: '/mission' },
    { name: 'Features', path: '/features' },
    { name: 'Technology', path: '/technology' },
    { name: 'Future', path: '/future' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hospify</h1>
              <p className="text-xs text-gray-600">Real-time Hospital Resources</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
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
                  Welcome, {user.user_metadata?.display_name || user.email}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="px-4 pt-4 border-t border-gray-200 space-y-3">
                <button
                  onClick={() => {
                    onEmergencyClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <Phone className="h-4 w-4" />
                  <span>Emergency</span>
                </button>
                
                {user ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 text-center">
                      Welcome, {user.user_metadata?.display_name || user.email}
                    </p>
                    <button
                      onClick={() => {
                        window.location.href = '/dashboard';
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        onSignOut?.();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onAuthClick?.();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
                  >
                    <User className="h-4 w-4" />
                    <span>Hospital Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};