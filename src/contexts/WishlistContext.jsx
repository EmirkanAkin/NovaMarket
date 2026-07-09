import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Sayfa yenilense de gitmesin diye LocalStorage'dan çekiyoruz
    const saved = localStorage.getItem("nova_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("nova_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const isExist = wishlist.find((item) => item.id === product.id);
    if (isExist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast('Favorilerden Kaldırıldı', { icon: '💔' });
    } else {
      setWishlist([...wishlist, product]);
      toast('Favorilere Eklendi!', { icon: '❤️' });
    }
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);