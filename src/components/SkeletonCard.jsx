const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-[2.5rem] p-5 border border-gray-100 shadow-sm animate-pulse">
      {/* Resim Alanı */}
      <div className="bg-gray-200 h-64 w-full rounded-[2rem] mb-6"></div>
      
      {/* Başlık Alanı */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded-full w-1/2"></div>
      </div>

      {/* Fiyat ve Buton Alanı */}
      <div className="flex justify-between items-center mt-8">
        <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
        <div className="h-12 w-12 bg-indigo-50 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;