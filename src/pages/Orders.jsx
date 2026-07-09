import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { ShoppingBagIcon, CheckCircleIcon, CubeIcon } from "@heroicons/react/24/outline";
import OrderStatus from "../components/OrderStatus"; // <-- 1. Bileşeni import ettik

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    }, (err) => {
      console.error("Veri senkronizasyon hatası:", err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) return (
    <div className="py-48 text-center">
      <div className="w-12 h-12 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <p className="font-black text-gray-400 uppercase tracking-[0.3em] text-[10px] italic">Sipariş verileriniz senkronize ediliyor...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
            Sipariş <span className="text-indigo-600">Arşivi</span>
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-4 italic">Nova üzerinden gerçekleştirilen tüm işlemler</p>
        </div>
        <div className="bg-gray-900 px-8 py-4 rounded-[2rem] shadow-xl shadow-gray-200 dark:shadow-none flex items-center gap-4">
          <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Toplam İşlem:</span>
          <span className="font-black text-white italic text-xl leading-none">{orders.length}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-gray-50/50 dark:bg-gray-900 p-24 rounded-[4rem] text-center border border-dashed border-gray-200 dark:border-gray-800">
          <div className="bg-white dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm dark:shadow-none">
            <ShoppingBagIcon className="h-10 w-10 text-gray-200" />
          </div>
          <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">Henüz bir satın alım kaydınız bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-900 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-100/10 dark:shadow-none overflow-hidden group hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-700">
              
              {/* Header - Dark Mode Style */}
              <div className="bg-gray-900 px-10 py-8 flex flex-wrap justify-between items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                    <CubeIcon className="h-40 w-40 text-white -mr-10 -mt-10" />
                </div>
                
                <div className="flex gap-12 items-center relative z-10">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest italic">İŞLEM TARİHİ</p>
                    <p className="text-white font-black text-sm uppercase italic tracking-tight">
                        {order.createdAt?.toDate().toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-white/10 hidden sm:block"></div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest italic">TOPLAM PORTFÖY</p>
                    <p className="text-white font-black text-2xl italic tracking-tighter">
                        {order.total?.toLocaleString('tr-TR')} TL
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 relative z-10">
                  <div className="text-right hidden lg:block">
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">REFERANS KODU</p>
                    <p className="text-white/40 text-[9px] font-mono tracking-tighter uppercase">ID_{order.id.slice(0, 14)}</p>
                  </div>
                  <div className={`px-6 py-2.5 rounded-full flex items-center gap-3 border shadow-lg ${
                    order.status === 'Teslim Edildi' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                    : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  }`}>
                    <CheckCircleIcon className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{order.status}</span>
                  </div>
                </div>
              </div>

              {/* 2. DURUM ÇUBUĞU (YENİ) - Header ile Ürünler Arasındaki Geçiş */}
              <div className="px-10 py-12 bg-gray-50/30 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-3xl mx-auto">
                    <OrderStatus currentStatus={order.status?.toLowerCase().replace(/\s/g, '') || "alindi"} />
                </div>
              </div>

              {/* Items Grid */}
              <div className="p-10 bg-white dark:bg-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-6 p-5 rounded-[2.5rem] bg-gray-50/50 dark:bg-gray-800/50 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/30 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl hover:shadow-indigo-100/20 dark:hover:shadow-indigo-500/10 transition-all duration-500 group/item">
                      <div className="w-24 h-24 shrink-0 rounded-[1.5rem] overflow-hidden border-2 border-white dark:border-gray-700 shadow-md relative">
                        <img src={item.image} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" alt={item.name} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase truncate leading-none tracking-tighter italic">{item.name}</h4>
                        <div className="flex flex-col gap-2 mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest bg-white dark:bg-gray-900 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-700">
                                {item.quantity} ÜNİTE
                              </span>
                            </div>
                            <span className="text-sm font-black text-indigo-600 italic tracking-tight">
                              {item.price?.toLocaleString('tr-TR')} TL
                            </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;