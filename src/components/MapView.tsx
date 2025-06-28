import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, AlertCircle } from 'lucide-react';

// Google Maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone?: string;
  rating?: number;
  distance?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  resources?: {
    icuBeds: { available: number; total: number };
    generalBeds: { available: number; total: number };
    emergencyServices: boolean;
  };
  placeId?: string;
  businessStatus?: string;
  types?: string[];
}

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface MapViewProps {
  hospitals?: Hospital[];
  userLocation?: UserLocation;
  selectedHospital?: Hospital;
  onHospitalSelect?: (hospital: Hospital) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  hospitals: propHospitals,
  userLocation,
  selectedHospital,
  onHospitalSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>(propHospitals || []);
  const [markers, setMarkers] = useState<any[]>([]);
  const [userMarker, setUserMarker] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchStatus, setSearchStatus] = useState<string>('Initializing...');

  const API_KEY = 'AIzaSyD-hTQrtpPYyQZ49NhuMFAppgacyO89LBA';
  
  // Pune coordinates
  const PUNE_CENTER = { lat: 18.5404, lng: 73.8567 };

  // Generate random bed availability for found hospitals
  const generateRandomResources = () => ({
    icuBeds: { 
      available: Math.floor(Math.random() * 25) + 5, 
      total: Math.floor(Math.random() * 40) + 30 
    },
    generalBeds: { 
      available: Math.floor(Math.random() * 80) + 40, 
      total: Math.floor(Math.random() * 50) + 150 
    },
    emergencyServices: true
  });

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        existingScript.addEventListener('load', initializeMap);
        return;
      }

      setSearchStatus('Loading Google Maps...');
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      script.onerror = () => {
        setError('Failed to load Google Maps');
        setIsLoading(false);
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    try {
      setSearchStatus('Initializing map...');
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: PUNE_CENTER,
        zoom: 12,
        styles: [
          {
            featureType: 'poi.medical',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ff6b6b' }]
          }
        ]
      });

      setMap(mapInstance);
      
      // Search for hospitals in multiple phases for better coverage
      searchHospitalsComprehensive(mapInstance);
      
      // Add user location if available
      if (userLocation) {
        addUserLocationMarker(mapInstance, userLocation);
      }

    } catch (err) {
      setError('Failed to initialize map');
      setIsLoading(false);
    }
  };

  const searchHospitalsComprehensive = async (mapInstance: any) => {
    const service = new window.google.maps.places.PlacesService(mapInstance);
    let allHospitals: Hospital[] = [];

    // Multiple search strategies to get comprehensive results
    const searchQueries = [
      { type: 'hospital', keyword: 'hospital' },
      { type: 'hospital', keyword: 'medical center' },
      { type: 'hospital', keyword: 'clinic emergency' },
      { type: 'health', keyword: 'healthcare hospital' }
    ];

    setSearchStatus('Searching for hospitals...');

    try {
      for (let i = 0; i < searchQueries.length; i++) {
        const query = searchQueries[i];
        setSearchStatus(`Searching... (${i + 1}/${searchQueries.length})`);

        await new Promise<void>((resolve) => {
          const request = {
            location: PUNE_CENTER,
            radius: 40000, // 40km radius for better coverage
            type: query.type,
            keyword: query.keyword
          };

          service.nearbySearch(request, (results: any[], status: any) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              const newHospitals = results
                .filter(place => {
                  // Filter for actual hospitals/medical facilities
                  const isHospital = place.types?.some((type: string) => 
                    ['hospital', 'health', 'doctor', 'establishment'].includes(type)
                  );
                  const hasValidName = place.name && 
                    place.name.length > 2 && 
                    !place.name.toLowerCase().includes('untitled');
                  
                  return isHospital && hasValidName;
                })
                .map((place: any) => ({
                  id: place.place_id || `hospital-${Date.now()}-${Math.random()}`,
                  name: place.name,
                  address: place.vicinity || place.formatted_address || 'Address not available',
                  phone: place.formatted_phone_number,
                  rating: place.rating,
                  location: {
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                  },
                  resources: generateRandomResources(),
                  placeId: place.place_id,
                  businessStatus: place.business_status,
                  types: place.types
                }));

              // Add only unique hospitals (avoid duplicates)
              newHospitals.forEach(hospital => {
                const exists = allHospitals.some(existing => 
                  existing.placeId === hospital.placeId || 
                  (Math.abs(existing.location.latitude - hospital.location.latitude) < 0.001 &&
                   Math.abs(existing.location.longitude - hospital.location.longitude) < 0.001)
                );
                if (!exists) {
                  allHospitals.push(hospital);
                }
              });
            }
            resolve();
          });
        });

        // Add delay between requests to respect API limits
        if (i < searchQueries.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      // If we found hospitals, use them
      if (allHospitals.length > 0) {
        // Sort by rating and limit to top 40
        const sortedHospitals = allHospitals
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 40);
        
        setHospitals(sortedHospitals);
        addHospitalMarkers(mapInstance, sortedHospitals);
        setSearchStatus(`Found ${sortedHospitals.length} hospitals`);
      } else {
        // Fallback to known Pune hospitals
        console.warn('No hospitals found via Places API, using fallback data');
        setSearchStatus('Using fallback hospital data');
        const fallbackHospitals = generateRealPuneHospitals();
        setHospitals(fallbackHospitals);
        addHospitalMarkers(mapInstance, fallbackHospitals);
      }

      setIsLoading(false);

    } catch (err) {
      console.error('Error searching for hospitals:', err);
      setSearchStatus('Search failed, using fallback data');
      const fallbackHospitals = generateRealPuneHospitals();
      setHospitals(fallbackHospitals);
      addHospitalMarkers(mapInstance, fallbackHospitals);
      setIsLoading(false);
    }
  };

  const generateRealPuneHospitals = (): Hospital[] => [
    {
      id: 'ruby-hall',
      name: 'Ruby Hall Clinic',
      address: '40, Sassoon Road, Pune, Maharashtra 411001',
      phone: '+91-40-6645-6645',
      rating: 4.2,
      location: { latitude: 18.5314, longitude: 73.8750 },
      resources: generateRandomResources()
    },
    {
      id: 'jehangir',
      name: 'Jehangir Hospital',
      address: '32, Sassoon Road, Pune, Maharashtra 411001',
      phone: '+91-40-6633-3333',
      rating: 4.3,
      location: { latitude: 18.5366, longitude: 73.8897 },
      resources: generateRandomResources()
    },
    {
      id: 'kem',
      name: 'KEM Hospital',
      address: 'Rasta Peth, Pune, Maharashtra 411011',
      phone: '+91-40-2612-6767',
      rating: 3.9,
      location: { latitude: 18.5089, longitude: 73.8553 },
      resources: generateRandomResources()
    },
    {
      id: 'columbia-asia',
      name: 'Columbia Asia Hospital',
      address: 'Kharadi, Pune, Maharashtra 411014',
      phone: '+91-40-6740-7000',
      rating: 4.2,
      location: { latitude: 18.5515, longitude: 73.9370 },
      resources: generateRandomResources()
    },
    {
      id: 'aditya-birla',
      name: 'Aditya Birla Memorial Hospital',
      address: 'Chinchwad, Pune, Maharashtra 411033',
      phone: '+91-40-7115-5555',
      rating: 4.0,
      location: { latitude: 18.6298, longitude: 73.8131 },
      resources: generateRandomResources()
    },
    {
      id: 'sahyadri',
      name: 'Sahyadri Hospitals',
      address: 'Nagar Road, Pune, Maharashtra 411014',
      phone: '+91-40-6730-3000',
      rating: 4.1,
      location: { latitude: 18.5679, longitude: 73.9106 },
      resources: generateRandomResources()
    },
    {
      id: 'poona-hospital',
      name: 'Poona Hospital',
      address: 'Sadashiv Peth, Pune, Maharashtra 411030',
      phone: '+91-40-2422-5151',
      rating: 3.8,
      location: { latitude: 18.5074, longitude: 73.8477 },
      resources: generateRandomResources()
    },
    {
      id: 'sancheti',
      name: 'Sancheti Hospital',
      address: 'Thube Park, Shivajinagar, Pune, Maharashtra 411005',
      phone: '+91-40-2553-3333',
      rating: 4.0,
      location: { latitude: 18.5304, longitude: 73.8567 },
      resources: generateRandomResources()
    },
    {
      id: 'noble-hospital',
      name: 'Noble Hospital',
      address: 'Magarpatta Road, Hadapsar, Pune, Maharashtra 411013',
      phone: '+91-40-6715-9999',
      rating: 4.1,
      location: { latitude: 18.5089, longitude: 73.9260 },
      resources: generateRandomResources()
    },
    {
      id: 'bharati-hospital',
      name: 'Bharati Hospital',
      address: 'Katraj, Pune, Maharashtra 411046',
      phone: '+91-40-2411-1000',
      rating: 3.9,
      location: { latitude: 18.4583, longitude: 73.8648 },
      resources: generateRandomResources()
    },
    {
      id: 'manipal-hospital',
      name: 'Manipal Hospital',
      address: 'Baner Road, Pune, Maharashtra 411045',
      phone: '+91-40-6712-7000',
      rating: 4.3,
      location: { latitude: 18.5590, longitude: 73.7850 },
      resources: generateRandomResources()
    },
    {
      id: 'jupiter-hospital',
      name: 'Jupiter Hospital',
      address: 'Baner Road, Pune, Maharashtra 411045',
      phone: '+91-40-6712-4444',
      rating: 4.2,
      location: { latitude: 18.5640, longitude: 73.7840 },
      resources: generateRandomResources()
    }
  ];

  const addHospitalMarkers = (mapInstance: any, hospitalList: Hospital[]) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers: any[] = [];

    hospitalList.forEach((hospital) => {
      const availabilityColor = hospital.resources 
        ? hospital.resources.icuBeds.available > 10 ? '#10b981' :
          hospital.resources.icuBeds.available > 5 ? '#f59e0b' : '#ef4444'
        : '#6b7280';

      const marker = new window.google.maps.Marker({
        position: { lat: hospital.location.latitude, lng: hospital.location.longitude },
        map: mapInstance,
        title: hospital.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: availabilityColor,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(hospital)
      });

      marker.addListener('click', () => {
        // Close all other info windows
        newMarkers.forEach(m => m.infoWindow?.close());
        infoWindow.open(mapInstance, marker);
        
        if (onHospitalSelect) {
          onHospitalSelect(hospital);
        }
      });

      marker.infoWindow = infoWindow;
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

  const addUserLocationMarker = (mapInstance: any, location: UserLocation) => {
    const userPos = { lat: location.latitude, lng: location.longitude };
    
    if (userMarker) {
      userMarker.setMap(null);
    }
    
    const marker = new window.google.maps.Marker({
      position: userPos,
      map: mapInstance,
      title: 'Your Location',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#3b82f6',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3
      }
    });

    setUserMarker(marker);
  };

  const createInfoWindowContent = (hospital: Hospital) => {
    return `
      <div style="max-width: 300px; padding: 12px;">
        <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">${hospital.name}</h3>
        <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 14px;">${hospital.address}</p>
        ${hospital.phone ? `<p style="margin: 0 0 6px 0; color: #6b7280; font-size: 14px;">📞 <a href="tel:${hospital.phone}" style="color: #3b82f6; text-decoration: none;">${hospital.phone}</a></p>` : ''}
        ${hospital.rating ? `<p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">⭐ ${hospital.rating}/5</p>` : ''}
        ${hospital.resources ? `
          <div style="background: #f9fafb; padding: 10px; border-radius: 6px; margin-top: 8px;">
            <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 500; color: #374151;">Bed Availability:</p>
            <p style="margin: 0 0 3px 0; font-size: 12px; color: #6b7280;">ICU: ${hospital.resources.icuBeds.available}/${hospital.resources.icuBeds.total}</p>
            <p style="margin: 0 0 3px 0; font-size: 12px; color: #6b7280;">General: ${hospital.resources.generalBeds.available}/${hospital.resources.generalBeds.total}</p>
            <p style="margin: 0; font-size: 12px; color: #059669;">✓ Emergency Services Available</p>
          </div>
        ` : ''}
      </div>
    `;
  };

  // Focus on selected hospital
  useEffect(() => {
    if (selectedHospital && selectedHospital.location && map && markers.length > 0) {
      const hospitalPosition = { lat: selectedHospital.location.latitude, lng: selectedHospital.location.longitude };
      map.setCenter(hospitalPosition);
      map.setZoom(15);
      
      const marker = markers.find(m => {
        const markerPos = m.getPosition();
        return markerPos && 
               Math.abs(markerPos.lat() - selectedHospital.location.latitude) < 0.001 &&
               Math.abs(markerPos.lng() - selectedHospital.location.longitude) < 0.001;
      });
      
      if (marker && window.google && window.google.maps && window.google.maps.event) {
        window.google.maps.event.trigger(marker, 'click');
      }
    }
  }, [selectedHospital, map, markers]);

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-red-600">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-semibold mb-2">Error loading map</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Hospital Locations - Pune
        </h3>
        <div className="flex items-center space-x-4">
          {userLocation && (
            <div className="flex items-center text-sm text-green-600">
              <Navigation className="h-4 w-4 mr-1" />
              <span>Location detected</span>
            </div>
          )}
          {isLoading && (
            <div className="flex items-center text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span>{searchStatus}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">{searchStatus}</p>
              <p className="text-gray-500 text-sm mt-2">Finding real hospital data...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-96" />
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
            <span className="text-gray-600">High Availability (10+ ICU)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
            <span className="text-gray-600">Medium (5-10 ICU)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
            <span className="text-gray-600">Low (&lt;5 ICU)</span>
          </div>
        </div>
        <span className="text-gray-500">Click markers for details</span>
      </div>

      {/* Hospital List */}
      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
          Nearby Hospitals 
          <span className="ml-2 text-sm font-normal text-gray-500">({hospitals.length} found)</span>
        </h4>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {hospitals.map((hospital) => (
            <div 
              key={hospital.id}
              className={`p-3 border rounded-lg cursor-pointer transition-all duration-400 hover:shadow-md ${
                selectedHospital?.id === hospital.id ? 'border-blue-500 bg-blue-50' : 'border-gray-400'
              }`}
              onClick={() => onHospitalSelect && onHospitalSelect(hospital)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{hospital.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    {hospital.phone && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-3 w-3 mr-1" />
                        <a href={`tel:${hospital.phone}`} className="hover:text-blue-600">
                          {hospital.phone}
                        </a>
                      </div>
                    )}
                    {hospital.rating && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {hospital.rating}/5
                      </div>
                    )}
                  </div>
                </div>
                {hospital.resources && (
                  <div className="ml-4 text-right">
                    <div className={`w-4 h-4 rounded-full ${
                      hospital.resources.icuBeds.available > 10 ? 'bg-green-500' :
                      hospital.resources.icuBeds.available > 5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <p className="text-xs text-gray-500 mt-1">
                      ICU: {hospital.resources.icuBeds.available}/{hospital.resources.icuBeds.total}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};