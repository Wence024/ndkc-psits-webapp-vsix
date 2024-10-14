import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, loginWithEmailAndPassword, registerWithEmailAndPassword, logoutUser, getCurrentUser, sendPasswordResetEmailToUser } from '../firebase/config';

interface AuthUser extends User {
  role?: 'admin' | 'user';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
  sendPasswordResetEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const firebaseUser = await getCurrentUser();
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        setUser({ ...firebaseUser, role: userData?.role });
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signup = async (email: string, password: string) => {
    const { user } = await registerWithEmailAndPassword(email, password);
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'user'
    });
    setUser({ ...user, role: 'user' });
  };

  const login = async (email: string, password: string) => {
    const { user } = await loginWithEmailAndPassword(email, password);
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    const authUser = { ...user, role: userData?.role };
    setUser(authUser);
    return authUser;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const sendPasswordResetEmail = async (email: string) => {
    await sendPasswordResetEmailToUser(email);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAdmin,
    sendPasswordResetEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};