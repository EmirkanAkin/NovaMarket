import React from 'react';

// Kurumsal, asla patlamayan ve senin istediğin 3D render kalitesine en yakın görseller
const categories = [
  { 
    id: 1, 
    name: "Bilgisayar", 
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=200&h=200&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    name: "Akıllı Telefon", 
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&h=200&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    name: "Oyuncu Ekipmanı", 
    img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=200&h=200&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    name: "Monitör & Ekran", 
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=200&h=200&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    name: "Akıllı Saat", 
    img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=200&h=200&auto=format&fit=crop" 
  },
  { 
    id: 6, 
    name: "Aksesuar", 
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&h=200&auto=format&fit=crop" 
  },
];

const CategoryCircles = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center gap-6 md:gap-12 overflow-x-auto pb-4 no-scrollbar py-6 justify-start md:justify-center scroll-smooth px-4 bg-white dark:bg-transparent">
      {categories.map((cat) => (
        <div 
          key={cat.id} 
          onClick={() => onCategoryChange(activeCategory === cat.name ? "" : cat.name)}
          className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
        >
          
          {/* RESİM KAFESİ - Görsellerin patlamaması için iyileştirildi */}
          <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border transition-all duration-300 overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center
            ${activeCategory === cat.name 
              ? "border-indigo-600 ring-4 ring-indigo-50 dark:ring-indigo-900/30 shadow-lg scale-105" 
              : "border-gray-100 dark:border-gray-700 group-hover:border-gray-200 dark:group-hover:border-gray-600 shadow-sm"}
          `}>
            <img 
              src={cat.img} 
              alt={cat.name} 
              // object-cover: Resmi tam doldurur, boşluk bırakmaz
              className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-110" 
              onError={(e) => {
                // Eğer yine patlarsa renkli bir placeholder koy ki o harfler sırıtan durmasın
                e.target.src = `https://via.placeholder.com/200/6366f1/ffffff?text=${cat.name}`;
              }}
            />
          </div>
          
          {/* KATEGORİ ADI */}
          <span className={`text-[11px] md:text-[13px] font-bold transition-colors tracking-tight mt-2
            ${activeCategory === cat.name ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white"}
          `}>
            {cat.name}
          </span>
          
        </div>
      ))}
    </div>
  );
};

export default CategoryCircles;