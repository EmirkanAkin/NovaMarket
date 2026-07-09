import { CheckIcon } from "@heroicons/react/24/outline";

const OrderStatus = ({ currentStatus = "" }) => {
  // Gelen metni temizleyip normalize ediyoruz
  const status = currentStatus.toLowerCase().trim();

  // Firebase'deki farklı yazımları yakalayan mantık
  const getActiveIndex = () => {
    if (status.includes("teslim")) return 3;   // Teslim Edildi
    if (status.includes("kargo")) return 2;    // Kargoda
    if (status.includes("hazır")) return 1;    // Hazırlanıyor (Türkçe ı karakteri!)
    return 0; // Sipariş Alındı (Varsayılan)
  };

  const currentIndex = getActiveIndex();

  const stages = [
    { label: "Sipariş Alındı" },
    { label: "Hazırlanıyor" },
    { label: "Kargoda" },
    { label: "Teslim Edildi" },
  ];

  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between">
        {/* Arka Çizgi */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
        
        {/* İlerleme Çizgisi */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-1000"
          style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
        ></div>

        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div className={`
                w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-700
                ${isCompleted || isCurrent ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200 dark:shadow-none' : 'bg-white dark:bg-gray-800 text-gray-400 border-2 border-gray-200 dark:border-gray-700'}
              `}>
                {isCompleted ? <CheckIcon className="h-5 w-5 md:h-6 md:w-6 stroke-[3]" /> : <span className="text-xs md:text-sm font-black">{index + 1}</span>}
              </div>
              <span className={`absolute -bottom-8 whitespace-nowrap text-[9px] md:text-[10px] font-black uppercase tracking-tighter ${isCurrent ? 'text-indigo-600' : 'text-gray-400'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatus;