// This file is kept for backward compatibility but no longer generates fake data
// All data now comes from the Supabase database

import { HospitalProfile, BedAvailability } from '../types/hospital';

// Legacy function - now returns empty array since we use real database data
export const generateSampleHospitals = (count: number = 0): HospitalProfile[] => {
  console.log('generateSampleHospitals called but returning empty array - using real database data');
  return [];
};

// Legacy function - now returns empty array since we use real database data
export const generateSampleAvailability = (hospitals: HospitalProfile[]): BedAvailability[] => {
  console.log('generateSampleAvailability called but returning empty array - using real database data');
  return [];
};

// Generate historical trends for analytics (still useful for dashboard)
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

// Simulate real-time updates (still useful for testing)
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