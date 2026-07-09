import { useState, useEffect, useRef } from "react";
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase/firebase";
import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const ChatWidget = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const [sessionId] = useState(() => {
    let sid = localStorage.getItem("nova_chat_id");
    if (!sid) {
      sid = "chat_" + Date.now();
      localStorage.setItem("nova_chat_id", sid);
    }
    return sid;
  });

  // REAL-TIME FIRESTORE LISTENER
  useEffect(() => {
    const q = query(collection(db, "live_chats"), where("sessionId", "==", sessionId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetched.sort((a, b) => a.createdAt - b.createdAt); // İstemci tarafı sıralama
      setMessages(fetched);
    });
    return () => unsubscribe();
  }, [sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-live-chat", handleOpen);
    return () => window.removeEventListener("open-live-chat", handleOpen);
  }, []);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    try {
      await addDoc(collection(db, "live_chats"), {
        sessionId,
        userEmail: currentUser ? currentUser.email : "Ziyaretçi",
        text: userText,
        sender: "user",
        createdAt: Date.now(),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      });

      // Bot Yanıt Mantığı — Gerçek temsilci devreye girdiyse bot susar
      const hasRealAdmin = messages.some(m => m.sender === "admin" && m.userEmail !== "Nova Asistanı");
      
      if (!hasRealAdmin) {
        setTimeout(async () => {
          let botReply = "";
          const lowerInput = userText.toLowerCase();

          if (lowerInput.includes("kargo") || lowerInput.includes("teslimat")) {
            botReply = "Siparişleriniz genellikle aynı gün içinde kargoya verilir ve dijital ürünler anında teslim edilir.";
          } else if (lowerInput.includes("iade")) {
            botReply = "İade taleplerinizi profilinizdeki Siparişlerim sekmesinden 14 gün içerisinde oluşturabilirsiniz.";
          } else if (lowerInput.includes("merhaba") || lowerInput.includes("selam")) {
            botReply = "Merhaba! Size hangi konuda yardımcı olabilirim?";
          } else if (lowerInput.includes("fiyat") || lowerInput.includes("indirim") || lowerInput.includes("bonus")) {
            botReply = "Ödeme ekranında Nova Bonus puanlarınızı kullanabilir ve size özel indirimlerden faydalanabilirsiniz.";
          } else if (lowerInput.includes("şifre") || lowerInput.includes("hesap")) {
            botReply = "Hesap ve şifre işlemlerinizi profil sayfanızdaki güvenlik bölümünden kolayca yönetebilirsiniz.";
          } else {
            botReply = "Sizi müşteri temsilcimize aktarıyorum, lütfen hattan ayrılmayın. Size en kısa sürede dönüş yapılacaktır.";
          }

          try {
            await addDoc(collection(db, "live_chats"), {
              sessionId,
              userEmail: "Nova Asistanı",
              text: botReply,
              sender: "admin", 
              createdAt: Date.now(),
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            });
          } catch (e) {
            console.error("Bot yanıtı kaydedilemedi", e);
          }
        }, 1000);
      }

    } catch (err) {
      console.error("Mesaj gönderilemedi:", err);
    }
  };

  return (
    // Mobilde alttan 4, masaüstünde 8 birim boşluk (responsive pozisyon)
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[999]">
      
      {/* CHAT PENCERESİ */}
      <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9, originOrigin: "bottom right" }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="
            bg-white dark:bg-gray-950 
            w-[90vw] md:w-80 
            h-[70vh] md:h-[450px] 
            mb-4 
            rounded-[2rem] 
            shadow-2xl 
            border border-gray-100 dark:border-gray-800 
            flex flex-col 
            overflow-hidden origin-bottom-right
          "
        >
          {/* HEADER */}
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-center shrink-0">
            <div>
              <h3 className="font-black italic uppercase text-xs tracking-widest">NovaMarket</h3>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">Canlı Destek Hattı</p>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Sohbeti Kapat" className="hover:rotate-90 transition-transform p-1">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* MESAJ ALANI */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
            {messages.length === 0 && (
              <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700 max-w-[95%]">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-200 leading-relaxed">
                  👋 Merhaba! Müşteri temsilciniz ile görüşmeye başlamak için mesajınızı yazın.
                </p>
              </div>
            )}
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className={`p-3 rounded-2xl shadow-sm border max-w-[85%] ${
                  msg.sender === "user" 
                  ? "bg-indigo-600 text-white border-indigo-500 rounded-tr-none" 
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-100 dark:border-gray-700 rounded-tl-none"
                }`}>
                  <p className="text-xs font-bold leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-[9px] text-gray-400 mt-1 font-bold">
                  {msg.sender === "admin" ? "Müşteri Temsilcisi" : "Siz"} • {msg.time}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT ALANI */}
          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex gap-2 shrink-0">
            <input 
              type="text" 
              placeholder="Mesajınızı yazın..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow bg-gray-50 dark:bg-gray-900 dark:text-white border-none rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button type="submit" aria-label="Mesaj Gönder" disabled={!input.trim()} className="bg-indigo-600 p-2 rounded-xl text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 dark:shadow-none disabled:opacity-50">
              <PaperAirplaneIcon className="h-4 w-4" />
            </button>
          </form>
        </motion.div>
      )}
      </AnimatePresence>

      {/* AÇMA/KAPAMA BUTONU */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Sohbeti Kapat" : "Sohbeti Aç"}
          className={`${
            isOpen ? 'bg-gray-900 rotate-90' : 'bg-indigo-600 hover:scale-110 active:scale-95'
          } p-4 md:p-5 rounded-2xl text-white shadow-2xl transition-all duration-300 flex items-center justify-center relative`}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6 md:h-8 md:w-8" />
          ) : (
            <ChatBubbleLeftRightIcon className="h-6 w-6 md:h-8 md:w-8" />
          )}
          
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;