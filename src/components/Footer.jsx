import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* LOGO & MİSYON */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-gray-900 dark:bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 transition-colors shadow-lg">
                <ShoppingBagIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white uppercase italic">
                NOVA<span className="text-indigo-600 dark:text-indigo-400">MARKET</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
              Geleceğin alışveriş deneyimini bugünden yaşayın. En kaliteli ürünler, en hızlı teslimat ve güvenli ödeme ile hizmetinizdeyiz.
            </p>
          </div>

          {/* HIZLI LİNKLER */}
          <div>
            <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-[0.2em] mb-6">Alışveriş</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition italic">Tüm Ürünler</Link></li>
              <li><Link to="/cart" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition italic">Sepetim</Link></li>
              <li><Link to="/checkout" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition italic">Ödeme Sayfası</Link></li>
            </ul>
          </div>

          {/* DESTEK */}
          <div>
            <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-[0.2em] mb-6">Destek</h4>
            <ul className="space-y-4">
              <li><Link to="/support#sss" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition italic">Sıkça Sorulanlar</Link></li>
              <li><Link to="#" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition italic">Kargo Takip</Link></li>
              <li><Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition italic">İade Koşulları</Link></li>
            </ul>
          </div>

          {/* SOSYAL MEDYA */}
          <div>
            <h4 className="font-black text-gray-900 dark:text-white uppercase text-xs tracking-[0.2em] mb-6">Bizi Takip Et</h4>
            <div className="flex gap-4 mb-6">
              <div className="h-10 w-10 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all cursor-pointer font-black text-[10px]">IG</div>
              <div className="h-10 w-10 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all cursor-pointer font-black text-[10px]">TW</div>
              <div className="h-10 w-10 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all cursor-pointer font-black text-[10px]">FB</div>
            </div>
            <p className="text-[10px] text-gray-600 dark:text-gray-400 font-black uppercase tracking-widest leading-relaxed italic">
              En yeni indirimlerden haberdar olmak için topluluğumuza katıl.
            </p>
          </div>
        </div>

        {/* ALT ÇİZGİ & COPYRIGHT & YASAL LİNKLER */}
        <div className="pt-10 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-[10px] font-black tracking-[0.2em] uppercase italic">
            © 2026 NovaMarket. Tüm Hakları Saklıdır.
          </p>
          
          <div className="flex gap-10">
            <Link 
              to="/privacy" 
              className="text-gray-600 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-indigo-600 transition-all italic border-b border-transparent hover:border-indigo-600 pb-1"
            >
              Gizlilik
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-600 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-indigo-600 transition-all italic border-b border-transparent hover:border-indigo-600 pb-1"
            >
              Şartlar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;