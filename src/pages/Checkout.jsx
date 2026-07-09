import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase"; 
// GÜNCEL IMPORTLAR: getDoc ve setDoc eklendi
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment, getDoc, setDoc } from "firebase/firestore"; 
import toast from "react-hot-toast";
import { CreditCardIcon, TruckIcon, ShieldCheckIcon, LockClosedIcon, SparklesIcon, TicketIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const earnedBonus = (cartTotal * 0.02).toFixed(2);
  const shippingFee = cartTotal > 500 ? 0 : 50;
  const grandTotal = cartTotal + shippingFee;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").substring(0, 19);
    }
    if (name === "expiry") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(?=\d)/g, "$1/").substring(0, 5);
    }
    if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 3);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("İşleme devam etmek için lütfen oturum açınız.");
      return;
    }
    if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      toast.error("Lütfen geçerli bir kart numarası giriniz.");
      return;
    }
    setLoading(true);

    try {
      const orderData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items: cartItems,
        total: grandTotal,
        bonusEarned: Number(earnedBonus),
        shippingDetails: { ...formData },
        status: "Sipariş Alındı",
        createdAt: serverTimestamp()
      };

      // 1. ADIM: SİPARİŞİ EKLE
      await addDoc(collection(db, "orders"), orderData);

      // 2. ADIM: CÜZDAN KONTROLÜ VE GÜNCELLEME
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Kullanıcı varsa bonusu ekle
        await updateDoc(userRef, {
          walletBalance: increment(Number(earnedBonus))
        });
      } else {
        // Kullanıcı yoksa yeni doküman oluştur (Hata almanı engeller)
        await setDoc(userRef, {
          email: currentUser.email,
          walletBalance: Number(earnedBonus),
          createdAt: serverTimestamp()
        });
      }

      toast.success(`${earnedBonus} TL Bonus Cüzdanınıza Eklendi! 💰`, { 
        duration: 3000,
        style: { borderRadius: '20px', background: '#111827', color: '#fff', fontSize: '12px' } 
      });

      clearCart();
      setLoading(false);
      navigate("/orders");
    } catch (err) {
      console.error("Ödeme hatası:", err);
      toast.error("Ödeme sırasında bir hata oluştu: " + err.message);
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-48 text-center bg-gray-50/30 dark:bg-transparent">
        <h2 className="text-2xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">Sepetiniz Boş</h2>
        <button onClick={() => navigate("/")} className="mt-10 px-10 py-4 bg-gray-900 dark:bg-indigo-600 text-white font-black rounded-full uppercase text-[10px] tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all">Koleksiyonu Keşfet</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center gap-4 mb-12">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">Güvenli <span className="text-indigo-600">Ödeme</span></h1>
        <div className="h-[2px] flex-grow bg-gray-100 dark:bg-gray-800 hidden md:block"></div>
        <div className="flex items-center gap-2 text-green-500 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-100 dark:border-green-800 shadow-sm shadow-green-100/50 dark:shadow-none">
          <LockClosedIcon className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest italic tracking-wider">SSL SECURE 256-BIT</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-100/10 dark:shadow-none transition-all hover:shadow-indigo-200/20 dark:hover:shadow-indigo-500/10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl"><TruckIcon className="h-6 w-6 text-indigo-600" /></div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Teslimat Bilgisi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required name="fullName" placeholder="Ad Soyad" onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/50 outline-none font-bold text-sm italic" />
              <input required name="email" type="email" placeholder="E-posta Adresi" onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/50 outline-none font-bold text-sm italic" />
              <input required name="address" placeholder="Mahalle, Sokak ve Bina Bilgisi" onChange={handleInputChange} className="md:col-span-2 w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/50 outline-none font-bold text-sm italic" />
              <input required name="city" placeholder="Şehir" onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/50 outline-none font-bold text-sm italic" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-100/10 dark:shadow-none">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl"><CreditCardIcon className="h-6 w-6 text-indigo-600" /></div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Ödeme Yöntemi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3 relative">
                <input required name="cardNumber" value={formData.cardNumber} placeholder="Kart Numarası" onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/50 outline-none font-bold text-sm italic tracking-widest" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-2 rounded-xl border border-gray-100 dark:border-gray-800 group transition-all duration-300 hover:border-gray-200 dark:hover:border-gray-700">
                   <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
                    className="h-5 object-contain opacity-60 group-hover:opacity-100 transition-opacity" 
                    alt="Visa" 
                    onError={(e) => e.target.src = 'https://img.icons8.com/color/48/000000/visa.png'}
                   />
                   <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                    className="h-5 object-contain opacity-60 group-hover:opacity-100 transition-opacity" 
                    alt="Mastercard" 
                    onError={(e) => e.target.src = 'https://img.icons8.com/color/48/000000/mastercard.png'}
                   />
                </div>
              </div>
              <input required name="expiry" value={formData.expiry} placeholder="AA/YY" onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/50 outline-none font-bold text-sm italic" />
              <input required name="cvv" value={formData.cvv} placeholder="CVV" onChange={handleInputChange} className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/50 outline-none font-bold text-sm italic" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-gray-900 text-white p-10 rounded-[3.5rem] shadow-[0_35px_60px_-15px_rgba(79,70,229,0.3)] border-t-8 border-indigo-600 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                  <SparklesIcon className="h-6 w-6 text-indigo-400 animate-pulse" />
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic">SİPARİŞ ÖZETİ</h2>
              </div>
              
              <div className="space-y-4 mb-8 max-h-40 overflow-y-auto pr-3 custom-scrollbar-white">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-black text-[10px] uppercase italic tracking-tighter group-hover:text-white transition-colors">{item.name}</span>
                      <span className="text-indigo-400 font-bold text-[8px] uppercase tracking-[0.2em]">x{item.quantity}</span>
                    </div>
                    <span className="font-black italic text-sm">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-white/5 pt-6">
                <div className="flex justify-between text-gray-500 font-black uppercase text-[9px] tracking-widest">
                  <span>ARA TOPLAM</span>
                  <span>{cartTotal.toLocaleString('tr-TR')} TL</span>
                </div>
                <div className="flex justify-between text-indigo-400 font-black uppercase text-[9px] tracking-widest items-center">
                  <span>KARGO & LOJİSTİK</span>
                  <span className={shippingFee === 0 ? "text-green-400 bg-green-400/10 px-2 py-1 rounded-lg" : "text-white"}>{shippingFee === 0 ? "ÜCRETSİZ" : `${shippingFee} TL`}</span>
                </div>
                
                <div className="mt-8 p-5 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 flex flex-col gap-1 relative overflow-hidden group hover:bg-indigo-600/20 transition-all cursor-default">
                  <TicketIcon className="absolute -right-2 -bottom-2 h-16 w-16 text-indigo-600/10 -rotate-12 group-hover:rotate-0 transition-transform" />
                  <span className="text-[9px] font-black text-indigo-300 uppercase tracking-[0.2em]">KAZANILACAK BONUS</span>
                  <span className="text-2xl font-black text-white italic drop-shadow-lg">+{earnedBonus} TL</span>
                </div>

                <div className="flex justify-between items-end pt-10">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">ÖDENECEK</span>
                  <span className="text-5xl font-black text-white tracking-tighter italic leading-none">{grandTotal.toLocaleString('tr-TR')} <span className="text-sm">TL</span></span>
                </div>
              </div>

              <button 
                disabled={loading} 
                type="submit" 
                className="w-full mt-12 bg-indigo-600 hover:bg-white hover:text-indigo-900 text-white py-6 rounded-2xl font-black text-xs transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.3em] shadow-xl shadow-indigo-900/40 relative overflow-hidden group"
              >
                <span className="relative z-10">{loading ? "İŞLEM ONAYLIYOR..." : "ÖDEMEYİ TAMAMLA"}</span>
                <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <div className="mt-8 flex flex-col items-center gap-2 opacity-50">
                  <div className="flex items-center gap-2 text-[8px] font-black text-gray-400 uppercase tracking-widest">
                    <ShieldCheckIcon className="h-4 w-4 text-green-500" /> %100 GÜVENLİ ÖDEME SİSTEMİ
                  </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;