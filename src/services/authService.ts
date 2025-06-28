import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { HospitalUser } from '../types/hospital';

export class AuthService {
  static async registerHospital(
    email: string,
    password: string,
    displayName: string,
    hospitalData?: any
  ): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, { displayName });

      // Send email verification
      await sendEmailVerification(user);

      // Create user document in Firestore
      const userData: HospitalUser = {
        uid: user.uid,
        email: user.email!,
        role: 'admin',
        displayName,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });

      return user;
    } catch (error) {
      console.error('Error registering hospital:', error);
      throw error;
    }
  }

  static async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update last login
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp()
      });

      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  static async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  static async getUserData(uid: string): Promise<HospitalUser | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          lastLogin: data.lastLogin?.toDate?.()?.toISOString() || new Date().toISOString()
        } as HospitalUser;
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  }

  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  static getCurrentUser(): User | null {
    return auth.currentUser;
  }
}