import { Link } from "react-router-dom";
import { XMarkIcon, ShoppingBagIcon, TrashIcon, PlusIcon, MinusIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useCart } from "../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const CartDrawer = ({ isOpen, onClose, cartItems, removeFromCart, total }) => {
  const { updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Arka Plan Karartma (Overlay) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Sağdan Kayan Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white dark:bg-gray-950 z-[70] shadow-2xl"
          >
        
        <div className="flex flex-col h-full p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">Sepetim</h2>
            <button onClick={onClose} aria-label="Sepeti Kapat" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <XMarkIcon className="h-7 w-7 text-gray-900 dark:text-white" />
            </button>
          </div>

          {/* Ürün Listesi */}
          <div className="flex-grow overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="text-center py-24">
                <div className="bg-gray-50 dark:bg-gray-900 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                   <ShoppingBagIcon className="h-10 w-10 text-gray-200 dark:text-gray-700" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-black uppercase text-sm tracking-tight mb-2 italic">Sepetiniz Henüz Boş</h3>
                <p className="text-gray-400 font-bold uppercase text-[9px] tracking-widest leading-relaxed max-w-[220px] mx-auto">
                  Nova koleksiyonlarını keşfederek size özel fırsatlardan hemen yararlanabilirsiniz.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-8 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest border-b-2 border-indigo-600 dark:border-indigo-400 pb-1 hover:text-gray-900 dark:hover:text-white hover:border-gray-900 dark:hover:border-white transition-all"
                >
                  Alışverişe Başlayın
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  {/* Ürün Görseli */}
                  <div className="h-24 w-24 bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>

                  {/* Ürün Bilgileri */}
                  <div className="flex-grow">
                    <h3 className="font-black text-gray-900 dark:text-white text-sm uppercase leading-tight italic">{item.name}</h3>
                    
                    {/* ADET YÖNETİMİ */}
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 px-2 gap-3 border border-gray-200/50 dark:border-gray-700">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Adeti Azalt"
                          className="text-indigo-600 dark:text-indigo-400 font-black hover:bg-white dark:hover:bg-gray-700 rounded transition-all active:scale-90 px-1"
                        >
                          <MinusIcon className="h-3 w-3 stroke-[4]" />
                        </button>

                        <span className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase whitespace-nowrap min-w-[40px] text-center">
                          {item.quantity} ADET
                        </span>

                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Adeti Artır"
                          className="text-indigo-600 dark:text-indigo-400 font-black hover:bg-white dark:hover:bg-gray-700 rounded transition-all active:scale-90 px-1"
                        >
                          <PlusIcon className="h-3 w-3 stroke-[4]" />
                        </button>
                      </div>

                      <p className="text-indigo-600 dark:text-indigo-400 font-black text-sm italic ml-auto">
                        {(item.price * item.quantity)?.toLocaleString('tr-TR')} TL
                      </p>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-4 flex items-center gap-1.5 hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="h-3 w-3" /> Ürünü Sepetten Kaldır
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer (Özet ve Buton) */}
          {cartItems.length > 0 && (
            <div className="pt-8 border-t border-gray-100 dark:border-gray-800 mt-auto">
              <div className="flex justify-between items-end mb-6">
                <div className="flex flex-col">
                    <span className="text-gray-400 font-black uppercase text-[10px] tracking-widest">Tahmini Toplam</span>
                    <span className="text-[10px] text-indigo-500 font-bold italic">Tüm vergiler dahildir</span>
                </div>
                <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic">
                  {total?.toLocaleString('tr-TR')} TL
                </span>
              </div>
              
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="block w-full bg-gray-900 dark:bg-indigo-600 text-white text-center py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-100 dark:shadow-none active:scale-95"
              >
                Siparişi Tamamla
              </Link>
              
              <div className="flex items-center justify-center gap-2 mt-5 py-2 px-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                 <ShieldCheckIcon className="h-4 w-4 text-green-500" />
                 <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">
                   Ödemeniz 256-bit SSL sertifikası ile korunmaktadır.
                 </p>
              </div>
            </div>
          )}
        </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;