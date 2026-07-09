import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import CartDrawer from "./CartDrawer"; // Yan panel bileşeni
import { useCart } from "../contexts/CartContext"; // Yolunu kontrol et kanka (contexts vs context)

const Layout = () => {
  // Drawer'ın (Sepet Paneli) açık olup olmadığını tutan state
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // SENİN CONTEXT YAPINA GÖRE DEĞİŞKENLERİ ÇEKTİK:
  // cartItems: Ürün listesi
  // removeFromCart: Silme fonksiyonu
  // cartTotal: Toplam tutar
  const { cartItems, removeFromCart, cartTotal } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD] dark:bg-gray-950 transition-colors duration-300 overflow-x-hidden">
      {/* Navbar'a sepeti açma yetkisini verdik */}
      <Navbar onCartOpen={() => setIsCartOpen(true)} />
      
      {/* pb-28: Mobilde alt menünün (BottomNav) arkasında içerik kalmasın diye padding verdik */}
      <main className="flex-grow container mx-auto px-4 py-10 pb-28 md:pb-10">
        <Outlet />
      </main>

      <Footer />

      {/* Mobilde gözüken alt navigasyon */}
      <BottomNav />

      {/* SEPET YAN PANELİ (DRAWER) */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        removeFromCart={removeFromCart}
        total={cartTotal}
      />
    </div>
  );
};

export default Layout;