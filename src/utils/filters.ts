import { HospitalProfile, BedAvailability, SearchFilters } from '../types';

export const filterHospitals = (
  hospitals: HospitalProfile[], 
  filters: SearchFilters,
  availability: { [key: string]: BedAvailability }
): HospitalProfile[] => {
  return hospitals.filter((hospital) => {
    // City filter
    if (filters.city && !hospital.city.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    // PIN code filter
    if (filters.pincode && !hospital.pincode.includes(filters.pincode)) {
      return false;
    }

    const hospitalAvailability = availability[hospital.id];

    // Resource type filter
    if (filters.resourceType !== 'all' && hospitalAvailability) {
      const hasAvailableResource = () => {
        switch (filters.resourceType) {
          case 'icu':
            return hospitalAvailability.icuBeds.available > 0;
          case 'general':
            return hospitalAvailability.generalBeds.available > 0;
          case 'oxygen':
            return hospitalAvailability.oxygenBeds.available > 0;
          case 'ventilator':
            return hospitalAvailability.ventilators.available > 0;
          case 'ambulance':
            return hospitalAvailability.ambulances.available > 0;
          default:
            return true;
        }
      };

      if (!hasAvailableResource()) {
        return false;
      }
    }

    // Availability filter
    if (filters.availabilityOnly && hospitalAvailability) {
      const hasAnyAvailability = 
        hospitalAvailability.icuBeds.available > 0 ||
        hospitalAvailability.generalBeds.available > 0 ||
        hospitalAvailability.oxygenBeds.available > 0 ||
        hospitalAvailability.ventilators.available > 0 ||
        hospitalAvailability.ambulances.available > 0;

      if (!hasAnyAvailability) {
        return false;
      }
    }

    return true;
  });
};