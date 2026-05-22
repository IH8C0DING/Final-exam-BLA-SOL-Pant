import { useState, useEffect, useRef } from "react";
import { Home, Gift, Map, User, QrCode, ShoppingBasket, X } from "lucide-react";
import mascot from "../../assets/mascot.png";
import { translations, LangProvider } from "../translations";

import HomePageView from "../pages/HomePageView";
import RewardsPage from "../pages/RewardsPage";
import MapPage from "../pages/MapPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import ScanPage from "../pages/ScanPage";

export default function Layout() {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState("");
  const [points, setPoints] = useState(0);
  const [totalEarnedPoints, setTotalEarnedPoints] = useState(0);
  const [cups, setCups] = useState(0);
  const [claimedItems, setClaimedItems] = useState([]);
  const [showBasket, setShowBasket] = useState(false);
  const [lang, setLang] = useState("en");

  const langRef = useRef(lang);
  useEffect(() => { langRef.current = lang; }, [lang]);

  const t = translations[lang];

  const messageKeys = ["notifScan", "notifNewStation", "notifDoublePoints", "notifFreeBeer", "notifClean"];

  useEffect(() => {
    let i = 0;
    let idleTimeout;

    const handleIdle = () => {
      setIsLoggedIn(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        setActiveIndex(0);
      }
    };

    const resetIdleTimer = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(handleIdle, 30000);
    };

    const events = ['mousemove', 'mousedown', 'touchstart', 'touchmove', 'keydown', 'scroll', 'click'];
    events.forEach(evt => document.addEventListener(evt, resetIdleTimer, true));
    resetIdleTimer();

    setTimeout(() => {
      setNotification(translations[langRef.current][messageKeys[0]]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 6000);
    }, 2000);

    const interval = setInterval(() => {
      i = (i + 1) % messageKeys.length;
      setNotification(translations[langRef.current][messageKeys[i]]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 1500);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(idleTimeout);
      events.forEach(evt => document.removeEventListener(evt, resetIdleTimer, true));
    };
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const index = Math.round(scrollLeft / width);
      if (index !== activeIndex) setActiveIndex(index);
    }
  };

  const scrollToSection = (index) => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  return (
    <LangProvider lang={lang}>
      <div className="h-screen w-screen bg-[#26448c] text-white font-['Geist',sans-serif] relative overflow-hidden select-none">
        {!isLoggedIn && (
          <LoginPage onLogin={() => {
            setIsLoggedIn(true);
            setActiveIndex(0);
            if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ left: 0 });
          }} />
        )}

        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#26448c]">
          <div className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-[#96d4e5] rounded-full mix-blend-screen filter blur-[120px] opacity-50" style={{ animation: 'float1 22s ease-in-out infinite' }} />
          <div className="absolute top-[30%] -right-[20%] w-[60vw] h-[60vw] bg-[#96d4e5] rounded-full mix-blend-screen filter blur-[100px] opacity-35" style={{ animation: 'float2 17s ease-in-out infinite' }} />
          <div className="absolute -bottom-[20%] left-[10%] w-[70vw] h-[70vw] bg-[#96d4e5] rounded-full mix-blend-screen filter blur-[130px] opacity-30" style={{ animation: 'float3 28s ease-in-out infinite' }} />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <header className="absolute top-0 left-0 right-0 z-20 px-8 xl:px-16 pt-7 pb-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-['Tilt_Warp',sans-serif] text-3xl xl:text-4xl tracking-tight text-white">
              {t.appName}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLang(l => l === "en" ? "da" : "en")} className="w-9 h-7 flex-shrink-0">
              {lang === "en" ? (
                <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-sm">
                  <rect width="60" height="40" fill="#012169"/>
                  <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8"/>
                  <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="5"/>
                  <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13"/>
                  <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8"/>
                </svg>
              ) : (
                <svg viewBox="0 0 37 28" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-sm">
                  <rect width="37" height="28" fill="#C60C30"/>
                  <rect x="11" width="5" height="28" fill="#fff"/>
                  <rect y="11" width="37" height="6" fill="#fff"/>
                </svg>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowBasket(v => !v)}
                className="relative p-3 xl:p-4 rounded-full bg-white/5 border border-white/10 shadow-sm"
              >
                <ShoppingBasket className="w-5 h-5 xl:w-6 xl:h-6 text-white/80" />
                {claimedItems.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#fd7727] rounded-full text-[9px] font-bold text-white flex items-center justify-center shadow-[0_0_10px_rgba(253,119,39,0.55)]">
                    {claimedItems.length}
                  </span>
                )}
              </button>
              {showBasket && (
                <div className="absolute top-14 right-0 w-72 bg-[#2f3034] backdrop-blur-3xl border border-white/20 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <span className="font-['Geist',sans-serif] text-xs uppercase tracking-widest text-white/60">{t.shoppingCart}</span>
                    <button onClick={() => setShowBasket(false)}>
                      <X className="w-4 h-4 text-white/40 hover:text-white/80" />
                    </button>
                  </div>
                  {claimedItems.length === 0 ? (
                    <p className="font-['Geist',sans-serif] text-sm text-white/40 text-center py-6">{t.nothingClaimed}</p>
                  ) : (
                    <ul className="max-h-60 overflow-y-auto hide-scrollbar divide-y divide-white/5">
                      {claimedItems.map((item, i) => (
                        <li key={i} className="flex items-center justify-between px-4 py-2.5">
                          <span className="font-['Geist',sans-serif] text-sm text-white/90">{item.name}</span>
                          <span className="font-['Tilt_Warp',sans-serif] text-xs text-[#fd7727]">-{item.points} pts</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="px-4 py-3 border-t border-white/10">
                    <button
                      onClick={() => { setClaimedItems([]); setShowBasket(false); }}
                      className="w-full py-2 rounded-full bg-[#fd7727] text-white font-['Geist',sans-serif] text-xs font-bold uppercase tracking-widest"
                    >
                      {t.claim}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="font-['Geist',sans-serif] text-base xl:text-lg text-white/80 px-6 py-2.5 xl:px-8 xl:py-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-md shadow-sm">
              {t.helloUser}
            </div>
          </div>
        </header>

        <main className="absolute inset-0 z-10 overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar scroll-smooth"
          >
            <div className="w-full flex-none h-full snap-center">
              <HomePageView points={points} cups={cups} totalEarned={totalEarnedPoints} />
            </div>
            <div className="w-full flex-none h-full snap-center">
              <RewardsPage
                points={points}
                onClaim={(cost, id, name) => {
                  setPoints(p => Math.max(0, p - cost));
                  setClaimedItems(prev => [...prev, { name, points: cost }]);
                  setNotification(translations[langRef.current].notifRewardClaimed(cost));
                  setShowNotification(true);
                  setTimeout(() => setShowNotification(false), 3000);
                }}
              />
            </div>
            <div className="w-full flex-none h-full snap-center">
              <ScanPage
                points={points}
                cups={cups}
                onScan={() => {
                  setPoints(p => {
                    const newPoints = p + 250;
                    if (Math.floor(newPoints / 1000) > Math.floor(p / 1000)) {
                      setNotification(translations[langRef.current].notifGoalReached);
                    } else {
                      setNotification(translations[langRef.current].notifAwesome);
                    }
                    setShowNotification(true);
                    setTimeout(() => setShowNotification(false), 3000);
                    return newPoints;
                  });
                  setTotalEarnedPoints(prev => prev + 250);
                  setCups(c => c + 1);
                }}
              />
            </div>
            <div className="w-full flex-none h-full snap-center">
              <MapPage />
            </div>
            <div className="w-full flex-none h-full snap-center">
              <ProfilePage />
            </div>
          </div>
        </main>

        {activeIndex !== 1 && <div className="absolute top-[20vh] right-0 xl:right-4 z-50 pointer-events-none">
          <div className="relative w-56 h-56 xl:w-72 xl:h-72 flex-shrink-0 z-10">
            <div className="absolute inset-0 bg-[#26448c] rounded-full filter blur-[50px] opacity-40 animate-pulse" />
            <img
              src={mascot}
              alt="Sunny Mascot"
              className={`w-full h-full object-contain relative z-20 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transition-transform duration-[2000ms] ${showNotification ? 'rotate-[-5deg] scale-110' : 'rotate-12 scale-100'}`}
            />
          </div>
        </div>}

        <div className="absolute bottom-0 left-0 right-0 pb-3 pt-2 px-8 xl:px-16 z-50">
          <nav className="relative bg-[#26448c]/60 backdrop-blur-3xl rounded-[2rem] max-w-4xl mx-auto">
            <div className="flex justify-around items-center h-[72px] xl:h-[84px] px-4 relative z-10">
              <button onClick={() => scrollToSection(0)} className="relative flex flex-col items-center justify-center flex-1 h-full group">
                {activeIndex === 0 && <div className="absolute inset-0 bg-white/10 rounded-2xl m-1.5 transition-all duration-500 shadow-inner" />}
                <Home className={`w-6 h-6 xl:w-7 xl:h-7 mb-1 transition-all duration-300 ${activeIndex === 0 ? "text-[#fd7727] scale-110" : "text-white/50"}`} />
                <span className={`text-[9px] xl:text-[11px] font-bold tracking-widest uppercase transition-colors ${activeIndex === 0 ? "text-[#fd7727]" : "text-white/50"}`}>{t.navHome}</span>
              </button>

              <button onClick={() => scrollToSection(1)} className="relative flex flex-col items-center justify-center flex-1 h-full group">
                {activeIndex === 1 && <div className="absolute inset-0 bg-white/10 rounded-2xl m-1.5 transition-all duration-500 shadow-inner" />}
                <Gift className={`w-6 h-6 xl:w-7 xl:h-7 mb-1 transition-all duration-300 ${activeIndex === 1 ? "text-[#fd7727] scale-110" : "text-white/50"}`} />
                <span className={`text-[9px] xl:text-[11px] font-bold tracking-widest uppercase transition-colors ${activeIndex === 1 ? "text-[#fd7727]" : "text-white/50"}`}>{t.navRewards}</span>
              </button>

              <div className="relative flex flex-col items-center justify-center flex-1 h-full group">
                <button onClick={() => scrollToSection(2)} className="relative flex flex-col items-center justify-center w-13 h-13 xl:w-16 xl:h-16 rounded-full transition-all duration-300 bg-white/10 mx-auto" style={{width: '3.25rem', height: '3.25rem'}}>
                  {activeIndex === 2 && <div className="absolute inset-0 bg-white/10 rounded-full shadow-inner scale-110 transition-all duration-500" />}
                  <QrCode className={`relative z-10 w-6 h-6 xl:w-7 xl:h-7 transition-all duration-300 ${activeIndex === 2 ? 'text-[#fd7727] scale-110' : 'text-white/80'}`} />
                </button>
              </div>

              <button onClick={() => scrollToSection(3)} className="relative flex flex-col items-center justify-center flex-1 h-full group">
                {activeIndex === 3 && <div className="absolute inset-0 bg-white/10 rounded-2xl m-1.5 transition-all duration-500 shadow-inner" />}
                <Map className={`w-6 h-6 xl:w-7 xl:h-7 mb-1 transition-all duration-300 ${activeIndex === 3 ? "text-[#fd7727] scale-110" : "text-white/50"}`} />
                <span className={`text-[9px] xl:text-[11px] font-bold tracking-widest uppercase transition-colors ${activeIndex === 3 ? "text-[#fd7727]" : "text-white/50"}`}>{t.navMap}</span>
              </button>

              <button onClick={() => scrollToSection(4)} className="relative flex flex-col items-center justify-center flex-1 h-full group">
                {activeIndex === 4 && <div className="absolute inset-0 bg-white/10 rounded-2xl m-1.5 transition-all duration-500 shadow-inner" />}
                <User className={`w-6 h-6 xl:w-7 xl:h-7 mb-1 transition-all duration-300 ${activeIndex === 4 ? "text-[#fd7727] scale-110" : "text-white/50"}`} />
                <span className={`text-[9px] xl:text-[11px] font-bold tracking-widest uppercase transition-colors ${activeIndex === 4 ? "text-[#fd7727]" : "text-white/50"}`}>{t.navProfile}</span>
              </button>
            </div>
          </nav>
        </div>

        <style>{`
          @keyframes float1 {
            0%   { transform: translate(0, 0) scale(1); }
            15%  { transform: translate(35%, 55%) scale(1.2); }
            35%  { transform: translate(65%, 20%) scale(1.4); }
            55%  { transform: translate(25%, 75%) scale(1.1); }
            75%  { transform: translate(55%, 40%) scale(1.35); }
            100% { transform: translate(0, 0) scale(1); }
          }
          @keyframes float2 {
            0%   { transform: translate(0, 0) scale(1); }
            20%  { transform: translate(-45%, -35%) scale(0.82); }
            42%  { transform: translate(-70%, -55%) scale(0.7); }
            65%  { transform: translate(-25%, -65%) scale(0.88); }
            82%  { transform: translate(-58%, -20%) scale(0.76); }
            100% { transform: translate(0, 0) scale(1); }
          }
          @keyframes float3 {
            0%   { transform: translate(0, 0) scale(1); }
            25%  { transform: translate(55%, -45%) scale(1.15); }
            50%  { transform: translate(80%, -65%) scale(1.3); }
            72%  { transform: translate(35%, -25%) scale(0.9); }
            88%  { transform: translate(65%, -50%) scale(1.2); }
            100% { transform: translate(0, 0) scale(1); }
          }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </LangProvider>
  );
}
