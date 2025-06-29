// Re-export all types from hospital.ts for backward compatibility
export * from './hospital';

// Legacy types for existing components
export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  email?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  resources: {
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
  };
  lastUpdated: string;
  isVerified: boolean;
  emergencyContacts: string[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}