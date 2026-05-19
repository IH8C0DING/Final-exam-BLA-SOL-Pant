import { User, Settings, History, Bell } from "lucide-react";
import { useLang } from "../translations";

export default function ProfilePage() {
  const t = useLang();
  return (
    <div className="h-full w-full px-8 pt-20 pb-24 md:pb-28 flex flex-col gap-4 text-white box-border max-w-[1400px] mx-auto overflow-hidden">
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

            <button className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
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

            <button className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
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

            <button className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
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

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <div className="flex-1 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col p-6 overflow-hidden">
          <h3 className="font-['Geist',sans-serif] text-sm uppercase tracking-[0.2em] text-white/50 px-2 mb-2">
            {t.recentActivity}
          </h3>
          <div className="flex-1 flex flex-col justify-between relative">
            <div className="absolute left-[14px] top-[14px] bottom-[14px] w-px bg-white/10" />
            {t.activities.map((item, i) => (
              <div key={i} className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-[#26448c] border-2 border-[#26448c] flex items-center justify-center shadow-lg flex-shrink-0 mt-0.5">
                  <History className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-['Geist',sans-serif] font-semibold text-white/90">{item.title}</div>
                  <div className="font-['Geist',sans-serif] text-xs text-white/50 mt-0.5">{item.time}</div>
                </div>
                <div className="font-['Tilt_Warp',sans-serif] text-[#fd7727]">{item.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
