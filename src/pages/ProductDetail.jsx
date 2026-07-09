import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc, collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useAuth } from "../contexts/AuthContext";
import { 
  ShoppingBagIcon, 
  HeartIcon, 
  ChevronLeftIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  ArrowPathIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { currentUser } = useAuth();
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
  const [reviews, setReviews] = useState([]);



  const fetchReviews = async (productId) => {
    try {
      const q = query(collection(db, "reviews"), where("productId", "==", productId));
      const rSnap = await getDocs(q);
      const fetchedReviews = rSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetchedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(fetchedReviews);
    } catch (err) {
      console.error("Yorumlar çekilemedi:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (reviewForm.rating === 0) {
      toast.error("Lütfen bir yıldız puanı seçin!");
      return;
    }
    
    try {
      await addDoc(collection(db, "reviews"), {
        productId: product.id,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        createdAt: new Date().toISOString(),
        userName: currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : ""
      });
      toast.success("Değerlendirmeniz başarıyla yayınlandı!");
      setReviewForm({ rating: 0, comment: "" });
      fetchReviews(product.id);
    } catch (err) {
      toast.error("Yorum gönderilirken hata oluştu.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
          fetchReviews(docSnap.id);
        }
      } catch (error) {
        console.error("Ürün yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 dark:border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-xs uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Nova Yükleniyor...</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-32 bg-white dark:bg-gray-950 min-h-screen">
      <h2 className="text-2xl font-black italic uppercase text-gray-900 dark:text-white">Ürün Bulunamadı</h2>
      <button onClick={() => navigate("/")} className="mt-4 text-indigo-600 dark:text-indigo-400 font-bold underline">Mağazaya Dön</button>
    </div>
  );

  const totalReviewsCount = reviews.length;
  const realTotalPoints = reviews.reduce((acc, rev) => acc + Number(rev.rating), 0);
  const averageRating = totalReviewsCount > 0 ? (realTotalPoints / totalReviewsCount).toFixed(1) : "0.0";
  const bonusAmount = (product.price * 0.02).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Üst Gezinti */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 dark:hover:text-white font-bold text-xs transition-all group"
        >
          <ChevronLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Geri Dön
        </button>
        <div className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest italic">
          NovaMarket / {product.category} / {product.id.slice(0, 8)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* SOL: GÖRSEL ALANI */}
        <div className="lg:col-span-7 relative group">
          <div className="absolute -inset-4 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-[4rem] blur-2xl group-hover:bg-indigo-500/10 dark:group-hover:bg-indigo-500/20 transition-all duration-1000" />
          <div className="relative bg-white dark:bg-gray-900 rounded-[3.5rem] p-12 border border-gray-100 dark:border-gray-800 shadow-2xl shadow-indigo-100/20 dark:shadow-none overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-[500px] object-contain transform group-hover:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute top-10 left-10 flex flex-col gap-3">
              <span className="bg-gray-900 dark:bg-indigo-600 text-white text-[10px] font-black px-5 py-2 rounded-2xl shadow-xl dark:shadow-none italic tracking-widest uppercase">
                {product.category || "İlan"}
              </span>
              <div className="bg-green-500 dark:bg-green-600 text-white text-[10px] font-black px-5 py-2 rounded-2xl shadow-xl dark:shadow-none flex items-center gap-2 italic shadow-green-500/20">
                <BoltIcon className="h-3 w-3" /> ANINDA TESLİMAT
              </div>
            </div>
            <button 
              onClick={() => toggleWishlist(product)}
              className="absolute top-10 right-10 p-4 bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-none hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group/fav"
            >
              {isInWishlist(product.id) ? (
                <HeartSolidIcon className="h-6 w-6 text-red-500" />
              ) : (
                <HeartIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 group-hover/fav:text-red-400 dark:group-hover/fav:text-red-400" />
              )}
            </button>
          </div>
        </div>

        {/* SAĞ: BİLGİ ALANI */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="space-y-6">
            {/* Dinamik Yıldız ve Yorum Alanı */}
            <div className="flex items-center gap-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <StarSolidIcon 
                    key={i} 
                    className={`h-4 w-4 ${i >= Math.floor(averageRating) ? 'text-gray-200 dark:text-gray-700' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                {averageRating} <span className="mx-1 opacity-30">|</span> {totalReviewsCount} Yorum
              </span>
            </div>

            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-3xl border border-indigo-100/50 dark:border-indigo-900/30">
              <CheckBadgeIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-xs font-black text-gray-900 dark:text-white italic uppercase">Onaylı Nova Satıcısı</p>
                <p className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Güvenli ve hızlı işlem garantisi</p>
              </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg leading-relaxed border-l-4 border-gray-100 dark:border-gray-800 pl-6">
              {product.description || "Bu ürün fiziksel teslimat kapsamında NovaMarket güvencesiyle sağlanmaktadır."}
            </p>
          </div>

          <div className="mt-10 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-[3rem] border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-end mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Satış Fiyatı</span>
                <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                  {product.price?.toLocaleString()} TL
                </span>
              </div>
              <div className="bg-white dark:bg-gray-900 px-4 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-right shadow-sm dark:shadow-none">
                <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase italic">Nova Bonus</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">+{bonusAmount} TL</p>
              </div>
            </div>

            <button 
              onClick={() => {
                addToCart(product);
                toast.success(`${product.name} sepete eklendi!`);
              }}
              className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-gray-900 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              Hemen Satın Al
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl text-center">
              <BoltIcon className="h-5 w-5 mx-auto text-orange-500 mb-2" />
              <p className="text-[8px] font-black uppercase text-gray-400 dark:text-gray-500">Hızlı Teslim</p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl text-center">
              <ShieldCheckIcon className="h-5 w-5 mx-auto text-blue-500 mb-2" />
              <p className="text-[8px] font-black uppercase text-gray-400 dark:text-gray-500">7/24 Destek</p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-3xl text-center">
              <ArrowPathIcon className="h-5 w-5 mx-auto text-green-500 mb-2" />
              <p className="text-[8px] font-black uppercase text-gray-400 dark:text-gray-500">Güvenli İade</p>
            </div>
          </div>
        </div>
      </div>

      {/* YORUM YAPMA ALANI */}
      <div className="mt-20 border-t border-gray-100 dark:border-gray-800 pt-16">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tight mb-8 text-center">
            Ürünü Değerlendir
          </h3>
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-indigo-50/50 dark:shadow-none">
            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-8">
              {/* Yıldız Seçimi */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  Puanınız
                </span>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
                    >
                      {star <= reviewForm.rating ? (
                        <StarSolidIcon className="h-10 w-10 text-yellow-400 drop-shadow-sm" />
                      ) : (
                        <StarSolidIcon className="h-10 w-10 text-gray-100 dark:text-gray-800 hover:text-yellow-200 dark:hover:text-yellow-600/50 transition-colors" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Yorum Alanı */}
              <textarea
                required
                rows="4"
                placeholder="Bu ürün hakkında ne düşünüyorsunuz? Deneyiminizi diğer kullanıcılarla paylaşın..."
                className="w-full bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white border-none rounded-3xl px-6 py-5 focus:ring-2 focus:ring-indigo-500/30 outline-none font-medium text-sm resize-none"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              ></textarea>

              <button
                type="submit"
                className="w-full bg-gray-900 dark:bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl shadow-gray-200 dark:shadow-none"
              >
                Yorumu Gönder
              </button>
            </form>
          </div>
        </div>
      </div>


      {/* GERÇEK YORUMLAR LİSTESİ */}
      {reviews.length > 0 && (
        <div className="mt-16 max-w-2xl mx-auto space-y-6 pb-20">
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase italic tracking-tight mb-8">
            Kullanıcı Yorumları ({reviews.length})
          </h3>
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 flex-grow">
                  {rev.userName ? (
                    <>
                      <div className="w-12 h-12 shrink-0 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-lg">
                        {rev.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">{rev.userName}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-widest font-bold">
                          {new Date(rev.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-widest font-bold">
                        {new Date(rev.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex text-yellow-400 shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <StarSolidIcon 
                      key={i} 
                      className={`h-5 w-5 ${i >= rev.rating ? 'text-gray-200 dark:text-gray-800' : ''}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400 leading-relaxed italic border-l-4 border-indigo-100 dark:border-indigo-900/50 pl-4">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;