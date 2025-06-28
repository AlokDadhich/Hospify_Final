export interface HospitalProfile {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  registrationNumber: string;
  location: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  adminUserId: string;
}

export interface BedAvailability {
  id: string;
  hospitalId: string;
  icuBeds: {
    total: number;
    available: number;
    occupied: number;
  };
  generalBeds: {
    total: number;
    available: number;
    occupied: number;
  };
  oxygenBeds: {
    total: number;
    available: number;
    occupied: number;
  };
  ventilators: {
    total: number;
    available: number;
    occupied: number;
  };
  ambulances: {
    total: number;
    available: number;
    onDuty: number;
  };
  lastUpdated: string;
  updatedBy: string;
}

export interface HistoricalLog {
  id: string;
  hospitalId: string;
  timestamp: string;
  resourceType: 'icuBeds' | 'generalBeds' | 'oxygenBeds' | 'ventilators' | 'ambulances';
  previousValue: number;
  newValue: number;
  updatedBy: string;
  action: 'increase' | 'decrease' | 'update';
}

export interface AmbulanceTracking {
  id: string;
  hospitalId: string;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  status: 'available' | 'onDuty' | 'maintenance';
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  lastUpdated: string;
}

export interface HospitalUser {
  uid: string;
  email: string;
  hospitalId?: string;
  role: 'admin' | 'staff';
  displayName: string;
  createdAt: string;
  lastLogin: string;
}