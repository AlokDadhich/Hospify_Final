import { HospitalProfile, BedAvailability } from '../types/hospital';

// Focus on user's likely location (India) with realistic distribution
const INDIAN_CITIES = [
  // Major metros with higher hospital density
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, pincode: '400001', weight: 15 },
  { name: 'Delhi', state: 'Delhi', lat: 28.7041, lng: 77.1025, pincode: '110001', weight: 15 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946, pincode: '560001', weight: 12 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567, pincode: '411001', weight: 10 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, pincode: '500001', weight: 10 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, pincode: '600001', weight: 10 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, pincode: '700001', weight: 8 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, pincode: '380001', weight: 6 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, pincode: '302001', weight: 5 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lng: 72.8311, pincode: '395001', weight: 4 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, pincode: '226001', weight: 3 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lng: 80.3319, pincode: '208001', weight: 2 }
];

const HOSPITAL_NAMES = [
  'Apollo Hospital',
  'Fortis Healthcare',
  'Max Healthcare',
  'Manipal Hospital',
  'AIIMS',
  'Medanta',
  'Narayana Health',
  'Columbia Asia',
  'Aster Hospitals',
  'Kokilaben Hospital',
  'Lilavati Hospital',
  'Breach Candy Hospital',
  'Jaslok Hospital',
  'Hinduja Hospital',
  'Ruby Hall Clinic',
  'Jehangir Hospital',
  'KEM Hospital',
  'Sahyadri Hospital',
  'Noble Hospital',
  'City Hospital',
  'General Hospital',
  'Medical Center',
  'Specialty Hospital',
  'Multi-Specialty Hospital',
  'Community Hospital'
];

// Generate hospitals in clusters around cities for realistic distribution
const generateNearbyCoordinates = (centerLat: number, centerLng: number, radiusKm: number = 30) => {
  const radiusInDegrees = radiusKm / 111; // Rough conversion
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radiusInDegrees;
  
  return {
    latitude: centerLat + (distance * Math.cos(angle)),
    longitude: centerLng + (distance * Math.sin(angle))
  };
};

// Generate realistic bed capacity based on hospital size
const generateBedCapacity = (hospitalSize: 'small' | 'medium' | 'large') => {
  const multipliers = {
    small: { min: 0.3, max: 0.6 },
    medium: { min: 0.6, max: 1.2 },
    large: { min: 1.2, max: 2.0 }
  };
  
  const mult = multipliers[hospitalSize];
  const factor = mult.min + Math.random() * (mult.max - mult.min);
  
  return {
    icuBeds: Math.floor((20 + Math.random() * 40) * factor),
    generalBeds: Math.floor((100 + Math.random() * 200) * factor),
    oxygenBeds: Math.floor((30 + Math.random() * 60) * factor),
    ventilators: Math.floor((10 + Math.random() * 25) * factor),
    ambulances: Math.floor((3 + Math.random() * 8) * factor)
  };
};

// Generate realistic availability (usually 10-40% available)
const generateAvailability = (total: number) => {
  const availabilityRate = 0.1 + Math.random() * 0.3; // 10-40%
  return Math.floor(total * availabilityRate);
};

// Generate phone number
const generatePhoneNumber = (cityCode: string) => {
  const numbers = Math.floor(1000000 + Math.random() * 9000000);
  return `+91-${cityCode}-${numbers.toString().substring(0, 4)}-${numbers.toString().substring(4)}`;
};

// Generate registration number
const generateRegistrationNumber = (state: string, year: number = 2023) => {
  const stateCode = state.substring(0, 2).toUpperCase();
  const number = Math.floor(10000 + Math.random() * 90000);
  return `${stateCode}/${number}/${year}`;
};

// Weighted city selection for realistic distribution
const selectWeightedCity = () => {
  const totalWeight = INDIAN_CITIES.reduce((sum, city) => sum + city.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const city of INDIAN_CITIES) {
    random -= city.weight;
    if (random <= 0) {
      return city;
    }
  }
  
  return INDIAN_CITIES[0]; // Fallback
};

export const generateSampleHospitals = (count: number = 100): HospitalProfile[] => {
  const hospitals: HospitalProfile[] = [];
  
  for (let i = 0; i < count; i++) {
    const city = selectWeightedCity();
    const hospitalName = HOSPITAL_NAMES[Math.floor(Math.random() * HOSPITAL_NAMES.length)];
    
    // Generate location within city radius (closer to city center for more realistic distribution)
    const maxRadius = Math.random() < 0.7 ? 15 : 30; // 70% within 15km, 30% within 30km
    const location = generateNearbyCoordinates(city.lat, city.lng, maxRadius);
    
    // Generate unique pincode variations
    const basePincode = parseInt(city.pincode);
    const pincodeVariation = Math.floor(Math.random() * 50);
    const pincode = (basePincode + pincodeVariation).toString();
    
    // Generate area names for more realistic addresses
    const areas = ['Medical District', 'Health Zone', 'Hospital Road', 'Medical Campus', 'Healthcare Complex'];
    const area = areas[Math.floor(Math.random() * areas.length)];
    
    const hospital: HospitalProfile = {
      id: `hospital_${i + 1}`,
      name: `${hospitalName} - ${city.name}${i % 3 === 0 ? ` Branch ${Math.floor(i/3) + 1}` : ''}`,
      address: `${Math.floor(Math.random() * 999) + 1}, ${area}, ${city.name}, ${city.state} ${pincode}`,
      city: city.name,
      state: city.state,
      pincode: pincode,
      phone: generatePhoneNumber('20'),
      email: `admin@${hospitalName.toLowerCase().replace(/\s+/g, '')}-${city.name.toLowerCase()}.com`,
      registrationNumber: generateRegistrationNumber(city.state),
      location,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      isVerified: Math.random() > 0.2, // 80% verified
      adminUserId: `user_${i + 1}`
    };
    
    hospitals.push(hospital);
  }
  
  return hospitals;
};

export const generateSampleAvailability = (hospitals: HospitalProfile[]): BedAvailability[] => {
  return hospitals.map(hospital => {
    const hospitalSize = Math.random() < 0.3 ? 'large' : Math.random() < 0.6 ? 'medium' : 'small';
    const capacity = generateBedCapacity(hospitalSize);
    
    const availability: BedAvailability = {
      id: `availability_${hospital.id}`,
      hospitalId: hospital.id,
      icuBeds: {
        total: capacity.icuBeds,
        available: generateAvailability(capacity.icuBeds),
        occupied: 0
      },
      generalBeds: {
        total: capacity.generalBeds,
        available: generateAvailability(capacity.generalBeds),
        occupied: 0
      },
      oxygenBeds: {
        total: capacity.oxygenBeds,
        available: generateAvailability(capacity.oxygenBeds),
        occupied: 0
      },
      ventilators: {
        total: capacity.ventilators,
        available: generateAvailability(capacity.ventilators),
        occupied: 0
      },
      ambulances: {
        total: capacity.ambulances,
        available: generateAvailability(capacity.ambulances),
        onDuty: 0
      },
      lastUpdated: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000).toISOString(), // Within last 2 hours
      updatedBy: hospital.adminUserId
    };
    
    // Calculate occupied/onDuty
    availability.icuBeds.occupied = availability.icuBeds.total - availability.icuBeds.available;
    availability.generalBeds.occupied = availability.generalBeds.total - availability.generalBeds.available;
    availability.oxygenBeds.occupied = availability.oxygenBeds.total - availability.oxygenBeds.available;
    availability.ventilators.occupied = availability.ventilators.total - availability.ventilators.available;
    availability.ambulances.onDuty = availability.ambulances.total - availability.ambulances.available;
    
    return availability;
  });
};

// Generate historical trends for analytics
export const generateHistoricalTrends = (hospitalId: string, days: number = 30) => {
  const trends = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    
    // Simulate daily patterns (higher occupancy during day, lower at night)
    const hour = date.getHours();
    const baseOccupancy = 0.6 + 0.2 * Math.sin((hour - 6) * Math.PI / 12);
    const randomVariation = 0.9 + Math.random() * 0.2;
    const occupancyRate = Math.min(0.95, Math.max(0.3, baseOccupancy * randomVariation));
    
    trends.push({
      date: date.toISOString(),
      icuOccupancy: occupancyRate + Math.random() * 0.1 - 0.05,
      generalOccupancy: occupancyRate + Math.random() * 0.1 - 0.05,
      oxygenOccupancy: occupancyRate + Math.random() * 0.15 - 0.075,
      ventilatorOccupancy: occupancyRate + Math.random() * 0.2 - 0.1,
      ambulanceUtilization: 0.4 + Math.random() * 0.4
    });
  }
  
  return trends;
};

// Simulate real-time updates
export const simulateRealTimeUpdates = (availability: BedAvailability[]): BedAvailability[] => {
  return availability.map(item => {
    // Small random changes to simulate real-time updates
    const changes = {
      icuBeds: Math.floor(Math.random() * 3) - 1, // -1, 0, or 1
      generalBeds: Math.floor(Math.random() * 5) - 2, // -2 to 2
      oxygenBeds: Math.floor(Math.random() * 3) - 1,
      ventilators: Math.floor(Math.random() * 2) - 1, // -1, 0, or 1
      ambulances: Math.floor(Math.random() * 2) - 1
    };
    
    const updated = { ...item };
    
    // Apply changes while respecting constraints
    updated.icuBeds.available = Math.max(0, Math.min(
      updated.icuBeds.total,
      updated.icuBeds.available + changes.icuBeds
    ));
    
    updated.generalBeds.available = Math.max(0, Math.min(
      updated.generalBeds.total,
      updated.generalBeds.available + changes.generalBeds
    ));
    
    updated.oxygenBeds.available = Math.max(0, Math.min(
      updated.oxygenBeds.total,
      updated.oxygenBeds.available + changes.oxygenBeds
    ));
    
    updated.ventilators.available = Math.max(0, Math.min(
      updated.ventilators.total,
      updated.ventilators.available + changes.ventilators
    ));
    
    updated.ambulances.available = Math.max(0, Math.min(
      updated.ambulances.total,
      updated.ambulances.available + changes.ambulances
    ));
    
    // Recalculate occupied/onDuty
    updated.icuBeds.occupied = updated.icuBeds.total - updated.icuBeds.available;
    updated.generalBeds.occupied = updated.generalBeds.total - updated.generalBeds.available;
    updated.oxygenBeds.occupied = updated.oxygenBeds.total - updated.oxygenBeds.available;
    updated.ventilators.occupied = updated.ventilators.total - updated.ventilators.available;
    updated.ambulances.onDuty = updated.ambulances.total - updated.ambulances.available;
    
    updated.lastUpdated = new Date().toISOString();
    
    return updated;
  });
};