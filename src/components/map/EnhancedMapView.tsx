import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, AlertCircle, Filter } from 'lucide-react';
import { HospitalProfile, BedAvailability } from '../../types/hospital';

declare global {
  interface Window {
    google: any;
    initGoogleMap: () => void;
  }
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface EnhancedMapViewProps {
  hospitals: HospitalProfile[];
  availability: { [key: string]: BedAvailability };
  userLocation?: UserLocation;
  selectedHospital?: HospitalProfile;
  onHospitalSelect?: (hospital: HospitalProfile) => void;
  maxDistance?: number;
  maxResults?: number;
}

export const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({
  hospitals,
  availability,
  userLocation,
  selectedHospital,
  onHospitalSelect,
  maxDistance = 50,
  maxResults = 40
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [userMarker, setUserMarker] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'icu' | 'general' | 'oxygen'>('all');

  const API_KEY = 'AIzaSyD-hTQrtpPYyQZ49NhuMFAppgacyO89LBA';
  const DEFAULT_CENTER = { lat: 18.5204, lng: 73.8567 }; // Pune center

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (map && hospitals.length > 0) {
      updateMarkers();
      // Adjust map bounds to show all hospitals
      adjustMapBounds();
    }
  }, [map, hospitals, availability, filterType]);

  useEffect(() => {
    if (userLocation && map) {
      addUserLocationMarker();
    }
  }, [userLocation, map]);

  useEffect(() => {
    if (selectedHospital && map) {
      // Focus on selected hospital
      map.setCenter({ 
        lat: selectedHospital.location.latitude, 
        lng: selectedHospital.location.longitude 
      });
      map.setZoom(15);
      
      // Find and trigger click on the corresponding marker
      const marker = markers.find(m => {
        const pos = m.getPosition();
        return pos && 
               Math.abs(pos.lat() - selectedHospital.location.latitude) < 0.001 &&
               Math.abs(pos.lng() - selectedHospital.location.longitude) < 0.001;
      });
      
      if (marker && window.google && window.google.maps && window.google.maps.event) {
        window.google.maps.event.trigger(marker, 'click');
      }
    }
  }, [selectedHospital, map, markers]);

  const loadGoogleMaps = () => {
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }

    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.addEventListener('load', initializeMap);
      return;
    }

    setIsLoading(true);
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initGoogleMap`;
    script.async = true;
    script.defer = true;
    
    // Set up global callback
    window.initGoogleMap = () => {
      initializeMap();
    };
    
    script.onerror = () => {
      setError('Failed to load Google Maps. Please check your internet connection or API key.');
      setIsLoading(false);
    };
    
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current) return;

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : DEFAULT_CENTER,
        zoom: userLocation ? 12 : 11,
        styles: [
          {
            featureType: 'poi.medical',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ff6b6b' }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true
      });

      setMap(mapInstance);
      setIsLoading(false);
    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Failed to initialize map. Please refresh the page.');
      setIsLoading(false);
    }
  };

  const adjustMapBounds = () => {
    if (!map || hospitals.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    
    // Add user location to bounds if available
    if (userLocation) {
      bounds.extend(new window.google.maps.LatLng(userLocation.latitude, userLocation.longitude));
    }
    
    // Add hospital locations to bounds
    const hospitalsToShow = getFilteredHospitals().slice(0, maxResults);
    hospitalsToShow.forEach(hospital => {
      bounds.extend(new window.google.maps.LatLng(hospital.location.latitude, hospital.location.longitude));
    });

    // Fit map to bounds with padding
    map.fitBounds(bounds, { padding: 50 });
    
    // Ensure minimum zoom level
    const listener = window.google.maps.event.addListener(map, 'bounds_changed', () => {
      if (map.getZoom() > 15) {
        map.setZoom(15);
      }
      window.google.maps.event.removeListener(listener);
    });
  };

  const updateMarkers = () => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers: any[] = [];
    const filteredHospitals = getFilteredHospitals();

    // Limit to maxResults (40) hospitals
    const hospitalsToShow = filteredHospitals.slice(0, maxResults);

    console.log(`Showing ${hospitalsToShow.length} hospitals on map`);

    hospitalsToShow.forEach((hospital, index) => {
      const hospitalAvailability = availability[hospital.id];
      const availabilityColor = getAvailabilityColor(hospital, hospitalAvailability);

      const marker = new window.google.maps.Marker({
        position: { lat: hospital.location.latitude, lng: hospital.location.longitude },
        map: map,
        title: hospital.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: availabilityColor,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        },
        animation: window.google.maps.Animation.DROP,
        optimized: false
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(hospital, hospitalAvailability)
      });

      marker.addListener('click', () => {
        newMarkers.forEach(m => m.infoWindow?.close());
        infoWindow.open(map, marker);
        
        if (onHospitalSelect) {
          onHospitalSelect(hospital);
        }
      });

      marker.infoWindow = infoWindow;
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  const getFilteredHospitals = () => {
    if (filterType === 'all') return hospitals;

    return hospitals.filter(hospital => {
      const hospitalAvailability = availability[hospital.id];
      if (!hospitalAvailability) return false;

      switch (filterType) {
        case 'icu':
          return hospitalAvailability.icuBeds.available > 0;
        case 'general':
          return hospitalAvailability.generalBeds.available > 0;
        case 'oxygen':
          return hospitalAvailability.oxygenBeds.available > 0;
        default:
          return true;
      }
    });
  };

  const getAvailabilityColor = (hospital: HospitalProfile, hospitalAvailability?: BedAvailability) => {
    if (!hospitalAvailability) return '#6b7280'; // Gray for no data

    const totalAvailable = hospitalAvailability.icuBeds.available + 
                          hospitalAvailability.generalBeds.available + 
                          hospitalAvailability.oxygenBeds.available;
    
    const totalCapacity = hospitalAvailability.icuBeds.total + 
                         hospitalAvailability.generalBeds.total + 
                         hospitalAvailability.oxygenBeds.total;

    if (totalCapacity === 0) return '#6b7280';

    const availabilityRate = totalAvailable / totalCapacity;
    
    if (availabilityRate > 0.2) return '#10b981'; // Green
    if (availabilityRate > 0.1) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const addUserLocationMarker = () => {
    if (!userLocation || !map) return;

    if (userMarker) {
      userMarker.setMap(null);
    }

    const marker = new window.google.maps.Marker({
      position: { lat: userLocation.latitude, lng: userLocation.longitude },
      map: map,
      title: 'Your Location',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 15,
        fillColor: '#3b82f6',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 4
      },
      zIndex: 1000
    });

    // Add a circle to show search radius
    const circle = new window.google.maps.Circle({
      strokeColor: '#3b82f6',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: '#3b82f6',
      fillOpacity: 0.1,
      map: map,
      center: { lat: userLocation.latitude, lng: userLocation.longitude },
      radius: maxDistance * 1000 // Convert km to meters
    });

    setUserMarker(marker);
  };

  const createInfoWindowContent = (hospital: HospitalProfile, hospitalAvailability?: BedAvailability) => {
    const distance = userLocation ? 
      calculateDistance(userLocation.latitude, userLocation.longitude, hospital.location.latitude, hospital.location.longitude) : 
      null;

    return `
      <div style="max-width: 300px; padding: 12px;">
        <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${hospital.name}</h3>
        <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 14px;">${hospital.address}</p>
        <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 14px;">📞 <a href="tel:${hospital.phone}" style="color: #3b82f6; text-decoration: none;">${hospital.phone}</a></p>
        ${distance ? `<p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">📍 ${distance.toFixed(1)} km away</p>` : ''}
        ${hospital.isVerified ? '<p style="margin: 0 0 8px 0; color: #059669; font-size: 12px;">✓ Verified Hospital</p>' : ''}
        ${hospitalAvailability ? `
          <div style="background: #f9fafb; padding: 10px; border-radius: 6px; margin-top: 8px;">
            <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 500; color: #374151;">Real-time Availability:</p>
            <p style="margin: 0 0 3px 0; font-size: 12px; color: #6b7280;">ICU: ${hospitalAvailability.icuBeds.available}/${hospitalAvailability.icuBeds.total}</p>
            <p style="margin: 0 0 3px 0; font-size: 12px; color: #6b7280;">General: ${hospitalAvailability.generalBeds.available}/${hospitalAvailability.generalBeds.total}</p>
            <p style="margin: 0 0 3px 0; font-size: 12px; color: #6b7280;">Oxygen: ${hospitalAvailability.oxygenBeds.available}/${hospitalAvailability.oxygenBeds.total}</p>
            <p style="margin: 0; font-size: 12px; color: #6b7280;">Ambulances: ${hospitalAvailability.ambulances.available}/${hospitalAvailability.ambulances.total}</p>
          </div>
        ` : '<p style="margin: 0; font-size: 12px; color: #ef4444;">⚠️ Availability data not available</p>'}
      </div>
    `;
  };

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

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-red-600">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-semibold mb-2">Error loading map</p>
          <p className="text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Hospital Locations
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">All Hospitals</option>
              <option value="icu">ICU Available</option>
              <option value="general">General Beds Available</option>
              <option value="oxygen">Oxygen Beds Available</option>
            </select>
          </div>
          {userLocation && (
            <div className="flex items-center text-sm text-green-600">
              <Navigation className="h-4 w-4 mr-1" />
              <span>Location detected</span>
            </div>
          )}
          {isLoading && (
            <div className="flex items-center text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span>Loading map...</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading hospital map...</p>
              <p className="text-gray-500 text-sm mt-2">Preparing to show nearest {maxResults} hospitals</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-96" />
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
            <span className="text-gray-600">High Availability (&gt;20%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
            <span className="text-gray-600">Medium (10-20%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
            <span className="text-gray-600">Low (&lt;10%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-2" />
            <span className="text-gray-600">No Data</span>
          </div>
        </div>
        <span className="text-gray-500">
          Showing {Math.min(getFilteredHospitals().length, maxResults)} of {hospitals.length} hospitals
        </span>
      </div>

      {/* Hospital List Below Map */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
          Hospitals on Map
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({Math.min(getFilteredHospitals().length, maxResults)} shown)
          </span>
        </h4>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {getFilteredHospitals().slice(0, maxResults).map((hospital, index) => {
            const hospitalAvailability = availability[hospital.id];
            const distance = userLocation ? 
              calculateDistance(userLocation.latitude, userLocation.longitude, hospital.location.latitude, hospital.location.longitude) : 
              null;
            
            return (
              <div 
                key={hospital.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedHospital?.id === hospital.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => onHospitalSelect && onHospitalSelect(hospital)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{hospital.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">{hospital.city}, {hospital.state}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      {distance && (
                        <div className="flex items-center text-sm text-blue-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {distance.toFixed(1)} km
                        </div>
                      )}
                      {hospital.isVerified && (
                        <div className="flex items-center text-sm text-green-600">
                          <span>✓ Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {hospitalAvailability && (
                    <div className="ml-4 text-right">
                      <div className={`w-4 h-4 rounded-full ${
                        getAvailabilityColor(hospital, hospitalAvailability) === '#10b981' ? 'bg-green-500' :
                        getAvailabilityColor(hospital, hospitalAvailability) === '#f59e0b' ? 'bg-yellow-500' : 
                        getAvailabilityColor(hospital, hospitalAvailability) === '#ef4444' ? 'bg-red-500' : 'bg-gray-500'
                      }`} />
                      <p className="text-xs text-gray-500 mt-1">
                        ICU: {hospitalAvailability.icuBeds.available}/{hospitalAvailability.icuBeds.total}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};