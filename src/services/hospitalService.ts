import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  GeoPoint,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { HospitalProfile, BedAvailability, HistoricalLog, AmbulanceTracking } from '../types/hospital';

export class HospitalService {
  // Hospital Profile Management
  static async createHospitalProfile(hospitalData: Omit<HospitalProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'hospitals'), {
        ...hospitalData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        location: new GeoPoint(hospitalData.location.latitude, hospitalData.location.longitude)
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating hospital profile:', error);
      throw error;
    }
  }

  static async updateHospitalProfile(hospitalId: string, updates: Partial<HospitalProfile>): Promise<void> {
    try {
      const hospitalRef = doc(db, 'hospitals', hospitalId);
      await updateDoc(hospitalRef, {
        ...updates,
        updatedAt: serverTimestamp(),
        ...(updates.location && {
          location: new GeoPoint(updates.location.latitude, updates.location.longitude)
        })
      });
    } catch (error) {
      console.error('Error updating hospital profile:', error);
      throw error;
    }
  }

  static async getHospitalProfile(hospitalId: string): Promise<HospitalProfile | null> {
    try {
      const hospitalDoc = await getDoc(doc(db, 'hospitals', hospitalId));
      if (hospitalDoc.exists()) {
        const data = hospitalDoc.data();
        return {
          id: hospitalDoc.id,
          ...data,
          location: {
            latitude: data.location.latitude,
            longitude: data.location.longitude
          },
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
        } as HospitalProfile;
      }
      return null;
    } catch (error) {
      console.error('Error getting hospital profile:', error);
      throw error;
    }
  }

  static async getAllHospitals(): Promise<HospitalProfile[]> {
    try {
      const hospitalsSnapshot = await getDocs(collection(db, 'hospitals'));
      return hospitalsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          location: {
            latitude: data.location.latitude,
            longitude: data.location.longitude
          },
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
        } as HospitalProfile;
      });
    } catch (error) {
      console.error('Error getting all hospitals:', error);
      throw error;
    }
  }

  // Bed Availability Management
  static async updateBedAvailability(availabilityData: Omit<BedAvailability, 'id' | 'lastUpdated'>): Promise<void> {
    try {
      const availabilityRef = doc(db, 'bedAvailability', availabilityData.hospitalId);
      await updateDoc(availabilityRef, {
        ...availabilityData,
        lastUpdated: serverTimestamp()
      });
    } catch (error) {
      // If document doesn't exist, create it
      try {
        await addDoc(collection(db, 'bedAvailability'), {
          ...availabilityData,
          lastUpdated: serverTimestamp()
        });
      } catch (createError) {
        console.error('Error creating bed availability:', createError);
        throw createError;
      }
    }
  }

  static async getBedAvailability(hospitalId: string): Promise<BedAvailability | null> {
    try {
      const availabilityDoc = await getDoc(doc(db, 'bedAvailability', hospitalId));
      if (availabilityDoc.exists()) {
        const data = availabilityDoc.data();
        return {
          id: availabilityDoc.id,
          ...data,
          lastUpdated: data.lastUpdated?.toDate?.()?.toISOString() || new Date().toISOString()
        } as BedAvailability;
      }
      return null;
    } catch (error) {
      console.error('Error getting bed availability:', error);
      throw error;
    }
  }

  static subscribeToAllBedAvailability(callback: (availability: BedAvailability[]) => void): () => void {
    const q = query(collection(db, 'bedAvailability'), orderBy('lastUpdated', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
      const availability = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          lastUpdated: data.lastUpdated?.toDate?.()?.toISOString() || new Date().toISOString()
        } as BedAvailability;
      });
      callback(availability);
    });
  }

  // Historical Logging
  static async logResourceChange(logData: Omit<HistoricalLog, 'id' | 'timestamp'>): Promise<void> {
    try {
      await addDoc(collection(db, 'historicalLogs'), {
        ...logData,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error logging resource change:', error);
      throw error;
    }
  }

  static async getHospitalHistory(hospitalId: string, days: number = 7): Promise<HistoricalLog[]> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const q = query(
        collection(db, 'historicalLogs'),
        where('hospitalId', '==', hospitalId),
        where('timestamp', '>=', Timestamp.fromDate(cutoffDate)),
        orderBy('timestamp', 'desc'),
        limit(100)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
        } as HistoricalLog;
      });
    } catch (error) {
      console.error('Error getting hospital history:', error);
      throw error;
    }
  }

  // Ambulance Tracking
  static async updateAmbulanceStatus(ambulanceData: Omit<AmbulanceTracking, 'id' | 'lastUpdated'>): Promise<void> {
    try {
      const ambulanceRef = doc(db, 'ambulances', `${ambulanceData.hospitalId}_${ambulanceData.vehicleNumber}`);
      await updateDoc(ambulanceRef, {
        ...ambulanceData,
        lastUpdated: serverTimestamp(),
        ...(ambulanceData.currentLocation && {
          currentLocation: new GeoPoint(
            ambulanceData.currentLocation.latitude,
            ambulanceData.currentLocation.longitude
          )
        })
      });
    } catch (error) {
      // If document doesn't exist, create it
      try {
        await addDoc(collection(db, 'ambulances'), {
          ...ambulanceData,
          lastUpdated: serverTimestamp(),
          ...(ambulanceData.currentLocation && {
            currentLocation: new GeoPoint(
              ambulanceData.currentLocation.latitude,
              ambulanceData.currentLocation.longitude
            )
          })
        });
      } catch (createError) {
        console.error('Error creating ambulance record:', createError);
        throw createError;
      }
    }
  }

  static async getHospitalAmbulances(hospitalId: string): Promise<AmbulanceTracking[]> {
    try {
      const q = query(
        collection(db, 'ambulances'),
        where('hospitalId', '==', hospitalId)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          currentLocation: data.currentLocation ? {
            latitude: data.currentLocation.latitude,
            longitude: data.currentLocation.longitude
          } : undefined,
          lastUpdated: data.lastUpdated?.toDate?.()?.toISOString() || new Date().toISOString()
        } as AmbulanceTracking;
      });
    } catch (error) {
      console.error('Error getting hospital ambulances:', error);
      throw error;
    }
  }
}