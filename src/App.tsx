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
import { generateSampleHospitals, generateSampleAvailability } from './utils/sampleDataGenerator';

// Icons
import { MapPin, List, BarChart3, X, AlertCircle, LogOut, Settings } from 'lucide-react';

// Pune coordinates for default location
const PUNE_CENTER = { latitude: 18.5204, longitude: 73.8567 };

function App() {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showAuth, setShowAuth] = useState(false);

  // Hospital data state
  const [allHospitals, setAllHospitals] = useState<HospitalProfile[]>([]);
  const [hospitals, setHospitals] = useState<HospitalProfile[]>([]);
  const [availability, setAvailability] = useState<{ [key: string]: BedAvailability }>({});
  const [filteredHospitals, setFilteredHospitals] = useState<HospitalProfile[]>([]);
  
  // UI state
  const [filters, setFilters] = useState<SearchFiltersType>({
    city: 'Pune', // Default to Pune
    pincode: '',
    resourceType: 'all',
    availabilityOnly: false,
    radius: 50 // Default to 50km
  });
  const [userLocation, setUserLocation] = useState<UserLocation>(PUNE_CENTER); // Default to Pune
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalProfile | undefined>();
  const [activeView, setActiveView] = useState<'list' | 'map' | 'stats'>('list');
  const [hospitalsWithDistance, setHospitalsWithDistance] = useState<(HospitalProfile & { distance: number })[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [locationDetected, setLocationDetected] = useState(false);

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

  // Apply location-based filtering when user location or filters change
  useEffect(() => {
    if (userLocation && allHospitals.length > 0) {
      // Find hospitals within radius of Pune/user location
      const nearbyHospitals = findNearestHospitals(allHospitals, userLocation, filters.radius);
      const limitedHospitals = nearbyHospitals.slice(0, 50); // Show up to 50 hospitals
      
      console.log(`Found ${nearbyHospitals.length} hospitals within ${filters.radius}km of ${locationDetected ? 'your location' : 'Pune'}, showing ${limitedHospitals.length}`);
      
      setHospitals(limitedHospitals);
    } else {
      // Without location, show Pune hospitals
      const puneHospitals = allHospitals.filter(h => 
        h.city.toLowerCase().includes('pune') || 
        h.address.toLowerCase().includes('pune')
      ).slice(0, 50);
      setHospitals(puneHospitals);
    }
  }, [userLocation, allHospitals, filters.radius, locationDetected]);

  // Filter hospitals when data or filters change
  useEffect(() => {
    const filtered = filterHospitals(hospitals, filters, availability);
    setFilteredHospitals(filtered);
    
    // Update hospitals with distance for display
    if (userLocation) {
      const withDistance = filtered.map(hospital => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          hospital.location.latitude,
          hospital.location.longitude
        );
        return { ...hospital, distance };
      }).sort((a, b) => a.distance - b.distance);
      
      setHospitalsWithDistance(withDistance);
    } else {
      setHospitalsWithDistance(filtered.map(h => ({ ...h, distance: 0 })));
    }
  }, [hospitals, availability, filters, userLocation]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const loadHospitalData = async () => {
    try {
      setDataLoading(true);
      
      // Try to load from Supabase first
      const hospitalData = await HospitalService.getAllHospitals();
      
      if (hospitalData.length === 0) {
        // If no data in Supabase, generate Pune-focused sample data
        console.log('No hospital data found, generating Pune-focused sample data...');
        const sampleHospitals = generateSampleHospitals(120); // Generate more hospitals for better coverage
        const sampleAvailability = generateSampleAvailability(sampleHospitals);
        
        setAllHospitals(sampleHospitals);
        
        // Convert availability array to object
        const availabilityMap: { [key: string]: BedAvailability } = {};
        sampleAvailability.forEach(item => {
          availabilityMap[item.hospitalId] = item;
        });
        setAvailability(availabilityMap);
      } else {
        setAllHospitals(hospitalData);
        
        // Subscribe to real-time availability updates
        const unsubscribe = HospitalService.subscribeToAllBedAvailability((availabilityData) => {
          const availabilityMap: { [key: string]: BedAvailability } = {};
          availabilityData.forEach(item => {
            availabilityMap[item.hospitalId] = item;
          });
          setAvailability(availabilityMap);
        });
      }
    } catch (error) {
      console.error('Error loading hospital data:', error);
      // Fallback to Pune-focused sample data
      const sampleHospitals = generateSampleHospitals(120);
      const sampleAvailability = generateSampleAvailability(sampleHospitals);
      
      setAllHospitals(sampleHospitals);
      
      const availabilityMap: { [key: string]: BedAvailability } = {};
      sampleAvailability.forEach(item => {
        availabilityMap[item.hospitalId] = item;
      });
      setAvailability(availabilityMap);
    } finally {
      setDataLoading(false);
    }
  };

  const handleNearestHospital = async () => {
    try {
      setLocationError(null);
      const location = await getCurrentLocation();
      setUserLocation(location);
      setLocationDetected(true);
      
      // The useEffect will handle filtering hospitals by location
      if (filteredHospitals.length > 0) {
        setSelectedHospital(filteredHospitals[0]);
        setActiveView('map');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationError('Unable to access your location. Showing hospitals in Pune area. Enable location services for more accurate results.');
      // Keep using Pune as default location
      setUserLocation(PUNE_CENTER);
      setLocationDetected(false);
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

  // Handle hospital selection from map
  const handleHospitalSelect = (hospital: HospitalProfile) => {
    setSelectedHospital(hospital);
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
        
        <HospitalDashboard 
          hospitalId="sample-hospital-id" 
          onDataUpdate={(updatedAvailability) => {
            // Update the availability state when hospital updates data
            setAvailability(prev => ({
              ...prev,
              [updatedAvailability.hospitalId]: updatedAvailability
            }));
          }}
        />
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
            Real-time Hospital Resource Tracking - Pune
          </h2>
          <p className="text-gray-600">
            Find available beds, ambulances, and medical resources in hospitals around Pune
          </p>
        </div>

        {locationError && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-yellow-800 font-medium">Location Notice</p>
              <p className="text-yellow-700 text-sm mt-1">{locationError}</p>
            </div>
            <button
              onClick={() => setLocationError(null)}
              className="text-yellow-500 hover:text-yellow-700 transition-colors"
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
          <div className="flex justify-between items-center">
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
            <div className="text-sm text-gray-500">
              Showing {filteredHospitals.length} hospitals in Pune area
              {locationDetected && ` within ${filters.radius}km of your location`}
              {filteredHospitals.length > 0 && hospitalsWithDistance[0] && ` (nearest: ${hospitalsWithDistance[0]?.distance?.toFixed(1)}km)`}
            </div>
          </div>
        </div>

        {dataLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Pune hospital data...</p>
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
                    distance={hospital.distance}
                    onClick={() => handleHospitalSelect(hospital)}
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
                onHospitalSelect={handleHospitalSelect}
                maxDistance={filters.radius}
                maxResults={50}
              />
            )}

            {activeView === 'stats' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Pune Hospital Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Top Hospitals by Availability</h4>
                    <div className="space-y-3">
                      {filteredHospitals.slice(0, 5).map((hospital) => {
                        const hospitalAvailability = availability[hospital.id];
                        const distance = hospitalsWithDistance.find(h => h.id === hospital.id)?.distance;
                        
                        return (
                          <div key={hospital.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <span className="font-medium text-gray-900 truncate block">{hospital.name}</span>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{hospital.address.split(',')[1]?.trim()}</span>
                                {distance && <span>• {distance.toFixed(1)}km away</span>}
                              </div>
                            </div>
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
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-gray-900">Search Area</span>
                        <span className="font-bold text-purple-600">
                          {locationDetected ? `${filters.radius}km radius` : 'Pune City'}
                        </span>
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
                  {locationDetected 
                    ? `No hospitals found within ${filters.radius}km of your location. Try increasing the search radius.`
                    : 'Try adjusting your search filters or enabling location services to find nearby hospitals.'
                  }
                </p>
                {locationDetected && (
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, radius: Math.min(prev.radius + 25, 100) }))}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Increase radius to {Math.min(filters.radius + 25, 100)}km
                  </button>
                )}
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