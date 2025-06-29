import React from 'react';
import { MapPin, List, BarChart3, X, AlertCircle, Navigation, ChevronDown } from 'lucide-react';
import { HospitalProfile, BedAvailability, UserLocation } from '../types';
import { HospitalCard } from '../components/HospitalCard';
import { EnhancedMapView } from '../components/map/EnhancedMapView';
import { StatsOverview } from '../components/StatsOverview';

interface HomePageProps {
  hospitals: (HospitalProfile & { distance: number })[];
  availability: { [key: string]: BedAvailability };
  userLocation: UserLocation;
  locationDetected: boolean;
  searchRadius: number;
  setSearchRadius: (radius: number) => void;
  handleNearestHospital: () => void;
  locationError: string | null;
  setLocationError: (error: string | null) => void;
  dataLoading: boolean;
  activeView: 'list' | 'map' | 'stats';
  setActiveView: (view: 'list' | 'map' | 'stats') => void;
  hospitalsToShow: number;
  showingAll: boolean;
  handleShowMore: () => void;
  getHospitalsToDisplay: () => (HospitalProfile & { distance: number })[];
  selectedHospital?: HospitalProfile;
  handleHospitalSelect: (hospital: HospitalProfile) => void;
  displayHospitals: HospitalProfile[];
  viewButtons: Array<{ key: string; label: string; icon: any }>;
}

export const HomePage: React.FC<HomePageProps> = ({
  hospitals,
  availability,
  userLocation,
  locationDetected,
  searchRadius,
  setSearchRadius,
  handleNearestHospital,
  locationError,
  setLocationError,
  dataLoading,
  activeView,
  setActiveView,
  hospitalsToShow,
  showingAll,
  handleShowMore,
  getHospitalsToDisplay,
  selectedHospital,
  handleHospitalSelect,
  displayHospitals,
  viewButtons
}) => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with Future Vision */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">
            🏥 Hospify - Real-time Hospital Resource Tracking
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Revolutionizing healthcare accessibility through real-time data integration and AI-powered insights
          </p>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔄 Real-time Integration</h3>
              <p className="text-sm text-blue-100">Direct API connections with hospital management systems</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🤖 AI-Powered Predictions</h3>
              <p className="text-sm text-blue-100">Predictive analytics for resource availability</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">🌐 Nationwide Network</h3>
              <p className="text-sm text-blue-100">Connecting 10,000+ hospitals across India</p>
            </div>
          </div>

          {/* Future Vision */}
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">🚀 Our Vision for 2025-2030</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Phase 1: Real-time Integration (2025)</h4>
                <ul className="space-y-1 text-blue-100">
                  <li>• Direct HMS integration via APIs</li>
                  <li>• IoT sensor networks for bed monitoring</li>
                  <li>• Automated ambulance tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Phase 2: AI & Predictions (2026-2027)</h4>
                <ul className="space-y-1 text-blue-100">
                  <li>• ML-powered demand forecasting</li>
                  <li>• Intelligent resource allocation</li>
                  <li>• Emergency response optimization</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Phase 3: Smart Healthcare (2028-2030)</h4>
                <ul className="space-y-1 text-blue-100">
                  <li>• Blockchain for secure health records</li>
                  <li>• Telemedicine integration</li>
                  <li>• Global healthcare network</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Impact Goals</h4>
                <ul className="space-y-1 text-blue-100">
                  <li>• 50% reduction in emergency response time</li>
                  <li>• 1M+ lives saved annually</li>
                  <li>• Universal healthcare accessibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Integration Section */}
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 Real-time Data Integration</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Implementation</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Hospital Management System APIs</p>
                  <p className="text-sm text-gray-600">RESTful APIs for real-time bed availability updates</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">Supabase Real-time Database</p>
                  <p className="text-sm text-gray-600">Live data synchronization across all connected devices</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">GPS & Location Services</p>
                  <p className="text-sm text-gray-600">Precise hospital location and distance calculations</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Future Integrations</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">IoT Sensor Networks</p>
                  <p className="text-sm text-gray-600">Smart beds with occupancy sensors for instant updates</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">FHIR Standard Integration</p>
                  <p className="text-sm text-gray-600">Healthcare interoperability for seamless data exchange</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-gray-900">AI-Powered Analytics</p>
                  <p className="text-sm text-gray-600">Machine learning for predictive resource management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
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

      {/* Quick Actions Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNearestHospital}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
            >
              <Navigation className="h-4 w-4" />
              <span>Find Nearest Hospital</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Search Radius:</label>
              <select
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
                <option value={100}>100 km</option>
              </select>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            {locationDetected ? (
              <div className="flex items-center text-green-600">
                <Navigation className="h-4 w-4 mr-1" />
                <span>Location detected</span>
              </div>
            ) : (
              <span>Showing Pune area hospitals</span>
            )}
          </div>
        </div>
      </div>

      <StatsOverview hospitals={displayHospitals} availability={availability} />

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
            Showing {hospitalsToShow} of {hospitals.length} hospitals in Pune area
            {locationDetected && ` within ${searchRadius}km of your location`}
            {hospitals.length > 0 && hospitals[0] && ` (nearest: ${hospitals[0]?.distance?.toFixed(1)}km)`}
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
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {getHospitalsToDisplay().map((hospital) => (
                  <HospitalCard
                    key={hospital.id}
                    hospital={hospital}
                    availability={availability[hospital.id]}
                    distance={hospital.distance}
                    onClick={() => handleHospitalSelect(hospital)}
                  />
                ))}
              </div>
              
              {/* Show More Button */}
              {hospitals.length > 10 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleShowMore}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto transition-colors duration-200 shadow-lg"
                  >
                    <span>
                      {showingAll 
                        ? 'Show Less' 
                        : `Show More Hospitals (${hospitals.length - hospitalsToShow} remaining)`
                      }
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showingAll ? 'rotate-180' : ''}`} />
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    {showingAll 
                      ? `Showing all ${hospitals.length} hospitals`
                      : `Showing ${hospitalsToShow} of ${hospitals.length} hospitals`
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {activeView === 'map' && (
            <EnhancedMapView
              hospitals={displayHospitals}
              availability={availability}
              userLocation={userLocation}
              selectedHospital={selectedHospital}
              onHospitalSelect={handleHospitalSelect}
              maxDistance={searchRadius}
              maxResults={40}
            />
          )}

          {activeView === 'stats' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Pune Hospital Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Top Hospitals by Availability</h4>
                  <div className="space-y-3">
                    {displayHospitals.slice(0, 5).map((hospital) => {
                      const hospitalAvailability = availability[hospital.id];
                      const distance = hospitals.find(h => h.id === hospital.id)?.distance;
                      
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
                      <span className="font-bold text-green-600">{displayHospitals.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-900">Verified Hospitals</span>
                      <span className="font-bold text-blue-600">
                        {displayHospitals.filter(h => h.isVerified).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-gray-900">Last Updated</span>
                      <span className="font-bold text-yellow-600">Live</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-gray-900">Search Area</span>
                      <span className="font-bold text-purple-600">
                        {locationDetected ? `${searchRadius}km radius` : 'Pune City'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                      <span className="text-gray-900">Showing</span>
                      <span className="font-bold text-indigo-600">
                        {hospitalsToShow} of {hospitals.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {displayHospitals.length === 0 && !dataLoading && (
            <div className="text-center py-12">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hospitals found</h3>
              <p className="text-gray-600">
                {locationDetected 
                  ? `No hospitals found within ${searchRadius}km of your location. Try increasing the search radius.`
                  : 'Try enabling location services to find nearby hospitals.'
                }
              </p>
              {locationDetected && (
                <button
                  onClick={() => setSearchRadius(Math.min(searchRadius + 25, 100))}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Increase radius to {Math.min(searchRadius + 25, 100)}km
                </button>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
};