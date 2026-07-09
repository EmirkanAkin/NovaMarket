import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";

// Bileşenler (lazy yüklenmez — her sayfada gerekli)
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute"; 
import PageTransition from "./components/PageTransition";

// Sayfalar (lazy — code splitting için)
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Orders = lazy(() => import("./pages/Orders"));
const AdminOrders = lazy(() => import("./pages/AdminOrders"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Support = lazy(() => import("./pages/Support"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageTransition><Home /></PageTransition>} />
          <Route path="login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="register" element={<PageTransition><Register /></PageTransition>} />
          <Route path="cart" element={<PageTransition><Cart /></PageTransition>} />
          <Route path="checkout" element={<PageTransition><Checkout /></PageTransition>} />
          <Route path="product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="profile" element={<PageTransition><Profile /></PageTransition>} />
          <Route path="favorites" element={<PageTransition><Favorites /></PageTransition>} />
          <Route path="orders" element={<PageTransition><Orders /></PageTransition>} /> 
          <Route path="support" element={<PageTransition><Support /></PageTransition>} />
          <Route path="privacy" element={<PageTransition><Privacy /></PageTransition>} />
          <Route path="terms" element={<PageTransition><Terms /></PageTransition>} />

          {/* ADMİN PANELİ */}
          <Route 
            path="admin" 
            element={
              <AdminRoute>
                <PageTransition><Admin /></PageTransition>
              </AdminRoute>
            } 
          />
          
          <Route 
            path="admin/orders" 
            element={
              <AdminRoute>
                <PageTransition><AdminOrders /></PageTransition>
              </AdminRoute>
            } 
          />

          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
