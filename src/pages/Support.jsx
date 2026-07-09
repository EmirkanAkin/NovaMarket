import { 
  ChatBubbleLeftRightIcon, 
  QuestionMarkCircleIcon, 
  CreditCardIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

const Support = () => {

  const categories = [
    { id: 1, name: "Ödeme İşlemleri", icon: CreditCardIcon, desc: "Banka kartı, Havale ve Bonus kullanımı." },
    { id: 2, name: "Teslimat Süreçleri", icon: ArrowPathIcon, desc: "Ürün teslimatları ve onay süreleri." },
    { id: 3, name: "Hesap Güvenliği", icon: ShieldCheckIcon, desc: "Şifre işlemleri ve güvenlik ayarları." },
    { id: 4, name: "Satıcı Rehberi", icon: UserGroupIcon, desc: "Nasıl ilan eklenir ve satış yapılır?" },
  ];

  const faqs = [
    { q: "Aldığım ürün ne zaman teslim edilir?", a: "Anında teslimat etiketli ürünler saniyeler içinde, diğer ilanlar ise satıcı onayından sonra en geç 30 dakika içinde teslim edilir." },
    { q: "İade politikanız nedir?", a: "Dijital ürünlerde kod aktive edilmediği sürece 14 gün içinde iade talebinde bulunabilirsiniz." },
    { q: "Bonuslarımı nasıl harcarım?", a: "Ödeme ekranında 'Bonus Kullan' seçeneğini işaretleyerek bakiyenizi indirim olarak kullanabilirsiniz." },
    { q: "Nasıl satıcı olabilirim?", a: "Profil ayarlarınızdan 'Mağaza Başvurusu' yaparak onaylı satıcı statüsüne geçebilirsiniz." },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
      
      {/* 1. HERO BÖLÜMÜ & ARAMA */}
      <section className="text-center space-y-8 py-10 bg-gradient-to-b from-indigo-50/50 dark:from-indigo-950/30 to-transparent rounded-[4rem]">
        <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-indigo-100 dark:border-gray-800 px-4 py-2 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-widest italic">7/24 Canlı Destek Sistemi</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic">
            Size Nasıl <span className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-200 dark:decoration-indigo-900/50">Yardımcı Olabiliriz?</span>
            </h1>
        </div>
      </section>

      {/* 2. KATEGORİLER */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="group bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
              <cat.icon className="h-7 w-7 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
            </div>
            <h3 className="font-black text-gray-900 dark:text-white mb-2 italic text-lg tracking-tight">{cat.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{cat.desc}</p>
          </div>
        ))}
      </section>

      {/* 3. CANLI DESTEK BANNER */}
      <section className="bg-gray-950 rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600 skew-x-12 translate-x-32 opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-black text-white italic leading-tight">Müşteri temsilcilerimiz <br/> <span className="text-indigo-400 underline underline-offset-8">şu an çevrimiçi!</span></h2>
            <p className="text-gray-400 font-medium">Ortalama bekleme süresi: <span className="text-white">1 Dakika</span></p>
          </div>
          <button 
            onClick={() => window.dispatchEvent(new Event("open-live-chat"))}
            className="flex items-center gap-4 bg-indigo-600 text-white px-12 py-6 rounded-3xl font-black hover:bg-white hover:text-gray-950 transition-all shadow-2xl active:scale-95 text-sm uppercase italic tracking-widest"
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6 animate-bounce" />
            Görüşmeyi Başlat
          </button>
        </div>
      </section>

      {/* 4. SSS (ACCORDION) */}
      <section id="sss" className="grid lg:grid-cols-2 gap-16 items-start scroll-mt-24">
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="bg-indigo-600 p-2 rounded-xl">
                    <QuestionMarkCircleIcon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white italic tracking-tighter">Sıkça Sorulanlar</h2>
            </div>
            <div className="space-y-3">
            {faqs.map((faq, index) => (
                <details key={index} className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-100 dark:hover:border-indigo-500/50 transition-all overflow-hidden">
                <summary className="list-none p-5 flex justify-between items-center cursor-pointer font-bold text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400">
                    {faq.q}
                    <span className="text-indigo-300 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4">
                    {faq.a}
                </div>
                </details>
            ))}
            </div>
        </div>

        {/* 5. İLETİŞİM KANALLARI (EKSTRA GÜÇ) */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] p-10 space-y-8 border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-black text-gray-900 dark:text-white italic underline decoration-indigo-200 dark:decoration-indigo-900/50">Diğer İletişim Kanalları</h3>
            <div className="space-y-4">
                <div className="flex items-center gap-5 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-indigo-500/10 transition-all">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400"><EnvelopeIcon className="h-6 w-6" /></div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">E-Posta Adresimiz</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">destek@novamarket.com</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-indigo-500/10 transition-all">
                    <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400"><PhoneIcon className="h-6 w-6" /></div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">WhatsApp Hattı</p>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">+90 850 000 00 00</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Support;