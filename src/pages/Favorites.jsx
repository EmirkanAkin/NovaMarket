import { useWishlist } from "../contexts/WishlistContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";

const Favorites = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="py-48 text-center bg-gray-50/20 dark:bg-transparent">
        <div className="flex justify-center mb-8">
          <div className="p-10 bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl shadow-indigo-100/50 dark:shadow-none relative">
            <HeartIcon className="h-20 w-20 text-gray-100 dark:text-gray-800" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl opacity-40">✨</div>
          </div>
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase italic">İlgi Alanınız Şu An Boş</h2>
        <p className="text-gray-400 font-bold mb-10 max-w-md mx-auto text-xs uppercase tracking-widest leading-loose">
          Beğendiğiniz tasarımları favorilerinize ekleyerek <br/> size özel bu koleksiyonda toplayabilirsiniz.
        </p>
        <Link 
          to="/" 
          className="bg-gray-900 dark:bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black text-[10px] tracking-[0.3em] shadow-2xl shadow-gray-200 dark:shadow-none hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all uppercase"
        >
          KOLEKSİYONLARI İNCELE
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-16 border-b border-gray-50 dark:border-gray-800 pb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic flex items-center gap-4">
            Size Özel <span className="text-indigo-600">Seçkiler</span>
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-3 italic">
            Favori listenizdeki güncel stok durumunu buradan takip edebilirsiniz
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 rounded-full border border-red-100 dark:border-red-900/50">
           <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
           <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{wishlist.length} Ürün Kayıtlı</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {wishlist.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;