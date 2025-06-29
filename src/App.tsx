import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { AuthService } from './services/authService';
import { HospitalService } from './services/hospitalService';

// Components
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { HospitalCard } from './components/HospitalCard';
import { EmergencyModal } from './components/EmergencyModal';
import { EnhancedMapView } from './components/map/EnhancedMapView';
import { StatsOverview } from './components/StatsOverview';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { Footer } from './components/Footer';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { HospitalDashboard } from './components/dashboard/HospitalDashboard';

// Types and Utils
import { HospitalProfile, BedAvailability, SearchFilters as SearchFiltersType, UserLocation } from './types';
import { filterHospitals } from './utils/filters';
import { getCurrentLocation, findNearestHospitals } from './utils/geolocation';

// Icons
import { MapPin, List, BarChart3, X, AlertCircle, LogOut, Settings } from 'lucide-react';

function App() {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showAuth, setShowAuth] = useState(false);

  // Hospital data state
  const [hospitals, setHospitals] = useState<HospitalProfile[]>([]);
  const [availability, setAvailability] = useState<{ [key: string]: BedAvailability }>({});
  const [filteredHospitals, setFilteredHospitals] = useState<HospitalProfile[]>([]);
  
  // UI state
  const [filters, setFilters] = useState<SearchFiltersType>({
    city: '',
    pincode: '',
    resourceType: 'all',
    availabilityOnly: false,
    radius: 25
  });
  const [userLocation, setUserLocation] = useState<UserLocation | undefined>();
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalProfile | undefined>();
  const [activeView, setActiveView] = useState<'list' | 'map' | 'stats'>('list');
  const [hospitalsWithDistance, setHospitalsWithDistance] = useState<(HospitalProfile & { distance: number })[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Initialize auth listener
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  // Load hospital data
  useEffect(() => {
    loadHospitalData();
  }, []);

  // Filter hospitals when data or filters change
  useEffect(() => {
    const filtered = filterHospitals(hospitals, filters, availability);
    setFilteredHospitals(filtered);
    
    if (userLocation) {
      const withDistance = findNearestHospitals(filtered, userLocation, filters.radius);
      setHospitalsWithDistance(withDistance);
    } else {
      setHospitalsWithDistance(filtered.map(h => ({ ...h, distance: 0 })));
    }
  }, [hospitals, availability, filters, userLocation]);

  const loadHospitalData = async () => {
    try {
      setDataLoading(true);
      
      // Load from Supabase
      const hospitalData = await HospitalService.getAllHospitals();
      setHospitals(hospitalData);
      
      // Subscribe to real-time availability updates
      const unsubscribe = HospitalService.subscribeToAllBedAvailability((availabilityData) => {
        const availabilityMap: { [key: string]: BedAvailability } = {};
        availabilityData.forEach(item => {
          availabilityMap[item.hospitalId] = item;
        });
        setAvailability(availabilityMap);
      });

    } catch (error) {
      console.error('Error loading hospital data:', error);
      setHospitals([]);
      setAvailability({});
    } finally {
      setDataLoading(false);
    }
  };

  const handleNearestHospital = async () => {
    try {
      setLocationError(null);
      const location = await getCurrentLocation();
      setUserLocation(location);
      
      const nearest = findNearestHospitals(hospitals, location, filters.radius);
      setFilteredHospitals(nearest);
      setHospitalsWithDistance(nearest);
      
      if (nearest.length > 0) {
        setSelectedHospital(nearest[0]);
        setActiveView('map');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError('Unable to access your location. Please enable location services in your browser settings and try again.');
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
  };

  const handleSignOut = async () => {
    try {
      await AuthService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const viewButtons = [
    { key: 'list', label: 'List View', icon: List },
    { key: 'map', label: 'Map View', icon: MapPin },
    { key: 'stats', label: 'Statistics', icon: BarChart3 }
  ];

  // Show loading screen while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Hospital Dashboard Route (for authenticated hospital users)
  if (user && window.location.pathname === '/dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-lg border-b-2 border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Hospify</h1>
                  <p className="text-xs text-gray-600">Hospital Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {user.user_metadata?.display_name || user.email}</span>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
                >
                  <Settings className="h-4 w-4" />
                  <span>Public View</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <HospitalDashboard hospitalId="sample-hospital-id" />
      </div>
    );
  }

  // Auth Modal
  if (showAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {authMode === 'login' ? (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onSwitchToRegister={() => setAuthMode('register')}
            />
          ) : (
            <RegisterForm
              onSuccess={handleAuthSuccess}
              onSwitchToLogin={() => setAuthMode('login')}
            />
          )}
          
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAuth(false)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Back to public view
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Public Interface
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onEmergencyClick={() => setIsEmergencyModalOpen(true)}
        user={user}
        onAuthClick={() => setShowAuth(true)}
        onSignOut={handleSignOut}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Real-time Hospital Resource Tracking
          </h2>
          <p className="text-gray-600">
            Find available beds, ambulances, and medical resources in hospitals across India
          </p>
        </div>

        {locationError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">Location Access Required</p>
              <p className="text-red-700 text-sm mt-1">{locationError}</p>
            </div>
            <button
              onClick={() => setLocationError(null)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onNearestHospital={handleNearestHospital}
        />

        <StatsOverview hospitals={filteredHospitals} availability={availability} />

        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {viewButtons.map((button) => (
              <button
                key={button.key}
                onClick={() => setActiveView(button.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeView === button.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <button.icon className="h-4 w-4" />
                <span>{button.label}</span>
              </button>
            ))}
          </div>
        </div>

        {dataLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading hospital data...</p>
          </div>
        ) : (
          <>
            {activeView === 'list' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {hospitalsWithDistance.map((hospital) => (
                  <HospitalCard
                    key={hospital.id}
                    hospital={hospital}
                    availability={availability[hospital.id]}
                    distance={userLocation ? hospital.distance : undefined}
                  />
                ))}
              </div>
            )}

            {activeView === 'map' && (
              <EnhancedMapView
                hospitals={filteredHospitals}
                availability={availability}
                userLocation={userLocation}
                selectedHospital={selectedHospital}
                onHospitalSelect={setSelectedHospital}
                maxDistance={filters.radius}
                maxResults={40}
              />
            )}

            {activeView === 'stats' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Resource Availability by Hospital</h4>
                    <div className="space-y-3">
                      {filteredHospitals.slice(0, 5).map((hospital) => {
                        const hospitalAvailability = availability[hospital.id];
                        return (
                          <div key={hospital.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium text-gray-900 truncate">{hospital.name}</span>
                            <div className="flex space-x-2">
                              <span className="text-sm text-gray-600">
                                ICU: {hospitalAvailability?.icuBeds.available || 0}
                              </span>
                              <span className="text-sm text-gray-600">
                                General: {hospitalAvailability?.generalBeds.available || 0}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">System Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-900">Total Hospitals</span>
                        <span className="font-bold text-green-600">{filteredHospitals.length}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-900">Verified Hospitals</span>
                        <span className="font-bold text-blue-600">
                          {filteredHospitals.filter(h => h.isVerified).length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="text-gray-900">Last Updated</span>
                        <span className="font-bold text-yellow-600">Live</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {filteredHospitals.length === 0 && !dataLoading && (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
                <p className="text-gray-600">
                  {filters.city || filters.pincode 
                    ? `No hospitals found in ${filters.city || filters.pincode}. Try searching for a different city or expanding your search radius.`
                    : 'Try searching for a city or enabling location services to find nearby hospitals.'
                  }
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Additional Sections */}
      <AboutSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ResourcesSection />
      
      <Footer />

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
}

export default App;