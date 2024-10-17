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
  sendPasswordResetEmail: (email: string) => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userWithRole = await getUserWithRole(firebaseUser);
        setUser(userWithRole);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getUserWithRole = async (firebaseUser: User): Promise<AuthUser> => {
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    const userData = userDoc.data();
    return { ...firebaseUser, role: userData?.role };
  };

  const signup = async (email: string, password: string) => {
    const { user } = await registerWithEmailAndPassword(email, password);
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: 'user'
    });
    const userWithRole = await getUserWithRole(user);
    setUser(userWithRole);
  };

  const login = async (email: string, password: string) => {
    const { user } = await loginWithEmailAndPassword(email, password);
    const userWithRole = await getUserWithRole(user);
    setUser(userWithRole);
    return userWithRole;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const sendPasswordResetEmail = async (email: string) => {
    await sendPasswordResetEmailToUser(email);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    sendPasswordResetEmail,
    isAdmin
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