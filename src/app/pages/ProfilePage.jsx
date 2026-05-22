import { useState } from "react";
import { User, Settings, History, Bell, X } from "lucide-react";
import { useLang } from "../translations";

function UnderConstructionModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md flex items-center justify-center px-6" onClick={onClose}>
      <div
        className="w-full max-w-sm relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-8 text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#96d4e5]/15 via-transparent to-[#26448c]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-[#fd7727]/20 border border-[#fd7727]/30 flex items-center justify-center mx-auto mb-5">
            <X className="w-7 h-7 text-[#fd7727]" />
          </div>
          <h3 className="font-['Tilt_Warp',sans-serif] text-2xl md:text-3xl text-white mb-3">Coming Soon</h3>
          <p className="font-['Geist',sans-serif] text-white/50 text-sm tracking-wide mb-7">This feature is under construction.<br />Try again next year.</p>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#fd7727] to-[#fd7727]/80 text-white font-['Geist',sans-serif] text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(253,119,39,0.4)]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage({ onModalChange }) {
  const t = useLang();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => { setShowModal(true); onModalChange?.(true); };
  const closeModal = () => { setShowModal(false); onModalChange?.(false); };

  return (
    <div className="h-full w-full px-8 xl:px-16 pt-28 md:pt-32 pb-28 flex flex-col gap-4 text-white box-border max-w-[1600px] mx-auto overflow-hidden">

      {showModal && <UnderConstructionModal onClose={closeModal} />}

      <div className="flex-none flex gap-4">
        <div className="flex-none w-[280px] relative flex flex-col items-center justify-center py-6 px-4 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#96d4e5]/20 via-transparent to-[#26448c]/20 pointer-events-none" />
          <div className="relative z-10 w-20 h-20 mb-3 rounded-full bg-gradient-to-br from-[#96d4e5] to-[#26448c] p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-[#26448c] flex items-center justify-center border-4 border-[#26448c]">
              <User className="w-8 h-8 text-white/80" />
            </div>
          </div>
          <h2 className="relative font-['Tilt_Warp',sans-serif] text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#96d4e5] to-white/70 mb-2 text-center">
            {t.userHandle}
          </h2>
          <div className="relative flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/5">
            <div className="w-2 h-2 rounded-full bg-[#fd7727] animate-pulse" />
            <span className="font-['Geist',sans-serif] text-[10px] uppercase tracking-widest text-white/80">{t.festivalVIP}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex-1 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col p-4 gap-2 overflow-y-auto hide-scrollbar">
            <h3 className="font-['Geist',sans-serif] text-sm uppercase tracking-[0.2em] text-white/50 px-2">
              {t.preferences}
            </h3>
            <button onClick={openModal} className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#96d4e5]/20 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-['Geist',sans-serif] font-semibold text-white/90">{t.accountDetails}</div>
                  <div className="font-['Geist',sans-serif] text-xs text-white/50 mt-0.5">{t.updatePersonalInfo}</div>
                </div>
              </div>
            </button>
            <button onClick={openModal} className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#26448c]/20 flex items-center justify-center text-white">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-['Geist',sans-serif] font-semibold text-white/90">{t.notifications}</div>
                  <div className="font-['Geist',sans-serif] text-xs text-white/50 mt-0.5">{t.manageSunny}</div>
                </div>
              </div>
            </button>
            <button onClick={openModal} className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Settings className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-['Geist',sans-serif] font-semibold text-white/90">{t.appSettings}</div>
                  <div className="font-['Geist',sans-serif] text-xs text-white/50 mt-0.5">{t.languageAccessibility}</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-none h-[22vh] md:h-[26vh] overflow-hidden flex flex-col rounded-[2rem]">
        <div className="flex-1 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col p-5 md:p-6 overflow-hidden">
          <h3 className="font-['Geist',sans-serif] text-base uppercase tracking-[0.2em] text-white/50 px-2 mb-3">
            {t.recentActivity}
          </h3>
          <div className="flex-1 flex flex-col justify-start gap-2 md:gap-3 relative">
            <div className="absolute left-[16px] top-[16px] bottom-[16px] w-px bg-white/10" />
            {t.activities.map((item, i) => (
              <div key={i} className="flex items-start gap-4 relative z-10">
                <div className="w-9 h-9 rounded-full bg-[#26448c] border-2 border-[#26448c] flex items-center justify-center shadow-lg flex-shrink-0 mt-0.5">
                  <History className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-['Geist',sans-serif] font-semibold text-base text-white/90">{item.title}</div>
                  <div className="font-['Geist',sans-serif] text-sm text-white/50 mt-0.5">{item.time}</div>
                </div>
                <div className="font-['Tilt_Warp',sans-serif] text-lg text-[#fd7727]">{item.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
