import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '@/config/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext();

const firebaseUserToProfile = (firebaseUser) => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  emailVerified: firebaseUser.emailVerified,
  displayName: firebaseUser.displayName,
  photoURL: firebaseUser.photoURL,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        const profile = firebaseUserToProfile(firebaseUser);
        // Intentar obtener perfil extendido de Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser({ ...profile, ...userDoc.data() });
          } else {
            // Crear perfil en Firestore si no existe
            const newProfile = {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || '',
              createdAt: serverTimestamp(),
              role: 'user',
            };
            await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
            setUser({ ...profile, ...newProfile });
          }
        } catch (error) {
          console.error('Error fetching user profile from Firestore:', error);
          setUser(profile);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    if (!credential.user.emailVerified) {
      await signOut(auth);
      const error = new Error('Email not verified');
      error.code = 'auth/email-not-verified';
      throw error;
    }
    const profile = firebaseUserToProfile(credential.user);
    try {
      const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
      if (userDoc.exists()) {
        setUser({ ...profile, ...userDoc.data() });
      } else {
        const newProfile = {
          email: credential.user.email,
          displayName: credential.user.displayName || '',
          createdAt: serverTimestamp(),
          role: 'user',
        };
        await setDoc(doc(db, 'users', credential.user.uid), newProfile);
        setUser({ ...profile, ...newProfile });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setUser(profile);
    }
    return profile;
  };

  const register = async (email, password) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(credential.user);
    // No dejar la sesión abierta hasta que verifique
    await signOut(auth);
    return credential.user;
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const checkAuth = async () => {
    const firebaseUser = auth.currentUser;
    if (firebaseUser && firebaseUser.emailVerified) {
      const profile = firebaseUserToProfile(firebaseUser);
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ ...profile, ...userDoc.data() });
        }
      } catch {
        setUser(profile);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isLoadingAuth: isLoading,
      isAuthenticated: !!user,
      authError: null,
      login,
      logout,
      register,
      resetPassword,
      checkAuth,
      navigateToLogin: () => { window.location.href = '/Acceso'; },
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
