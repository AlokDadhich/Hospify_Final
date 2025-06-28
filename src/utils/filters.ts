import { Hospital, SearchFilters } from '../types';

export const filterHospitals = (hospitals: Hospital[], filters: SearchFilters): Hospital[] => {
  return hospitals.filter((hospital) => {
    // City filter
    if (filters.city && !hospital.city.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    // PIN code filter
    if (filters.pincode && !hospital.pincode.includes(filters.pincode)) {
      return false;
    }

    // Resource type filter
    if (filters.resourceType !== 'all') {
      const hasAvailableResource = () => {
        switch (filters.resourceType) {
          case 'icu':
            return hospital.resources.icuBeds.available > 0;
          case 'general':
            return hospital.resources.generalBeds.available > 0;
          case 'oxygen':
            return hospital.resources.oxygenBeds.available > 0;
          case 'ventilator':
            return hospital.resources.ventilators.available > 0;
          case 'ambulance':
            return hospital.resources.ambulances.available > 0;
          default:
            return true;
        }
      };

      if (!hasAvailableResource()) {
        return false;
      }
    }

    // Availability filter
    if (filters.availabilityOnly) {
      const hasAnyAvailability = 
        hospital.resources.icuBeds.available > 0 ||
        hospital.resources.generalBeds.available > 0 ||
        hospital.resources.oxygenBeds.available > 0 ||
        hospital.resources.ventilators.available > 0 ||
        hospital.resources.ambulances.available > 0;

      if (!hasAnyAvailability) {
        return false;
      }
    }

    return true;
  });
};