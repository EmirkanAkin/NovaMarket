import { useState, useEffect } from "react";

const HeroBanner = () => {
  // Geri sayım için state
  const [timeLeft, setTimeLeft] = useState({
    gun: 0, saat: 0, dakika: 0, saniye: 0
  });

  useEffect(() => {
    // Hedef tarih (Yarınki toplantıya kadar ya da daha ileri bir tarih yapabilirsin)
    const targetDate = new Date("2026-05-01T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          gun: Math.floor(distance / (1000 * 60 * 60 * 24)),
          saat: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          dakika: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          saniye: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[350px] md:h-[500px] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl shadow-indigo-100 dark:shadow-none group">
      <img 
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop" 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
        alt="Teknoloji İndirimi"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-center px-12 md:px-20">
        <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1 rounded-full w-fit uppercase tracking-[0.3em] mb-4 animate-pulse">
          Teknoloji Haftası
        </span>
        
        <p className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter max-w-lg italic" role="heading" aria-level="2">
          Geleceğin <span className="text-indigo-400">Teknolojisi</span> Seninle!
        </p>
        
        <p className="text-gray-200 mt-4 text-lg font-medium max-w-md hidden md:block">
          En yeni bilgisayarlar, çevre birimleri ve akıllı cihazlarda %50'ye varan dev indirimler başladı.
        </p>

        {/* GERİ SAYIM SAYACI - SENİN TASARIMINA ENTEGRE */}
        <div className="flex gap-3 md:gap-4 mt-6">
          {[
            { label: 'GÜN', value: timeLeft.gun },
            { label: 'SAAT', value: timeLeft.saat },
            { label: 'DAK', value: timeLeft.dakika },
            { label: 'SN', value: timeLeft.saniye }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white text-xl md:text-2xl font-black tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-[8px] md:text-[10px] text-indigo-300 font-black mt-2 tracking-widest uppercase">{item.label}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="mt-8 bg-white text-gray-900 px-8 py-4 rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all w-fit shadow-xl active:scale-95 uppercase text-sm tracking-tight"
        >
          ŞİMDİ İNCELE
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;