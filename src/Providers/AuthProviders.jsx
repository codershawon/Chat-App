import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import app from '../firebase/firebaseConfig';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProviders = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
      };
      const logout = () => {
        setLoading(true);
        return signOut(auth);
      };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged (auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false)
        
          
        });
        return () => {
          return unsubscribe();
        };
      }, [user]);
      const value = { user,signInWithGoogle,logout }
    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
};

export default AuthProviders;