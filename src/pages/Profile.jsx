import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
// useTheme importu kaldırıldı
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from "firebase/firestore";
import { updatePassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { 
  ShoppingBagIcon, MapPinIcon, EnvelopeIcon, ArrowRightOnRectangleIcon,
  CreditCardIcon, UserIcon, BellIcon, ShieldCheckIcon,
  GiftIcon, ChevronRightIcon, CheckBadgeIcon, StarIcon, WalletIcon,
  ArrowPathIcon, PhoneIcon, IdentificationIcon, KeyIcon, FaceFrownIcon
  // SunIcon ve MoonIcon kaldırıldı
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { cartItems } = useCart();
  // isDarkMode ve toggleTheme kaldırıldı
  const navigate = useNavigate();
  
  // State Yönetimi
  const [activeTab, setActiveTab] = useState("genel_bakis");
  const [lastOrders, setLastOrders] = useState([]);
  const [stats, setStats] = useState({ totalSpent: 0, orderCount: 0 });
  const [loading, setLoading] = useState(true);

  // Form State'leri
  const [newName, setNewName] = useState(currentUser?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // DİNAMİK SEVİYE HESAPLAMA LOGIC (1000 XP = 1 LVL)
  const totalXP = stats.totalSpent; 
  const currentLevel = Math.floor(totalXP / 1000) + 1;
  const progressInLevel = Math.floor(totalXP % 1000);
  const progressPercentage = (progressInLevel / 1000) * 100;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      try {
        const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        const total = ordersData.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
        
        setStats({ totalSpent: total, orderCount: ordersData.length });
        setLastOrders(ordersData);
      } catch (err) { 
        console.error("Veri çekme hatası:", err); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchUserData();
  }, [currentUser]);

  const handleUpdateProfile = async () => {
    if (!newName) return toast.error("İsim alanı boş bırakılamaz!");
    setIsUpdating(true);
    try {
      await updateProfile(currentUser, { displayName: newName });
      toast.success("Profil bilgileriniz başarıyla güncellendi!");
    } catch (err) {
      toast.error("Güncelleme sırasında bir hata oluştu.");
    } finally { setIsUpdating(false); }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) return toast.error("Şifre en az 6 karakter olmalıdır!");
    setIsUpdating(true);
    try {
      await updatePassword(currentUser, newPassword);
      setNewPassword("");
      toast.success("Şifreniz başarıyla değiştirildi!");
    } catch (err) {
      toast.error("Güvenlik nedeniyle tekrar giriş yapmanız gerekebilir.");
    } finally { setIsUpdating(false); }
  };

  const handleLogout = async () => {
    try { await logout(); toast.success("Oturum kapatıldı."); navigate("/login"); } catch (err) { toast.error("Hata!"); }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "genel_bakis":
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Siparişlerim", val: stats.orderCount, icon: <ShoppingBagIcon className="w-5 h-5 text-orange-500"/>, bg: "bg-orange-50 dark:bg-orange-900/20" },
                { label: "Nova Puan", val: (stats.totalSpent * 0.1).toFixed(0), icon: <StarIcon className="w-5 h-5 text-yellow-500"/>, bg: "bg-yellow-50 dark:bg-yellow-900/20" },
                { label: "İndirimler", val: "%15", icon: <GiftIcon className="w-5 h-5 text-pink-500"/>, bg: "bg-pink-50 dark:bg-pink-900/20" },
                { label: "Güvenlik", val: "Yüksek", icon: <ShieldCheckIcon className="w-5 h-5 text-green-500"/>, bg: "bg-green-50 dark:bg-green-900/20" },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} p-4 rounded-2xl border border-white/50 dark:border-white/5 flex flex-col items-center justify-center text-center shadow-sm`}>
                  <div className="mb-2">{item.icon}</div>
                  <span className="text-[14px] font-black italic tracking-tighter text-gray-800 dark:text-white">{item.val}</span>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</p>
                </div>
              ))}
            </div>
            <div>
               <h3 className="text-sm font-black italic uppercase tracking-widest text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <ArrowPathIcon className="w-4 h-4 text-indigo-600"/> Son Hesap Hareketleri
               </h3>
               <div className="space-y-3">
                 {lastOrders.length > 0 ? lastOrders.slice(0, 5).map(order => (
                   <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <ShoppingBagIcon className="w-5 h-5 opacity-50 group-hover:opacity-100"/>
                        </div>
                        <div>
                          <p className="text-xs font-black italic text-gray-800 dark:text-white uppercase tracking-tighter">Alışveriş: #{order.id.slice(0,6)}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">{order.createdAt?.toDate().toLocaleDateString('tr-TR')}</p>
                        </div>
                     </div>
                     <span className="text-sm font-black italic text-indigo-600">-{order.total} TL</span>
                   </div>
                 )) : (
                    <div className="py-10 text-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem]">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Henüz siparişiniz bulunmuyor.</p>
                    </div>
                 )}
               </div>
            </div>
          </div>
        );

      case "hesap_ayarlari":
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
             <h3 className="text-sm font-black italic uppercase tracking-widest text-gray-900 dark:text-white border-b dark:border-gray-800 pb-4 flex items-center gap-2">
                 <IdentificationIcon className="w-5 h-5 text-indigo-600"/> Profil Bilgilerini Güncelle
             </h3>
             <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block ml-1">Görünür İsim (Kullanıcı Adı)</label>
                  <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-2xl border border-gray-100 dark:border-gray-700 focus:border-indigo-500 dark:focus:bg-gray-900 focus:bg-white transition-all outline-none font-bold text-xs"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 block ml-1">E-Posta (Değiştirilemez)</label>
                  <div className="p-4 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 text-gray-400 font-bold text-xs cursor-not-allowed">
                    {currentUser?.email}
                  </div>
                </div>
                <button 
                  onClick={handleUpdateProfile}
                  disabled={isUpdating}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none disabled:bg-gray-400 active:scale-95"
                >
                  {isUpdating ? "Güncelleniyor..." : "Değişiklikleri Kaydet"}
                </button>
             </div>
          </div>
        );

      case "bildirimler":
        return (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 border border-dashed border-gray-200 dark:border-gray-700">
              <BellIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-sm font-black italic uppercase tracking-widest text-gray-400">Duyuru ve Mesaj Yok</h3>
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter mt-2">Şu an için size iletilen herhangi bir bildirim bulunmamaktadır.</p>
          </div>
        );

      case "guvenlik":
        return (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-[2rem] border border-green-100 dark:border-green-900/50 flex items-center justify-between">
              <div>
                <h4 className="font-black text-green-800 italic uppercase tracking-tighter">Hesap Güvenliği: %90</h4>
                <p className="text-[10px] font-bold text-green-600 uppercase mt-1">Hesabınız en üst düzeyde korunuyor.</p>
              </div>
              <CheckBadgeIcon className="w-12 h-12 text-green-500 opacity-50"/>
            </div>
            <div className="space-y-6">
               <h3 className="text-sm font-black italic uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
                 <KeyIcon className="w-5 h-5 text-indigo-600"/> Şifre Değiştir
               </h3>
               <div className="space-y-4">
                  <input 
                    type="password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Yeni Şifrenizi Girin"
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-2xl border border-gray-100 dark:border-gray-700 focus:border-indigo-500 outline-none font-bold text-xs"
                  />
                  <button 
                    onClick={handleChangePassword}
                    disabled={isUpdating}
                    className="px-10 py-4 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black dark:hover:bg-indigo-500 transition-all shadow-xl dark:shadow-none disabled:bg-gray-400 active:scale-95"
                  >
                    {isUpdating ? "İşlem Yapılıyor..." : "Şifreyi Güncelle"}
                  </button>
               </div>
            </div>
          </div>
        );

      case "kuponlar":
        return (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
            <div className="w-20 h-20 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center mb-6 border border-dashed border-pink-200 dark:border-pink-900/50">
              <GiftIcon className="w-10 h-10 text-pink-200" />
            </div>
            <h3 className="text-sm font-black italic uppercase tracking-widest text-gray-400">Aktif Promosyon Bulunamadı</h3>
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter mt-2">Takipte kalın, size özel fırsatlar yakında burada olacak!</p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="bg-[#f8fafd] dark:bg-gray-950 min-h-screen py-12 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* ÜST BANNER & DİNAMİK SEVİYE SİSTEMİ */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 mb-10 border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden transition-colors">
            
            {/* TEMA TOGGLE BUTONU KALDIRILDI */}

            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/20 rounded-full -mr-32 -mt-32 opacity-50"></div>
            
            <div className="flex items-center gap-6 relative z-10">
               <div className="w-24 h-24 bg-gradient-to-tr from-indigo-600 to-indigo-900 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-100 dark:shadow-none">
                 {currentUser?.displayName?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase()}
               </div>
               <div>
                  <div className="flex items-center gap-2">
                   <h1 className="text-3xl font-black text-gray-900 dark:text-white italic tracking-tighter uppercase">
                     {currentUser?.displayName || currentUser?.email?.split("@")[0]}
                   </h1>
                   <CheckBadgeIcon className="w-6 h-6 text-indigo-500"/>
                 </div>
                 <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mt-1 italic">Nova Ayrıcalıklı Üye</p>
               </div>
            </div>

            {/* DİNAMİK SEVİYE BARI */}
            <div className="flex-1 w-full max-w-md relative z-10 bg-gray-50/50 dark:bg-gray-800/50 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
               <div className="flex justify-between items-end mb-3">
                 <div>
                   <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest italic opacity-70">Mevcut Seviye</span>
                   <p className="text-2xl font-black italic tracking-tighter text-gray-900 dark:text-white leading-none">LVL {currentLevel}</p>
                 </div>
                 <div className="text-right">
                   <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Sonraki Seviye: {currentLevel + 1}</span>
                   <p className="text-[11px] font-black italic text-gray-600 uppercase tracking-tighter">{progressInLevel} / 1000 XP</p>
                 </div>
               </div>
               
               <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner p-1">
                 <div 
                   className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-full shadow-lg transition-all duration-1000 ease-out relative"
                   style={{ width: `${progressPercentage}%` }}
                 >
                   <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                 </div>
               </div>
               <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mt-3 text-center italic">
                 {1000 - progressInLevel} XP SONRA SEVİYE ATLAYACAKSIN!
               </p>
            </div>

            <div className="flex gap-4 relative z-10">
               <div className="text-center px-6 border-r border-gray-100 dark:border-gray-800">
                 <p className="text-2xl font-black italic tracking-tighter text-gray-900 dark:text-white">{stats.totalSpent.toLocaleString('tr-TR')} TL</p>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Toplam Harcama</p>
               </div>
               <div className="text-center px-6">
                 <p className="text-2xl font-black italic tracking-tighter text-indigo-600">{(stats.totalSpent * 0.1).toFixed(0)}</p>
                 <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Nova Puan</p>
               </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3 space-y-4">
             {[
               { id: "genel_bakis", label: "Genel Bakış", icon: <WalletIcon className="w-5 h-5"/> },
               { id: "hesap_ayarlari", label: "Hesap Bilgileri", icon: <UserIcon className="w-5 h-5"/> },
               { id: "bildirimler", label: "Duyuru & Mesaj", icon: <BellIcon className="w-5 h-5"/> },
               { id: "guvenlik", label: "Güvenlik Merkezi", icon: <ShieldCheckIcon className="w-5 h-5"/> },
               { id: "kuponlar", label: "Promosyonlar", icon: <GiftIcon className="w-5 h-5"/> },
             ].map(item => (
               <button 
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={`w-full flex items-center gap-4 p-5 rounded-2xl font-black text-[11px] uppercase tracking-tighter transition-all ${activeTab === item.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-none -translate-y-1" : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800"}`}
               >
                 {item.icon} {item.label}
                 {activeTab === item.id && <ChevronRightIcon className="w-4 h-4 ml-auto text-white"/>}
               </button>
             ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-4 p-5 rounded-2xl font-black text-[11px] uppercase tracking-tighter text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all mt-10 active:scale-95">
               <ArrowRightOnRectangleIcon className="w-5 h-5"/> Güvenli Çıkış
             </button>
          </div>

          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none min-h-[550px] transition-colors">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;