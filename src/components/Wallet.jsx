import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { WalletIcon } from "@heroicons/react/24/solid";

const Wallet = ({ currentUser }) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Eğer kullanıcı giriş yapmamışsa hiçbir şey yapma
    if (!currentUser) return;
    
    // Firebase'den bu kullanıcının dökümanını canlı dinle
    const unsubscribe = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
      if (doc.exists()) {
        // walletBalance varsa al, yoksa 0 say
        setBalance(doc.data().walletBalance || 0);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Giriş yapmayan kullanıcıya cüzdanı gösterme
  if (!currentUser) return null;

  return (
    <div className="relative group flex items-center gap-3 bg-gray-900 border border-white/10 px-4 py-2 rounded-2xl hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg shadow-black/20">
      <div className="relative">
        <WalletIcon className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></span>
      </div>
      
      <div className="flex flex-col">
        <span className="text-[7px] font-black text-gray-500 uppercase tracking-[0.2em] leading-none mb-1">Bakiyem</span>
        <span className="text-sm font-black text-white italic tracking-tighter leading-none">
          {balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} <span className="text-indigo-400 text-[10px]">TL</span>
        </span>
      </div>


    </div>
  );
};

export default Wallet;