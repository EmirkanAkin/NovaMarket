<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS v4" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<h1 align="center">🛒 NovaMarket</h1>
<h3 align="center">Yeni Nesil Teknoloji Ürünleri E-Ticaret Platformu</h3>

<p align="center">
  React 19, Vite 8 ve Firebase altyapısıyla geliştirilmiş, tam kapsamlı yönetim paneli,<br/>
  gerçek zamanlı veritabanı ve canlı destek sistemi içeren modern bir e-ticaret deneyimi.
</p>

<p align="center">
  <a href="https://nova-market-jet.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🚀_Canlı_Demo-nova--market--jet.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

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
- **Ürün Listeleme & Filtreleme** — Kategori, fiyat aralığı ve arama ile dinamik filtreleme
- **Alışveriş Sepeti** — Gerçek zamanlı Firestore senkronizasyonu
- **Güvenli Ödeme** — Kart numarası formatlama, sipariş özeti, SSL göstergesi
- **Sipariş Takibi** — 4 aşamalı görsel ilerleme çubuğu (Sipariş Alındı → Teslim Edildi)
- **Kullanıcı Profili** — Seviye/XP sistemi, harcama istatistikleri
- **Nova Bonus Cüzdanı** — Alışverişlerde %2 bonus kazanımı
- **Canlı Destek** — Gerçek zamanlı sohbet widget'ı, otomatik bot + temsilci desteği
- **Favoriler & Yorum Sistemi** — Favori listesi, yıldız puanlama ve ürün yorumları

### 🔐 Yönetim Paneli
- **Envanter Yönetimi** — Ürün CRUD işlemleri, kategori ve fiyat yönetimi
- **Sipariş Takibi** — Durum güncelleme, ciro ve sipariş dashboard'u
- **Canlı Sohbet Yönetimi** — Müşteri sohbetlerini takip etme ve yanıtlama

---

## 🧰 Teknoloji Yığını

| Katman | Teknolojiler |
|---|---|
| **Frontend** | React 19, React Router v7, Framer Motion |
| **Styling** | TailwindCSS v4, Headless UI, Heroicons |
| **Backend** | Firebase Auth, Cloud Firestore (realtime) |
| **Build** | Vite 8, PostCSS, ESLint |
| **Deploy** | Vercel |
| **Diğer** | Swiper, react-hot-toast, reCAPTCHA |

---

## 🏗 Proje Mimarisi

```
src/
├── components/          # 15 yeniden kullanılabilir UI bileşeni
│   ├── Navbar.jsx       # Navigasyon + kullanıcı menüsü
│   ├── CartDrawer.jsx   # Sepet slide-over drawer
│   ├── ChatWidget.jsx   # Canlı destek sohbet widget'ı
│   ├── ProductCard.jsx  # Ürün kartı (favori, sepet, puan)
│   ├── HeroBanner.jsx   # Hero banner + geri sayım
│   └── ...
│
├── contexts/            # React Context API — Global State
│   ├── AuthContext.jsx  # Firebase Auth oturum yönetimi
│   ├── CartContext.jsx  # Firestore realtime sepet
│   ├── ThemeContext.jsx # Dark / Light tema
│   └── WishlistContext.jsx
│
├── pages/               # 15 sayfa (React.lazy ile lazy loaded)
│   ├── Home.jsx         # Ana sayfa + filtreleme
│   ├── ProductDetail.jsx # Ürün detay + yorumlar
│   ├── Checkout.jsx     # Ödeme akışı
│   ├── Profile.jsx      # Profil + seviye sistemi
│   ├── Admin.jsx        # Yönetim paneli
│   └── ...
│
├── firebase/            # Firebase yapılandırması
├── utils/               # Yardımcı fonksiyonlar
├── App.jsx              # Kök bileşen
└── AnimatedRoutes.jsx   # AnimatePresence + route tanımları
```

---

## ⚙ Kurulum

```bash
git clone https://github.com/kullanici-adi/NovaMarket.git
cd NovaMarket
npm install
cp .env.example .env     # Firebase bilgilerinizi girin
npm run dev              # → http://localhost:5173
```

> 📌 Firebase yapılandırması için `.env.example` dosyasındaki alanları kendi [Firebase Console](https://console.firebase.google.com) bilgilerinizle doldurun.

---

<p align="center">
  <sub>NovaMarket ile geleceğin alışveriş deneyimini bugünden yaşayın. 🚀</sub>
</p>
