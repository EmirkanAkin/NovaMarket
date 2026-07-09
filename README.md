<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS v4" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Lisans-MIT-green?style=for-the-badge" alt="License" />
</p>

<h1 align="center">🛒 NovaMarket</h1>
<h3 align="center">Yeni Nesil Teknoloji Ürünleri E-Ticaret Platformu</h3>

<p align="center">
  React 19, Vite 8 ve Firebase altyapısıyla geliştirilmiş, tam kapsamlı yönetim paneli,<br/>
  gerçek zamanlı veritabanı ve canlı destek sistemi içeren modern bir e-ticaret deneyimi.
</p>

<br/>

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Öne Çıkan Özellikler](#-öne-çıkan-özellikler)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Proje Mimarisi](#-proje-mimarisi)
- [Kurulum](#-kurulum)
- [Sayfa ve Rotalar](#-sayfa-ve-rotalar)
- [Context Yapısı](#-context-yapısı)
- [Firebase Entegrasyonu](#-firebase-entegrasyonu)
- [Admin Paneli](#-admin-paneli)
- [Ekran Görüntüleri](#-ekran-görüntüleri)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Lisans](#-lisans)

---

## 🚀 Proje Hakkında

**NovaMarket**, oyuncular ve teknoloji tutkunlarına yönelik tasarlanmış modern bir e-ticaret web uygulamasıdır. Bilgisayar, akıllı telefon, oyuncu ekipmanı, monitör, akıllı saat ve aksesuar gibi kategorilerde geniş bir ürün yelpazesi sunmaktadır.

Proje; kullanıcı kimlik doğrulama, gerçek zamanlı sepet yönetimi, sipariş takibi, favori listesi, kullanıcı profil ve seviye sistemi, canlı destek sohbeti ve kapsamlı bir yönetim paneli gibi birçok gelişmiş özelliği bünyesinde barındırır.

### ✨ Tasarım Felsefesi

- 🌗 **Koyu / Açık Tema** — Sistem teması algılama + manuel geçiş
- 🎨 **Glassmorphism & Modern UI** — Backdrop-blur, gradient'ler ve yumuşak gölgeler
- ⚡ **Micro-Animasyonlar** — Framer Motion ile sayfa geçişleri ve stagger animasyonları
- 📱 **Tam Responsive** — Mobil bottom navigation + masaüstü sidebar düzeni
- 🧩 **Code Splitting** — React.lazy + Suspense ile lazy loading

---

## 🎯 Öne Çıkan Özellikler

### 🛍️ Müşteri Tarafı
| Özellik | Açıklama |
|---|---|
| **Ürün Listeleme & Filtreleme** | Kategori, fiyat aralığı ve arama ile dinamik filtreleme |
| **Ürün Detay Sayfası** | Büyük görsel, yıldız puanlama, yorum sistemi |
| **Alışveriş Sepeti** | Gerçek zamanlı (Firestore) sepet senkronizasyonu, drawer bileşeni |
| **Güvenli Ödeme** | Kart numarası formatlama, sipariş özeti, SSL göstergesi |
| **Favoriler** | LocalStorage tabanlı favori listesi, anlık toast bildirimleri |
| **Sipariş Takibi** | 4 aşamalı görsel ilerleme çubuğu (Sipariş Alındı → Teslim Edildi) |
| **Kullanıcı Profili** | Seviye/XP sistemi, harcama istatistikleri, hesap güvenliği |
| **Nova Bonus Cüzdanı** | Alışverişlerde %2 bonus kazanımı, canlı bakiye gösterimi |
| **Canlı Destek** | Gerçek zamanlı sohbet widget'ı, otomatik bot + temsilci desteği |
| **Destek Merkezi** | SSS (accordion), iletişim kanalları, kategori bazlı yardım |

### 🔐 Yönetim Paneli
| Özellik | Açıklama |
|---|---|
| **Envanter Yönetimi** | Ürün ekleme/silme, kategori seçimi, fiyat formatlama |
| **Sipariş Takibi** | Tüm siparişleri görüntüleme, durum güncelleme |
| **Canlı Sohbet Yönetimi** | Müşteri sohbetlerini takip etme, yanıtlama, çözüldü işaretleme |
| **Gelir Özeti** | Toplam ciro ve sipariş sayısı dashboard kartları |

---

## 🧰 Teknoloji Yığını

### Çekirdek
| Teknoloji | Versiyon | Kullanım Amacı |
|---|---|---|
| [React](https://react.dev) | `19.2` | Kullanıcı arayüzü bileşen mimarisi |
| [Vite](https://vite.dev) | `8.0` | Lightning-fast geliştirme sunucusu ve bundler |
| [React Router DOM](https://reactrouter.com) | `7.13` | Client-side routing ve nested layout'lar |

### Backend & Veritabanı
| Teknoloji | Versiyon | Kullanım Amacı |
|---|---|---|
| [Firebase Auth](https://firebase.google.com/docs/auth) | `12.11` | E-posta / şifre kimlik doğrulama |
| [Cloud Firestore](https://firebase.google.com/docs/firestore) | `12.11` | Gerçek zamanlı NoSQL veritabanı |

### UI & Stil
| Teknoloji | Versiyon | Kullanım Amacı |
|---|---|---|
| [TailwindCSS](https://tailwindcss.com) | `4.2` | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion) | `12.38` | Sayfa geçişleri ve micro-animasyonlar |
| [Heroicons](https://heroicons.com) | `2.2` | SVG ikon seti (outline & solid) |
| [Headless UI](https://headlessui.com) | `2.2` | Erişilebilir UI bileşenleri |
| [Swiper](https://swiperjs.com) | `12.1` | Dokunmatik slider / carousel |

### Yardımcı Kütüphaneler
| Teknoloji | Kullanım Amacı |
|---|---|
| [react-hot-toast](https://react-hot-toast.com) | Şık bildirim toast mesajları |
| [react-google-recaptcha](https://www.npmjs.com/package/react-google-recaptcha) | Form güvenliği |

---

## 🏗 Proje Mimarisi

```
NovaMarket/
├── public/
│   ├── favicon.svg          # Site ikonu
│   ├── icons.svg            # SVG sprite sheet
│   ├── robots.txt           # SEO — Arama motoru yönergeleri
│   └── sitemap.xml          # SEO — Site haritası
│
├── src/
│   ├── assets/
│   │   └── hero.png         # Hero banner görseli
│   │
│   ├── components/          # Yeniden kullanılabilir UI bileşenleri
│   │   ├── AdminRoute.jsx   # Admin erişim koruması (route guard)
│   │   ├── BottomNav.jsx    # Mobil alt navigasyon barı
│   │   ├── CartDrawer.jsx   # Sepet yan panel (slide-over drawer)
│   │   ├── CategoryCircles.jsx # Kategori dairesel navigasyon
│   │   ├── ChatWidget.jsx   # Canlı destek sohbet widget'ı
│   │   ├── Footer.jsx       # Site alt bilgi bölümü
│   │   ├── HeroBanner.jsx   # Ana sayfa hero banner + geri sayım
│   │   ├── Layout.jsx       # Genel sayfa düzeni (Navbar + Footer)
│   │   ├── Navbar.jsx       # Üst navigasyon çubuğu + kullanıcı menüsü
│   │   ├── OrderStatus.jsx  # 4 aşamalı sipariş ilerleme göstergesi
│   │   ├── PageTransition.jsx # Framer Motion sayfa geçiş wrapper'ı
│   │   ├── ProductCard.jsx  # Ürün kartı (favori, sepet, puan)
│   │   ├── ScrollToTop.jsx  # Rota değişiminde sayfa başına kaydırma
│   │   ├── SkeletonCard.jsx # Yükleme durumu iskelet kartı
│   │   └── Wallet.jsx       # Navbar cüzdan bakiye göstergesi
│   │
│   ├── contexts/            # React Context API — Global State
│   │   ├── AuthContext.jsx  # Kimlik doğrulama durumu
│   │   ├── CartContext.jsx  # Sepet yönetimi (Firestore senkronize)
│   │   ├── ThemeContext.jsx # Koyu / Açık tema yönetimi
│   │   └── WishlistContext.jsx # Favori listesi (LocalStorage)
│   │
│   ├── firebase/
│   │   └── firebase.js      # Firebase yapılandırma ve servis export'ları
│   │
│   ├── pages/               # Rota bileşenleri (Lazy loaded)
│   │   ├── Admin.jsx        # Yönetim paneli (Ürün/Sipariş/Sohbet)
│   │   ├── AdminOrders.jsx  # Admin sipariş yönetimi
│   │   ├── Cart.jsx         # Alışveriş sepeti sayfası
│   │   ├── Checkout.jsx     # Ödeme sayfası
│   │   ├── Favorites.jsx    # Favori ürünler
│   │   ├── Home.jsx         # Ana sayfa (Listeleme + Filtreleme)
│   │   ├── Login.jsx        # Kullanıcı girişi
│   │   ├── NotFound.jsx     # 404 hata sayfası
│   │   ├── Orders.jsx       # Sipariş geçmişi ve takibi
│   │   ├── Privacy.jsx      # Gizlilik politikası
│   │   ├── ProductDetail.jsx # Ürün detay ve yorum sayfası
│   │   ├── Profile.jsx      # Kullanıcı profili + seviye sistemi
│   │   ├── Register.jsx     # Yeni kullanıcı kaydı
│   │   ├── Support.jsx      # Destek merkezi ve SSS
│   │   └── Terms.jsx        # Kullanım koşulları
│   │
│   ├── utils/
│   │   └── seedData.js      # 150 adet örnek ürün verisi üreteci
│   │
│   ├── AnimatedRoutes.jsx   # AnimatePresence + lazy route tanımları
│   ├── App.jsx              # Uygulama kök bileşeni
│   ├── index.css            # TailwindCSS v4 yapılandırması + özel stiller
│   └── main.jsx             # React DOM render + Context provider'lar
│
├── .gitignore
├── index.html               # HTML giriş noktası + SEO meta etiketleri
├── package.json
├── postcss.config.js
└── vite.config.js
```

---

## ⚙ Kurulum

### Ön Koşullar

- **Node.js** v18 veya üzeri — [nodejs.org](https://nodejs.org) adresinden LTS sürümünü indirin
- **Git** — [git-scm.com](https://git-scm.com)

### Adımlar

```bash
# 1. Repoyu klonlayın
git clone https://github.com/kullanici-adi/NovaMarket.git

# 2. Proje dizinine gidin
cd NovaMarket

# 3. Bağımlılıkları yükleyin
npm install

# 4. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcıda **http://localhost:5173** adresine giderek uygulamayı görüntüleyebilirsiniz.

### Kullanılabilir Scriptler

| Script | Komut | Açıklama |
|---|---|---|
| Geliştirme | `npm run dev` | Vite dev server (HMR aktif) |
| Derleme | `npm run build` | Production build oluşturma |
| Önizleme | `npm run preview` | Build çıktısını önizleme |
| Lint | `npm run lint` | ESLint kod analizi |

---

## 🗺 Sayfa ve Rotalar

| Rota | Sayfa | Açıklama |
|---|---|---|
| `/` | Ana Sayfa | Ürün listeleme, kategori filtreleme, hero banner |
| `/product/:id` | Ürün Detay | Ürün görseli, açıklama, yorum yazma ve okuma |
| `/cart` | Sepet | Sepetteki ürünler, adet güncelleme, toplam hesaplama |
| `/checkout` | Ödeme | Teslimat bilgileri, kart formu, sipariş özeti |
| `/favorites` | Favoriler | Favori olarak işaretlenen ürünler |
| `/orders` | Siparişlerim | Sipariş geçmişi ve 4 aşamalı durum takibi |
| `/profile` | Profil | Kullanıcı bilgileri, seviye sistemi, hesap ayarları |
| `/support` | Destek | Yardım merkezi, SSS, canlı destek başlatma |
| `/login` | Giriş | Firebase e-posta/şifre ile oturum açma |
| `/register` | Kayıt Ol | Yeni kullanıcı hesabı oluşturma |
| `/admin` | Yönetim Paneli | Envanter, sipariş ve sohbet yönetimi |
| `/admin/orders` | Sipariş Yönetimi | Detaylı admin sipariş takibi |
| `/privacy` | Gizlilik Politikası | KVKK ve gizlilik metni |
| `/terms` | Kullanım Koşulları | Platform kullanım şartları |
| `*` | 404 | Sayfa bulunamadı hatası |

> 📌 Tüm sayfa bileşenleri `React.lazy()` ile **code splitting** kullanarak yüklenir. Sayfa geçişleri `AnimatePresence` (Framer Motion) ile animasyonlandırılmıştır.

---

## 🔄 Context Yapısı

Uygulama genelinde durum yönetimi **React Context API** ile sağlanmaktadır:

```
ThemeProvider          → Tema durumu (dark/light)
  └── AuthProvider     → Firebase Auth oturum durumu
      └── CartProvider → Sepet verileri (Firestore realtime)
          └── WishlistProvider → Favori listesi (LocalStorage)
              └── App
```

| Context | Dosya | Özellikler |
|---|---|---|
| `AuthContext` | `contexts/AuthContext.jsx` | `currentUser`, `signup`, `login`, `logout` |
| `CartContext` | `contexts/CartContext.jsx` | `cartItems`, `totalItems`, `cartTotal`, `addToCart`, `updateQuantity`, `removeFromCart`, `clearCart` |
| `ThemeContext` | `contexts/ThemeContext.jsx` | `isDarkMode`, `toggleTheme` |
| `WishlistContext` | `contexts/WishlistContext.jsx` | `wishlist`, `toggleWishlist`, `isInWishlist` |

---

## 🔥 Firebase Entegrasyonu

Proje aşağıdaki Firebase servislerini kullanmaktadır:

### Firebase Authentication
- E-posta / şifre ile kullanıcı kaydı ve giriş
- `onAuthStateChanged` ile anlık oturum takibi
- Profil güncelleme ve şifre değiştirme

### Cloud Firestore Koleksiyonları

| Koleksiyon | Açıklama | Gerçek Zamanlı |
|---|---|---|
| `products` | Ürün verileri (isim, fiyat, görsel, kategori, açıklama) | ❌ |
| `carts` | Kullanıcı sepetleri (`users/{uid}` yapısında) | ✅ `onSnapshot` |
| `orders` | Sipariş kayıtları ve durumları | ❌ |
| `reviews` | Ürün yorumları ve puanlamaları | ❌ |
| `users` | Kullanıcı profilleri ve cüzdan bakiyeleri | ✅ `onSnapshot` |
| `live_chats` | Canlı destek sohbet mesajları | ✅ `onSnapshot` |
| `chat_sessions` | Sohbet oturumu durumları (çözüldü/aktif) | ✅ `onSnapshot` |

### Firebase Yapılandırması

Proje, Firebase bilgilerini güvenli bir şekilde **ortam değişkenleri** (environment variables) üzerinden okumaktadır. Kurulum adımları:

1. Proje kök dizinindeki `.env.example` dosyasını `.env` olarak kopyalayın:
   ```bash
   cp .env.example .env
   ```

2. `.env` dosyasındaki değerleri kendi Firebase Console bilgilerinizle doldurun:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. `src/firebase/firebase.js` dosyası bu değişkenleri otomatik olarak `import.meta.env` üzerinden okuyacaktır.

> ✅ **Güvenlik:** `.env` dosyası `.gitignore`'da yer aldığı için GitHub'a **asla yüklenmez**. Yalnızca `.env.example` (boş şablon) repoda bulunur.

---

## 🛠 Admin Paneli

Admin paneline `/admin` rotası üzerinden erişilebilir. Panel üç ana sekmeden oluşmaktadır:

### 1. Envanter Yönetimi
- Yeni ürün ekleme formu (başlık, fiyat, görsel URL, kategori, açıklama)
- Mevcut ürünleri listeleme ve silme
- Otomatik fiyat formatlama (Türk Lirası)
- 6 kategori desteği: Bilgisayar, Akıllı Telefon, Oyuncu Ekipmanı, Monitör & Ekran, Akıllı Saat, Aksesuar

### 2. Sipariş Takibi
- Tüm siparişlerin tarih sıralı listesi
- Sipariş durumu güncelleme (Sipariş Alındı → Hazırlanıyor → Kargoda → Teslim Edildi)
- Sipariş tutarı ve kullanıcı bilgileri
- Toplam ciro ve sipariş sayısı dashboard kartları

### 3. Destek Talepleri (Canlı Sohbet)
- Gerçek zamanlı müşteri sohbet odaları
- Sohbet geçmişi görüntüleme
- Müşteriye yanıt gönderme
- Talebi "Çözüldü" olarak işaretleme / tekrar açma
- Sohbet odasını silme
- Bot yanıtları ve gerçek temsilci ayrımı

---

## 📸 Ekran Görüntüleri

> 🖼️ Ekran görüntülerini eklemek için projenizi çalıştırıp tarayıcıda screenshot alabilirsiniz:
>
> | Ekran | Açıklama |
> |---|---|
> | Ana Sayfa | Hero banner, kategori navigasyonu, ürün grid'i |
> | Ürün Detay | Büyük görsel, fiyat bilgisi, yorum sistemi |
> | Sepet & Ödeme | Ürün listesi, sipariş özeti, kart formu |
> | Profil | Seviye sistemi, XP barı, hesap istatistikleri |
> | Admin Paneli | Envanter yönetimi, sipariş takibi, sohbet |
> | Canlı Destek | Floating chat widget, mesajlaşma arayüzü |
> | Koyu Tema | Tüm sayfaların dark mode görünümü |

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Aşağıdaki adımları takip edebilirsiniz:

1. Bu repoyu **fork** edin
2. Yeni bir **feature branch** oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi **commit** edin (`git commit -m 'feat: yeni özellik eklendi'`)
4. Branch'inizi **push** edin (`git push origin feature/yeni-ozellik`)
5. Bir **Pull Request** açın

### Commit Kuralları

```
feat:     Yeni özellik
fix:      Hata düzeltmesi
docs:     Dokümantasyon değişikliği
style:    Stil/format değişikliği (kod davranışı değişmez)
refactor: Kod yeniden yapılandırma
perf:     Performans iyileştirmesi
```

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

---

<p align="center">
  <sub>NovaMarket ile geleceğin alışveriş deneyimini bugünden yaşayın. 🚀</sub>
</p>
