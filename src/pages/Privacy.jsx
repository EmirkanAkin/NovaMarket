const Privacy = () => (
  <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
    <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-10 tracking-tighter uppercase italic">Gizlilik <span className="text-indigo-600">Politikası</span></h1>
    
    <div className="space-y-12 text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
      <section className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
        <h2 className="text-gray-900 dark:text-white text-lg font-black uppercase tracking-widest mb-6 border-b border-gray-50 dark:border-gray-800 pb-4 italic">01. Veri Toplama ve İşleme Prensipleri</h2>
        <p className="mb-4">
          NovaMarket, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca, kullanıcılarının gizliliğini korumayı taahhüt eder. Platformumuz üzerinden gerçekleştirilen her türlü veri aktarımı, en üst düzey güvenlik protokolleri ile şifrelenmektedir.
        </p>
        <p>
          Toplanan veriler; ad-soyad, teslimat adresi, e-posta ve alışveriş tercihleri gibi temel bilgileri kapsamakta olup, bu bilgiler sadece siparişlerin lojistik süreçlerini yönetmek ve kullanıcı deneyimini kişiselleştirmek amacıyla veri tabanımızda güvenle saklanmaktadır.
        </p>
      </section>

      <section className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
        <h2 className="text-gray-900 dark:text-white text-lg font-black uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-gray-800 pb-4 italic">02. Üçüncü Taraf Paylaşımı ve Güvenlik</h2>
        <p className="mb-4">
          NovaMarket ekosistemi içerisinde paylaşılan hiçbir veri, kullanıcının açık rızası olmaksızın pazarlama veya reklam amacıyla üçüncü taraf kurum veya kuruluşlarla paylaşılmaz. 
        </p>
        <p>
          Ödeme işlemleri sırasında kullanılan kart bilgileri, doğrudan banka ve ödeme kuruluşu altyapıları üzerinden işlem görmekte; NovaMarket sunucularında kredi kartı verisi kesinlikle barındırılmamaktadır. 256-Bit SSL sertifikalı güvenli altyapımız, tüm finansal verilerinizin uçtan uca korunmasını garanti altına almaktadır.
        </p>
      </section>
    </div>
  </div>
);
export default Privacy;