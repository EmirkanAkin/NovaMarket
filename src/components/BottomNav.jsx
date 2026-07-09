import { Link, useLocation } from "react-router-dom";
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  UserIcon,
  Squares2X2Icon 
} from "@heroicons/react/24/outline";

const BottomNav = () => {
  const location = useLocation();
  
  // Hangi sayfadaysak o ikonun rengini indigo yapalım
  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-around items-center">
        
        <Link to="/" aria-label="Anasayfa" className="relative p-2">
          <HomeIcon className={`h-6 w-6 transition-all ${isActive('/') ? 'text-indigo-400 scale-110' : 'text-gray-400'}`} />
          {isActive('/') && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full"></div>}
        </Link>

        <Link to="/orders" aria-label="Siparişlerim" className="relative p-2">
          <ShoppingBagIcon className={`h-6 w-6 transition-all ${isActive('/orders') ? 'text-indigo-400 scale-110' : 'text-gray-400'}`} />
          {isActive('/orders') && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full"></div>}
        </Link>

        <Link to="/favorites" aria-label="Favorilerim" className="relative p-2">
          <HeartIcon className={`h-6 w-6 transition-all ${isActive('/favorites') ? 'text-indigo-400 scale-110' : 'text-gray-400'}`} />
          {isActive('/favorites') && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full"></div>}
        </Link>

        <Link to="/profile" aria-label="Profilim" className="relative p-2">
          <UserIcon className={`h-6 w-6 transition-all ${isActive('/profile') ? 'text-indigo-400 scale-110' : 'text-gray-400'}`} />
          {isActive('/profile') && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full"></div>}
        </Link>

      </div>
    </div>
  );
};

export default BottomNav;