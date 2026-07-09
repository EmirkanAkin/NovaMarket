import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, updateDoc, doc, orderBy, query, onSnapshot } from "firebase/firestore";
import { 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  ClockIcon, 
  CheckBadgeIcon, 
  TruckIcon,
  UserIcon,
  ArchiveBoxIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // VERİLERİ ANLIK ÇEK (Live Updates)
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
      setLoading(false);
    }, (err) => {
      console.error("Hata:", err);
      // Index hatası durumunda fallback
      onSnapshot(collection(db, "orders"), (snapshot) => {
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      toast.success(`Durum: ${newStatus}`, {
        style: { borderRadius: '15px', background: '#111827', color: '#fff', fontSize: '11px' }
      });
    } catch (err) {
      toast.error("Güncellenemedi!");
    }
  };

  // Basit İstatistik Hesaplama
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-[10px] uppercase tracking-[0.3em] text-gray-400">Yönetim Paneli Yükleniyor...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 py-16 px-6 lg:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* ÜST BAŞLIK VE ÖZET */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase leading-none">
              Sipariş <span className="text-indigo-600 dark:text-indigo-400">Yönetimi</span>
            </h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.4em] mt-4 ml-1 italic opacity-70">
              NovaMarket Dashboard v2.0
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-2xl"><CurrencyDollarIcon className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
              <div>
                <p className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Toplam Hasılat</p>
                <p className="text-xl font-black text-gray-900 dark:text-white italic">{totalRevenue.toLocaleString()} TL</p>
              </div>
            </div>
          </div>
        </div>

        {/* SİPARİŞ KARTLARI */}
        <div className="grid gap-8">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
              <ShoppingBagIcon className="h-12 w-12 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 dark:text-gray-500 font-bold italic tracking-tighter text-xl">Henüz düşen bir sipariş yok kanka.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white dark:bg-gray-900 p-10 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-indigo-100/10 dark:shadow-none flex flex-col lg:flex-row justify-between items-center gap-10 group hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden">
                
                {/* Sol Kısım: Müşteri & Tutar */}
                <div className="flex items-center gap-6 w-full lg:w-auto">
                  <div className="h-16 w-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-700">
                    <UserIcon className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse"></div> 
                      SİPARİŞ: #{order.id.slice(-5).toUpperCase()}
                    </p>
                    <p className="font-black text-gray-900 dark:text-white text-lg tracking-tight truncate max-w-[200px]">{order.shippingDetails?.fullName || "Bilinmeyen"}</p>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{order.userEmail}</p>
                  </div>
                </div>

                {/* Orta Kısım: Detaylar */}
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter italic">
                    {(order.total || 0).toLocaleString()} <span className="text-sm">TL</span>
                  </p>
                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                    order.status === "Teslim Edildi" ? "bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400" : "bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400"
                  }`}>
                    {order.status === "Teslim Edildi" ? <CheckBadgeIcon className="h-3 w-3" /> : <ClockIcon className="h-3 w-3 animate-spin-slow" />}
                    {order.status || "Beklemede"}
                  </div>
                </div>

                {/* Sağ Kısım: Aksiyon Butonları */}
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    { label: "Sipariş Alındı", icon: ArchiveBoxIcon },
                    { label: "Hazırlanıyor", icon: ClockIcon },
                    { label: "Kargoda", icon: TruckIcon },
                    { label: "Teslim Edildi", icon: CheckBadgeIcon }
                  ].map((s) => (
                    <button 
                      key={s.label}
                      onClick={() => updateStatus(order.id, s.label)}
                      className={`flex items-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-90 ${
                        order.status === s.label 
                        ? 'bg-gray-900 dark:bg-indigo-600 text-white shadow-2xl shadow-gray-400 dark:shadow-none' 
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      <s.icon className="h-4 w-4" />
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Hover Süsü */}
                <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                  <ShoppingBagIcon className="h-32 w-32 translate-y-8 translate-x-8" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;