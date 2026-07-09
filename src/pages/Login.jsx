import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"; // 1. Import eklendi

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false); // 2. State eklendi
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Captcha kontrolü
    if (!captchaVerified) {
      setError("Lütfen robot olmadığınızı doğrulayın.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/"); 
    } catch (err) {
      setError("Giriş başarısız: E-posta veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  };

  // Captcha değişim fonksiyonu
  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Tekrar Hoş Geldin!</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta Adresi</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="ornek@mail.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="••••••••"
              required
            />
          </div>

          {/* reCAPTCHA Buraya Eklendi */}
          <div className="flex justify-center py-2">
            <ReCAPTCHA
              sitekey="6Ldnjb8sAAAAANftwtIL7tDjpUs_4v1xcfpDjuM2"
              onChange={handleCaptchaChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !captchaVerified}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          Hesabın yok mu?{" "}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">
            Hemen Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;