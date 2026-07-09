const Terms = () => (
  <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
    <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-10 tracking-tighter uppercase italic">Şartlar ve <span className="text-indigo-600">Koşullar</span></h1>
    
    <div className="space-y-12 text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
      <section className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
        <h2 className="text-gray-900 dark:text-white text-lg font-black uppercase tracking-widest mb-6 border-b border-gray-50 dark:border-gray-800 pb-4 italic">01. Mesafeli Satış Sözleşmesi Esasları</h2>
        <p className="mb-4">
          NovaMarket üzerinden verilen her sipariş, bir "Mesafeli Satış Sözleşmesi" hükümlerine tabidir. Kullanıcı, siparişini onayladığı andan itibaren platformun genel kullanım şartlarını ve satış politikalarını kabul etmiş sayılır.
        </p>
        <p>
          Satışa sunulan tüm ürünlerin stok durumları dinamik olarak güncellenmektedir. Ancak teknik aksaklıklar sebebiyle oluşabilecek stok hatalarında NovaMarket, kullanıcıyı bilgilendirerek sipariş iptali veya ürün değişimi hakkını saklı tutar.
        </p>
      </section>

      <section className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md">
        <h2 className="text-gray-900 dark:text-white text-lg font-black uppercase tracking-widest mb-6 border-b border-gray-100 dark:border-gray-800 pb-4 italic">02. İade, Değişim ve Kullanıcı Sorumluluğu</h2>
        <p className="mb-4">
          Tüketiciyi koruma kanunları çerçevesinde; teslim alınan ürünlerin ambalajı zarar görmemiş ve tekrar satılabilir özelliğini yitirmemiş olması kaydıyla, 14 iş günü içerisinde iade işlemi başlatılabilmektedir.
        </p>
        <p>
          Kullanıcı, platform üzerinde oluşturduğu hesabın güvenliğinden şahsen sorumludur. Üçüncü taraflarca gerçekleştirilen yetkisiz erişimlerde NovaMarket hukuki bir sorumluluk kabul etmemekte olup, şüpheli durumlarda hesabın askıya alınması yetkisini elinde bulundurur.
        </p>
      </section>
    </div>
  </div>
);
export default Terms;