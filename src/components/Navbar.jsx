import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useTheme } from "../contexts/ThemeContext";
import Wallet from "./Wallet"; // 1. ADIMDA OLUŞTURDUĞUMUZ CÜZDANI ÇAĞIRDIK
import { 
  ShoppingBagIcon, 
  UserIcon, 
  HeartIcon, 
  ChartBarIcon, 
  CubeIcon, 
  ChatBubbleLeftRightIcon,
  TicketIcon,
  SunIcon,
  MoonIcon
} from "@heroicons/react/24/outline";

const Navbar = ({ onCartOpen }) => {
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart(); 
  const { wishlist } = useWishlist();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Oturum kapatma hatası:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all">
      {/* 1. DUYURU BARI */}
      <div className="bg-[#111] py-2 border-b border-white/5 overflow-hidden hidden md:block text-[11px] font-medium tracking-wide italic">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              7/24 Canlı Destek Aktif
            </span>
            <span className="hidden lg:inline border-l border-white/10 pl-6 text-indigo-400 animate-pulse">
              Teknoloji Haftası: Seçili RTX Sistemlerde ve Ekipmanlarda Dev İndirimler!
            </span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <Link to="/support" className="hover:text-indigo-400 transition">Yardım Merkezi</Link>
            <span className="text-white/10">|</span>
            <Link to="/orders" className="hover:text-indigo-400 transition text-indigo-400">Sipariş Takibi</Link>
          </div>
        </div>
      </div>

      {/* 2. ANA NAVBAR */}
      <nav className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          <div className="flex items-center gap-10">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gray-900 dark:bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:rotate-6 transition-all shadow-lg">
                <ShoppingBagIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic leading-none">
                NOVA<span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-200 dark:decoration-indigo-900 decoration-4 underline-offset-4">MARKET</span>
              </span>
            </Link>

            {/* HIZLI KATEGORİ LİNKLERİ */}
            <div className="hidden lg:flex items-center gap-8 border-l border-gray-100 dark:border-gray-800 pl-8">
              <Link to="/" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Mağaza</Link>
              <Link to="/favorites" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Favorilerim</Link>
              <Link to="/support" className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group">
                <TicketIcon className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                Destek
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:space-x-5">
            
            {/* CANLI DESTEK BUTONU */}
            <button 
              onClick={() => window.dispatchEvent(new Event("open-live-chat"))}
              aria-label="Canlı Destek"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500 transition-all group"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold italic">Canlı Destek</span>
            </button>

            {/* ——— CÜZDAN BURAYA GELDİ ——— */}
            <Wallet currentUser={currentUser} />

            {/* TEMA DEĞİŞTİRME BUTONU */}
            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Açık Temaya Geç" : "Koyu Temaya Geç"}
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-600 dark:text-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900 dark:hover:text-indigo-400 transition-all border border-gray-100 dark:border-gray-700"
            >
              {isDarkMode ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>

            {/* SEPET */}
            <button 
              onClick={onCartOpen}
              aria-label="Sepeti Aç"
              className="relative p-3 bg-indigo-50 dark:bg-indigo-900 rounded-2xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all border border-transparent dark:border-indigo-800"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* KULLANICI MENÜSÜ */}
            {currentUser ? (
              <div className="relative group">
                <div className="flex items-center cursor-pointer bg-gray-900 p-2 rounded-2xl border border-gray-800 hover:bg-indigo-600 transition-all shadow-xl">
                  <div className="flex items-center space-x-2 px-2 text-white font-bold text-xs italic">
                    <UserIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Hesabım</span>
                  </div>
                </div>
                
                {/* DROPDOWN MENU */}
                <div className="absolute right-0 top-full pt-3 w-64 hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.2)] dark:shadow-none overflow-hidden text-sm">
                    <div className="bg-gray-950 dark:bg-black px-8 py-6">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 italic">Kullanıcı Erişimi</p>
                      <p className="font-bold text-white truncate italic">{currentUser.email}</p>
                    </div>

                    <div className="p-2">
                      <Link to="/profile" className="flex items-center gap-4 px-6 py-4 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-2xl text-gray-700 dark:text-gray-300 font-bold transition group/item">
                        <UserIcon className="h-5 w-5 text-indigo-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400" /> Profilim
                      </Link>

                      <Link to="/orders" className="flex items-center gap-4 px-6 py-4 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-2xl text-gray-700 dark:text-gray-300 font-bold transition group/item">
                        <ShoppingBagIcon className="h-5 w-5 text-indigo-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400" /> Siparişlerim
                      </Link>
                      
                      {currentUser && (
                        <div className="mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">
                          <p className="px-6 py-2 text-[9px] font-black text-indigo-300 dark:text-indigo-500 uppercase tracking-widest">Yönetim</p>
                          <Link to="/admin" className="flex items-center gap-4 px-6 py-3 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-2xl text-gray-900 dark:text-white font-bold transition italic">
                            <CubeIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> Stok Yönetimi
                          </Link>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center px-6 py-4 bg-red-50 dark:bg-red-950/30 hover:bg-red-600 dark:hover:bg-red-600 hover:text-white text-red-600 dark:text-red-400 font-bold transition mt-2"
                    >
                      Oturumu Kapat
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-gray-900 dark:bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl dark:shadow-none active:scale-95 text-xs italic"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;