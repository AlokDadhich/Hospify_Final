import { supabase } from '../config/supabase';
import { User, Session } from '@supabase/supabase-js';

interface HospitalRegistrationData {
  hospitalName: string;
  location: string;
  hospitalId: string;
  password: string;
}

interface HospitalAuthData {
  id: string;
  hospital_id: string;
  hospital_name: string;
  location: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export class AuthService {
  // Simple hash function for demo purposes (in production, use proper bcrypt)
  private static simpleHash(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  static async registerHospital(data: HospitalRegistrationData): Promise<void> {
    try {
      // Check if hospital ID already exists
      const { data: existing, error: checkError } = await supabase
        .from('hospital_auth')
        .select('hospital_id')
        .eq('hospital_id', data.hospitalId)
        .single();

      if (existing) {
        throw new Error('Hospital ID already exists. Please choose a different ID.');
      }

      // Hash the password
      const passwordHash = this.simpleHash(data.password);

      // Insert new hospital
      const { error } = await supabase
        .from('hospital_auth')
        .insert([{
          hospital_id: data.hospitalId,
          hospital_name: data.hospitalName,
          location: data.location,
          password_hash: passwordHash
        }]);

      if (error) throw error;

      // Create a Supabase auth user for session management
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: `${data.hospitalId}@hospify.local`,
        password: data.password,
        options: {
          data: {
            hospital_id: data.hospitalId,
            hospital_name: data.hospitalName,
            location: data.location
          }
        }
      });

      if (authError) {
        console.warn('Auth user creation failed, but hospital registration succeeded:', authError);
      }

    } catch (error) {
      console.error('Error registering hospital:', error);
      throw error;
    }
  }

  static async signInHospital(hospitalId: string, password: string): Promise<HospitalAuthData> {
    try {
      // Hash the provided password
      const passwordHash = this.simpleHash(password);

      // Check credentials
      const { data, error } = await supabase
        .from('hospital_auth')
        .select('*')
        .eq('hospital_id', hospitalId)
        .eq('password_hash', passwordHash)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        throw new Error('Invalid hospital ID or password');
      }

      // Try to sign in with Supabase auth for session management
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: `${hospitalId}@hospify.local`,
          password: password
        });

        if (authError) {
          // If auth fails, create the user
          await supabase.auth.signUp({
            email: `${hospitalId}@hospify.local`,
            password: password,
            options: {
              data: {
                hospital_id: hospitalId,
                hospital_name: data.hospital_name,
                location: data.location
              }
            }
          });
          
          // Try signing in again
          await supabase.auth.signInWithPassword({
            email: `${hospitalId}@hospify.local`,
            password: password
          });
        }
      } catch (authError) {
        console.warn('Auth session creation failed:', authError);
      }

      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  static async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        // Check if the error is due to no active session
        if (error.message === 'Auth session missing!' || 
            (error as any).code === 'session_not_found') {
          console.warn('No active session found during sign out - this is normal');
          return;
        }
        throw error;
      }
    } catch (error: any) {
      // Additional check for session-related errors
      if (error.message === 'Auth session missing!' || 
          error.code === 'session_not_found' ||
          error.message?.includes('Session from session_id claim in JWT does not exist')) {
        console.warn('No active session found during sign out - this is normal');
        return;
      }
      console.error('Error signing out:', error);
      throw error;
    }
  }

  static async getCurrentHospital(): Promise<HospitalAuthData | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const hospitalId = user.user_metadata?.hospital_id;
      if (!hospitalId) return null;

      const { data, error } = await supabase
        .from('hospital_auth')
        .select('*')
        .eq('hospital_id', hospitalId)
        .single();

      if (error) return null;
      return data;
    } catch (error) {
      console.error('Error getting current hospital:', error);
      return null;
    }
  }

  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }

  static getCurrentUser(): User | null {
    // This is synchronous and might not have the latest data
    // Use getCurrentSession for async access
    return null;
  }

  static async getCurrentSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  // Legacy methods for backward compatibility
  static async registerUser(email: string, password: string, displayName: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName }
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('Failed to create user');
    return data.user;
  }

  static async signIn(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!data.user) throw new Error('Failed to sign in');
    return data.user;
  }

  static async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
}