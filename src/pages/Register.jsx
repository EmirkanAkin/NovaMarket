import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Şifreler birbiriyle eşleşmiyor!");
    }

    setError("");
    setLoading(true);
    try {
      await signup(email, password);
      navigate("/"); // Kayıt başarılıysa ana sayfaya yönlendir
    } catch (err) {
      setError("Kayıt oluşturulurken bir hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">Hesap Oluştur</h2>
        <p className="text-gray-400 text-center mb-6 text-sm">NovaMarket ailesine hoş geldin!</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label>
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
              placeholder="En az 6 karakter"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şifre Tekrar</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-gray-900 dark:text-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Tekrar yazın"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 active:scale-[0.98] transition disabled:opacity-50"
          >
            {loading ? "Hesap Oluşturuluyor..." : "Kayıt Ol"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          Zaten hesabın var mı?{" "}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;