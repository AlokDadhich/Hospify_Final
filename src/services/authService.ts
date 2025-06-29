import { supabase } from '../config/supabase';
import { User, Session } from '@supabase/supabase-js';
import { HospitalUser } from '../types/hospital';

export class AuthService {
  static async registerHospital(
    email: string,
    password: string,
    displayName: string,
    hospitalData?: any
  ): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            role: 'admin'
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('Failed to create user');

      // Create user profile in database
      const userData: Omit<HospitalUser, 'uid'> = {
        email: data.user.email!,
        role: 'admin',
        displayName,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      const { error: profileError } = await supabase
        .from('users')
        .insert([{ ...userData, uid: data.user.id }]);

      if (profileError) {
        console.error('Error creating user profile:', profileError);
      }

      return data.user;
    } catch (error) {
      console.error('Error registering hospital:', error);
      throw error;
    }
  }

  static async signIn(email: string, password: string): Promise<User> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.user) throw new Error('Failed to sign in');

      // Update last login
      await supabase
        .from('users')
        .update({ lastLogin: new Date().toISOString() })
        .eq('uid', data.user.id);

      return data.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  static async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  static async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  static async getUserData(uid: string): Promise<HospitalUser | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', uid)
        .single();

      if (error) throw error;
      return data as HospitalUser;
    } catch (error) {
      console.error('Error getting user data:', error);
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
    const { data: { user } } = supabase.auth.getUser();
    return user;
  }

  static async getCurrentSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }
}