import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchFilters } from './components/SearchFilters';
import { HospitalCard } from './components/HospitalCard';
import { EmergencyModal } from './components/EmergencyModal';
import { MapView } from './components/MapView';
import { StatsOverview } from './components/StatsOverview';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { Footer } from './components/Footer';
import { mockHospitals } from './data/mockHospitals';
import { filterHospitals } from './utils/filters';
import { getCurrentLocation, findNearestHospitals } from './utils/geolocation';
import { Hospital, SearchFilters as SearchFiltersType, UserLocation } from './types';
import { MapPin, List, BarChart3, X, AlertCircle } from 'lucide-react';

function App() {
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>(mockHospitals);
  const [filters, setFilters] = useState<SearchFiltersType>({
    city: '',
    pincode: '',
    resourceType: 'all',
    availabilityOnly: false,
    radius: 25
  });
  const [userLocation, setUserLocation] = useState<UserLocation | undefined>();
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | undefined>();
  const [activeView, setActiveView] = useState<'list' | 'map' | 'stats'>('list');
  const [hospitalsWithDistance, setHospitalsWithDistance] = useState<(Hospital & { distance: number })[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const filtered = filterHospitals(hospitals, filters);
    setFilteredHospitals(filtered);
    
    if (userLocation) {
      const withDistance = findNearestHospitals(filtered, userLocation, filters.radius);
      setHospitalsWithDistance(withDistance);
    } else {
      setHospitalsWithDistance(filtered.map(h => ({ ...h, distance: 0 })));
    }
  }, [hospitals, filters, userLocation]);

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

  const viewButtons = [
    { key: 'list', label: 'List View', icon: List },
    { key: 'map', label: 'Map View', icon: MapPin },
    { key: 'stats', label: 'Statistics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onEmergencyClick={() => setIsEmergencyModalOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Real-time Hospital Resource Tracking
          </h2>
          <p className="text-gray-600">
            Find available beds, ambulances, and medical resources in hospitals near you
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

        <StatsOverview hospitals={filteredHospitals} />

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

        {activeView === 'list' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {hospitalsWithDistance.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                distance={userLocation ? hospital.distance : undefined}
              />
            ))}
          </div>
        )}

        {activeView === 'map' && (
          <MapView
            hospitals={filteredHospitals}
            userLocation={userLocation}
            selectedHospital={selectedHospital}
            onHospitalSelect={setSelectedHospital}
          />
        )}

        {activeView === 'stats' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Resource Availability by Hospital</h4>
                <div className="space-y-3">
                  {filteredHospitals.slice(0, 5).map((hospital) => (
                    <div key={hospital.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900 truncate">{hospital.name}</span>
                      <div className="flex space-x-2">
                        <span className="text-sm text-gray-600">
                          ICU: {hospital.resources.icuBeds.available}
                        </span>
                        <span className="text-sm text-gray-600">
                          General: {hospital.resources.generalBeds.available}
                        </span>
                      </div>
                    </div>
                  ))}
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

        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600">
              Try adjusting your search filters or increasing the search radius.
            </p>
          </div>
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