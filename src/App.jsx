import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute"; 
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";

import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-gray-950 transition-colors duration-300 selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100">
      <Toaster 
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: '16px',
            background: '#111', 
            color: '#fff',
            fontFamily: 'inherit',
            fontWeight: '600',
            fontSize: '14px',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '12px 24px',
          },
        }} 
      />
      
      <Router>
        <ScrollToTop /> 
        <ChatWidget /> 
        
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;