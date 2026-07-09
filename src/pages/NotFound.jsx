import { Link } from "react-router-dom";
import { HomeIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* Büyük 404 Animasyonlu İkon */}
      <div className="relative mb-8">
        <h1 className="text-[12rem] font-black text-indigo-50 leading-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <QuestionMarkCircleIcon className="h-24 w-24 text-indigo-600 animate-bounce" />
        </div>
      </div>

      <h2 className="text-3xl font-black text-gray-900 mb-4">
        Yolunu Mu Kaybettin?
      </h2>
      
      <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg">
        Aradığın sayfa NovaMarket galaksisinden silinmiş veya hiç var olmamış olabilir. Endişelenme, ana sayfa sadece bir tık uzağında!
      </p>

      {/* Ana Sayfaya Dön Butonu */}
      <Link 
        to="/" 
        className="flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-100 dark:hover:shadow-none active:scale-95"
      >
        <HomeIcon className="h-5 w-5" />
        Güvenli Bölgeye Dön
      </Link>

      <div className="mt-12 text-sm text-gray-400 font-medium italic">
        "Kaybolmak da bazen keşfetmenin bir parçasıdır... ama burada değil."
      </div>
    </div>
  );
};

export default NotFound;