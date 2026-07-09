export const techProducts = (() => {
  const products = [];
  const brands = {
    "Bilgisayar": ["Asus ROG", "MSI Katana", "Lenovo Legion", "HP Omen", "Dell Alienware", "Acer Predator", "MacBook Pro", "Razer Blade", "Gigabyte Aorus", "Monster Semruk"],
    "Akıllı Telefon": ["iPhone 15", "Samsung Galaxy S24", "Xiaomi 14", "Google Pixel 8", "OnePlus 12", "Poco F5", "Nothing Phone (2)", "Huawei P60", "Honor Magic"],
    "Oyuncu Ekipmanı": ["Logitech G Pro", "Razer BlackWidow", "SteelSeries Arctis", "HyperX Cloud", "Corsair K70", "Asus ROG Gladius", "Glorious Model O", "Razer DeathAdder"],
    "Monitör & Ekran": ["LG UltraGear", "Samsung Odyssey", "Asus TUF Gaming", "BenQ Zowie", "Dell Alienware", "MSI Optix", "AOC Agon", "ViewSonic Elite"],
    "Akıllı Saat": ["Apple Watch", "Samsung Galaxy Watch", "Garmin Fenix", "Huawei Watch", "Amazfit T-Rex", "Suunto 9", "Polar Vantage", "TicWatch Pro"],
    "Aksesuar": ["Sony WH-1000XM5", "Apple AirPods Pro", "Anker PowerCore", "SanDisk Extreme SSD", "Baseus GaN", "Logitech Brio", "Elgato Stream Deck", "Samsung T7 SSD"]
  };
  
  const images = {
    "Bilgisayar": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500&auto=format&fit=crop"
    ],
    "Akıllı Telefon": [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=500&auto=format&fit=crop"
    ],
    "Oyuncu Ekipmanı": [
      "https://images.unsplash.com/photo-1527814050087-379381547961?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500&auto=format&fit=crop"
    ],
    "Monitör & Ekran": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=500&auto=format&fit=crop"
    ],
    "Akıllı Saat": [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=500&auto=format&fit=crop"
    ],
    "Aksesuar": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?q=80&w=500&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=500&auto=format&fit=crop"
    ]
  };

  const descriptions = {
    "Bilgisayar": [
      "Üst düzey performans, RTX 4070 ekran kartı, 32GB RAM ile sınırsız oyun keyfi.", 
      "İnce ve hafif tasarım, uzun pil ömrü ve yeni nesil yüksek hızlı işlemci.", 
      "Oyun tutkunları için 144Hz yenileme hızlı ekran ve mekanik hisli klavye.", 
      "İş ve tasarım profesyonelleri için %100 sRGB renk doğruluğuna sahip ekran."
    ],
    "Akıllı Telefon": [
      "Yeni nesil kamera yapay zekası, kusursuz gece modu ve 120Hz OLED ekran.", 
      "Titanyum çerçeveli ultra dayanıklı kasa ve devasa bütün gün süren batarya ömrü.", 
      "Fiyat performans canavarı, 120W süper hızlı şarj destekli amiral gemisi.", 
      "Kompakt ve şık tasarım, güçlü işlemci altyapısı ve kesintisiz 5G bağlantı kalitesi."
    ],
    "Oyuncu Ekipmanı": [
      "Ultra hafif (63g) e-spor tasarımı, 0 gecikmeli kablosuz sensör teknolojisi.", 
      "Hızlı mekanik switchler, kişiselleştirilebilir Razer Chroma RGB aydınlatma.", 
      "Gürültü engelleyici profesyonel mikrofon, 7.1 stüdyo kalitesinde çevresel ses.", 
      "Terletmeyen özel kumaş yüzey, bilek destekli saatlerce süren ergonomik konfor."
    ],
    "Monitör & Ekran": [
      "1ms tepki süresi, 240Hz tazeleme hızı ile e-spor arenaları için üretildi.", 
      "Kavisli (Curved) geniş panel, tamamen sürükleyici ve rekabetçi oyun deneyimi.", 
      "Gerçek 4K çözünürlük, HDR10 desteği ile büyüleyici sinematik detaylar.", 
      "Zararlı mavi ışığı filtreleyen göz koruma teknolojisi, yansımasız mat yüzey."
    ],
    "Akıllı Saat": [
      "7/24 hassas sağlık takibi, detaylı uyku analizi ve 100+ farklı spor modu.", 
      "Çift frekanslı GPS, yükseklik ölçer ve pusula ile macera tutkunlarına özel.", 
      "Canlı AMOLED ekran, Always-on-Display özelliği ve klasik saat şıklığı.", 
      "Haftalarca süren uzun batarya ömrü, 50 metreye kadar su geçirmez titanyum kasa."
    ],
    "Aksesuar": [
      "Aktif Gürültü Engelleme (ANC) teknolojisi, şeffaf mod ve rakipsiz bas kalitesi.", 
      "Hızlı şarj destekli 24.000mAh akıllı dijital ekranlı taşınabilir powerbank.", 
      "1050 MB/s yüksek hızlı SSD veri aktarımı, suya ve toza dayanıklı dış zırh.", 
      "Minimalist tasarım, 100W GaN teknolojisiyle birden fazla cihazı aynı anda şarj edin."
    ]
  };

  const suffixes = ["Pro", "Max", "Ultra", "Elite", "V2", "X", "Plus", "Edition", "Gamer", "Studio", "Series", "Air", "Pro Max", "Ultimate"];

  const categoriesList = Object.keys(brands);

  for (let i = 0; i < 150; i++) {
    const category = categoriesList[i % categoriesList.length];
    const brandOptions = brands[category];
    const imageOptions = images[category];
    const descOptions = descriptions[category];
    
    const brand = brandOptions[Math.floor(Math.random() * brandOptions.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const num = Math.floor(Math.random() * 90) + 10;
    
    // Rastgele havalı isim üretme (Örn: Asus ROG Ultra 45)
    const name = `${brand} ${suffix} ${num}`;
    
    const image = imageOptions[Math.floor(Math.random() * imageOptions.length)];
    const description = descOptions[Math.floor(Math.random() * descOptions.length)];
    
    // Her kategori için gerçekçi bir fiyat aralığı (Math.random)
    let basePrice = 1000;
    if(category === "Bilgisayar") basePrice = Math.floor(Math.random() * 700) * 100 + 20000; // 20.000 - 90.000 TL
    if(category === "Akıllı Telefon") basePrice = Math.floor(Math.random() * 600) * 100 + 15000; // 15.000 - 75.000 TL
    if(category === "Oyuncu Ekipmanı") basePrice = Math.floor(Math.random() * 80) * 100 + 1500; // 1.500 - 9.500 TL
    if(category === "Monitör & Ekran") basePrice = Math.floor(Math.random() * 200) * 100 + 5000; // 5.000 - 25.000 TL
    if(category === "Akıllı Saat") basePrice = Math.floor(Math.random() * 150) * 100 + 3000; // 3.000 - 18.000 TL
    if(category === "Aksesuar") basePrice = Math.floor(Math.random() * 50) * 100 + 500; // 500 - 5.500 TL
    
    products.push({
      name,
      price: basePrice,
      category,
      description,
      image
    });
  }

  // Karıştırarak gönderelim (Hepsi aynı kategori sırayla görünmesin)
  return products.sort(() => Math.random() - 0.5);
})();
