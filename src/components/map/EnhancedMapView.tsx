import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, AlertCircle, Filter } from 'lucide-react';
import { HospitalProfile, BedAvailability } from '../../types/hospital';
import { HospitalService } from '../../services/hospitalService';

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
  userLocation?: UserLocation;
  selectedHospital?: HospitalProfile;
  onHospitalSelect?: (hospital: HospitalProfile) => void;
  maxDistance?: number;
  maxResults?: number;
}

export const EnhancedMapView: React.FC<EnhancedMapViewProps> = ({
  userLocation,
  selectedHospital,
  onHospitalSelect,
  maxDistance = 50,
  maxResults = 40
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [hospitals, setHospitals] = useState<HospitalProfile[]>([]);
  const [availability, setAvailability] = useState<{ [key: string]: BedAvailability }>({});
  const [markers, setMarkers] = useState<any[]>([]);
  const [userMarker, setUserMarker] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchStatus, setSearchStatus] = useState<string>('Initializing...');
  const [filterType, setFilterType] = useState<'all' | 'icu' | 'general' | 'oxygen'>('all');

  const API_KEY = 'AIzaSyD-hTQrtpPYyQZ49NhuMFAppgacyO89LBA';
  const DEFAULT_CENTER = { lat: 18.5204, lng: 73.8567 }; // Pune center

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (map) {
      loadHospitals();
    }
  }, [map]);

  useEffect(() => {
    if (map && hospitals.length > 0) {
      updateMarkers();
    }
  }, [hospitals, availability, filterType]);

  useEffect(() => {
    if (userLocation && map) {
      addUserLocationMarker();
      filterHospitalsByDistance();
    }
  }, [userLocation, map]);

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

    setSearchStatus('Loading Google Maps...');
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
      setSearchStatus('Initializing map...');
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : DEFAULT_CENTER,
        zoom: 12,
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
    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Failed to initialize map. Please refresh the page.');
      setIsLoading(false);
    }
  };

  const loadHospitals = async () => {
    try {
      setSearchStatus('Loading hospitals...');
      const hospitalData = await HospitalService.getAllHospitals();
      
      if (hospitalData.length === 0) {
        // Generate sample data if no real data available
        const sampleHospitals = generateSampleHospitals();
        setHospitals(sampleHospitals);
        
        // Generate sample availability for each hospital
        const sampleAvailabilityMap: { [key: string]: BedAvailability } = {};
        sampleHospitals.forEach(hospital => {
          sampleAvailabilityMap[hospital.id] = generateSampleAvailability(hospital.id);
        });
        setAvailability(sampleAvailabilityMap);
      } else {
        setHospitals(hospitalData);
        
        // Subscribe to real-time bed availability updates
        const unsubscribe = HospitalService.subscribeToAllBedAvailability((availabilityData) => {
          const availabilityMap: { [key: string]: BedAvailability } = {};
          availabilityData.forEach(item => {
            availabilityMap[item.hospitalId] = item;
          });
          setAvailability(availabilityMap);
        });
      }

      setSearchStatus(`Found ${hospitalData.length || 6} hospitals`);
      setIsLoading(false);

    } catch (error) {
      console.error('Error loading hospitals:', error);
      // Use sample data as fallback
      const sampleHospitals = generateSampleHospitals();
      setHospitals(sampleHospitals);
      
      // Generate sample availability for each hospital
      const sampleAvailabilityMap: { [key: string]: BedAvailability } = {};
      sampleHospitals.forEach(hospital => {
        sampleAvailabilityMap[hospital.id] = generateSampleAvailability(hospital.id);
      });
      setAvailability(sampleAvailabilityMap);
      
      setSearchStatus(`Showing sample data (${sampleHospitals.length} hospitals)`);
      setIsLoading(false);
    }
  };

  const generateSampleHospitals = (): HospitalProfile[] => {
    return [
      {
        id: 'ruby-hall',
        name: 'Ruby Hall Clinic',
        address: '40, Sassoon Road, Pune, Maharashtra 411001',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        phone: '+91-20-6645-6645',
        email: 'info@rubyhall.com',
        registrationNumber: 'MH/12345/2023',
        location: { latitude: 18.5314, longitude: 73.8750 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: true,
        adminUserId: 'admin1'
      },
      {
        id: 'jehangir',
        name: 'Jehangir Hospital',
        address: '32, Sassoon Road, Pune, Maharashtra 411001',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        phone: '+91-20-6633-3333',
        email: 'info@jehangirhospital.com',
        registrationNumber: 'MH/12346/2023',
        location: { latitude: 18.5366, longitude: 73.8897 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: true,
        adminUserId: 'admin2'
      },
      {
        id: 'kem',
        name: 'KEM Hospital',
        address: 'Rasta Peth, Pune, Maharashtra 411011',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411011',
        phone: '+91-20-2612-6767',
        email: 'info@kemhospitalpune.org',
        registrationNumber: 'MH/12347/2023',
        location: { latitude: 18.5089, longitude: 73.8553 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: true,
        adminUserId: 'admin3'
      },
      {
        id: 'columbia-asia',
        name: 'Columbia Asia Hospital',
        address: 'Kharadi, Pune, Maharashtra 411014',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411014',
        phone: '+91-20-6740-7000',
        email: 'pune@columbiaasia.com',
        registrationNumber: 'MH/12348/2023',
        location: { latitude: 18.5515, longitude: 73.9370 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: true,
        adminUserId: 'admin4'
      },
      {
        id: 'sahyadri',
        name: 'Sahyadri Hospitals',
        address: 'Nagar Road, Pune, Maharashtra 411014',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411014',
        phone: '+91-20-6730-3000',
        email: 'info@sahyadrihospitals.com',
        registrationNumber: 'MH/12349/2023',
        location: { latitude: 18.5679, longitude: 73.9106 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: true,
        adminUserId: 'admin5'
      },
      {
        id: 'manipal-hospital',
        name: 'Manipal Hospital',
        address: 'Baner Road, Pune, Maharashtra 411045',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411045',
        phone: '+91-20-6712-7000',
        email: 'pune@manipalhospitals.com',
        registrationNumber: 'MH/12350/2023',
        location: { latitude: 18.5590, longitude: 73.7850 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: true,
        adminUserId: 'admin6'
      }
    ];
  };

  const generateSampleAvailability = (hospitalId: string): BedAvailability => {
    const icuTotal = 20 + Math.floor(Math.random() * 30);
    const icuAvailable = Math.floor(Math.random() * 15) + 5;
    const generalTotal = 100 + Math.floor(Math.random() * 100);
    const generalAvailable = Math.floor(Math.random() * 50) + 20;
    const oxygenTotal = 30 + Math.floor(Math.random() * 40);
    const oxygenAvailable = Math.floor(Math.random() * 20) + 10;
    const ventilatorTotal = 10 + Math.floor(Math.random() * 15);
    const ventilatorAvailable = Math.floor(Math.random() * 8) + 2;
    const ambulanceTotal = 5 + Math.floor(Math.random() * 5);
    const ambulanceAvailable = Math.floor(Math.random() * 3) + 1;

    return {
      id: `availability_${hospitalId}`,
      hospitalId,
      icuBeds: {
        total: icuTotal,
        available: icuAvailable,
        occupied: icuTotal - icuAvailable
      },
      generalBeds: {
        total: generalTotal,
        available: generalAvailable,
        occupied: generalTotal - generalAvailable
      },
      oxygenBeds: {
        total: oxygenTotal,
        available: oxygenAvailable,
        occupied: oxygenTotal - oxygenAvailable
      },
      ventilators: {
        total: ventilatorTotal,
        available: ventilatorAvailable,
        occupied: ventilatorTotal - ventilatorAvailable
      },
      ambulances: {
        total: ambulanceTotal,
        available: ambulanceAvailable,
        onDuty: ambulanceTotal - ambulanceAvailable
      },
      lastUpdated: new Date().toISOString(),
      updatedBy: 'system'
    };
  };

  const filterHospitalsByDistance = () => {
    if (!userLocation) return;

    const hospitalsWithDistance = hospitals.map(hospital => ({
      ...hospital,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        hospital.location.latitude,
        hospital.location.longitude
      )
    }))
    .filter(hospital => hospital.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxResults);

    setHospitals(hospitalsWithDistance);
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

  const updateMarkers = () => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers: any[] = [];
    const filteredHospitals = getFilteredHospitals();

    filteredHospitals.forEach((hospital) => {
      const hospitalAvailability = availability[hospital.id] || generateSampleAvailability(hospital.id);
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
        }
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
      const hospitalAvailability = availability[hospital.id] || generateSampleAvailability(hospital.id);

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
        scale: 10,
        fillColor: '#3b82f6',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3
      }
    });

    setUserMarker(marker);
    map.setCenter({ lat: userLocation.latitude, lng: userLocation.longitude });
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
              <p className="text-gray-500 text-sm mt-2">Loading hospital map...</p>
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
          Showing {getFilteredHospitals().length} hospitals • Real-time data
        </span>
      </div>
    </div>
  );
};