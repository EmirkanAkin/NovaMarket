import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import toast from "react-hot-toast"; 
import { PlusIcon, HeartIcon as HeartOutline, CheckBadgeIcon, BoltIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon } from "@heroicons/react/24/solid";

const ProductCard = ({ product, reviews = [] }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();


  if (!product || !product.id) return null;

  const isFavorite = isInWishlist(product.id);
  const totalReviewsCount = reviews.length;
  const realTotalPoints = reviews.reduce((acc, rev) => acc + Number(rev.rating), 0);
  const averageRating = totalReviewsCount > 0 ? (realTotalPoints / totalReviewsCount).toFixed(1) : "0.0";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    addToCart(product);
    
    toast.success(`${product.name} sepete eklendi!`, {
      duration: 2000,
      position: 'bottom-right',
      style: {
        borderRadius: '16px',
        background: '#111',
        color: '#fff',
        fontWeight: '600',
        padding: '12px 24px',
        fontSize: '13px',
        border: '1px solid rgba(255,255,255,0.1)'
      },
    });
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-[2rem] p-3 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] dark:hover:shadow-indigo-500/10 transition-all duration-500 h-full flex flex-col relative overflow-hidden">
      
      {/* FAVORİ BUTONU */}
      <button 
        onClick={handleToggleFavorite}
        aria-label="Favorilere Ekle"
        className="absolute top-6 right-6 z-10 p-2.5 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-sm border border-gray-100 dark:border-gray-700 transition-all active:scale-75 group/heart"
      >
        {isFavorite ? (
          <HeartSolid className="h-5 w-5 text-red-500 animate-pulse" />
        ) : (
          <HeartOutline className="h-5 w-5 text-gray-400 group-hover/heart:text-red-400 transition-colors" />
        )}
      </button>

      {/* RESİM ALANI */}
      <Link to={`/product/${product.id}`} aria-label={`${product.name} ürünü incele`} className="relative block overflow-hidden rounded-[1.5rem] bg-gray-50 dark:bg-gray-800 aspect-square">
        <img
          src={product.image || "https://via.placeholder.com/400x400"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* TESLİMAT ROZETİ */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <div className="bg-green-700 text-white text-[9px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-green-500/20 italic">
            <BoltIcon className="h-3 w-3" />
            Anında Teslimat
          </div>
        </div>
      </Link>

      <div className="mt-5 flex flex-col flex-grow px-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">
            {product.category || "Genel"}
          </span>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded-md border border-yellow-100/50 dark:border-yellow-900/50">
            <StarIcon className="h-3 w-3 text-yellow-500" />
            <span className="text-[10px] font-black text-yellow-800">{averageRating}</span>
            <span className="text-[9px] font-bold text-yellow-800/80 ml-0.5">({totalReviewsCount})</span>
          </div>
        </div>

        {/* ÜRÜN İSMİ */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        
        {/* GÜVENLİK İBARESİ */}
        <div className="flex items-center gap-1 mt-2 mb-4">
          <CheckBadgeIcon className="h-4 w-4 text-blue-500 shadow-sm" />
          <span className="text-[10px] text-gray-700 dark:text-gray-400 font-bold italic">Onaylı Nova Satıcısı</span>
        </div>
        
        {/* ALT KISIM: FİYAT VE BUTON */}
        <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-black px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded italic shadow-sm shadow-indigo-100 dark:shadow-none">
                +%2 Bonus
              </span>
            </div>
            <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
              {(Number(product.price) || 0).toLocaleString('tr-TR')} TL
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-gray-900 dark:bg-indigo-600 text-white p-3.5 rounded-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 active:scale-90 transition-all shadow-lg shadow-gray-200 dark:shadow-none"
            title="Sepete Ekle"
          >
            <PlusIcon className="h-5 w-5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;