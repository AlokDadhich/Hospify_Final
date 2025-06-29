import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { AuthService } from './services/authService';
import { HospitalService } from './services/hospitalService';

// Components
import { Header } from './components/Header';
import { HospitalCard } from './components/HospitalCard';
import { EmergencyModal } from './components/EmergencyModal';
import { EnhancedMapView } from './components/map/EnhancedMapView';
import { StatsOverview } from './components/StatsOverview';
import { Footer } from './components/Footer';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { HospitalDashboard } from './components/dashboard/HospitalDashboard';

// New Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MissionPage } from './pages/MissionPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { FuturePage } from './pages/FuturePage';

// Types and Utils
import { HospitalProfile, BedAvailability, UserLocation } from './types';
import { getCurrentLocation, findNearestHospitals } from './utils/geolocation';
import { generateSampleHospitals, generateSampleAvailability } from './utils/sampleDataGenerator';

// Icons
import { MapPin, List, BarChart3, X, AlertCircle, LogOut, Settings, Navigation, ChevronDown } from 'lucide-react';

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
  const [displayHospitals, setDisplayHospitals] = useState<HospitalProfile[]>([]); // Hospitals to show in list/map
  
  // UI state
  const [userLocation, setUserLocation] = useState<UserLocation>(PUNE_CENTER); // Default to Pune
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalProfile | undefined>();
  const [activeView, setActiveView] = useState<'list' | 'map' | 'stats'>('list');
  const [hospitalsWithDistance, setHospitalsWithDistance] = useState<(HospitalProfile & { distance: number })[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [locationDetected, setLocationDetected] = useState(false);
  const [searchRadius, setSearchRadius] = useState(50); // Default 50km radius
  
  // Pagination state
  const [hospitalsToShow, setHospitalsToShow] = useState(10); // Start with 10 hospitals

  // Initialize auth listener and ensure clean state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First, ensure we're signed out to start fresh
        await AuthService.signOut();
        
        // Set up auth state listener
        const unsubscribe = AuthService.onAuthStateChanged((user) => {
          setUser(user);
          setAuthLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.warn('Auth initialization warning:', error);
        setAuthLoading(false);
      }
    };

    const unsubscribePromise = initializeAuth();
    
    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, []);

  // Load hospital data
  useEffect(() => {
    loadHospitalData();
  }, []);

  // Apply location-based filtering when user location changes
  useEffect(() => {
    if (userLocation && allHospitals.length > 0) {
      // Find hospitals within radius of Pune/user location
      const nearbyHospitals = findNearestHospitals(allHospitals, userLocation, searchRadius);
      const limitedHospitals = nearbyHospitals.slice(0, 50); // Show up to 50 hospitals
      
      console.log(`Found ${nearbyHospitals.length} hospitals within ${searchRadius}km of ${locationDetected ? 'your location' : 'Pune'}, showing ${limitedHospitals.length}`);
      
      setHospitals(limitedHospitals);
      setDisplayHospitals(limitedHospitals.slice(0, 40)); // Limit to 40 for display
      
      // Update hospitals with distance for display
      const withDistance = limitedHospitals.slice(0, 40).map(hospital => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          hospital.location.latitude,
          hospital.location.longitude
        );
        return { ...hospital, distance };
      }).sort((a, b) => a.distance - b.distance);
      
      setHospitalsWithDistance(withDistance);
      
      // Reset pagination when location changes
      setHospitalsToShow(10);
    } else {
      // Without location, show Pune hospitals
      const puneHospitals = allHospitals.filter(h => 
        h.city.toLowerCase().includes('pune') || 
        h.address.toLowerCase().includes('pune')
      ).slice(0, 50);
      setHospitals(puneHospitals);
      setDisplayHospitals(puneHospitals.slice(0, 40));
      setHospitalsWithDistance(puneHospitals.slice(0, 40).map(h => ({ ...h, distance: 0 })));
      
      // Reset pagination
      setHospitalsToShow(10);
    }
  }, [userLocation, allHospitals, searchRadius, locationDetected]);

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
      if (displayHospitals.length > 0) {
        setSelectedHospital(displayHospitals[0]);
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
      // Force reload to ensure clean state
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Handle hospital selection from map or list
  const handleHospitalSelect = (hospital: HospitalProfile) => {
    setSelectedHospital(hospital);
  };

  // Handle show more hospitals
  const handleShowMore = () => {
    const showingAll = hospitalsToShow >= hospitalsWithDistance.length;
    if (showingAll) {
      setHospitalsToShow(10);
    } else {
      setHospitalsToShow(hospitalsWithDistance.length);
    }
  };

  // Get hospitals to display based on current pagination
  const getHospitalsToDisplay = () => {
    return hospitalsWithDistance.slice(0, hospitalsToShow);
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

  // Router for different pages
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onEmergencyClick={() => setIsEmergencyModalOpen(true)}
          user={user}
          onAuthClick={() => setShowAuth(true)}
          onSignOut={handleSignOut}
        />
        
        <Routes>
          <Route path="/" element={
            <HomePage 
              hospitals={hospitalsWithDistance}
              availability={availability}
              userLocation={userLocation}
              locationDetected={locationDetected}
              searchRadius={searchRadius}
              setSearchRadius={setSearchRadius}
              handleNearestHospital={handleNearestHospital}
              locationError={locationError}
              setLocationError={setLocationError}
              dataLoading={dataLoading}
              activeView={activeView}
              setActiveView={setActiveView}
              hospitalsToShow={hospitalsToShow}
              showingAll={hospitalsToShow >= hospitalsWithDistance.length}
              handleShowMore={handleShowMore}
              getHospitalsToDisplay={getHospitalsToDisplay}
              selectedHospital={selectedHospital}
              handleHospitalSelect={handleHospitalSelect}
              displayHospitals={displayHospitals}
              viewButtons={viewButtons}
            />
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/future" element={<FuturePage />} />
          <Route path="/dashboard" element={
            user ? (
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
                        <span className="text-gray-700">
                          Welcome, {user.user_metadata?.hospital_name || 'Hospital Admin'}
                        </span>
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
            ) : (
              <Navigate to="/" replace />
            )
          } />
        </Routes>

        <Footer />

        <EmergencyModal
          isOpen={isEmergencyModalOpen}
          onClose={() => setIsEmergencyModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;