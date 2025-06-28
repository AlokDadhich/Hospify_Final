import { Hospital } from '../types';

// Helper function to generate realistic resource availability
const generateRealisticResources = (hospitalSize: 'large' | 'medium' | 'small' = 'medium') => {
  const baseMultiplier = hospitalSize === 'large' ? 1.5 : hospitalSize === 'small' ? 0.6 : 1;
  
  const icuTotal = Math.floor((Math.random() * 40 + 30) * baseMultiplier);
  const icuAvailable = Math.floor(Math.random() * Math.max(1, icuTotal * 0.3));
  
  const generalTotal = Math.floor((Math.random() * 200 + 150) * baseMultiplier);
  const generalAvailable = Math.floor(Math.random() * Math.max(10, generalTotal * 0.25));
  
  const oxygenTotal = Math.floor((Math.random() * 60 + 40) * baseMultiplier);
  const oxygenAvailable = Math.floor(Math.random() * Math.max(5, oxygenTotal * 0.2));
  
  const ventilatorTotal = Math.floor((Math.random() * 25 + 15) * baseMultiplier);
  const ventilatorAvailable = Math.floor(Math.random() * Math.max(1, ventilatorTotal * 0.25));
  
  const ambulanceTotal = Math.floor((Math.random() * 8 + 6) * baseMultiplier);
  const ambulanceAvailable = Math.floor(Math.random() * Math.max(1, ambulanceTotal * 0.4));

  return {
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
    }
  };
};

// Generate realistic timestamps (within last 2 hours)
const generateRecentTimestamp = () => {
  const now = new Date();
  const hoursAgo = Math.floor(Math.random() * 2); // 0-2 hours ago
  const minutesAgo = Math.floor(Math.random() * 60); // 0-59 minutes ago
  const timestamp = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000));
  return timestamp.toISOString();
};

// Extract pincode from address
const extractPincode = (address: string): string => {
  const pincodeMatch = address.match(/\b\d{6}\b/);
  return pincodeMatch ? pincodeMatch[0] : '411001'; // Default Pune pincode
};

// Real Pune hospitals data based on your MapView component
export const mockHospitals: Hospital[] = [
  {
    id: 'ruby-hall',
    name: 'Ruby Hall Clinic',
    address: '40, Sassoon Road, Pune, Maharashtra 411001',
    city: 'Pune',
    pincode: '411001',
    phone: '+91-20-6645-6645',
    email: 'info@rubyhall.com',
    location: {
      latitude: 18.5314,
      longitude: 73.8750
    },
    resources: generateRealisticResources('large'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-6645-6645', '+91-20-6645-6600']
  },
  {
    id: 'jehangir',
    name: 'Jehangir Hospital',
    address: '32, Sassoon Road, Pune, Maharashtra 411001',
    city: 'Pune',
    pincode: '411001',
    phone: '+91-20-6633-3333',
    email: 'info@jehangirhospital.com',
    location: {
      latitude: 18.5366,
      longitude: 73.8897
    },
    resources: generateRealisticResources('large'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-6633-3333', '+91-20-6633-3400']
  },
  {
    id: 'kem',
    name: 'KEM Hospital',
    address: 'Rasta Peth, Pune, Maharashtra 411011',
    city: 'Pune',
    pincode: '411011',
    phone: '+91-20-2612-6767',
    email: 'info@kemhospitalpune.org',
    location: {
      latitude: 18.5089,
      longitude: 73.8553
    },
    resources: generateRealisticResources('large'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-2612-6767', '+91-20-2612-6800']
  },
  {
    id: 'columbia-asia',
    name: 'Columbia Asia Hospital',
    address: 'Kharadi, Pune, Maharashtra 411014',
    city: 'Pune',
    pincode: '411014',
    phone: '+91-20-6740-7000',
    email: 'pune@columbiaasia.com',
    location: {
      latitude: 18.5515,
      longitude: 73.9370
    },
    resources: generateRealisticResources('medium'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-6740-7000', '+91-20-6740-7100']
  },
  {
    id: 'aditya-birla',
    name: 'Aditya Birla Memorial Hospital',
    address: 'Chinchwad, Pune, Maharashtra 411033',
    city: 'Pune',
    pincode: '411033',
    phone: '+91-20-7115-5555',
    email: 'info@adityabirlamemorialhospital.com',
    location: {
      latitude: 18.6298,
      longitude: 73.8131
    },
    resources: generateRealisticResources('large'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-7115-5555', '+91-20-7115-5600']
  },
  {
    id: 'sahyadri',
    name: 'Sahyadri Hospitals',
    address: 'Nagar Road, Pune, Maharashtra 411014',
    city: 'Pune',
    pincode: '411014',
    phone: '+91-20-6730-3000',
    email: 'info@sahyadrihospitals.com',
    location: {
      latitude: 18.5679,
      longitude: 73.9106
    },
    resources: generateRealisticResources('medium'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-6730-3000', '+91-20-6730-3100']
  },
  {
    id: 'poona-hospital',
    name: 'Poona Hospital',
    address: 'Sadashiv Peth, Pune, Maharashtra 411030',
    city: 'Pune',
    pincode: '411030',
    phone: '+91-20-2422-5151',
    email: 'info@poonahospital.org',
    location: {
      latitude: 18.5074,
      longitude: 73.8477
    },
    resources: generateRealisticResources('medium'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-2422-5151', '+91-20-2422-5200']
  },
  {
    id: 'sancheti',
    name: 'Sancheti Hospital',
    address: 'Thube Park, Shivajinagar, Pune, Maharashtra 411005',
    city: 'Pune',
    pincode: '411005',
    phone: '+91-20-2553-3333',
    email: 'info@sanchetihospital.org',
    location: {
      latitude: 18.5304,
      longitude: 73.8567
    },
    resources: generateRealisticResources('medium'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-2553-3333', '+91-20-2553-3400']
  },
  {
    id: 'noble-hospital',
    name: 'Noble Hospital',
    address: 'Magarpatta Road, Hadapsar, Pune, Maharashtra 411013',
    city: 'Pune',
    pincode: '411013',
    phone: '+91-20-6715-9999',
    email: 'info@noblehospitals.com',
    location: {
      latitude: 18.5089,
      longitude: 73.9260
    },
    resources: generateRealisticResources('medium'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-6715-9999', '+91-20-6715-9900']
  },
  {
    id: 'bharati-hospital',
    name: 'Bharati Hospital',
    address: 'Katraj, Pune, Maharashtra 411046',
    city: 'Pune',
    pincode: '411046',
    phone: '+91-20-2411-1000',
    email: 'info@bharativishwavidyalaya.edu',
    location: {
      latitude: 18.4583,
      longitude: 73.8648
    },
    resources: generateRealisticResources('medium'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-2411-1000', '+91-20-2411-1100']
  },
  {
    id: 'manipal-hospital',
    name: 'Manipal Hospital',
    address: 'Baner Road, Pune, Maharashtra 411045',
    city: 'Pune',
    pincode: '411045',
    phone: '+91-20-6712-7000',
    email: 'pune@manipalhospitals.com',
    location: {
      latitude: 18.5590,
      longitude: 73.7850
    },
    resources: generateRealisticResources('large'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-6712-7000', '+91-20-6712-7100']
  },
  {
    id: 'jupiter-hospital',
    name: 'Jupiter Hospital',
    address: 'Baner Road, Pune, Maharashtra 411045',
    city: 'Pune',
    pincode: '411045',
    phone: '+91-20-6712-4444',
    email: 'info@jupiterhospital.com',
    location: {
      latitude: 18.5640,
      longitude: 73.7840
    },
    resources: generateRealisticResources('large'),
    lastUpdated: generateRecentTimestamp(),
    isVerified: true,
    emergencyContacts: ['+91-20-6712-4444', '+91-20-6712-4500']
  }
];

// Export a function to get fresh data with updated timestamps and availability
export const getFreshHospitalData = (): Hospital[] => {
  return mockHospitals.map(hospital => ({
    ...hospital,
    resources: generateRealisticResources(
      ['ruby-hall', 'jehangir', 'kem', 'aditya-birla', 'manipal-hospital', 'jupiter-hospital'].includes(hospital.id) 
        ? 'large' 
        : 'medium'
    ),
    lastUpdated: generateRecentTimestamp()
  }));
};

// Export individual hospital getter for real-time updates
export const getHospitalById = (id: string): Hospital | undefined => {
  const hospital = mockHospitals.find(h => h.id === id);
  if (!hospital) return undefined;
  
  return {
    ...hospital,
    resources: generateRealisticResources(
      ['ruby-hall', 'jehangir', 'kem', 'aditya-birla', 'manipal-hospital', 'jupiter-hospital'].includes(id) 
        ? 'large' 
        : 'medium'
    ),
    lastUpdated: generateRecentTimestamp()
  };
};