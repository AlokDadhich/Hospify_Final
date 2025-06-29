import { supabase } from '../config/supabase';
import { HospitalProfile, BedAvailability, HistoricalLog, AmbulanceTracking } from '../types/hospital';

export class HospitalService {
  // Hospital Profile Management
  static async createHospitalProfile(hospitalData: Omit<HospitalProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const { data, error } = await supabase
        .from('hospitals')
        .insert([{
          ...hospitalData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data.id;
    } catch (error) {
      console.error('Error creating hospital profile:', error);
      throw error;
    }
  }

  static async updateHospitalProfile(hospitalId: string, updates: Partial<HospitalProfile>): Promise<void> {
    try {
      const { error } = await supabase
        .from('hospitals')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', hospitalId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating hospital profile:', error);
      throw error;
    }
  }

  static async getHospitalProfile(hospitalId: string): Promise<HospitalProfile | null> {
    try {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*')
        .eq('id', hospitalId)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      } as HospitalProfile;
    } catch (error) {
      console.error('Error getting hospital profile:', error);
      return null;
    }
  }

  static async getAllHospitals(): Promise<HospitalProfile[]> {
    try {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*')
        .order('name');

      if (error) throw error;
      
      return (data || []).map(hospital => ({
        ...hospital,
        createdAt: hospital.created_at,
        updatedAt: hospital.updated_at
      })) as HospitalProfile[];
    } catch (error) {
      console.error('Error getting all hospitals:', error);
      return [];
    }
  }

  // Bed Availability Management
  static async updateBedAvailability(availabilityData: Omit<BedAvailability, 'id' | 'lastUpdated'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('bed_availability')
        .upsert([{
          hospital_id: availabilityData.hospitalId,
          icu_beds: availabilityData.icuBeds,
          general_beds: availabilityData.generalBeds,
          oxygen_beds: availabilityData.oxygenBeds,
          ventilators: availabilityData.ventilators,
          ambulances: availabilityData.ambulances,
          last_updated: new Date().toISOString(),
          updated_by: availabilityData.updatedBy
        }], {
          onConflict: 'hospital_id'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating bed availability:', error);
      throw error;
    }
  }

  static async getBedAvailability(hospitalId: string): Promise<BedAvailability | null> {
    try {
      const { data, error } = await supabase
        .from('bed_availability')
        .select('*')
        .eq('hospital_id', hospitalId)
        .single();

      if (error) throw error;
      
      return {
        id: data.id,
        hospitalId: data.hospital_id,
        icuBeds: data.icu_beds,
        generalBeds: data.general_beds,
        oxygenBeds: data.oxygen_beds,
        ventilators: data.ventilators,
        ambulances: data.ambulances,
        lastUpdated: data.last_updated,
        updatedBy: data.updated_by
      } as BedAvailability;
    } catch (error) {
      console.error('Error getting bed availability:', error);
      return null;
    }
  }

  static subscribeToAllBedAvailability(callback: (availability: BedAvailability[]) => void): () => void {
    const subscription = supabase
      .from('bed_availability')
      .on('*', (payload) => {
        // Refetch all data when any change occurs
        this.getAllBedAvailability().then(callback);
      })
      .subscribe();

    // Initial fetch
    this.getAllBedAvailability().then(callback);

    return () => {
      supabase.removeSubscription(subscription);
    };
  }

  static async getAllBedAvailability(): Promise<BedAvailability[]> {
    try {
      const { data, error } = await supabase
        .from('bed_availability')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      
      return (data || []).map(item => ({
        id: item.id,
        hospitalId: item.hospital_id,
        icuBeds: item.icu_beds,
        generalBeds: item.general_beds,
        oxygenBeds: item.oxygen_beds,
        ventilators: item.ventilators,
        ambulances: item.ambulances,
        lastUpdated: item.last_updated,
        updatedBy: item.updated_by
      })) as BedAvailability[];
    } catch (error) {
      console.error('Error getting all bed availability:', error);
      return [];
    }
  }

  // Historical Logging
  static async logResourceChange(logData: Omit<HistoricalLog, 'id' | 'timestamp'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('historical_logs')
        .insert([{
          hospital_id: logData.hospitalId,
          resource_type: logData.resourceType,
          previous_value: logData.previousValue,
          new_value: logData.newValue,
          updated_by: logData.updatedBy,
          action: logData.action,
          timestamp: new Date().toISOString()
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error logging resource change:', error);
      throw error;
    }
  }

  static async getHospitalHistory(hospitalId: string, days: number = 7): Promise<HistoricalLog[]> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const { data, error } = await supabase
        .from('historical_logs')
        .select('*')
        .eq('hospital_id', hospitalId)
        .gte('timestamp', cutoffDate.toISOString())
        .order('timestamp', { ascending: false })
        .limit(100);

      if (error) throw error;
      
      return (data || []).map(item => ({
        id: item.id,
        hospitalId: item.hospital_id,
        resourceType: item.resource_type,
        previousValue: item.previous_value,
        newValue: item.new_value,
        updatedBy: item.updated_by,
        action: item.action,
        timestamp: item.timestamp
      })) as HistoricalLog[];
    } catch (error) {
      console.error('Error getting hospital history:', error);
      return [];
    }
  }

  // Ambulance Tracking
  static async updateAmbulanceStatus(ambulanceData: Omit<AmbulanceTracking, 'id' | 'lastUpdated'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('ambulances')
        .upsert([{
          hospital_id: ambulanceData.hospitalId,
          vehicle_number: ambulanceData.vehicleNumber,
          driver_name: ambulanceData.driverName,
          driver_phone: ambulanceData.driverPhone,
          status: ambulanceData.status,
          current_location: ambulanceData.currentLocation,
          last_updated: new Date().toISOString()
        }], {
          onConflict: 'hospital_id,vehicle_number'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating ambulance status:', error);
      throw error;
    }
  }

  static async getHospitalAmbulances(hospitalId: string): Promise<AmbulanceTracking[]> {
    try {
      const { data, error } = await supabase
        .from('ambulances')
        .select('*')
        .eq('hospital_id', hospitalId);

      if (error) throw error;
      
      return (data || []).map(item => ({
        id: item.id,
        hospitalId: item.hospital_id,
        vehicleNumber: item.vehicle_number,
        driverName: item.driver_name,
        driverPhone: item.driver_phone,
        status: item.status,
        currentLocation: item.current_location,
        lastUpdated: item.last_updated
      })) as AmbulanceTracking[];
    } catch (error) {
      console.error('Error getting hospital ambulances:', error);
      return [];
    }
  }
}