import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Otomatik Hesaplamalar ---
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const cartRef = doc(db, "carts", currentUser.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        setCartItems(docSnap.data().items || []);
      } else {
        setCartItems([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const addToCart = async (product) => {
    if (!currentUser) {
      alert("Sepete ürün eklemek için giriş yapmalısınız!");
      return;
    }

    const cartRef = doc(db, "carts", currentUser.uid);
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    let newItems;

    if (existingIndex !== -1) {
      newItems = [...cartItems];
      newItems[existingIndex].quantity += 1;
    } else {
      newItems = [...cartItems, { ...product, quantity: 1 }];
    }

    await setDoc(cartRef, { items: newItems }, { merge: true });
  };

  // --- GÜNCELLENDİ: Adet Değiştirme Mantığı ---
  const updateQuantity = async (productId, amount) => {
    if (!currentUser) return;
    
    const newItems = cartItems.map((item) => {
      if (item.id === productId) {
        // En az 1 adet kalmasını sağlıyoruz
        const updatedQty = Math.max(1, item.quantity + amount);
        return { ...item, quantity: updatedQty };
      }
      return item;
    });

    const cartRef = doc(db, "carts", currentUser.uid);
    await setDoc(cartRef, { items: newItems }, { merge: true });
  };

  const removeFromCart = async (productId) => {
    if (!currentUser) return;
    const cartRef = doc(db, "carts", currentUser.uid);
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    await setDoc(cartRef, { items: updatedItems }, { merge: true });
  };

  const clearCart = async (orderSuccess = false) => {
    if (!currentUser) return;
    const cartRef = doc(db, "carts", currentUser.uid);
    await setDoc(cartRef, { items: [] }, { merge: true });
    if(orderSuccess) alert("Siparişin alındı kanka, yola çıkıyor! 🚀");
  };

  const value = {
    cartItems,
    totalItems,
    cartTotal,
    loading,
    addToCart,
    updateQuantity, // Bu artık doğrudan +/- butonlarına bağlanabilir
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};