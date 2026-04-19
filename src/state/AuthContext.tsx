import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isAdmin: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Ensure user profile exists
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        let role = 'user';
        const isHardcodedAdmin = ['fabiopalacioschwingel@gmail.com'].includes(currentUser.email || '');

        if (!userDoc.exists()) {
          role = isHardcodedAdmin ? 'admin' : 'user';
          await setDoc(userRef, {
            email: currentUser.email,
            role,
            createdAt: serverTimestamp()
          });
        } else {
          role = userDoc.data().role;
          // In case they were just added to hardcoded list but profile is "user", we can temporarily force it:
          if (isHardcodedAdmin) role = 'admin';
        }

        setIsAdmin(role === 'admin' || isHardcodedAdmin);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
