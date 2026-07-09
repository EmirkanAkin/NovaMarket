import { useState, useEffect, useMemo, useRef } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import CategoryCircles from "../components/CategoryCircles";
import HeroBanner from "../components/HeroBanner";
import SkeletonCard from "../components/SkeletonCard";
import { MagnifyingGlassIcon, ArrowsUpDownIcon, FunnelIcon, FireIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); 
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).filter(p => p.site === "tech");
        setProducts(productsData);

        const reviewsSnapshot = await getDocs(collection(db, "reviews"));
        const reviewsData = reviewsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(reviewsData);
      } catch (err) {
        console.error("Veri çekme hatası:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => 
    [...new Set(products.map((p) => p?.category).filter(Boolean))], 
    [products]
  );

  const filteredProducts = products
    .filter((p) => {
      if (!p || !p.id || !p.name) return false;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "" || p.category === category;
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return 0;
    });

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory === "Tüm Ürünler" || newCategory === "Hepsi" ? "" : newCategory);
    setCurrentPage(1);
  };

  // Filtre değişince 1. sayfaya dön
  useEffect(() => { setCurrentPage(1); }, [search, category, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20 space-y-12">
      
      {/* ÜST BİLGİ ŞERİDİ (BYNOGAME GÜVEN VURGUSU) */}
      <section className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-indigo-100 transition-all">
          <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform">
            <FireIcon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-black text-xs text-gray-900 dark:text-white uppercase italic">Trend Teknolojiler</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">En yeni akıllı cihazlar</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-green-100 transition-all">
          <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-2xl text-green-500 group-hover:scale-110 transition-transform">
            <ShieldCheckIcon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-black text-xs text-gray-900 dark:text-white uppercase italic">Hızlı Teslimat</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Aynı gün kargo imkanı</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-indigo-100 transition-all">
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-2xl text-indigo-500 group-hover:scale-110 transition-transform">
            <FunnelIcon className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-black text-xs text-gray-900 dark:text-white uppercase italic">Premium Donanımlar</h4>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Binlerce teknolojik ürün</p>
          </div>
        </div>
      </section>

      <section>
        <CategoryCircles 
          activeCategory={category === "" ? "Tüm Ürünler" : category} 
          onCategoryChange={handleCategoryChange} 
        />
      </section>

      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <HeroBanner />
      </section>

      {/* FİLTRELEME ÇUBUĞU (RE-DESIGNED) */}
      <div className="sticky top-24 z-30 pt-2">
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl p-3 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col lg:flex-row gap-3 items-center">
          
          <div className="relative flex-grow w-full">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Bilgisayar, telefon, kulaklık veya donanım ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50/80 dark:bg-gray-800/80 border-none rounded-2xl pl-14 pr-6 py-4 focus:bg-white dark:focus:bg-gray-950 focus:ring-4 focus:ring-indigo-500/5 outline-none text-gray-700 dark:text-gray-200 font-bold text-sm transition-all"
            />
          </div>
          
          <div className="flex w-full lg:w-auto gap-2 items-center overflow-x-auto no-scrollbar">
            {["Tüm Ürünler", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`whitespace-nowrap px-6 py-3.5 rounded-2xl font-bold text-xs transition-all
                  ${(category === cat || (cat === "Tüm Ürünler" && category === "")) 
                    ? "bg-gray-900 dark:bg-indigo-600 text-white shadow-lg -translate-y-0.5" 
                    : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent"}`}
              >
                {cat}
              </button>
            ))}

            <div className="relative shrink-0 border-l border-gray-100 dark:border-gray-800 pl-2">
              <ArrowsUpDownIcon className="h-4 w-4 absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                aria-label="Sıralama Seçeneği"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl pl-12 pr-10 py-3.5 outline-none cursor-pointer text-gray-700 dark:text-gray-200 font-bold text-xs appearance-none transition-all italic uppercase tracking-tighter"
              >
                <option value="default">Sıralama</option>
                <option value="price-asc">Fiyat (Düşük)</option>
                <option value="price-desc">Fiyat (Yüksek)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* BAŞLIK */}
      <div id="products-section" className="flex justify-between items-end border-b border-gray-100 dark:border-gray-800 pb-6">
        <div className="space-y-1">
          <p className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase italic ml-1">TechStore / {category || "Genel"}</p>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic">
            {category === "" ? "Tüm İlanlar" : category}
          </h1>
        </div>
        <div className="flex items-center gap-3">
           <span className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-[10px] font-black uppercase italic animate-pulse">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Canlı Stok
           </span>
           <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-700">
             {filteredProducts.length} Ürün • Sayfa {currentPage}/{totalPages || 1}
           </span>
        </div>
      </div>
      
      {/* ÜRÜN GRİDİ */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-gray-50/50 dark:bg-gray-900/50 rounded-[4rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 uppercase">Aradığınız kriterde ürün bulunamadı</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Lütfen filtreleri sıfırlayarak tekrar deneyin.</p>
            <button 
              onClick={() => {setSearch(""); setCategory(""); setSortBy("default");}}
              className="mt-8 px-10 py-4 bg-gray-900 dark:bg-indigo-600 text-white rounded-2xl font-bold text-xs hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all"
            >
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <motion.div 
            key={currentPage}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
          >
            {paginatedProducts.map((product) => (
              <motion.div 
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                }}
              >
                <ProductCard 
                  product={product} 
                  reviews={reviews.filter(r => r.productId === product.id)} 
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* SAYFALAMA */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 pb-8">
          {/* Önceki */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
          >
            ←
          </button>

          {/* Sayfa numaraları */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              if (totalPages <= 7) return true;
              if (page === 1 || page === totalPages) return true;
              if (Math.abs(page - currentPage) <= 2) return true;
              return false;
            })
            .reduce((acc, page, idx, arr) => {
              if (idx > 0 && page - arr[idx - 1] > 1) acc.push('...');
              acc.push(page);
              return acc;
            }, [])
            .map((item, idx) =>
              item === '...' ? (
                <span key={`ellipsis-${idx}`} className="px-3 py-3 text-gray-300 dark:text-gray-600 font-black text-xs select-none">...</span>
              ) : (
                <button
                  key={item}
                  onClick={() => handlePageChange(item)}
                  className={`min-w-[44px] px-4 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    currentPage === item
                      ? 'bg-gray-900 dark:bg-indigo-600 text-white shadow-xl shadow-gray-300/30 dark:shadow-indigo-900/30 scale-105'
                      : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm'
                  }`}
                >
                  {item}
                </button>
              )
            )
          }

          {/* Sonraki */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:border-indigo-200 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;