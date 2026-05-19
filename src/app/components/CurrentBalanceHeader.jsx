import { Trophy } from "lucide-react";
import { useLang } from "../translations";

export default function CurrentBalanceHeader({ points }) {
  const t = useLang();
  return (
    <div className="flex-none flex items-center justify-between p-3 md:p-4 px-5 md:px-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#96d4e5]/20 via-transparent to-[#26448c]/20 pointer-events-none" />
      <div className="relative flex items-center gap-2 md:gap-4">
        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-[#fd7727] opacity-80" />
        <h2 className="font-['Geist',sans-serif] text-[10px] md:text-sm uppercase tracking-[0.1em] md:tracking-[0.2em] text-white/60">
          {t.currentBalance}
        </h2>
        <div className="font-['Tilt_Warp',sans-serif] text-2xl md:text-4xl text-[#fd7727]">
          {points} <span className="text-sm md:text-xl text-white">{t.pts}</span>
        </div>
      </div>
    </div>
  );
}
