import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { TrashIcon, PlusIcon, MinusIcon, ShoppingBagIcon, SparklesIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  // --- EKONOMİ MOTORU ---
  const shippingFee = cartTotal > 500 ? 0 : 50;
  const totalBonus = (cartTotal * 0.02).toFixed(2); // Toplam kazanılacak bonus
  const grandTotal = cartTotal + shippingFee;

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} sepetten çıkarıldı.`);
  };

  const handleClear = () => {
    if (window.confirm("Tüm sepeti boşaltmak istediğinize emin misiniz?")) {
      clearCart();
      toast.success("Sepet temizlendi.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="bg-indigo-50 dark:bg-indigo-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 dark:text-indigo-400 animate-bounce">
          <ShoppingBagIcon className="h-12 w-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tight uppercase italic">Sepetiniz Boş</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm font-bold uppercase tracking-widest max-w-sm mx-auto">
          NovaMarket fırsatlarını kaçırma! Bonus kazanmak için hemen alışverişe başla.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-gray-900 dark:bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-gray-200 dark:shadow-none active:scale-95 uppercase tracking-widest text-xs"
        >
          Ürünleri Keşfet
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic leading-none">
            Sepetim
          </h1>
          <p className="text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] mt-2">
            Toplam {cartItems.length} benzersiz ürün seçildi
          </p>
        </div>
        <button 
          onClick={handleClear}
          className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-all italic flex items-center gap-2 border-b border-transparent hover:border-red-200 pb-1 w-fit"
        >
          <TrashIcon className="h-4 w-4" /> Tümünü Temizle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ÜRÜN LİSTESİ */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="group flex items-center bg-white dark:bg-gray-900 p-5 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-indigo-100/20 dark:hover:shadow-indigo-500/10 transition-all duration-500">
              <div className="w-24 h-24 flex-shrink-0 rounded-[1.5rem] overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-50 dark:border-gray-800">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>

              <div className="ml-6 flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase italic tracking-tighter leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">{item.category}</p>
                  </div>
                  <p className="text-gray-900 dark:text-white font-black text-lg italic">
                    {(item.price * item.quantity).toLocaleString('tr-TR')} TL
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center bg-gray-50 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                    <button 
                      onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : handleRemove(item.id, item.name)}
                      aria-label="Adeti Azalt"
                      className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-red-500 transition-all shadow-sm dark:shadow-none active:scale-75"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="font-black text-gray-900 dark:text-white w-8 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Adeti Artır"
                      className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-indigo-600 transition-all shadow-sm dark:shadow-none active:scale-75"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemove(item.id, item.name)}
                    className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-1 text-[9px] font-black uppercase tracking-widest"
                  >
                    <TrashIcon className="h-4 w-4" /> Kaldır
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SİPARİŞ ÖZETİ */}
        <div className="lg:col-span-4">
          <div className="bg-gray-900 dark:bg-gray-950 border border-transparent dark:border-gray-800 p-8 rounded-[3.5rem] shadow-2xl shadow-indigo-200/50 dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] sticky top-24 overflow-hidden">
            {/* Arka Plan Süsü */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl"></div>
            
            <h2 className="relative text-2xl font-black text-white mb-8 border-b border-white/10 pb-4 tracking-tight uppercase italic">Özet</h2>
            
            <div className="relative space-y-4 mb-8">
              <div className="flex justify-between text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em]">
                <span>Ara Toplam</span>
                <span className="text-white text-sm font-black italic">{cartTotal.toLocaleString('tr-TR')} TL</span>
              </div>
              <div className="flex justify-between text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em]">
                <span>Kargo</span>
                <span className={shippingFee === 0 ? "text-green-400 text-sm font-black italic" : "text-white text-sm font-black italic"}>
                  {shippingFee === 0 ? "Ücretsiz" : `${shippingFee} TL`}
                </span>
              </div>
              
              {/* NOVA BONUS KAZANÇ KARTI */}
              <div className="bg-indigo-600/20 border border-indigo-500/30 p-4 rounded-2xl mt-6 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Kazanılacak Bonus</p>
                  <p className="text-xl font-black text-white italic">+{totalBonus} TL</p>
                </div>
                <SparklesIcon className="h-8 w-8 text-indigo-400 opacity-50" />
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <span className="text-xl font-black text-white uppercase italic">Toplam</span>
                <span className="text-4xl font-black text-indigo-400 tracking-tighter italic leading-none">
                    {grandTotal.toLocaleString('tr-TR')} TL
                </span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="relative block w-full bg-white text-gray-900 py-6 rounded-2xl font-black text-center text-sm hover:bg-indigo-400 hover:text-white transition-all shadow-xl active:scale-[0.98] uppercase tracking-[0.2em]"
            >
              Ödemeye Geç
            </Link>
            
            <div className="mt-8 flex items-center justify-center gap-4 opacity-30">
                <div className="h-[1px] w-full bg-white/20"></div>
                <span className="text-[8px] font-black text-white uppercase whitespace-nowrap tracking-widest">Nova Güvencesi</span>
                <div className="h-[1px] w-full bg-white/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;