import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, onSnapshot, where, writeBatch, setDoc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import {
  PlusIcon,
  TrashIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  SparklesIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { techProducts } from "../utils/seedData";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [resolvedSessions, setResolvedSessions] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "", category: "Bilgisayar", description: "" });
  const chatContainerRefs = useRef({});

  const fetchData = async () => {
    try {
      const pSnapshot = await getDocs(collection(db, "products"));
      setProducts(pSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(p => p.site === "tech"));

      const oSnapshot = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")));
      setOrders(oSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // tickets çekme işlemi onSnapshot'a taşındı
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    }
  };

  useEffect(() => { 
    fetchData(); 

    // Çözülmüş sohbetleri gerçek zamanlı dinle
    const unsubscribeResolved = onSnapshot(collection(db, "chat_sessions"), (snapshot) => {
      const resolved = new Set(
        snapshot.docs
          .filter(d => d.data().resolved === true)
          .map(d => d.data().sessionId)
      );
      setResolvedSessions(resolved);
    });

    // Gerçek zamanlı sohbetleri dinle
    const unsubscribeChats = onSnapshot(collection(db, "live_chats"), (snapshot) => {
      const allMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      allMessages.sort((a, b) => a.createdAt - b.createdAt);
      
      const grouped = {};
      allMessages.forEach(msg => {
        if (!grouped[msg.sessionId]) {
          grouped[msg.sessionId] = {
            sessionId: msg.sessionId,
            userEmail: msg.sender === 'user' ? msg.userEmail : (grouped[msg.sessionId]?.userEmail || msg.userEmail),
            messages: [],
            status: "Yeni"
          };
        }
        if (msg.sender === 'user' && msg.userEmail) {
          grouped[msg.sessionId].userEmail = msg.userEmail;
        }
        grouped[msg.sessionId].messages.push(msg);

        // Sadece Yeni / Bakıldı hesapla — Çözüldü artık manuel butona bırakıldı
        const msgs = grouped[msg.sessionId].messages;
        const hasAdminReply = msgs.some(m => m.sender === 'admin' && m.userEmail !== 'Nova Asistanı');
        grouped[msg.sessionId].status = hasAdminReply ? 'Bakıldı' : 'Yeni';
      });
      
      setTickets(Object.values(grouped).sort((a,b) => {
        const lastA = a.messages[a.messages.length-1]?.createdAt || 0;
        const lastB = b.messages[b.messages.length-1]?.createdAt || 0;
        return lastB - lastA;
      }));
    });

    return () => { unsubscribeChats(); unsubscribeResolved(); };
  }, []);

  // Admin sohbet odaları otomatik aşağı kaydırma (container içinde)
  useEffect(() => {
    Object.values(chatContainerRefs.current).forEach(el => {
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [tickets]);

  // Sohbet odasını çözüldü olarak işaretle
  const handleResolveSession = async (sessionId) => {
    try {
      await setDoc(doc(db, "chat_sessions", sessionId), {
        sessionId,
        resolved: true,
        resolvedAt: Date.now()
      });
      toast.success("Talep çözüldü olarak işaretlendi.", {
        style: { borderRadius: '15px', background: '#111827', color: '#fff', fontSize: '11px' }
      });
    } catch (err) {
      toast.error("İşlem gerçekleştirilemedi.");
    }
  };

  // Çözüldü işaretini geri al
  const handleReopenSession = async (sessionId) => {
    try {
      await setDoc(doc(db, "chat_sessions", sessionId), {
        sessionId,
        resolved: false,
        resolvedAt: null
      });
      toast.success("Talep tekrar aktif hale getirildi.");
    } catch (err) {
      toast.error("İşlem gerçekleştirilemedi.");
    }
  };

  // Sohbet odasını sil
  const handleDeleteSession = async (sessionId) => {
    if (!window.confirm("Bu sohbet odasını kalıcı olarak silmek istediğinize emin misiniz?")) return;
    try {
      const q = query(collection(db, "live_chats"), where("sessionId", "==", sessionId));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      snapshot.docs.forEach(d => batch.delete(d.ref));
      await batch.commit();
      toast.success("Sohbet odası silindi.");
    } catch (err) {
      toast.error("Sohbet silinemedi.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const numericPrice = Number(newProduct.price.replace(/\./g, ""));
      await addDoc(collection(db, "products"), { ...newProduct, price: numericPrice, site: "tech" });
      toast.success("Ürün başarıyla envantere eklendi.");
      setNewProduct({ name: "", price: "", image: "", category: "Bilgisayar", description: "" });
      fetchData();
    } catch (err) { 
      toast.error("İşlem sırasında bir hata oluştu."); 
    } finally { 
      setLoading(false); 
    }
  };



  const handleDelete = async (id) => {
    if (window.confirm("Seçili ürünü kalıcı olarak silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        toast.success("Ürün kaydı silindi.");
        fetchData();
      } catch (err) {
        toast.error("Silme işlemi başarısız.");
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      toast.success("Sipariş durumu başarıyla güncellendi.");
      fetchData();
    } catch (err) {
      toast.error("Durum güncellemesi yapılamadı.");
    }
  };



  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* BAŞLIK VE ÖZET KARTLARI */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
            Nova <span className="text-indigo-600 dark:text-indigo-400">Control</span>
          </h1>
          <p className="text-gray-400 font-bold text-[10px] tracking-[0.3em] uppercase mt-2 italic text-indigo-500">Yönetim ve Operasyon Merkezi</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="bg-white dark:bg-gray-900 px-8 py-5 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-5">
            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400"><CurrencyDollarIcon className="h-6 w-6" /></div>
            <div><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Toplam Brüt Ciro</p><p className="text-xl font-black text-gray-900 dark:text-white italic">{totalRevenue.toLocaleString('tr-TR')} TL</p></div>
          </div>
          <div className="bg-white dark:bg-gray-900 px-8 py-5 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-5">
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-2xl text-green-600 dark:text-green-400"><ShoppingBagIcon className="h-6 w-6" /></div>
            <div><p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Toplam Sipariş</p><p className="text-xl font-black text-gray-900 dark:text-white italic">{orders.length} İşlem</p></div>
          </div>
        </div>
      </div>

      {/* TAB MENÜ */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div className="flex gap-4 bg-gray-100 dark:bg-gray-900 w-fit p-2 rounded-[2.5rem] border border-transparent dark:border-gray-800">
          <button onClick={() => setActiveTab("products")} className={`px-10 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === "products" ? "bg-white dark:bg-indigo-600 shadow-xl dark:shadow-none text-indigo-600 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"}`}>Envanter Yönetimi</button>
          <button onClick={() => setActiveTab("orders")} className={`px-10 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === "orders" ? "bg-white dark:bg-indigo-600 shadow-xl dark:shadow-none text-indigo-600 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"}`}>Sipariş Takibi</button>
          <button onClick={() => setActiveTab("tickets")} className={`px-10 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === "tickets" ? "bg-white dark:bg-indigo-600 shadow-xl dark:shadow-none text-indigo-600 dark:text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"}`}>Destek Talepleri</button>
        </div>
      </div>

      {activeTab === "products" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ÜRÜN EKLEME FORMU */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-100/30 dark:shadow-none sticky top-32">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3 italic uppercase">
                <PlusIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" /> Ürün Tanımlama
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input required placeholder="Ürün Başlığı" className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/30 outline-none font-bold italic text-sm" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                
                <input required placeholder="Birim Fiyat (TL)" type="text" className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/30 outline-none font-bold italic text-sm" 
                  value={newProduct.price} 
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, "");
                    setNewProduct({...newProduct, price: rawValue ? Number(rawValue).toLocaleString('tr-TR') : ""})
                  }} 
                />
                
                <input required placeholder="Görsel Kaynak URL" className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/30 outline-none font-bold italic text-sm" value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
                
                <select required className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/30 outline-none font-bold italic text-sm cursor-pointer" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}>
                  <option value="Bilgisayar">Bilgisayar</option>
                  <option value="Akıllı Telefon">Akıllı Telefon</option>
                  <option value="Oyuncu Ekipmanı">Oyuncu Ekipmanı</option>
                  <option value="Monitör & Ekran">Monitör & Ekran</option>
                  <option value="Akıllı Saat">Akıllı Saat</option>
                  <option value="Aksesuar">Aksesuar</option>
                </select>

                <textarea placeholder="Ürün Teknik Açıklaması" rows="3" className="w-full bg-gray-50 dark:bg-gray-800 dark:text-white border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500/30 outline-none font-bold italic resize-none text-sm" value={newProduct.description} onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}></textarea>
                <button disabled={loading} className="w-full bg-gray-900 dark:bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-gray-200 dark:shadow-none">
                  {loading ? "İŞLENİYOR..." : "SİSTEME KAYDET"}
                </button>
              </form>
            </div>
          </div>

          {/* ÜRÜN LİSTESİ */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-6 px-2">Kayıtlı Ürünler ({products.length})</h3>
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-900 p-5 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-indigo-100 dark:hover:border-gray-700 hover:shadow-xl dark:shadow-none transition-all duration-500">
                <div className="flex items-center gap-6">
                  <div className="relative overflow-hidden rounded-[1.5rem] h-20 w-20 border border-gray-100 dark:border-gray-800">
                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white italic uppercase text-sm tracking-tight">{product.name}</h4>
                    <p className="text-[9px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mt-1">{product.category}</p>
                    <p className="text-sm font-black text-gray-400 dark:text-gray-500 mt-1 italic">{(Number(product.price) || 0).toLocaleString('tr-TR')} TL</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(product.id)} aria-label="Ürünü Sil" className="p-4 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-2xl hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white transition-all shadow-sm dark:shadow-none">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : activeTab === "orders" ? (
        /* SİPARİŞ YÖNETİMİ */
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-6 px-2">Aktif Operasyonlar ({orders.length})</h3>
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-900 p-8 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-none relative overflow-hidden group hover:border-indigo-100 dark:hover:border-gray-700 transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full">
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center border border-gray-100 dark:border-gray-700 shrink-0">
                    <ShoppingBagIcon className="h-8 w-8 text-indigo-200 dark:text-indigo-900" />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                      <h4 className="text-xl font-black text-gray-900 dark:text-white italic tracking-tighter uppercase">Kod: #{order.id.slice(0, 8)}</h4>
                      <span className={`w-fit px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${order.status === 'Teslim Edildi' ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400' :
                          order.status === 'Kargoda' ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' : 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{order.userEmail}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 items-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex flex-col gap-1 w-full sm:w-auto">
                    <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase ml-2">Durum Güncelle</label>
                    <select
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      value={order.status}
                      className="bg-gray-50 dark:bg-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3 font-black text-[10px] uppercase outline-none cursor-pointer hover:bg-white dark:hover:bg-gray-700 focus:ring-2 focus:ring-indigo-500/30 transition-all w-full sm:w-auto"
                    >
                      <option value="Sipariş Alındı">Sipariş Alındı</option>
                      <option value="Hazırlanıyor">Hazırlanıyor</option>
                      <option value="Kargoda">Kargoda</option>
                      <option value="Teslim Edildi">Teslim Edildi</option>
                    </select>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase">İşlem Tutarı</p>
                    <p className="font-black text-gray-900 dark:text-white text-2xl italic tracking-tighter">{order.total?.toLocaleString('tr-TR')} TL</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* DESTEK TALEPLERİ YÖNETİMİ */
        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-6 px-2">Canlı Sohbet Odaları ({tickets.length})</h3>
          {tickets.map((session) => (
            <div key={session.sessionId} className="bg-white dark:bg-gray-900 p-8 rounded-[3.5rem] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden flex flex-col gap-4">
              
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${
                    resolvedSessions.has(session.sessionId) ? 'bg-green-500' :
                    session.status === 'Yeni' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                  }`}></span>
                  <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">{session.userEmail}</span>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    resolvedSessions.has(session.sessionId) ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400' :
                    session.status === 'Yeni' ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400' :
                    'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {resolvedSessions.has(session.sessionId) ? 'Çözüldü' : session.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">#{session.sessionId.slice(-6)}</span>
                  {resolvedSessions.has(session.sessionId) ? (
                    <button
                      onClick={() => handleReopenSession(session.sessionId)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-all"
                      title="Tekrar Aç"
                    >
                      Tekrar Aç
                    </button>
                  ) : (
                    <button
                      onClick={() => handleResolveSession(session.sessionId)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-green-500 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition-all active:scale-95"
                      title="Çözüldü Olarak İşaretle"
                    >
                      <CheckCircleIcon className="h-3.5 w-3.5" />
                      Çözüldü
                    </button>
                  )}
                  <button onClick={() => handleDeleteSession(session.sessionId)} aria-label="Sohbeti Sil" className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all" title="Sohbeti Sil">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* SOHBET GEÇMİŞİ */}
              <div ref={el => chatContainerRefs.current[session.sessionId] = el} className="h-60 overflow-y-auto bg-gray-50/50 dark:bg-gray-950/50 p-4 rounded-2xl flex flex-col gap-3">
                {session.messages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}>
                    <div className={`p-3 rounded-2xl shadow-sm text-xs font-bold max-w-[80%] ${
                      msg.sender === 'user' 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-tl-none' 
                      : 'bg-indigo-600 text-white rounded-tr-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-400 mt-1 font-bold">{msg.sender === 'user' ? '' : (msg.userEmail === 'Nova Asistanı' ? '🤖 Bot' : '👤 Temsilci')} {msg.time}</span>
                  </div>
                ))}
              </div>

              {resolvedSessions.has(session.sessionId) ? (
                <div className="flex items-center justify-center gap-2 py-3 bg-green-50 dark:bg-green-950/20 rounded-2xl border border-green-100 dark:border-green-900/30">
                  <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest">Bu talep çözüldü olarak işaretlendi</span>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const replyText = e.target.reply.value;
                    if (!replyText.trim()) return;
                    try {
                      await addDoc(collection(db, "live_chats"), {
                        sessionId: session.sessionId,
                        userEmail: session.userEmail,
                        text: replyText,
                        sender: "admin",
                        createdAt: Date.now(),
                        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                      });
                      e.target.reset();
                      fetchData();
                    } catch (err) {
                      toast.error("Yanıt gönderilemedi.");
                    }
                  }}
                  className="flex gap-2 mt-2"
                >
                  <input name="reply" placeholder="Mesajınızı buraya yazın..." className="flex-grow bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-none rounded-2xl px-5 py-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all shadow-sm" />
                  <button type="submit" className="bg-gray-900 dark:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-lg active:scale-95 italic">Gönder</button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;