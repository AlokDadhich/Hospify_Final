import { HospitalProfile, BedAvailability } from '../types/hospital';

// Focus specifically on Pune and surrounding areas
const PUNE_AREAS = [
  // Central Pune
  { name: 'Pune', area: 'Shivajinagar', lat: 18.5304, lng: 73.8567, pincode: '411005', weight: 8 },
  { name: 'Pune', area: 'Camp', lat: 18.5074, lng: 73.8477, pincode: '411001', weight: 7 },
  { name: 'Pune', area: 'Deccan', lat: 18.5158, lng: 73.8449, pincode: '411004', weight: 6 },
  { name: 'Pune', area: 'Sadashiv Peth', lat: 18.5074, lng: 73.8477, pincode: '411030', weight: 6 },
  
  // East Pune
  { name: 'Pune', area: 'Kharadi', lat: 18.5515, lng: 73.9370, pincode: '411014', weight: 8 },
  { name: 'Pune', area: 'Hadapsar', lat: 18.5089, lng: 73.9260, pincode: '411013', weight: 7 },
  { name: 'Pune', area: 'Magarpatta', lat: 18.5089, lng: 73.9260, pincode: '411028', weight: 6 },
  { name: 'Pune', area: 'Koregaon Park', lat: 18.5362, lng: 73.8958, pincode: '411001', weight: 5 },
  
  // West Pune
  { name: 'Pune', area: 'Baner', lat: 18.5590, lng: 73.7850, pincode: '411045', weight: 8 },
  { name: 'Pune', area: 'Aundh', lat: 18.5679, lng: 73.8106, pincode: '411007', weight: 7 },
  { name: 'Pune', area: 'Hinjewadi', lat: 18.5912, lng: 73.7389, pincode: '411057', weight: 6 },
  { name: 'Pune', area: 'Wakad', lat: 18.5975, lng: 73.7898, pincode: '411057', weight: 5 },
  
  // North Pune
  { name: 'Pune', area: 'Pimpri', lat: 18.6298, lng: 73.8131, pincode: '411018', weight: 7 },
  { name: 'Pune', area: 'Chinchwad', lat: 18.6298, lng: 73.8131, pincode: '411033', weight: 6 },
  { name: 'Pune', area: 'Akurdi', lat: 18.6476, lng: 73.7693, pincode: '411035', weight: 4 },
  
  // South Pune
  { name: 'Pune', area: 'Katraj', lat: 18.4583, lng: 73.8648, pincode: '411046', weight: 6 },
  { name: 'Pune', area: 'Kondhwa', lat: 18.4636, lng: 73.8925, pincode: '411048', weight: 5 },
  { name: 'Pune', area: 'Warje', lat: 18.4816, lng: 73.8053, pincode: '411058', weight: 4 },
  { name: 'Pune', area: 'Bibwewadi', lat: 18.4816, lng: 73.8653, pincode: '411037', weight: 4 },
  
  // Nearby cities within 50km
  { name: 'Pimpri-Chinchwad', area: 'Pimpri-Chinchwad', lat: 18.6298, lng: 73.8131, pincode: '411018', weight: 5 },
  { name: 'Talegaon', area: 'Talegaon Dabhade', lat: 18.7351, lng: 73.6758, pincode: '410507', weight: 3 },
  { name: 'Lonavala', area: 'Lonavala', lat: 18.7537, lng: 73.4068, pincode: '410401', weight: 2 },
  { name: 'Chakan', area: 'Chakan', lat: 18.7606, lng: 73.8636, pincode: '410501', weight: 3 },
  { name: 'Dehu Road', area: 'Dehu Road', lat: 18.7219, lng: 73.7619, pincode: '412101', weight: 2 }
];

const PUNE_HOSPITAL_NAMES = [
  // Real major hospitals in Pune
  'Ruby Hall Clinic',
  'Jehangir Hospital',
  'KEM Hospital',
  'Sassoon General Hospital',
  'Deenanath Mangeshkar Hospital',
  'Sahyadri Hospital',
  'Noble Hospital',
  'Sancheti Hospital',
  'Poona Hospital',
  'Bharati Hospital',
  'Aditya Birla Memorial Hospital',
  'Columbia Asia Hospital',
  'Manipal Hospital',
  'Jupiter Hospital',
  'Fortis Hospital',
  'Apollo Hospital',
  'Max Healthcare',
  'Narayana Health',
  'Aster Hospital',
  'Symbiosis Hospital',
  
  // Generic hospital names for variety
  'City General Hospital',
  'Medical Center',
  'Specialty Hospital',
  'Multi-Specialty Hospital',
  'Community Hospital',
  'Emergency Hospital',
  'Trauma Center',
  'Healthcare Center',
  'Medical Institute',
  'Wellness Hospital'
];

// Generate coordinates within a specific area radius
const generateNearbyCoordinates = (centerLat: number, centerLng: number, radiusKm: number = 5) => {
  const radiusInDegrees = radiusKm / 111; // Rough conversion
  const angle = Math.random() * 2 * Math.PI;
  const distance = Math.random() * radiusInDegrees;
  
  return {
    latitude: centerLat + (distance * Math.cos(angle)),
    longitude: centerLng + (distance * Math.sin(angle))
  };
};

// Generate realistic bed capacity based on hospital size and area
const generateBedCapacity = (hospitalSize: 'small' | 'medium' | 'large', area: string) => {
  // Major areas get larger hospitals
  const areaMultiplier = ['Shivajinagar', 'Camp', 'Kharadi', 'Baner', 'Hadapsar'].includes(area) ? 1.3 : 1.0;
  
  const multipliers = {
    small: { min: 0.4, max: 0.7 },
    medium: { min: 0.7, max: 1.3 },
    large: { min: 1.3, max: 2.2 }
  };
  
  const mult = multipliers[hospitalSize];
  const factor = (mult.min + Math.random() * (mult.max - mult.min)) * areaMultiplier;
  
  return {
    icuBeds: Math.floor((15 + Math.random() * 35) * factor),
    generalBeds: Math.floor((80 + Math.random() * 150) * factor),
    oxygenBeds: Math.floor((25 + Math.random() * 45) * factor),
    ventilators: Math.floor((8 + Math.random() * 20) * factor),
    ambulances: Math.floor((2 + Math.random() * 6) * factor)
  };
};

// Generate realistic availability (usually 15-45% available)
const generateAvailability = (total: number) => {
  const availabilityRate = 0.15 + Math.random() * 0.3; // 15-45%
  return Math.floor(total * availabilityRate);
};

// Generate phone number with Pune area codes
const generatePhoneNumber = () => {
  const areaCodes = ['20', '20', '20', '20', '2135', '2137']; // Pune area codes
  const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
  const numbers = Math.floor(1000000 + Math.random() * 9000000);
  return `+91-${areaCode}-${numbers.toString().substring(0, 4)}-${numbers.toString().substring(4)}`;
};

// Generate registration number
const generateRegistrationNumber = (year: number = 2023) => {
  const number = Math.floor(10000 + Math.random() * 90000);
  return `MH/${number}/${year}`;
};

// Weighted area selection for realistic distribution
const selectWeightedArea = () => {
  const totalWeight = PUNE_AREAS.reduce((sum, area) => sum + area.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const area of PUNE_AREAS) {
    random -= area.weight;
    if (random <= 0) {
      return area;
    }
  }
  
  return PUNE_AREAS[0]; // Fallback
};

export const generateSampleHospitals = (count: number = 100): HospitalProfile[] => {
  const hospitals: HospitalProfile[] = [];
  
  for (let i = 0; i < count; i++) {
    const area = selectWeightArea();
    const hospitalName = PUNE_HOSPITAL_NAMES[Math.floor(Math.random() * PUNE_HOSPITAL_NAMES.length)];
    
    // Generate location within area radius (most within 3km, some up to 8km)
    const maxRadius = Math.random() < 0.8 ? 3 : 8;
    const location = generateNearbyCoordinates(area.lat, area.lng, maxRadius);
    
    // Generate unique pincode variations
    const basePincode = parseInt(area.pincode);
    const pincodeVariation = Math.floor(Math.random() * 20);
    const pincode = (basePincode + pincodeVariation).toString();
    
    // Generate realistic addresses
    const streetNumbers = [
      Math.floor(Math.random() * 999) + 1,
      `${Math.floor(Math.random() * 99) + 1}/${Math.floor(Math.random() * 99) + 1}`,
      `${Math.floor(Math.random() * 999) + 1}-${Math.floor(Math.random() * 999) + 1}`
    ];
    const streetNumber = streetNumbers[Math.floor(Math.random() * streetNumbers.length)];
    
    const roadTypes = ['Road', 'Street', 'Lane', 'Marg', 'Path', 'Circle', 'Square'];
    const roadType = roadTypes[Math.floor(Math.random() * roadTypes.length)];
    
    const hospital: HospitalProfile = {
      id: `pune_hospital_${i + 1}`,
      name: `${hospitalName}${i % 4 === 0 ? ` - ${area.area}` : ''}`,
      address: `${streetNumber}, Medical ${roadType}, ${area.area}, ${area.name}, Maharashtra ${pincode}`,
      city: area.name,
      state: 'Maharashtra',
      pincode: pincode,
      phone: generatePhoneNumber(),
      email: `admin@${hospitalName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}-${area.area.toLowerCase().replace(/\s+/g, '')}.com`,
      registrationNumber: generateRegistrationNumber(),
      location,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      isVerified: Math.random() > 0.15, // 85% verified (higher for Pune)
      adminUserId: `pune_admin_${i + 1}`
    };
    
    hospitals.push(hospital);
  }
  
  return hospitals;
};

export const generateSampleAvailability = (hospitals: HospitalProfile[]): BedAvailability[] => {
  return hospitals.map(hospital => {
    // Determine hospital size based on name and area
    const isLargeHospital = ['Ruby Hall', 'Jehangir', 'KEM', 'Sassoon', 'Deenanath', 'Sahyadri', 'Aditya Birla', 'Columbia Asia', 'Manipal', 'Jupiter'].some(name => hospital.name.includes(name));
    const isMediumHospital = ['Noble', 'Sancheti', 'Poona', 'Bharati', 'Fortis', 'Apollo', 'Max', 'Narayana', 'Aster'].some(name => hospital.name.includes(name));
    
    const hospitalSize = isLargeHospital ? 'large' : isMediumHospital ? 'medium' : 'small';
    const area = hospital.address.split(',')[1]?.trim() || 'Pune';
    const capacity = generateBedCapacity(hospitalSize, area);
    
    const availability: BedAvailability = {
      id: `pune_availability_${hospital.id}`,
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
    const baseOccupancy = 0.65 + 0.2 * Math.sin((hour - 6) * Math.PI / 12);
    const randomVariation = 0.9 + Math.random() * 0.2;
    const occupancyRate = Math.min(0.95, Math.max(0.35, baseOccupancy * randomVariation));
    
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