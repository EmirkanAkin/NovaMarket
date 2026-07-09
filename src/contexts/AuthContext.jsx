import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

// Diğer dosyalardan kullanıcının bilgilerine ulaşmak için bu fonksiyonu çağıracağız
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Yeni kullanıcı kaydı
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Giriş yapma
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Çıkış yapma
  const logout = () => {
    return signOut(auth);
  };

  // Firebase'den gelen oturum bilgisini anlık dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};