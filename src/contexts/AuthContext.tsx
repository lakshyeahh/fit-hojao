import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  currentUser: User | null;
  isOnboarded: boolean;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  setOnboarded: (value: boolean) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isOnboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Store additional user data if needed
      localStorage.setItem(`user_${result.user.uid}_onboarded`, 'false');
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Check onboarding status
        const onboarded = localStorage.getItem(`user_${user.uid}_onboarded`);
        setOnboarded(onboarded === 'true');
      } else {
        setOnboarded(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isOnboarded,
    loading,
    signUp,
    signIn,
    logOut,
    setOnboarded: (value: boolean) => {
      if (currentUser) {
        localStorage.setItem(`user_${currentUser.uid}_onboarded`, value.toString());
        setOnboarded(value);
      }
    },
    signOut: logOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 