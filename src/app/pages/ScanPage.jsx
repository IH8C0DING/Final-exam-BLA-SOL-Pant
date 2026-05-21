import { QrCode, Trophy } from "lucide-react";
import CupFill from "../components/CupFill";
import { useLang } from "../translations";

export default function ScanPage({ points, onScan }) {
  const t = useLang();
  const fillPercentage = Math.min(100, ((points % 1000) / 1000) * 100);

  return (
    <div className="h-full w-full px-8 xl:px-16 pt-20 pb-28 flex flex-col gap-1 text-white box-border max-w-[1600px] mx-auto items-center relative">
      <div className="relative z-30 text-center flex-none -mt-4 mb-5">
        <h2 className="font-['Tilt_Warp',sans-serif] text-4xl md:text-5xl text-white mb-2">
          {t.scanYourCups}
        </h2>
        <p className="font-['Geist',sans-serif] text-sm md:text-base text-white/60">
          {t.scanSubtitle}
        </p>
      </div>

      <div className="flex-1 min-h-0 w-full max-w-sm relative z-10 flex items-start justify-center">
        <div className="absolute inset-0 bg-[#26448c] rounded-full filter blur-[100px] opacity-20 animate-pulse pointer-events-none" />
        <div className="relative w-full max-w-[260px] md:max-w-[320px] aspect-[0.8] z-10 mx-auto">
          <CupFill fillPercentage={fillPercentage} highlightFilledMarkers />

          <div className="absolute -right-20 md:-right-24 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3">
            <div className="bg-[#26448c] border border-white/20 p-3 md:p-4 rounded-3xl shadow-2xl flex flex-col items-center">
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-[#fd7727] mb-1" />
              <span className="font-['Tilt_Warp',sans-serif] text-xl md:text-2xl text-white">{points}</span>
              <span className="font-['Geist',sans-serif] text-[10px] md:text-xs text-white/50 uppercase tracking-wider">{t.pts}</span>
            </div>
            <button
              onClick={onScan}
              className="py-2.5 px-3 rounded-2xl bg-gradient-to-r from-[#96d4e5] to-[#26448c] text-white font-['Tilt_Warp',sans-serif] text-sm tracking-wide shadow-[0_8px_30px_rgba(38,68,140,0.4)] flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              {t.simulate}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
